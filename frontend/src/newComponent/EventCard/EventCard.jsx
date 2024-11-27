import React from 'react'
import { useState, useEffect } from 'react';
import Button from '../Profile/Button';

function EventCard() {

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
       if(!imageUrl) {
         setImageUrl('https://www.caltrain.com/files/images/2021-09/default.jpg');
       }
    }, [])

  return (
    <div className='w-full my-4 px-2 py-2 flex justify-between rounded-xl shadow-md'>
        <div className='flex justify-between basis-[30%]'>
         <div className="w-[100px] h-[100px] rounded-[50%]">
            <img src={imageUrl} alt="" className='object-cover w-full h-full object-center' />
         </div>

         <div className='px-2 py-2'>
            <h1 className='text-lg xl:text-xl'>Dipak kalauni</h1>
             <h3 className='text-md lg:text-lg'>Phone number</h3>
         </div>

        </div>

        <div className='flex justify-around'>
           <Button label="Disconnect" />
        </div>
    </div>
  )
}

export default EventCard;