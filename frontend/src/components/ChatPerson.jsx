import React from "react";
import "../styles/ChatPerson.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import profileAvatar from "../images/olp_avatar.avif";
import { useEffect } from "react";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { resetSelectedConversation, updateSelectedConversation } from "../Store/features/selectedConversationSlice";
import ErrorBoundary from "./ErrorBoundary";



import {
  MdCallMade,
  MdCallMissedOutgoing,
  MdCallReceived,
  MdOutlineCallMissed,
} from "react-icons/md";
import { format } from "date-fns";
import { CiImageOn } from "react-icons/ci";
import { formatDistanceToNow } from "date-fns";
import { GlobalContext } from "../utils/context/GlobalContext";
import { EllipsisVertical, ReceiptIcon } from "lucide-react";
import axios from "axios";

const ChatPerson = ({ conversation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [recepient, setRecepient] = useState("");
  const [isOnline, setIsOnline] = useState("");
  const { id } = useParams();

  const { selectedConversation, type } = useSelector(
    (state) => state.selectedConversation
  );
  console.log("conversation", conversation);
  console.log("selected conv", selectedConversation)
  useEffect(() => {

    if (!conversation.type) {
      setRecepient(
        user.id == (conversation && conversation.creator.id)
          ? conversation && conversation.recepient
          : conversation && conversation.creator
      );
    } else {

      setRecepient(conversation);
    }
  }, [conversation]);

  useEffect(() => {
    console.log("recepient", recepient);
  }, [recepient]);



  const updateStatus = async () => {
    if (conversation) {
      console.log(conversation.id)
      try {
        const data = await axiosInstance.post(`/conversations/read/${conversation.id}`);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }


  const handleChatPersonClick = async () => {
    //i add reset instead of update
    console.log("hiii")
    try {
      conversation = await axiosInstance.post(`/conversations/read/${conversation.id}`);
      console.log(conversation)
    } catch (error) {
      console.log(error.message);
    }
    dispatch(updateSelectedConversation({ conversation: conversation, type: "" }));

    console.log(conversation)
    console.log(selectedConversation)
    //update read status here
    navigate(
      `/home/main/chat/conversation/${!conversation.type && conversation.id}`
    );

  };
  console.log("hii");
  console.log(conversation);
  console.log(recepient);
  const { activeUsers } = useContext(GlobalContext);
  const { onlineConnections } = useSelector((state) => state.connection);

  // useEffect(() => {
  //   if (onlineConnections && recepient) {
  //     const isAvailable = onlineConnections.find(
  //       (conn) =>
  //         conn.sender.id == recepient.id || conn.receiver.id == recepient.id
  //     );
  //     if (isAvailable) {
  //       console.log(isAvailable);
  //       setIsOnline(true);
  //     }
  //   }
  // }, [onlineConnections, recepient]);

  useEffect(() => {
    if (activeUsers && recepient) {
      console.log("activeusers", activeUsers);
      console.log("recepient", recepient)
      const isAvailable = activeUsers.find(
        (conn) =>
          conn == recepient.id
      );
      if (isAvailable) {
        console.log(isAvailable);
        setIsOnline(true);
      }
      else {
        setIsOnline(false);
      }
    }
  }, [activeUsers, recepient]);

  const { setRefresh } = useContext(GlobalContext);



  return (
    <>
      <ErrorBoundary>
        <div
          className={`chat-person main items-center w-full py-2 xl:py-3 2xl:py-4 md:hover:bg-[#EAF3FF] ${id && id == conversation.id
            ? "bg-[#EAF3FF]"
            : selectedConversation &&
            selectedConversation.id == conversation.id &&
            "bg-[#EAF3FF]"
            } md:rounded-md overflow-hidden`}
          onClick={() => handleChatPersonClick()}
        >
          <div className="flex w-full">
            <div className="m-auto">
              <div className="w-[30px] hidd relative h-[30px] lg:w-[40px] lg:h-[40px] rounded-[50%] mr-2 ">
                <img
                  className="rounded-[50%] object-cover object-center w-full h-full"
                  src={`${recepient && recepient.avatarId ? (
                    `${import.meta.env.VITE_BASE_URL}/user-avatar/${recepient && recepient.avatarId
                    }`
                  ) : (
                    // <CgProfile size={30} />
                    profileAvatar
                  )
                    }`}
                  alt="chat-friend-img"
                />

                {isOnline && (
                  <div
                    className={`absolute px-[2px] py-[2px] bg-white rounded-[50%] bottom-0 right-0`}
                  >
                    <span className="block w-[5px] h-[5px] lg:!w-[10px] lg:!h-[10px] rounded-[50%] bg-green-500"></span>
                  </div>
                )}
                {/* <p>{conversation && conversation.}</p> */}
                {/* <div className='ml-1 text-sm lg:text-lg'>{isOnline? 'Active' : 'Offline'}</div> */}
              </div>
            </div>
            <div className="chat-person-name w-full">
              <h5 className="font-semibold text-md capitalize">
                {recepient && recepient.profile && recepient.profile.fullname}
              </h5>
              {/* <h6>{conversation && conversation.lastMessageSent}</h6> */}
              <div className="w-full">
                {conversation && (
                  <>
                    {conversation.type === "createConversation" && (
                      <h3 className="text-md">Create new Conversation</h3>
                    )}
                    {conversation.lastMessageSent &&
                      conversation.lastMessageSent.content && (
                        <h3 className={`text-sm line-clamp-1 ${user.id == conversation.lastMessageSent.author.id ? "" : (conversation.lastMessageSent.read ? "" : "font-bold")}`}>
                          {conversation.lastMessageSent.content}
                        </h3>
                      )}

                    {conversation.lastMessageSent &&
                      !conversation.lastMessageSent.content &&
                      !conversation.lastMessageSent.call && (
                        <h3 className="flex items-center">
                          <CiImageOn size={25} />
                          <span className="ml-2">File message</span>
                        </h3>
                      )}

                    {conversation.lastMessageSent &&
                      conversation.lastMessageSent.call && (
                        <div className="w-full">
                          <span className="flex w-full items-center">
                            {conversation.lastMessageSent.call.status ==
                              "missed" ||
                              conversation.lastMessageSent.call.status ==
                              "initiate" ||
                              conversation.lastMessageSent.call.status ==
                              "rejected" ? (
                              <>
                                {user.id ===
                                  conversation.lastMessageSent.author.id ? (
                                  <>
                                    <MdCallMissedOutgoing
                                      size={25}
                                      color="var(--primary)"
                                    />
                                    <span className="ml-1 text-sm">
                                      Call Not Received
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <MdOutlineCallMissed
                                      size={25}
                                      color="var(--primary)"
                                    />
                                    <span className="ml-1 text-sm">
                                      Missed a Call
                                    </span>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {user.id ===
                                  conversation.lastMessageSent.author.id ? (
                                  <>
                                    <MdCallMade
                                      size={20}
                                      color="var(--secondary)"
                                    />
                                    <span className="ml-1 text-sm">
                                      Call finished.
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <MdCallReceived
                                      size={20}
                                      color="var(--secondary)"
                                    />
                                    <span className="ml-1 text-sm">
                                      Call received
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                          </span>
                        </div>
                      )}
                  </>
                )}
                {/* <h5 className="line-clamp-2">{`${(conversation && conversation.lastMessageSent && conversation.lastMessageSent.content) ? conversation.lastMessageSent.content : ''}`}</h5> */}
              </div>
            </div>
          </div>
          <div className="chat-person-date-notification">
            {/* <h6>{}</h6> */}
            {/* <div className="chat-badge">10</div> */}
            {console.log(new Date(conversation.lastMessageSentAt))}
            <h6 className="text-sm 2xl:text-sm">{`${conversation &&
              (!conversation.type
                ? conversation.lastMessageSentAt &&
                `${formatDistanceToNow(
                  new Date(conversation.lastMessageSentAt)
                )} ago`
                : formatDistanceToNow(new Date(conversation.lastMessageSentAt)))
              }`}</h6>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default ChatPerson;
