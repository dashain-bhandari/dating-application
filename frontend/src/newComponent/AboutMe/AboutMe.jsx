import React from 'react'
import UserProfileSection from '../../Section/UserProfileSection'
import { useOutletContext } from 'react-router-dom'

function AboutMe() {

  const [isProfileEditable] = useOutletContext()
  return (
    <div>
      <UserProfileSection isMe={isProfileEditable} />
    </div>
  )
}

export default AboutMe