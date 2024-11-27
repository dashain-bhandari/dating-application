import React from 'react'

function Input(props) {


  return (

    <div className={` ${props.classes3 && props.classes3}`}>
        <label className={`text-md lg:text-lg xl:text-xl  ${props.classes2 && props.classes2}`} htmlFor="">{props.label && props.label}</label>
        <input disabled={props.disabled && props.disabled} name={props.name && props.name} className={`w-full  outline-none text-lg xl:text-xl  ${!props.disabled ? 'border-[1px] border-black/10' : 'border-[1px] bg-white text-bold text-[rgba(0,0,0,0.7)'}  rounded-[20px] py-2 my-1 text-sm placeholder:text-sm md:placeholder:text-lg ${props.classes && props.classes}`} type={props.type && props.type} placeholder={!props.disabled ? (props.placeholder && props.placeholder) : ''} onChange={props.onChange && props.onChange} value={props.value && props.value} />
    </div>
  )
}

export default Input;