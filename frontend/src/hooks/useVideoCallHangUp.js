import { useContext, useEffect } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../Store/features/callSlice";
import { updateCallMessage } from "../Store/features/messageSlice";
import { updateConversation } from "../Store/features/conversationSlice";

export function useVideoCallHangUp() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const { call, connection, localStream, remoteStream } = useSelector(
    (state) => state.call
  );

  useEffect(() => {
    socket.on("onVideoCallHangUp", (data) => {
      console.log("onVideoCallHangUp");

      localStream &&
        localStream.getTracks().forEach((track) => {
          console.log(localStream.id);
          track.stop();
        });

      remoteStream &&
        remoteStream.getTracks().forEach((track) => {
          console.log(remoteStream.id);
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
      socket.off("onVideoCallHangUp");
    };
  }, [call, remoteStream, localStream]);
}
