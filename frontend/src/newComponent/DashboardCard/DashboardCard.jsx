import React from 'react'
import { AiOutlineAccountBook } from 'react-icons/ai'

function DashboardCard(props) {

  return (
    <div className={`flex flex-col px-4 py-2 rounded-xl shadow-md ${props.classes1 && props.classes1} bg-white`}>
        <div className={`w-full flex justify-between`}>
        <h3 className='text-md lg:text-xl '>{props.cardlabel && props.cardlabel}</h3>
         <AiOutlineAccountBook size={25} />
        </div>
        <h1 className='text-xl'>{props.totalCount && props.totalCount}</h1>
    </div>
  )
}

export default DashboardCard;