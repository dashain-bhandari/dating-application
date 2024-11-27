import React, {useState} from 'react'
import { useEffect } from 'react';
import { VscDeviceCamera } from 'react-icons/vsc'

export default function UserProfileAvatarComponent() {

       const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
       if(!imageUrl) {
         setImageUrl('https://www.caltrain.com/files/images/2021-09/default.jpg')
       }
    }, [])

  return (
    <div className='flex flex-col justify-center rounded-2xl items-center shadow-md  bg-white mb-4'>

        <div className=" relative w-full h-[30vh]">

            <img src={imageUrl} alt="" className='w-full h-full object-cover object-center' />

          <div className='absolute left-6 bottom-[-50px] w-[150px] h-[150px] rounded-full border-2 border-screen'>
            <img src={imageUrl} alt="" className='w-full h-full rounded-full object-cover object-center' />
            {/* <span className='absolute right-0 bottom-0'><VscDeviceCamera size={30} /></span> */}
        </div>

        </div>

        <div className='w-full flex flex-col justify-start mt-12 pl-4 py-4'>
            <div className='my-2'>
            <h1 className='text-lg lg:text-xl font-bold'>Dipak kalauni</h1>
            <h2 className='tet-md lg-text-lg font-semibold'>Web Developer</h2>
            </div>
             
             <div className=''>
            <h4 className='text-md lg:text-lg'>duckduck9270@gmail.com</h4>
            <h4  className='text-md lg:text-lg'>9868810438</h4>
             </div>

            <p className='font-semibold text-md lg:text-lg'>{`200 connections`}</p>
        </div>
    </div>
  )
}

