import React, { useRef } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../utils/context/SocketContext";
import { useState } from "react";
import { useEffect } from "react";
import {
  fetchMessageAfterSeeMore,
  fetchMessagesThunk,
} from "../../Store/thunk/messagesThunk";
import { createMessage, editMessage } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  createConversationThunk,
  fetchConversationsThunk,
  selectConversationById,
} from "../../Store/features/conversationSlice";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoIosCall, IoIosSend, IoIosVideocam, IoMdSend } from "react-icons/io";
import { addMessage, selectConversationMessage } from "../../Store/features/messageSlice";
import Message from "./Message";
import { initiateCallState, resetState } from "../../Store/features/callSlice";
import ConversationVideoCall from "./ConversationVideoCall";
import ConversationAudioCall from "./ConversationAudioCall";
import profileAvatar from "../../images/olp_avatar.avif";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useMediaQuery } from "react-responsive";
import noData from "../../images/noDataImage.png";
import {
  resetSelectedConversation,
  updateSelectedConversation,
} from "../../Store/features/selectedConversationSlice";
import { addToast } from "../../Store/features/toastSlice";
import { Group, Text, TextInput, Tooltip } from "@mantine/core";
import { AiOutlineSend } from "react-icons/ai";
import { formatRelative } from "date-fns";
import { GlobalContext } from "../../utils/context/GlobalContext";
import { EllipsisVertical, Loader } from "lucide-react";
import "./chatpanel.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { modals } from "@mantine/modals";
import axios from "axios";
import { axiosInstance } from "../../http";
import { ClipLoader } from "react-spinners";
import { chatContext } from "../../utils/context/ChatContext";
import { fetchVisitUserThunk } from "../../Store/thunk/visitUserThunk";
import NoDataFound from "../../newComponent/NoDataFound/NoDataFound";

// import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

