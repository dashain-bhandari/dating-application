import { useContext } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../utils/context/AuthContext";
import { useEffect } from "react";
import {
  setCallDetails,
  setCallType,
  setCaller,
  setIsReceivingCall,
  setReceiver,
} from "../Store/features/callSlice";
import { addCallMessage, addMessage } from "../Store/features/messageSlice";
import { updateConversation } from "../Store/features/conversationSlice";

export function useVideoCall() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const { isReceivingCall } = useSelector((state) => state.call);

  useEffect(() => {
    socket.on("onVideoCall", (data) => {
      console.log("receiving video call...");
      console.log(data.callDetails);
      console.log(isReceivingCall);
      if (isReceivingCall) return;

      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user));
      dispatch(setIsReceivingCall(true));
      dispatch(setCallType("video"));
      dispatch(addCallMessage(data.callDetails));
      dispatch(setCallDetails(data.callDetails));
      dispatch(
        updateConversation({
          ...data.callDetails.conversation,
          lastMessageSent: {
            ...data.callDetails.conversation.lastMessageSent,
            call: data.callDetails.call,
          },
        })
      );
    });

    return () => {
      socket.off("onVideoCall");
    };
  }, [isReceivingCall]);
}
