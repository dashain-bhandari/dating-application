import React from 'react'
import olpAvatar from '../../images/olp_avatar.avif';

function OptionComponent(props) {
const { innerProps, innerRef, label, value, isDisabled } = props;
 console.log(props);

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className='p-2 flex items-center hover:bg-slate-200 cursor-pointer'
    >
        <div className='w-[40px] h-[40px] rounded-[50%] overflow-hidden mx-2 my-2'>
            <img className='w-full h-full object-cover object-center' src={props.data.avatarId ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${props.data.avatarId}` : olpAvatar} alt="" />
        </div>

        <div className='right'>
            <h3 className='text-lg text-slate-800'>{label}</h3>
        </div>

    </div>
  )
}

export default OptionComponent;