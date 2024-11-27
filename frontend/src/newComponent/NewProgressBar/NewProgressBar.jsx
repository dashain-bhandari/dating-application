import { current } from '@reduxjs/toolkit';
import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { FaHouseUser } from 'react-icons/fa'; 
import { FaSchool } from 'react-icons/fa';
// import { IoSchoolSharp } from 'react-icons/sharp';

function NewProgressBar({ currentFormCount, setCurrentFormCount }) {

     

  return (
    <div className='relative w-[80%] h-[7px] mx-auto rounded-2xl mt-16 bg-black hidden lg:block'>
        <div className={`h-full flex justify-evenly items-center ${currentFormCount === 0 && 'w-[22%] progressStep1'} ${currentFormCount === 1 && 'w-[42%] progressStep2'} ${currentFormCount === 2 && 'w-[62%] progressSetp3'} ${currentFormCount === 3 && 'w-[82%] progressStep4'} ${currentFormCount === 4 && 'w-[100%] progressStep5'} bg-[#ec1c24]`}>
            <div className={`p-2 rounded-[50%] border-4 absolute top-[-100%] left-[20%] ${currentFormCount >= 0 ? 'border-[#ec1c24] bg-white' : 'bg-white' }`}>
                {/* <span><CgProfile size={35} color="black" /></span> */}
                 {/* <p className='absolute text-2xl text-white'>Basic</p> */}
            </div>
            <div className={`p-2 rounded-[50%] border-4  absolute top-[-100%] left-[40%] ${currentFormCount >= 1 ? 'bg-white border-[#ec1c24]' : 'bg-white' }`}>
                {/* <span><FaHouseUser size={35} /></span> */}
                 {/* <p className='absolute text-2xl text-white'>Family</p> */}
            </div>
            <div className={`p-2 rounded-[50%] border-4  absolute top-[-100%] left-[60%] ${currentFormCount >= 2 ? 'bg-white border-[#ec1c24]' : 'bg-white' }`}>
                {/* <span><FaSchool size={35} /></span> */}
                 {/* <p className='text-2xl absolute text-white'>Education</p> */}
            </div>
            <div className={`p-2 rounded-[50%] border-4 absolute top-[-100%] left-[80%] ${currentFormCount >= 3 ? 'bg-white border-[#ec1c24]' : 'bg-white' }`}>
                {/* <span><FaSchool size={35} /></span> */}
                {/* <p className='absolute text-2xl text-white '>Preferance</p> */}
            </div>
        </div>
    </div>
  )
}

export default NewProgressBar