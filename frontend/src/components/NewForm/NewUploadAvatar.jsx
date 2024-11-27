import React, { useEffect, useRef, useState } from 'react'
import { VscDeviceCamera } from 'react-icons/vsc';
import Footer from '../../components/Footer';
import NewHeader from '../../newComponent/NewHeader/NewHeader';
import cover from '../../images/73273620.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { toast } from "react-toastify";
import Header from '../../components/Header';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';
import { Button, Group, Image, Modal, Paper, Text, Title, createStyles, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
// import { IconCloudUpload, IconX, IconDownload } from 'tabler-icons-react';
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from 'react-icons/ai';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import profileAvatar from '../../images/olp_avatar.avif';


const useStyles = createStyles((theme) => ({
    formWrapper: {
      backgroundColor: 'white',

      [theme.fn.smallerThan('md')]: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },

      [theme.fn.smallerThan('xl') && theme.fn.largerThan('md')]: {
        width: '50%'
      }
    },
    button: {
      backgroundColor: 'var(--primary)'
    },
     wrapper: {
    position: 'relative',
    marginBottom: rem(30),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
    backgroundColor: 'var(--secondary) !important'
  },

}))


function NewUploadAvatar() {

    const {classes, theme} = useStyles();
   const largeDesktop = useMediaQuery('(min-width: 1750px)')
   const mediumDesktop = useMediaQuery('(max-width: 1440px)')
    const [opened, { open, close }] = useDisclosure(false);

     const openRef = useRef(null);
    const [defaultUrl, setDefaultUrl] = useState(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    // const { width, height } = useWindowSize()
    const {user, setUser }= useContext(AuthContext);

    useEffect(() => {
      if(!defaultUrl) {
        // setDefaultUrl('https://www.caltrain.com/files/images/2021-09/default.jpg')
        setDefaultUrl(profileAvatar)
      }
    }, [])

    useEffect(() => {
      open();
    }, [])
    const handleProfileClick = () => {
        if(fileInputRef) {
            fileInputRef.current.click();
        }
    }

    const [submitting,setSubmitting]=useState(false);
    const handleProfileChange = (value) => {
       setSubmitting(true);
       const file = value[0];
       console.log(file)
       if(!file){
        return console.log('Please select a profile')
       }

       const formData = new FormData();
       formData.append('file', file);

       axios.post(`${import.meta.env.VITE_BASE_URL}/users/avatar`, formData, {
         headers: {
           'Content-Type': "multipart/form-data",
         },
         withCredentials: true,
       }).then((res) => {
         console.log(res.data)
         setSubmitting(false);
         toast.success("Avatar uploaded");
         setUser({...user, avatarId:res.data.id})
        
        //  navigate('/home/dashboard');
       }).catch((error) => {
        setSubmitting(false);
        toast.error(error.message);
         console.log(error);
       })
    }


  // const handleFileSelect = (event) => {
  //   setSelectedImage(event.target.files[0]);
  //   setImageFile(URL.createObjectURL(event.target.files[0]));
  // };

  useEffect(() => {
     if( user && user.avatarId) {
       setDefaultUrl(`${import.meta.env.VITE_BASE_URL}/user-avatar/${user.avatarId}`)
     }
  }, [user])

  const handelProfileUpload = (e) => {
      e.preventDefault();

      // const formData = new FormData();
      // formData.append('file', selectedImage);

      // axios.post('http://localhost:3000/v1/api/users/avatar', formData,
      //  {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   withCredentials: true,
      //  }
      // ).then((res) => {
      //    console.log(res.data);
      //   const userWithNewAvatarId = {...user, avatarId: res.data.id};
      //   console.log(userWithNewAvatarId);
      //    dispatch(
      //     setCurrentUser(userWithNewAvatarId)
      //    )
      // }).catch((error) => {
      //    console.log(error);
      // })
  }

return (

  <>
     {/* <Confetti
      width={'1000px'}
      height={'500px'}
    /> */}
     <div className='w-screen h-screen overflow-hidden  flex flex-col justify-center items-center bg-screen'>
     
        {/* <Modal
        opened={opened}
        onClose={close}
        // title="This is a fullscreen modal"
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <div className='w-full overflow-hidden h-full flex flex-col justify-center items-center'>
        <Confetti
        width={'1900'}
        height={'1000'}
        numberOfPieces={1000}
        recycle={false}
         />
        <h1 className='md:text-[2rem] xl:text-[2.5rem] 2xl:text-[3.5rem] font-semibold text-[var(--primary)] mb-2'>CONGRATULATIONS!</h1>
        <h3 className='md:text-[1rem] xl:text-[1.5rem] 2xl:text-[2rem] mb-2'>You are now successfully registered!.</h3>
        
        </div>
      </Modal>
       */}
     {/* <div className='w-[80%] mx-auto flex justify-between items-center'> */}
        {/* <h1 className='w-full text-2xl font-semibold my-4 text-center'>Congratuations your account has been setup successfully.</h1> */}
      
     {/* </div> */}
        {/* <div className='w-[90%] lg:w-[35%] bg-white mx-auto flex justify-between shadow-md items-center rounded-3xl overflow-hidden'> */}
       <Paper className={classes.formWrapper} withBorder radius={2} pt={10} pb={30} px={20}>
          {/* <div className='w-full lg:min-h-[50vh] py-8 font-semibold h-full flex flex-col justify-center items-center bg-white'> */}
                {/* <h3 className='text-center font-semibold text-xl lg:text-2xl mb-3'>Upload a profile photo.</h3> */}    
            <Title order={largeDesktop ? 1 : (mediumDesktop ? 3 : 2)} ta="center" mt="md" mb={'md'}>Upload avatar</Title> 
              
               {/* <div className='relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-[50%]' onClick={() => handleProfileClick()}>
                <img className='rounded-full object-cover w-full h-full object-center' src={defaultUrl} alt="" />

                {/* <span className='absolute right-0 bottom-0'><VscDeviceCamera size={30} /></span> */}
              {/* </div> */}

              <Image src={defaultUrl} width={largeDesktop ? 300 : (mediumDesktop ? 120 : 200)}  height={largeDesktop ? 300 : (mediumDesktop ? 120 : 200)} mb={'md'} radius={100} alt='Avatar' mx="auto" />

              {/* <button className='px-4 py-2 bg-[var(--secondary)] rounded-xl text-white text-xl my-3' onClick={() => handleProfileClick()}>Add a Photo +</button> */}

              <div>
                 <input type="file" ref={fileInputRef} className='d-none' accept="image/*" onChange={handleProfileChange} />
              </div>
              
              {/* <div className='w-full flex flex-col justify-center align-center'> */}
                {/* <h3 className='text-center my-2'>{`Groom and bridge`}</h3> */}
                {/* <Link to="/home/dashboard"><h6 className='text-md lg:text-lg 2xl:text-xl underline text-center'>Skip</h6></Link> */}
              {/* </div> */}
             <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleProfileChange}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={5 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <AiOutlineCloudDownload
                size={rem(50)}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              {/* <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} /> */}
            </Dropzone.Reject>
            <Dropzone.Idle>
              <AiOutlineCloudUpload
                size={largeDesktop ? rem(100) : (mediumDesktop ? rem(80) : rem(50))}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Image file less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>Upload avatar</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop file here to upload. We can accept only <i>.jpeg, .png</i> files that
            are less than 5mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button variant='filled'  className={classes.control} size={largeDesktop ? 'xl' : (mediumDesktop ? 'lg' : 'md')} radius="xl" onClick={() => openRef.current?.()}>
     {submitting?"Uploading..":"Select file"}
      </Button>

    </div>
      <Group position='center'>
       <Button  onClick={() => navigate('/home/main/dashboard')} size={largeDesktop ? 'xl' : (mediumDesktop ? 'lg' : 'md')} variant='light'>Next</Button>
      </Group>
          {/* <div className='basis-1/2 h-full flex justify-center items-center bg-black '>
             <img src={cover} alt="" className='w-full h-full object-cover object-center' />
          </div> */}
    </Paper>
       </div>

       
    {/* </div> */}

    </>
  )
}

export default NewUploadAvatar;