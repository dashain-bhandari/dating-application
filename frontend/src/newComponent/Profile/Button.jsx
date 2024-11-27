import React from 'react'

function Button(props) {

  return (

    <div className={` ${props.classes2 && props.classes2}`}>
        <button type={props.type && props.type} onClick={props.onClick && props.onClick} className={` ${props.classes && props.classes}`}>{props.label && props.label}</button>
    </div>
  )
}

export default Button;