function ChatPanel() {
  // const { id } = useParams();
  //const id = "53477747-7671-46a3-890b-49315865a51a";
  const navigate = useNavigate();

  console.log("hiii")
  const id = location.pathname.split('/')[5]
  console.log(id)
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [color, setColor] = useState("var(--primary)");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const [time, setTime] = useState(null);
  const { user, paymentStatus } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const ref = useRef(null);
  const emojiRef = useRef(null);
  const emojiContainRef = useRef(null);
  const fileRef = useRef(null);
  const [timer, setTimer] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [message, setMessage] = useState("");
  const [recepient, setRecepient] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const { isCalling, isCallInProgress, activeConversationId, callType } =
    useSelector((state) => state.call);
  const showCallPanel = isCallInProgress || isCalling;

  const { selectedConversation, type } = useSelector(
    (state) => state.selectedConversation
  );

  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState()
  useEffect(() => {
    const getConvFromId = async () => {
      if (id) {
        setLoading(true)
        try {
          const { data } = await axiosInstance.get(`/conversations/${id}`);
          console.log(data)
          setConversation(data)
          setLoading(false)
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      }
    }
    getConvFromId()
  }, [id])
  console.log(selectedConversation);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(30);
  const [initial, setInitial] = useState(true);
  const isRouteActive = activeConversationId == id;
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });

  console.log(showCallPanel, isRouteActive);

  // const conversation = useSelector((state) =>
  //   selectConversationById(state, id)
  // );


  console.log("hii");


  const { currentVisitedUser } = useSelector((state) => state.visitProfile);

  const handleButtonClick = () => {
    setShowContent(!showContent);
  };

  const handleSelectEmoji = (emoji) => {
    console.log(emoji);
    setContent(content + emoji.native);
  };

  const handleClickOutSide = (e) => {
    if (
      emojiRef.current &&
      !emojiRef.current.contains(e.target) &&
      emojiContainRef.current &&
      !emojiContainRef.current.contains(e.target)
    ) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);

    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleShowEmoji = () => {
    setShowEmoji((prev) => !prev);
  };

  useEffect(() => {
    if (showEmoji) {
      window.addEventListener("click", (e) => {
        // if(e.target.name !== 'emoji-picker') {
        setShowEmoji(false);
      });
    }
  }, []);
  console.log("conversation", conversation);


  useEffect(() => {
    // console.log(conversation && conversation.creator)
    setRecepient(
      conversation && user?.id == conversation?.creator?.id
        ? conversation && conversation?.recepient
        : conversation && conversation?.creator
    );
  }, [conversation]);


  useEffect(() => {
    // console.log(conversation && conversation.creator)
    if (recepient) {

      dispatch(fetchVisitUserThunk(recepient.id))
    }
  }, [recepient]);


  const { refresh, setRefresh } = useContext(GlobalContext)

  useEffect(() => {
    if (!(type == "createConversation") && id && initial) {
      setRefresh(0)
      dispatch(fetchMessagesThunk({ id, page, limit }));
    }
  }, [id, refresh]);

  useEffect(() => {
    if (!(type == "createConversation") && id && !initial) {
      dispatch(fetchMessageAfterSeeMore({ id, page, limit }));
    }
  }, [page]);

  const handleLoadMore = () => {
    if (!(type == "createConversation") && id) {
      setInitial(false);
      setPage((prev) => prev + 1);
      // dispatch(fetchMessagesThunk({id, page + 1, limit}))
    }
  };

  const conversationMessages = useSelector((state) =>
    selectConversationMessage(state, id)
  );
  console.log(conversationMessages);

  const [filteredMessages, setFilteredMessages] = useState();

  useEffect(() => {
    if (conversationMessages) {
      console.log(conversationMessages)
      if (conversationMessages.messages.length > 0) {
        const newArray = conversationMessages.messages.filter((msg) => {
          console.log(msg);
          if (msg.deletedBy && !msg.deletedBy.includes(user.id)) {
            console.log("hii");
            return msg;
          }
          if (!msg.deletedBy) {
            console.log("hii")
            return msg;
          }
        });
        setFilteredMessages(newArray);

      }
      else {
        setFilteredMessages([])
      }
    }
  }, [conversationMessages])

  useEffect(() => {
    console.log(filteredMessages)
  }, [filteredMessages])

  // useEffect(() => {
  //   const updateStatus = async () => {
  //     if (conversation) {
  //       console.log(conversation.id)
  //       try {
  //         const data = await axiosInstance.post(`/conversations/read/${conversation.id}`);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }
  //   updateStatus()
  // }, [conversation])

  //dash added for maintaining new msg socket

  useEffect(() => {
    socket.on("onMessage", (data) => {
      console.log("new msg recieved");
      console.log(data)


      if (conversation.creator.id == data?.message?.author?.id || conversation.recepient.id == data?.message?.author?.id) {
        console.log(data);

        dispatch(addMessage(data));
        // dispatch(updateConversation(conversation));
      }

    });

    return () => {

      socket.off("onMessage");

    };
  })


  const sendTypingStatus = () => {
    console.log("sending typing status");
    socket.emit("message");
    if (isTyping && !(type == "createConversation")) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          console.log("user stopped typing");
          socket.emit("onTypingStop", {
            conversationId: id,
            recepientId: recepient.id,
          });
          setIsTyping(false);
        }, 2000)
      );
    } else if (!(type == "createConversation")) {
      setIsTyping(true);
      console.log("sending typing start");
      socket.emit("onTypingStart", {
        conversationId: id,
        recepientId: recepient.id,
      });
    }
  };

  useEffect(() => {
    socket.emit("onConversationJoin", { conversationId: id });
    socket.on("userJoin", () => {
      console.log("user joined");
    });

    socket.on("onuserLeave", () => {
      console.log("user leave");
    });

    socket.on("onTypingStart", () => {
      console.log("onTypingStart");
      setIsRecipientTyping(true);
    });

    socket.on("onTypingStop", () => {
      console.log("onTyping Stop");
      setIsRecipientTyping(false);
    });

    socket.on("onMessageUpdate", (message) => {
      console.log("onMessageUpdate");
      dispatch(editMessage(message));
    });

    socket.on("onUserUnavailable", () => {
      console.log("onUserUnavailable");
      dispatch(resetState());
    });

    return () => {
      socket.off("onMessageUpdate");
      socket.off("onTypingStart");
      socket.off("onTypingStop");
      socket.off("onuserJoin");
      socket.off("onuserLeave");
      socket.off("onConversationJoin");
      socket.emit("onConversationLeave");
    };
  }, [id]);


  const createConversation = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent && !attachments.length) return;
    const formData = new FormData();
    formData.append("userId", selectedConversation && selectedConversation.id);
    trimmedContent && formData.append("message", trimmedContent);

    attachments.forEach((attachment) => {
      formData.append("attachments", attachment.file);
    });

    attachments.forEach((attachment) => {
      formData.append("attachments", attachment.file);
    });

    try {
      dispatch(resetSelectedConversation());
      dispatch(createConversationThunk(formData));

      setContent("");
      setAttachments([]);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("createConversation", createConversation);

  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    setSending(true);
    console.log(content);
    const trimmedContent = content.trim();
    if (!id) return;
    if (!trimmedContent && !attachments.length) return;
    const formData = new FormData();
    trimmedContent && formData.append("message", trimmedContent);
    attachments.forEach((attachment) => {
      formData.append("attachments", attachment);
    });

    try {
      console.log(formData);
      console.log(id)
      const response = await createMessage(id, formData);
      response && setSending(false);
      setContent("");
      setAttachments([]);
      setRefresh(1)
    } catch (err) {
      setSending(false)
      err?.response?.data?.message ? dispatch(addToast({ kind: "ERROR", msg: err.response.data.message })) : dispatch(addToast({ kind: "ERROR", msg: "Something went wrong." }))
      console.log(err);
    }
  };

  const onMessageChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);

    const { current } = ref;
    if (current) {
      const height = parseInt(current.style.height);
      current.style.height = current.scrollHeight + "px";
      height > 21 ? setIsMultiLine(true) : setIsMultiLine(false);
    }
  };

  const onKeyDown = (e) => {
    sendTypingStatus();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      // if(ref.current) ref.current.style.height = '21px'
    }
  };

  const handleFileAdd = (files) => {
    const maxFilesDropped = 5 - attachments.length;
    if (maxFilesDropped === 0) return error("Max file reached");
    const filesArray = Array.from(files);
    for (let i = 0; i < filesArray.length; i++) {
      if (i === maxFilesDropped) break;
      setAttachments([...attachments, filesArray[i]]);
    }
  };

  const onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    handleFileAdd(files);
  };

  const onPaste = (e) => {
    const { files } = e.clipboardData;
    console.log("pasting...");
    handleFileAdd(files);
  };

  const fileInputChange = (e) => {
    const { files } = e.target;
    if (!files) return;
    handleFileAdd(files);
  };

  const handleSelectFileClick = (e) => {
    fileRef.current.click();
  };

  const voiceCallUser = async () => {
    if (!recepient || recepient?.suspended) return dispatch(addToast({kind:"ERROR",msg:"User does not exist."}))
    console.log(recepient);
    if ((!recepient.subscription || recepient.subscription?.status != "active")) {
      console.log("truee");
      dispatch(addToast({ kind: "ERROR", msg: "The feature is not available for the user." }));
    }
    else {
      console.log(conversation)
      socket.emit("onVoiceCallInitiate", {
        conversationId: conversation.id,
        recepientId: recepient.id,
      });

      const constraints = { video: false, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream);
      const payload = conversation && {
        localStream: stream,
        caller: user,
        receiver: recepient,
        callType: "audio",
        activeConversationId: conversation.id,
        isCalling: true,
      };

      if (!payload) return "voice call payload is not defined";
      dispatch(initiateCallState(payload));
    }
  };


  //video call limited for borth user and recipient in case of no payment
  const videoCallUser = async () => {
    console.log(recepient);
    if (!recepient || recepient?.suspended) return dispatch(addToast({kind:"ERROR",msg:"User does not exist."}))

    if ((!recepient.subscription || recepient.subscription?.status != "active")) {
      console.log("truee");
      dispatch(addToast({ kind: "ERROR", msg: "The feature is not available for the user." }));
    } else {
      socket.emit("onVideoCallInitiate", {
        conversationId: conversation.id,
        recepientId: recepient.id,
      });

      const constraints = { video: true, audio: true };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          // console.log(stream);
          const payload = conversation && {
            localStream: stream,
            caller: user,
            receiver: recepient,
            callType: "video",
            activeConversationId: conversation.id,
            isCalling: true,
          };
          if (!payload) return "video call payload is not defined";
          dispatch(initiateCallState(payload));
        })
        .catch((error) => {
          console.log(error);
        });
    }

  };

  const [isOnline, setIsOnline] = useState(false);
  const { onlineConnections } = useSelector((state) => state.connection);

  useEffect(() => {

    console.log(recepient)
    console.log(onlineConnections)
    if (onlineConnections && recepient) {
      const isAvailable = onlineConnections.find(
        (conn) =>
          conn.sender.id == recepient.id || conn.receiver.id == recepient.id
      );
      console.log(isAvailable);

    }
  }, [onlineConnections, recepient]);


  //   useEffect(()=>{
  // socket.on('activeUsers',(users)=>{
  //   console.log(users)
  // if(users.find((recipient)=>user.id==recipient.id))
  // {
  //   setIsOnline(true)
  // }
  // })
  //   },[])

  const { activeUsers } = useContext(GlobalContext);

  useEffect(() => {
    console.log(activeUsers)
  }, [activeUsers])

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
    console.log("active", activeUsers)
    console.log("recepient", recepient)
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


  const prevMessageDate = useRef(null);
  console.log("user", user);



  const openDeleteModal = (id) => {
    modals.openConfirmModal({
      title: "Delete conversation",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete conversation? This action will unsend
          message and will be no longer available.
        </Text>
      ),
      labels: { confirm: "Delete conversation", cancel: "No don't delete it" },
      confirmProps: { color: "red", variant: "outline" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {

        handleDelete(id)
      }
    });
  };
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (item) => {
    if (user) {
      console.log(user.id);
      setDeleting(true);
      try {
        const response = await axiosInstance.post(`/conversations/delete/${item}`);
        setRefresh(1);
        dispatch(fetchConversationsThunk());
        dispatch(addToast({ kind: 'SUCCESS', msg: 'Conversation deleted' }));
        response && setDeleting(false);
        navigate(-1);
      } catch (error) {
        console.log(error);
        setDeleting(false)
      }



    }
  }

  console.log(recepient);

  const check = 1;
  console.log("id", id);

  const { connected, setConnected } = useContext(chatContext)

  console.log(currentVisitedUser);

  const goToProfile = (id) => {
    console.log("hiiii");

    if (id  && !currentVisitedUser?.suspended) {
      if (!user?.subscription || user?.subscription?.status == "expired") {
        console.log("hiii")
        console.log(currentVisitedUser)
        if ((!user.profiles || user.profiles?.length < 2 || user.profiles?.includes(id) )) {
          navigate(
            `/home/main/profile/other/${id}/about`
          )
        }
        else {
          console.log("hii")
          dispatch(addToast({ kind: "ERROR", msg: "View limit exceeded on free version." }))
        }
      }
      else {
        navigate(
          `/home/main/profile/other/${id}/about`
        )
      }
    }
    else {
      
      console.log("yolo")
      dispatch(addToast({ kind: 'ERROR', msg: 'User does not exists.' }));

    }
  }

  return (
    <>
      {
        loading ? (<>  <div className="w-full h-screen flex justify-center items-center">
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={{}}
            size={75}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div></>) : (<>


          {
            //id && id != "" && id != undefined && id != null && currentVisitedUser ? (
            id && conversation && (
              <div className="my-3 w-full ml-auto h-full rounded-2xl overflow-hidden relative bg-white  ">
                <div className="relative w-full h-[90vh]   flex flex-col justify-between items-center ">
                  <div className="w-full border-b-[1px]  border-[rgba(0,0,0,0.2)] flex justify-between lg:pr-4 m-0 py-2 items-center bg-white">
                    <div className=" flex items-center justify-start basis-1/4 pl-4 cursor-pointer" onClick={() => goToProfile(recepient?.id)}>
                      <div className="relative   w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] xl:w-[55px] xl:h-[55px] 2xl:w-[65px] 2xl:h-[65px]  rounded-[50%] ">
                        <img
                          className="w-full h-full object-cover object-center rounded-[50%]"
                          src={
                            type == "createConversation"
                              ? conversation &&
                              `${import.meta.env.VITE_BASE_URL}/user-avatar/${conversation.avatarId
                              }`
                              : recepient && recepient.avatarId ?
                                `${import.meta.env.VITE_BASE_URL}/user-avatar/${recepient.avatarId
                                }`
                                : profileAvatar
                          }
                          alt="chat-profile"
                        />
                      </div>
                      <div className="" >
                        <h5 className="font-semibold text-md lg:text-lg px-2 pt-1 pb-0 capitalize">
                          {type === "createConversation"
                            ? conversation &&
                            conversation.profile &&
                            conversation.profile?.fullname
                            : recepient &&
                              recepient?.profile &&
                              recepient?.profile?.fullname ? recepient.profile.fullname : "User"}
                        </h5>
                        <div className="flex items-center ml-2">
                          <div
                            className={`w-[7px] h-[7px] lg:w-[10px] lg:h-[10px] rounded-[50%] ${isOnline ? "bg-green-500" : "bg-[rgba(0,0,0,0.4)]"
                              }`}
                          ></div>
                          {/* <p>{conversation && conversation}</p> */}
                          <div className="ml-1 text-sm lg:text-md font-semibold text-[rgba(0,0,0,0.5)]">
                            {isOnline ? "Active" : "Offline"}
                          </div>
                        </div>
                      </div>



                    </div>
                    {
                      (<>
                        {!showCallPanel ? (
                          <div className="chat-name-icons">
                            {user && paymentStatus && paymentStatus == "active" && (<> <Tooltip label="Voice Call" radius={"md"} withArrow>
                              <span className="lg:pl-2 pr-1 py-1 hover:bg-screen rounded-lg">
                                <IoIosCall
                                  size={isTablet ? 17 : 26}
                                  className="chat-voice-icon cursor-pointer"
                                  onClick={id ? () => voiceCallUser() : null}
                                />
                              </span>
                            </Tooltip>

                              <Tooltip label="Video Call" radius={"md"} withArrow>
                                <span className="lg:pl-2 pr-1 py-1 hover:bg-screen rounded-lg">
                                  <IoIosVideocam
                                    size={isTablet ? 17 : 26}
                                    className="chat-video-icon cursor-pointer"
                                    onClick={id ? () => videoCallUser() : null}
                                  />
                                </span>
                              </Tooltip></>)}
                            <button className="" onClick={() => openDeleteModal(conversation.id)}> <EllipsisVertical /></button>
                          </div>
                        ) : (
                          <>
                            {isRouteActive && callType === "video" ? (
                              <ConversationVideoCall />
                            ) : (
                              <ConversationAudioCall />
                            )}
                          </>
                        )}
                      </>)
                    }
                  </div>
                  <div className="w-full h-[90vh] bg-white">
                    <div className="chat-box bg-white max-w-[100vw] pl-3 pr-4  overflow-x-hidden w-full  h-[75%] flex flex-col-reverse overflow-y-auto ">
                      <span
                        className={`${isRecipientTyping && "px-3 py-2"
                          } w-[50%] md:w-[40%] lg:w-[30%]  rounded-md text-md font-semibold`}
                      >
                        {isRecipientTyping
                          ? `${recepient.username} is typing...`
                          : ""}
                      </span>
                      {/* {conversationMessages && conversationMessages.length === 0 && (
                  <span>No Conversation</span>
                )} */}
                      {/* {filteredMessages && filteredMessages.length === 0 && (
                      <span>No Conversation</span>
                    )} */}
                      {/* {console.log(conversationMessages && conversationMessages.messages[0])} */}
                      {filteredMessages &&
                        filteredMessages.map((message, index, array) => {
                          console.log(message)

                          const nextElem =
                            index !== array.length - 1 ? array[index + 1] : null;
                          let date = null;
                          let showDay = null;
                          console.log(
                            // nextElem && new Date(nextElem.createdAt).getTime()
                            nextElem && new Date(nextElem.createdAt).getTime()
                          );
                          console.log(message.createdAt);
                          console.log(new Date(new Date(message.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString());

                          if (
                            nextElem &&
                            new Date(message.createdAt).getTime() -
                            new Date(nextElem.createdAt).getTime() >
                            1000 * 60 * 60
                          ) {
                            // console.log(prevElem)
                            date = formatRelative(
                              new Date(message.createdAt),
                              new Date()
                            );
                            console.log(date)
                            console.log("greater than one hour");
                          } else if (nextElem) {

                            date = 1;
                          }

                          if (
                            nextElem &&
                            new Date(message.createdAt).getDay() !=
                            new Date(nextElem.createdAt).getDay()
                          ) {
                            // console.log(prevElem)
                            //  showDay=true
                            console.log(new Date(message.createdAt).getDay());
                            console.log(new Date(nextElem.createdAt).getDay());
                            showDay = true
                          } else {

                            showDay = false
                          }

                          return (
                            <>
                              <Message
                                key={index}
                                videoCallUser={videoCallUser}
                                voiceCallUser={voiceCallUser}
                                message={message}
                                isUserCreator={
                                  message.author.id == user.id ? true : false
                                }
                              />
                              {!date && (
                                <span className="w-full text-center py-2 text-xs lg:text-[0.75rem] font-semibold uppercase">
                                  {/* {formatRelative(
                              new Date(message.createdAt),
                              new Date()
                            )} */}
                                  {!showDay && new Date(new Date(message.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000)).toISOString().slice(11, 16)}
                                  {showDay && new Date(new Date(message.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000)).toISOString().slice(0, 16)}

                                </span>
                              )}
                              {date && date !== 1 && (
                                <span className="w-full text-center text-xs  lg:text-[0.75rem] py-2 font-semibold uppercase">
                                  {/* {message.createdAt.split('T')[1].slice(0, 5)} */}
                                  {/* {new Date(new Date(message.createdAt.slice(0,-5) + "Z").getTime()+500).toISOString().slice(11,16)} */}

                                  {!showDay && new Date(new Date(message.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000)).toISOString().slice(11, 16)}
                                  {showDay && `${new Date(new Date(message.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000)).toISOString().slice(0, 10)}, ${new Date(new Date(message.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000)).toISOString().slice(11, 16)}`}

                                </span>
                              )}
                            </>
                          );
                        })}
                      {conversationMessages &&
                        conversationMessages.messages?.length > 0 &&
                        conversationMessages.messages?.length % 30 === 0 && (
                          <div className="w-full flex justify-center items-center rounded-3xl">
                            <button
                              onClick={() => handleLoadMore()}
                              className="px-4 py-2 rounded-3xl border-2 border-[var(--secondary)] hover:text-[var(--primary)]"
                            >
                              See More
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                  {showContent && (
                    <div className="emojieselection">
                      <button onClick={() => handleSelectEmoji("😀")}>😀</button>
                      <button onClick={() => handleSelectEmoji("😍")}>😍</button>
                      <button onClick={() => handleSelectEmoji("👍")}>👍</button>
                      <button onClick={() => handleSelectEmoji("❤️")}>❤️</button>
                    </div>
                  )}


                  {connected && (<>
                    <div className="absolute bottom-0 flex py-2 pl-3 pr-5 justify-between gap-2 items-center bg-white w-full ">
                      <Tooltip label="Image" radius={"md"} withArrow>
                        <span
                          className="cursor-pointer relative"
                          onClick={() => handleSelectFileClick()}
                        >
                          <CiImageOn size={25} className="photoIcon" />

                          {attachments.length > 0 && (
                            <span className="bg-[var(--primary)] text-[11px] font-semibold z-50 text-white px-[8px] py-[2px] rounded-full absolute top-[-15px] right-[-5px]">
                              {attachments && attachments.length}
                            </span>
                          )}
                        </span>
                      </Tooltip>
                      <input
                        multiple
                        type="file"
                        accept="image/*"
                        onChange={fileInputChange}
                        className="hidden"
                        ref={fileRef}
                      />
                      <Tooltip label="Emoji" radius={"md"} withArrow>
                        <div className="relative" ref={emojiContainRef}>
                          <BsEmojiSmile
                            size={22}
                            className="emojiIcon"
                            onClick={() => handleShowEmoji()}
                          />
                          {showEmoji && (
                            <div
                              ref={emojiRef}
                              name="emoji-picker"
                              className="absolute bottom-[200%] left-[-250%] md:left-0"
                            >
                              <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                            </div>
                          )}
                        </div>
                      </Tooltip>

                      <input
                        ref={ref}
                        value={content}
                        onChange={(e) => onMessageChange(e)}
                        placeholder="Send a message"
                        onKeyDown={onKeyDown}
                        onDrop={onDrop}
                        onPaste={onPaste}
                        className="w-full bg-screen px-3 py-[12px] text-md rounded-3xl border-none outline-none align-middle"
                      ></input>
                      {
                        sending ? (<>

                          <Loader
                            size={20}
                            className=" animate-spin"
                            color={color}
                          />
                        </>) : (<>
                          <Tooltip label={"Send Message"} withArrow radius={"md"}>
                            <span
                              onClick={
                                type == "createConversation"
                                  ? () => createConversation()
                                  : () => sendMessage()
                              }
                            >
                              <IoMdSend color="var(--secondary)" size={25} />
                            </span>
                          </Tooltip>
                        </>)
                      }
                    </div>
                  </>)}
                  {!connected && (<>
                    <div className="absolute bottom-4 flex py-2 pl-3 pr-5 justify-center gap-2 items-center  text-center w-full ">
                      You are no longer connected and therefore, cannot reply to the conversation.
                    </div>
                  </>)}

                </div>
              </div>
            )}
          {/* {
            deleting && (<>  <div className="w-full h-screen flex justify-center items-center">
              <ClipLoader
                color={color}
                loading={deleting}
                cssOverride={{}}
                size={75}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              deleting
            </div></>)
          } */}

        </>)
      }
      {/* {id || type == "createConversation" ? ( */}

    </>
  );
}

export default ChatPanel;
