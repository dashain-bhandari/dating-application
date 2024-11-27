import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setActiveConversationId,
  setCall,
  setCallDetails,
  setConnection,
  setIsCallInProgress,
  setIsReceivingCall,
} from "../Store/features/callSlice";
import { useNavigate } from "react-router-dom";
import {
  addCallMessage,
  updateCallMessage,
} from "../Store/features/messageSlice";
import { updateConversation } from "../Store/features/conversationSlice";

export function useVoiceCallAccept() {
  const {user} = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { peer, localStream, callDetails } = useSelector((state) => state.call);

  useEffect(() => {
    socket.on("onVoiceCallAccept", (data) => {
      if (!peer) return console.log("Audio, No Peer");
      console.log("onVoiceCallAccept");
      dispatch(setActiveConversationId(data.conversation.id));
      dispatch(setIsCallInProgress(true));
      dispatch(setIsReceivingCall(false));
      dispatch(setCallDetails(data.callDetail));
      if (data.caller.id === user.id) {
        dispatch(addCallMessage(data.callDetail));
      } else {
        dispatch(updateCallMessage(data.callDetail));
      }

      dispatch(
        updateConversation({
          ...data.callDetail.conversation,
          lastMessageSent: {
            ...data.callDetail.conversation.lastMessageSent,
            call: data.callDetail.call,
          },
        })
      );

      if (data.caller.id === user.id) {
        console.log("audio: connecting to peer now");

        const connection = peer.connect(data.peerId);
        console.log(connection);
        dispatch(setConnection(connection));

        if (!connection) return console.log("No connection");

        if (localStream) {
          const newCall = peer.call(data.peerId, localStream);
          dispatch(setCall(newCall));
        }
      }

      navigate(`/home/main/chat/conversation/${data.conversation.id}`);
    });

    return () => {
      socket.off("onVoiceCallAccept");
    };
  }, [localStream, peer]);
}
