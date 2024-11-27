import React from 'react'
import { NavLink } from 'react-router-dom'

function ProfileTab({name, link}) {

  return (

     <NavLink to={`${link}`} className={({isActive}) => isActive ? 'border-2 border-[var(--secondary)] px-4 py-1 mx-2 rounded-3xl text-[var(--secondary)]' : 'border-2 border-transparent px-4 py-1 mx-2' }>
        <span className='font-semibold text-xl'>{name}</span>
     </NavLink>
  )
}

export default ProfileTab;