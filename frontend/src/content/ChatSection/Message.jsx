import {
  differenceInMilliseconds,
  formatDistance,
  formatDistanceToNow,
  formatDuration,
  formatRelative,
  intervalToDuration,
  milliseconds,
} from "date-fns";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  MdCallMade,
  MdCallMissed,
  MdCallMissedOutgoing,
  MdCallReceived,
  MdOutlineCallMissed,
} from "react-icons/md";
import CallMessage from "./CallMessage";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteMessageThunk } from "../../Store/thunk/messagesThunk";
import {
  BsCameraVideoOff,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { Button, Group, Popover, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import { IoIosVideocam } from "react-icons/io";

function Message({ isUserCreator, message, videoCallUser, voiceCallUser }) {
  const {user} = useContext(AuthContext);
  const [showLightBox, setShowLightBox] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const dispatch = useDispatch();

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: "Delete Message",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete message? This action is will delete
          message and will be no longer available.
        </Text>
      ),
      labels: { confirm: "Delete Message", cancel: "No don't delete it" },
      confirmProps: { color: "red", variant: "outline" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleMessageDelete(),
    });
  };

  const closeLightBox = () => {
    setShowLightBox(false);
  };

  const handleMessageDelete = () => {
    console.log("message delete");
    dispatch(
      deleteMessageThunk({ id: message.conversation.id, messageId: message.id })
    );
  };

  return (
    <div
      className={`w-full flex mb-1 ${
        isUserCreator ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative flex flex-col w-full lg:basis-1/2 ${
          isUserCreator ? "items-end" : "items-start"
        }`}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div
          className={`flex relative  gap-2 w-full ${
            isUserCreator ? "justify-end" : "justify-start"
          } ${
            message.attachments && message.attachments.length > 0
              ? `flex-col ${
                  isUserCreator
                    ? "items-end justify-center"
                    : "items-start justify-center"
                }`
              : "flex-row items-center"
          }  `}
        >
          {/* <Popover width={100} position="bottom" withArrow shadow="md"> */}
          {/* <Popover.Target> */}
          {!message.call && (
            <span
              className={` bg-white rounded-xl cursor-pointer ${
                message.attachments &&
                message.attachments.length > 0 &&
                "absolute top-0 right-[-20px]"
              } ${onHover && isUserCreator ? "block" : "hidden"}`}
              onClick={() => openDeleteModal()}
            >
              <Tooltip label="Delete" withArrow radius={"md"}>
                <BsThreeDotsVertical
                  size={25}
                  color="rgba(0,0,0,0.4)"
                  className=""
                />
              </Tooltip>
            </span>
          )}
          {/* </Popover.Target> */}
          {/* <Popover.Dropdown>
            <Group position='center'>
              <Button color='second' leftIcon={<AiOutlineDelete variant={'transparent'} />}>Delete</Button>
            </Group>
          </Popover.Dropdown> */}
          {/* </Popover> */}
          {message.content && (
            <span
              className={`max-w-[65%]   lg:max-w-[80%] md:max-w-[70%]  flex flex-col px-3 py-2 rounded-3xl ${
                isUserCreator
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-white"
              }`}
            >
              {message.content}
            </span>
          )}

          {message.attachments &&
            message.attachments.map((attachement, index) => {
              console.log(attachement)
              return (
                <div key={index}>
                  <div className="w-[120px] h-[120px] ">
                    <img
                      onClick={() => setShowLightBox(true)}
                      className="cursor-pointer w-full h-full object-cover object-center"
                      src={`${attachement.url}`}
                      alt="attachment"
                    />
                    {/* <img className='w-full h-full object-cover object-center'  src={`http://localhost:3000/attachments/f0c30ff5853a4e8c6d07bc5e067c1390.jpg`} alt='attachments'/> */}
                  </div>
                  <Lightbox
                    open={showLightBox}
                    close={() => closeLightBox()}
                    slides={[
                      {
                        src: `${attachement.url}`,
                        width: "800",
                        height: "600",
                      },
                    ]}
                  />
                </div>
              );
            })}

          {!message.content && message.call && (
            <>
              {/* {  console.log(new Date(message.call.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))} */}
              {(message.call.status === "missed" ||
                message.call.status === "initiate" ||
                message.call.status === "rejected") && (
                <CallMessage
                  type={message.call && message.call.type}
                  status={message.call.status}
                  voiceCallUser={voiceCallUser}
                  videoCallUser={videoCallUser}
                  icons={
                    message.author.id == user.id ? (
                      message.call.type == "video" ? (
                        <BsCameraVideoOff color="var(--primary)" size={30} />
                      ) : (
                        <VscCallIncoming color="var(--primary)" size={30} />
                      )
                    ) : message.call.type == "video" ? (
                      <BsCameraVideoOff color="var(--primary)" size={30} />
                    ) : (
                      <VscCallOutgoing color="var(--primary)" size={30} />
                    )
                  }
                  callname={
                    message.call.type == "video" ? "Video Chat" : "Audio Call"
                  }
                  callbtnName={"Call back"}
                  date={new Date(message.call.createdAt).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                />
              )}

              {(message.call.status === "completed" ||
                message.call.status === "accepted") && (
                <CallMessage
                  type={message.call && message.call.type}
                  status={message.call.status}
                  voiceCallUser={voiceCallUser}
                  videoCallUser={videoCallUser}
                  icons={
                    message.author.id === user.id ? (
                      message.call.type == "video" ? (
                        <IoIosVideocam color="var(--secondary)" size={30} />
                      ) : (
                        <VscCallIncoming size={30} color="var(--secondary)" />
                      )
                    ) : message.call.type == "video" ? (
                      <IoIosVideocam color="var(--secondary)" size={30} />
                    ) : (
                      <VscCallOutgoing color="var(--secondary)" size={30} />
                    )
                  }
                  callname={
                    message.call.type == "video" ? "Video Chat" : "Audio Call"
                  }
                  callbtnName={"Call Again"}
                  date={Math.floor(
                    (new Date(message.call.endTime).getTime() -
                      new Date(message.call.startTime).getTime()) /
                      (1000 * 60)
                  )}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
