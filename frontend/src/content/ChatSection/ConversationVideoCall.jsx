import React, { useContext, useState } from 'react'
import { SocketContext } from '../../utils/context/SocketContext';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ringtone from '../../assets/audio/outgoing.mp3';
import profileAvatar from '../../images/olp_avatar.avif';

import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
} from 'react-icons/bi';
import { ImPhoneHangUp } from 'react-icons/im';
import { AuthContext } from '../../utils/context/AuthContext';
import { CgProfile } from 'react-icons/cg';

function ConversationVideoCall() {

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const {user} = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const audioRef = useRef(null);
  const [callEnded, setCallEnded] = useState(false);
  const [recepient, setRecepient] = useState(true)
  const { localStream, remoteStream, caller, receiver, callDetails } = useSelector((state) => state.call);

  useEffect(() => {
    if (audioRef && audioRef.current && !remoteStream) {
      audioRef.current.play()
    }
  }, [audioRef, remoteStream])

  useEffect(() => {
    console.log('localStream was update', localStream);
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.muted = true;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      console.log(remoteStream)
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);


  const toggleMicrophone = () => {
    localStream && setMicrophoneEnabled((prev) => {
      localStream.getAudioTracks()[0].enabled = !prev;
      return !prev;
    })
  }

  const toggleVideo = () => {
    localStream && setVideoEnabled((prev) => {
      localStream.getVideoTracks()[0].enabled = !prev;
      return !prev;
    })
  }


  useEffect(() => {
    if (user && caller) {
      const recep = user.id === caller.id ? receiver : caller
      setRecepient(recep);
    }
  }, [user, caller, receiver])

  const closeCall = () => {
    socket.emit('onVideoCallHangUp', { caller, receiver, callDetail: callDetails });
  };

  return (
    <>
      <div className='fixed top-0 left-0 w-[100vw]  h-[100vh] bg-[rgba(0,0,0,0.2)] z-50'></div>
      <div className='fixed w-[100vw] h-[100vh] top-0 left-0 md:w-[90vw] md:h-[90vh] lg:w-[60vw] lg:h-[80vh] md:top-[5%] md:left-[5%] lg:!top-[10%] lg:left-[20%]  z-50 flex flex-col justify-center rounded-xl shadow-lg bg-gradient24 from-[#FF004D] to-[#660077]'>
        <div className='relative flex flex-col md:flex-row md:justify-between w-full h-[100%]'>

          {localStream && (
            <div className={`bg-white absolute overflow-hidden max-w-[20%] max-h-[30%] right-0 bottom-0`}>
              <video className='h-auto w-full' ref={localVideoRef} playsInline autoPlay />
            </div>
          )}

          {remoteStream ? (
            <div className='w-full h-full overflow-hidden '>
              <video ref={remoteVideoRef} playsInline autoPlay className='w-full h-auto' />
            </div>
          ) : (
            <div className='w-full flex flex-col justify-center items-center'>
              <audio ref={audioRef} src={ringtone} loop />
              <div className='w-full flex flex-col justify-center items-center mb-2'>
                {(recepient && recepient.avatarId) ? <img src={recepient && recepient.avatarId && `${import.meta.env.VITE_BASE_URL}/user-avatar/${recepient.avatarId}`} className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover object-center border-2 border-[var(--secondary)]' alt="" /> : <CgProfile size={150} color='rgba(0,0,0,0.8)' />}
              </div>
              <div className='text-center flex flex-col justify-center items-center'>
                <h1 className='text-2xl text-center my-2 text-white capitalize'>{`${caller && caller.profile && caller.profile.fullname}`}</h1>
                <span className='btext-sm text-white'>{callEnded ? 'Call Ended' : 'Call Ongoing'}</span>
              </div>
            </div>
          )}

        </div>

        <div className='absolute bottom-0 left-0 w-full flex justify-center py-4 items-center'>
          <div className='px-2 py-2 rounded-full bg-white shadow-lg mx-2'>
            {videoEnabled ? (
              <BiVideo size={35} onClick={toggleVideo} className='cursor-pointer' />
            ) : (
              <BiVideoOff size={35} onClick={toggleVideo} className='cursor-pointer' />
            )}
          </div>

          <div className='px-2 py-2 rounded-full bg-white shadow-lg mx-2'>
            {
              microphoneEnabled ? (
                <BiMicrophone size={35} onClick={toggleMicrophone} className='cursor-pointer' />
              ) : (
                <BiMicrophoneOff size={35} onClick={toggleMicrophone} className='cursor-pointer' />
              )
            }
          </div>

          <div className='px-2 py-2 rounded-full bg-[var(--primary)] shadow-lg mx-2 '>
            <ImPhoneHangUp size={35} onClick={closeCall} className='cursor-pointer' color="white" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ConversationVideoCall