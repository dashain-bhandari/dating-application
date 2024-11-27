import React, { useRef } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  selectConversationById,
} from "../../Store/features/conversationSlice";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoIosCall, IoIosSend, IoIosVideocam, IoMdSend } from "react-icons/io";
import { selectConversationMessage } from "../../Store/features/messageSlice";
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
import { Group, TextInput, Tooltip } from "@mantine/core";
import { AiOutlineSend } from "react-icons/ai";
import { formatRelative } from "date-fns";

function ChatPanel() {
  // const { id } = useParams();
  const id = location.pathname.split('/')[5];
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const [time, setTime] = useState(null);
  const {user} = useContext(AuthContext);
  const conversation = useSelector((state) =>
    selectConversationById(state, id)
  );
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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(30);
  const [initial, setInitial] = useState(true);
  const isRouteActive = activeConversationId == id;
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });

  console.log(showCallPanel, isRouteActive);
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
  console.log(conversation);
  useEffect(() => {
    // console.log(conversation && conversation.creator)
    setRecepient(
      conversation && user.id == conversation.creator.id
        ? conversation && conversation.recepient
        : conversation && conversation.creator
    );
  }, [conversation]);

const [refresh,setRefresh]=useState(0)

  useEffect(() => {
    if (!(type == "createConversation") && id && initial) {
      setRefresh(0)
      dispatch(fetchMessagesThunk({ id, page, limit }));
    }
  }, [id,refresh]);

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

  const sendMessage = async () => {
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
      await createMessage(id, formData);
      setContent("");
      setAttachments([]);
      setRefresh(1)
    } catch (err) {
      dispatch(addToast({ kind: "ERROR", msg: "No longer connected" }));
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
    if (!recepient) return console.log("recepient is undefined");
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
  };

  const videoCallUser = async () => {
    console.log(recepient);
    if (!recepient) return console.log("recepient is not defined");
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
  };

  const [isOnline, setIsOnline] = useState(false);
  const { onlineConnections } = useSelector((state) => state.connection);

  useEffect(() => {
    console.log(recepient, "online connecitons");
    if (onlineConnections && recepient) {
      const isAvailable = onlineConnections.find(
        (conn) =>
          conn.sender.id == recepient.id || conn.receiver.id == recepient.id
      );
      if (isAvailable) {
        setIsOnline(true);
      }
    }
  }, [onlineConnections, recepient]);

  const prevMessageDate = useRef(null);

  console.log(recepient);
  const check = 1;
  console.log("id", id);
  return (
    <>
      {/* {id || type == "createConversation" ? ( */}
      {id ? (
        <div className="mt-6 w-full lg:w-[70%] ml-auto h-[85vh] 2xl:h-[90vh] md:h-full rounded-xl overflow-hidden relative md:rounded-tl-none md:rounded-bl-none bg-white  ">
          <div className="w-full h-[90vh] flex flex-col justify-between items-center ">
            <div className="w-full lg:h-[11%] 2xl:h-[12%] border-b-[1px] border-[rgba(0,0,0,0.2)] flex justify-between lg:pr-4 m-0 py-2 items-center bg-white">
              <div className=" flex items-center justify-start basis-1/4 pl-4">
                <div className="relative  w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] xl:w-[55px] xl:h-[55px] 2xl:w-[65px] 2xl:h-[65px]  rounded-[50%] ">
                  <img
                    className="w-full h-full object-cover object-center rounded-[50%]"
                    src={
                      type == "createConversation"
                        ? selectedConversation &&
                          `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                            selectedConversation.avatarId
                          }`
                        : recepient &&
                          `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                            recepient.avatarId
                          }`
                    }
                    alt="chat-profile"
                  />
                </div>
                <div className="">
                  <h5 className="font-semibold text-md lg:text-lg px-2 pt-1 pb-0 capitalize">
                    {type === "createConversation"
                      ? selectedConversation &&
                        selectedConversation.profile &&
                        selectedConversation.profile.fullname
                      : recepient &&
                        recepient.profile &&
                        recepient.profile.fullname}
                  </h5>
                  <div className="flex items-center ml-2">
                    <div
                      className={`w-[7px] h-[7px] lg:w-[10px] lg:h-[10px] rounded-[50%] ${
                        isOnline ? "bg-green-500" : "bg-[rgba(0,0,0,0.4)]"
                      }`}
                    ></div>
                    {/* <p>{conversation && conversation}</p> */}
                    <div className="ml-1 text-sm lg:text-md font-semibold text-[rgba(0,0,0,0.5)]">
                      {isOnline ? "Active" : "Offline"}
                    </div>
                  </div>
                </div>
              </div>
              {!showCallPanel ? (
                <div className="chat-name-icons">
                  <Tooltip label="Voice Call" radius={"md"} withArrow>
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
                  </Tooltip>
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
            </div>
            <div className="w-full h-[78%] bg-white">
              <div className="chat-box bg-white max-w-[100vw] pl-3 pr-4  overflow-x-hidden w-full  h-full flex flex-col-reverse overflow-y-auto ">
                <span
                  className={`${
                    isRecipientTyping && "px-3 py-2"
                  } w-[50%] md:w-[40%] lg:w-[30%]  rounded-md text-md font-semibold`}
                >
                  {isRecipientTyping
                    ? `${recepient.username} is typing...`
                    : ""}
                </span>
                {conversationMessages && conversationMessages.length === 0 && (
                  <span>No Conversation</span>
                )}
                {/* {console.log(conversationMessages && conversationMessages.messages[0])} */}
                {conversationMessages &&
                  conversationMessages.messages.map((message, index, array) => {
                    console.log(message)
                    console.log(new Date(message.createdAt).ge);
                    const nextElem =
                      index !== array.length - 1 ? array[index + 1] : null;
                    let date = null;
                    console.log(
                      // nextElem && new Date(nextElem.createdAt).getTime()
                      nextElem && new Date(nextElem.createdAt).getTime()
                    );
                   
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
                      console.log("greater than one hour");
                    } else if (nextElem) {
                      date = 1;
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
                            {
                              message.createdAt.split('T')[1].slice(0,5)
                            }
                          </span>
                        )}
                        {date && date !== 1 && (
                          <span className="w-full text-center text-xs  lg:text-[0.75rem] py-2 font-semibold uppercase">
                            {message.createdAt.split('T')[1].slice(0,5)}
                          </span>
                        )}
                      </>
                    );
                  })}
                {conversationMessages &&
                  conversationMessages.messages.length > 0 &&
                  conversationMessages.messages.length % 30 === 0 && (
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
            <div className=" flex py-2 pl-3 pr-5 justify-between gap-2 items-center bg-white w-full ">
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
              <Group grow>
                <TextInput color="second" placeholder="Send a Message" />
              </Group>
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
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[70%] ml-auto min-h-[80vh] flex justify-center items-center text-xl font-semibold">
          <div className="w-full h-[25vh] flex justify-center items-center rounded-xl ">
            <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
              <img
                src={noData}
                alt=""
                className="w-full h-full object-contain"
              />
              <span className="absolute bottom-5 left-[30%] font-semibold">
                No Data
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatPanel;
