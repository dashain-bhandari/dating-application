import { useContext } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetState } from "../Store/features/callSlice";
import {
  addCallMessage,
  updateCallMessage,
} from "../Store/features/messageSlice";
import { AuthContext } from "../utils/context/AuthContext";
import { updateConversation } from "../Store/features/conversationSlice";

export function useVoiceCallRejected() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    socket.on("onVoiceCallRejected", (data) => {
      dispatch(resetState());
      if (data.caller.id == user.id) {
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
    });

    return () => {
      socket.off("onVoiceCallRejected");
    };
  }, []);
}
