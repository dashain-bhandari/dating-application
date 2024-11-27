import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useConversationGuard } from '../hooks/useConversationGuard';

function ConversationPageGuard({children}) {

    const location = useLocation();
    const {loading, error} = useConversationGuard();
    if(loading) return <div>loading Conversation</div>;
  return error ? (
       <Navigate to='/conversation' state={{ from: location }} replace />
  ):(
    <>{children}</>
  )
}

export default ConversationPageGuard