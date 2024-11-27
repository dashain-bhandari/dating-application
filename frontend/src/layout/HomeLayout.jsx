import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import InnerHeader from '../pages/InnerHome/InnerHeader/InnerHeader';
import { AuthContext } from '../utils/context/AuthContext';
import { useDisclosure } from '@mantine/hooks';
import { Button, Dialog, Group, Text } from '@mantine/core';
import DashBoardSidebar from '../pages/DashBoardSidebar';
import { useDispatch } from 'react-redux';
import { fetchConnectionsThunk } from '../Store/thunk/connectionsThunk';

function HomeLayout({children}) {
  const location = useLocation();
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [anotherDialogOpened, { toggle: toggleAnotherDialog, close: closeAnotherDialog }] = useDisclosure(false);

  if (user && (!user.profile || !user.family || !user.education || !user.preferance) && user.role!="super-admin") {
    console.log("redirect");
    return navigate('/form');
  } else if (!user) {
    return <Navigate to={'/auth'} state={{ from: location }} replace />;
  }

  // useEffect(() => {
  //  if(user && !user.emailVerified) {
  //   toggle();
  //  }
  // }, [user])
useEffect(()=>
{
  dispatch(fetchConnectionsThunk())
},[user])

  useEffect(()=>{
if((user.subscription?.status=="active" && user.subscription.reminderSent)|| user.subscription?.status=="expired" || !user.subscription){
  toggle()
}
  },[user])
return (
     <div className="w-full min-h-[100vh] pt-[10vh] bg-light">
       
        <Outlet /> 

        {/* <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        
        <Group spacing={10}>
          <Text size="sm" weight={400}>
            A verification link has been sent to your email.
          </Text>
          <Button variant='outline' onClick={() => navigate('/home/resend/email')}>Resend Verification Email</Button>
        </Group>
      </Dialog> */}

       <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        
        <Group spacing={10} className='flex flex-col'>
          <Text size="sm" weight={400}>
          Subscribe to get additional features.
          </Text>
          <Button variant='outline' onClick={() => navigate('/home/payment')}>Subscribe now</Button>
        </Group>
      </Dialog>
    </div>
  );
}

export default HomeLayout;
