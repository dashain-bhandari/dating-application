import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

function DeleteButton(props) {

  return (

    <div className={` ${props.classes2 && props.classes2}`}>
        <button className={`flex justify-between ${props.classes1 && props.classes1}`} onClick={props.onChange && props.onChange}>
            <span><AiOutlineDelete size={25} /></span>
            <h2 className='font-semibold text-md xl:text-lg ml-4'>Delete</h2>
        </button> 
    </div>
  )
}

export default DeleteButton;