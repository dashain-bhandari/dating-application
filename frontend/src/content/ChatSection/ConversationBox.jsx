import React from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../utils/context/SocketContext";
import ChatPerson from "../../components/ChatPerson";
import AsyncSelect from "react-select/async";

function ConversationBox(props) {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //     dispatch(fetchConversationsThunk());
  // }, [dispatch])

  // const { conversations } = useSelector((state) => state.conversation);
  // console.log(conversations)
  const conversations = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const prevMessageDate = null;

  return props.conversations && props.conversations.length > 0 ? (
    <div className="w-full h-full overflow-y-auto  overflow-hidden chat-sidebar">
      {props.conversations &&
        props.conversations?.map((conversation, index) => {
          return (
            <>
              <ChatPerson key={index} conversation={conversation} />
            </>
          );
        })}
    </div>
  ) : (
    <div className="flex justify-center">No Conversations</div>
  );
}

export default ConversationBox;