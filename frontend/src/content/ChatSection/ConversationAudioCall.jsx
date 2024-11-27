import React, { useRef, useState } from 'react'
import { useContext } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import profileAvatar from '../../images/olp_avatar.avif';
import ringtone  from '../../assets/audio/outgoing.mp3';

import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
} from 'react-icons/bi';
import { ImPhoneHangUp } from 'react-icons/im';
import { AuthContext } from '../../utils/context/AuthContext';
import { CgProfile } from 'react-icons/cg';
import { Tooltip } from '@mantine/core';


function ConversationAudioCall() {

  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const audioRef = useRef(null);
  const {user} = useContext(AuthContext);

   const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
   const [videoEnabled, setVideoEnabled] = useState(true);
   const [recepient, setRecepient] = useState('');
   const socket = useContext(SocketContext);
   const [callEnded, setCallEnded] = useState(false);
   const { caller, receiver, localStream, remoteStream, callDetails } = useSelector((state) => state.call );

   useEffect(() => {
       if(audioRef && audioRef.current && !remoteStream) {
        audioRef.current.play();
       }
   }, [audioRef, remoteStream])

  useEffect(() => {
      
    if(localAudioRef.current && localStream) {
       localAudioRef.current.srcObject = localStream;
       localAudioRef.current.muted = true;
    }
  }, [localStream])

  useEffect(() => {
     if(remoteAudioRef.current && remoteStream) {
      console.log(remoteStream);
       remoteAudioRef.current.srcObject = remoteStream;
     }
  }, [remoteStream])

    const toggleMicrophone = () =>
    localStream &&
    setMicrophoneEnabled((prev) => {
      localStream.getAudioTracks()[0].enabled = !prev;
      return !prev;
    });


  const toggleVideo = () =>
    localStream &&
    setVideoEnabled((prev) => {
      localStream.getVideoTracks()[0].enabled = !prev;
      return !prev;
    });

    const closeCall = () => {
      console.log('ready')
        setCallEnded(true);
        console.log(audioRef)
        audioRef && audioRef.current && audioRef.current.pause();
       socket.emit('onVoiceCallHangUp', { caller, receiver, callDetail: callDetails});
    }

    useEffect(() => {
           if(user && caller) {
              const recep = user.id === caller.id ? receiver : caller
              setRecepient(recep);
           }
    }, [user, caller, receiver])
 
  return (
   <>
        <div className='fixed top-0 left-0 w-[100vw]  h-[100vh] bg-[rgba(0,0,0,0.2)] z-50'></div>
      <div className='fixed w-[100vw] h-[100vh] top-0 left-0 md:w-[90vw] md:h-[90vh] lg:w-[60vw] lg:h-[80vh] md:left-[5%] md:top-[5%] lg:left-[20%] lg:!top-[10%]  z-50 flex flex-col justify-between rounded-lg shadow-lg  bg-gradient24 from-[#FF004D] to-[#660077]'>
        
    
      <div className=' flex basis-[90%] flex-col justify-center items-center md:justify-center w-full'>
      {/* {localStream && (
       <div className={`${remoteStream ? 'w-full md:basis-1/2 flex justify-center' : 'w-full md:basis-full flex justify-center '} h-[100%] relative `}>
          <div className='aboslute '>
          <img src={profileAvatar} alt=''  className='absolute top-30 left-30 w-[30%] h-[30%] rounded-[50%]'/>
          </div> 
          <div className={`mb-4 w-[60px] h-[60px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden`}>
          <img className="object-cover object-center w-full h-full" src={recepient ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${recepient.avatarId}` : profileAvatar} alt="" />
          </div> */}
        {localStream  && <video className='h-0' ref={localAudioRef} playsInline autoPlay /> }
        {/* </div> */}
       {/* )}  */}

       
      {!remoteStream ? (
         <div className='w-full flex justify-center ltems-center  relative'> 
           <div className=' w-[60px] h-[60px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] overflow-hidden rounded-full'>
           <img src={user.avatarId ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${user.avatarId}` : profileAvatar} alt="" /> 
           </div> 
           <audio src={ringtone} ref={audioRef} loop />
         </div>
        
     ) : (
           <div className='w-full flex justify-center ltems-center  relative'> 
           <div className=' w-[60px] h-[60px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] overflow-hidden rounded-full'>
           <img src={user.avatarId ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${user.avatarId}` : profileAvatar} alt="" /> 
           </div> 
          <video ref={remoteAudioRef} playsInline autoPlay className='h-0' />
          </div>
      )} 

       <div className='text-center flex flex-col items-center justify-center'>
        {console.log(caller)}
        <h1 className='text-2xl text-center my-2 text-white capitalize'>{`${caller && caller.profile &&  caller.profile.fullname}`}</h1>
         <span className='block text-sm text-white'>{callEnded ? 'Call Ended' : 'Call Outgoing'}</span>
        </div>
      </div>

       <div className='basis-[10%] px-2 py-6 flex justify-center items-center'>
          {/* <div>
             {videoEnabled ? (
               <BiVideo size={35} onClick={toggleVideo} className='cursor-pointer' />
             ) : (
               <BiVideoOff size={35} onClick={toggleVideo} className='cursor-pointer' />
             )}
          </div> */}

          <div className='rounded-full px-2 py-2 mx-2 shadow-lg cursor-pointer'>
            {
              microphoneEnabled ? (
                <Tooltip label="Microphone On" withArrow radius={'md'}>
                <span><BiMicrophone color='white' size={35} onClick={toggleMicrophone} className='cursor-pointer' /></span>
                </Tooltip>
              ) : (
                <Tooltip label="Microphone Off" withArrow radius={'md'}>
                <span><BiMicrophoneOff color='white' size={35} onClick={toggleMicrophone} className='cursor-pointer' /></span>
                </Tooltip>
              )
            }
          </div>
        
           <Tooltip label="End Call" withArrow radius={'md'}>
          <div className='px-2 py-2 mx-2 rounded-full bg-[var(--primary)] cursor-pointer'>
            
             <span><ImPhoneHangUp size={35} onClick={closeCall} className='cursor-pointer' color='white' /></span>
          </div>
       </Tooltip>
      </div>
    </div>
    </>
  )
}

export default ConversationAudioCall