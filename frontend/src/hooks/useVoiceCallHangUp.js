import { useContext } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetState } from "../Store/features/callSlice";
import { updateCallMessage } from "../Store/features/messageSlice";
import { updateConversation } from "../Store/features/conversationSlice";

export function useVoiceCallHangUp() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { call, connection, localStream, remoteStream } = useSelector(
    (state) => state.call
  );

  useEffect(() => {
    socket.on("onVoiceCallHangUp", (data) => {
      console.log("onvoiceCall Hangup");

      localStream &&
        localStream.getTracks().forEach((track) => {
          track.stop();
        });

      remoteStream &&
        remoteStream.getTracks().forEach((track) => {
          track.stop();
        });

      call && call.close();
      connection && connection.close();
      dispatch(resetState());
      console.log(data);
      data && dispatch(updateCallMessage(data));
      data &&
        dispatch(
          updateConversation({
            ...data.conversation,
            lastMessageSent: {
              ...data.conversation.lastMessageSent,
              call: data.call,
            },
          })
        );
    });

    return () => {
      socket.off("onVoiceCallHangUp");
    };
  }, [call, remoteStream, localStream]);
}
