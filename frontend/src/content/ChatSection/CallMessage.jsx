import React from 'react'
import { MdOutlineCallEnd } from 'react-icons/md'

function CallMessage({type, voiceCallUser, videoCallUser, icons, status, callname, callbtnName, date}) {

  return (

    <div className='flex flex-col px-3 py-3 rounded-3xl max-w-[130px] md:max-w-[200px] lg:max-w-[300px] bg-[#EAF3FF]'>
        <div className='w-full flex justify-center items-center'>
            <div className='rounded-full bg-white px-2 py-2'>{icons}</div>
            <div className='flex flex-col '>
                <span className='font-semibold text-md px-2'>{callname}</span>
                <span className='text-sm px-2 font-semibold text-[rgba(0,0,0,0.8)]'>{`${date} ${(!(status == 'missed') && !(status == 'initiate')) ? 'mins' : ''}`}</span>
            </div>
        </div>

        <div className='w-full '>
           <button className='px-6 py-2 mt-2 font-[600] rounded-md bg-screen w-full hover:bg-[[#EAF3FF]' onClick={type == 'video' ? () => videoCallUser() : () => voiceCallUser()}>{callbtnName}</button>
        </div>
    </div>
  )
}

export default CallMessage