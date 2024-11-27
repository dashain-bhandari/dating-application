import React from 'react'
import { AiFillSetting } from 'react-icons/ai'
import PasswordSetting from '../newComponent/PasswordSetting/PasswordSetting'
import AccountSetting from '../newComponent/AccountSetting/AccountSetting'

function SettingSection() {


  return (

    <div className='flex flex-col w-[90%] lg:w-[80%] mx-auto pt-[5rem]'>
       {/* <div className='flex pl-6'>
         <span className='mr-4'><AiFillSetting size={35} color="var(--secondary)" /></span>
         <h1 className='text-lg lg:text-xl font-bold'>Settings</h1>
       </div> */}
            <PasswordSetting />
            <AccountSetting />
        
    </div>
  )
}

export default SettingSection