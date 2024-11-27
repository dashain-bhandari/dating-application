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
import Header from '../../components/Header';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';

function PhotoUploadForm() {

    const [defaultUrl, setDefaultUrl] = useState(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    // const { width, height } = useWindowSize()
    const {user, setUser}= useContext(AuthContext);

    useEffect(() => {
      if(!defaultUrl) {
        setDefaultUrl('https://www.caltrain.com/files/images/2021-09/default.jpg')
      }
    }, [])

    
    const handleProfileClick = () => {
        if(fileInputRef) {
            fileInputRef.current.click();
        }
    }

    const handleProfileChange = (e) => {
      e.preventDefault();
       const file = e.target.files[0];
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
         setUser({...user, avatarId:res.data.id})
        //  navigate('/home/dashboard');
       }).catch((error) => {
         console.log(error);
       })
    }


  // const handleFileSelect = (event) => {
  //   setSelectedImage(event.target.files[0]);
  //   setImageFile(URL.createObjectURL(event.target.files[0]));
  // };

  useEffect(() => {
     if(user.avatarId) {
       setDefaultUrl(`${import.meta.env.VITE_BASE_URL}/user-avatar/${user.avatarId}`)
     }
     console.log(user.avatarId);
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
    <Header />
     <div className='w-screen min-h-[100vh]  flex flex-col justify-center items-center bg-screen'>
          <Confetti
        width={'1500'}
        height={'800'}
        numberOfPieces={200}
        recycle={true}
      />
      
     <div className='w-[80%] mx-auto flex justify-between items-center'>
        <h1 className='w-full text-2xl font-semibold my-4 text-center'>Congratuations your account has been setup successfully.</h1>
      
     </div>
       <div className='w-[90%] lg:w-[35%] bg-white mx-auto flex justify-between shadow-md items-center rounded-3xl overflow-hidden'>

          <div className='w-full lg:min-h-[50vh] py-8 font-semibold h-full flex flex-col justify-center items-center bg-white'>
                <h3 className='text-center font-semibold text-xl lg:text-2xl mb-3'>Upload a profile photo.</h3>
              <div className='relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-[50%]' onClick={() => handleProfileClick()}>
                <img className='rounded-full object-cover w-full h-full object-center' src={defaultUrl} alt="" />

                {/* <span className='absolute right-0 bottom-0'><VscDeviceCamera size={30} /></span> */}
              </div>
              <button className='px-4 py-2 bg-[var(--secondary)] rounded-xl text-white text-xl my-3' onClick={() => handleProfileClick()}>Add a Photo +</button>

              <div>
                 <input type="file" required ref={fileInputRef} className='d-none' accept="image/*" onChange={handleProfileChange} />
              </div>
              
              <div className='w-full flex flex-col justify-center align-center'>
                {/* <h3 className='text-center my-2'>{`Groom and bridge`}</h3> */}
                <Link to="/home/dashboard"><h6 className='text-md lg:text-lg 2xl:text-xl underline text-center'>Skip</h6></Link>
              </div>
          </div>

          {/* <div className='basis-1/2 h-full flex justify-center items-center bg-black '>
             <img src={cover} alt="" className='w-full h-full object-cover object-center' />
          </div> */}

       </div>

       
    </div>

    <Footer />
    </>
  )
}

export default PhotoUploadForm;