import React from "react";
import ChatPanel from "./ChatPanel";
import ChatSidebar from "./ChatSidebar";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { useEffect } from "react";
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation,
} from "../../Store/features/conversationSlice";
import { addMessage } from "../../Store/features/messageSlice";
import { deleteMessage } from "../../utils/api";
import { useMediaQuery } from "react-responsive";
import {
  setOfflineConnections,
  setOnlineConnections,
} from "../../Store/features/connectionSlice";
import CallReceiveDialog from "../../newComponent/Call/CallReceiveDialog";
import ConversationAudioCall from "./ConversationAudioCall";
import ConversationVideoCall from "./ConversationVideoCall";

function ChatLayout() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    socket.emit("getConnectionOnline");

    const interval = setInterval(() => {
      socket.emit("getConnectionOnline");
    }, 10000);

    return () => {
      clearInterval(interval);
      socket.off("getConnectionOnline");
    };
  }, []);

  useEffect(() => {
    socket.on("getConnectionOnline", (connections) => {
      console.log("connections online");
      dispatch(setOnlineConnections(connections));
      dispatch(setOfflineConnections());
    });
  }, []);

  useEffect(() => {
    // socket.on("onMessage", (payload) => {
    //   console.log("message received");
    //   const { conversation, message } = payload;
    //   dispatch(addMessage(payload));
    //   dispatch(updateConversation(conversation));
    // });

    socket.on("onConversation", (payload) => {
      console.log("onConversationEvent");
      dispatch(addConversation(payload));
    });

    socket.on("onMessageDelete", (payload) => {
      console.log("onMessageDelete");
      console.log(payload);
      dispatch(deleteMessage(payload));
    });

    return () => {
      socket.off("connected");
      socket.off("onMessage");
      socket.off("onConversation");
      socket.off("onMessageDelete");
    };
  }, [id]);

  return (
    <div className="p-10 bg-light rounded-2xl ">
      {/* <div className="chatsection "> */}
        <div >
        {/* <div className="messagesection"> */}
          {/* <ChatSidebar /> */}
          {/* <ConversationVideoCall /> 
         <ConversationAudioCall /> 
           <CallReceiveDialog /> */}
          {!isMobile && <Outlet />}
        </div>
    </div>
  );
}

export default ChatLayout;