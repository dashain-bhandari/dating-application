import React, { useContext } from "react";
import { SocketContext } from "../../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdCall, MdCallEnd } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import ProfileAvatar from "../../images/olp_avatar.avif";
import { IoIosCall } from "react-icons/io";
import { ImPhoneHangUp } from "react-icons/im";
import { Tooltip } from "@mantine/core";
// import ringtone from '../../assets/audio/ringtone.wav'
import ringtone from "../../assets/audio/nokia.mp3";
import { useRef } from "react";
import { useEffect } from "react";

function CallReceiveDialog() {
  const { caller, callType, peerId, callDetails } = useSelector(
    (state) => state.call
  );
  const socket = useContext(SocketContext);
  const callReceive = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (callReceive) {
      callReceive.current.play();
    }
  }, []);

  const handleAcceptCall = () => {
    console.log("accepting call", callDetails);
    const payload = { caller, peerId, callDetail: callDetails };

    if (callType === "video") {
      socket.emit("onVideoCallAccept", payload);
    } else {
      socket.emit("onVoiceCallAccept", payload);
    }
  };

  const handleRejectCall = () => {
    console.log("rejecting call");
    const payload = { caller, callDetail: callDetails };

    if (callType === "video") {
      socket.emit("onVideoCallRejected", payload);
    } else {
      socket.emit("onVoiceCallRejected", payload);
    }

    if (callReceive) {
      console.log(callReceive)
     //dashain commented stop and added pause
      // callReceive.current.stop();
      callReceive.current.pause();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-[100vw]  h-[100vh] bg-[rgba(0,0,0,0.2)] z-50"></div>
      <div className="fixed w-[100vw] h-[100vh]  left-0 md:w-[70vw] md:h-[80vh] lg:w-[55vw] md:top-[10%] md:left-[25%] flex flex-col justify-between pt-[50%] md:pt-0 items-center rounded-xl shadow-lg bg-gradient24 from-[#FF004D] to-[#660077] z-50">
        <div className="w-full basis-[90%] flex flex-col justify-center items-center">
          <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[150px] lg:h-[150px] mt-24 overflow-hidden rounded-full border-2 border-[var(--secondary)] mb-2">
            <img
              className="object-cover object-center w-full h-full"
              src={
                caller && caller.avatarId
                  ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                      caller && caller.avatarId
                    }`
                  : ProfileAvatar
              }
              alt=""
            />
            <audio src={ringtone} ref={callReceive} loop />
          </div>
          <div className="text-center">
            <h1 className="text-2xl text-center my-2 text-white capitalize">{`${
              caller && caller.profile && caller.profile.fullname
            }`}</h1>
            <span className="text-sm text-white">{"Calling..."}</span>
          </div>
        </div>
        <div className=" flex flex-col w-full  bg-transparent">
          <div className="flex justify-center items-center gap-3 px-2 py-2  my-2 w-full">
            <Tooltip label="Accept Call" withArrow radius={"md"}>
              <div className="px-2 py-2 rounded-full bg-[#38AF48] mx-2">
                <IoIosCall
                  size={30}
                  color="white"
                  className="cursor-pointer"
                  onClick={() => handleAcceptCall()}
                />
              </div>
            </Tooltip>

            <Tooltip label="Reject Call" withArrow radius={"md"}>
              <div className="px-2 py-2 rounded-full bg-[#E40000] mx-2">
                <ImPhoneHangUp
                  size={30}
                  color="white"
                  className="cursor-pointer"
                  onClick={() => handleRejectCall()}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallReceiveDialog;
