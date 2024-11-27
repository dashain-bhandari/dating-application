import { useContext, useEffect } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch } from "react-redux";
import { resetState } from "../Store/features/callSlice";
import { addCallMessage } from "../Store/features/messageSlice";
import { updateConversation } from "../Store/features/conversationSlice";

export function useUserUnavailable() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("onUserUnavailable", (data) => {
      console.log("user is unavailable");
      dispatch(addCallMessage(data));
      dispatch(
        updateConversation({
          ...data.callDetail.conversation,
          lastMessageSent: {
            ...data.callDetail.callDetail.conversation.lastMessageSent,
            call: data.callDetail.call,
          },
        })
      );
      dispatch(resetState());
    });

    return () => {
      socket.off("onUserUnavailable");
    };
  });
}
