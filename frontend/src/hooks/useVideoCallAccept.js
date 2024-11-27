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

export function useVideoCallAccept() {
  const {user} = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { peer, localStream } = useSelector((state) => state.call);

  useEffect(() => {
    socket.on("onVideoCallAccept", (data) => {
      console.log("videoCallAccepted");
      dispatch(setIsCallInProgress(true));
      dispatch(setIsReceivingCall(false));
      dispatch(setActiveConversationId(data.conversation.id));
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

      if (!peer) return console.log("No peer");
      if (data.caller.id === user.id) {
        console.log(data);
        const connection = peer.connect(data.peerId);
        console.log(connection);
        dispatch(setConnection(connection));

        if (!connection) return console.log("No Connection");
        if (localStream) {
          console.log("local stream for caller exists");
          console.log(data.peerId);
          const newCall = peer.call(data.peerId, localStream);
          console.log(newCall);
          dispatch(setCall(newCall));
        }
      }

      navigate(`/home/main/chat/conversation/${data.conversation.id}`);
    });

    return () => {
      socket.off("onVideoCallAccept");
    };
  }, [localStream, peer]);
}
