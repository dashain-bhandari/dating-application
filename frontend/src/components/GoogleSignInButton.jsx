import { useEffect, useState } from "react";
import { axiosInstance } from "../http";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { addToast } from "../Store/features/toastSlice";



function GoogleAuthButton(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const buttonRef = useRef(null);

  const handleCallbackResponse = async (response) => {
    console.log("jwt token: " + response.credential);

    const credential = {
      token: response.credential,
    };

    axiosInstance
      .post("/google-authentication", credential)
      .then((response) => {
        console.log(response.data);
        const user = response.data;

      if(user && !user.profile) {
          navigate('/profile/info')
        }else if(user && !user.family) {
          navigate('/profile/info');
        }else if(user && !user.education) {
          navigate('/profile/info');
        }else if(user && !user.preferance) {
          navigate('/profile/info');
        }else {
           navigate('/home/dashboard');
        }
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data);
           dispatch(addToast({kind: 'ERROR', msg: 'Email already in use'}));
        } else {
          
        }
      });
  };

  useEffect(() => {
    /* global google */
    window.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    window.google?.accounts.id.renderButton(document.getElementById("googleAuth"), {
      theme: "filled_blue",
      size: "medium",
      width: '100%',
    });
  }, []);

//   const handleCustomButtonClick = (e) => {
//      if(buttonRef.current) {
//          buttonRef.current.click();
//      }
//   }

  return (
    <>
    {/* <span onClick={(e) => handleCustomButtonClick(e)}><i className="bi bi-google"></i></span> */}
   <div id="googleAuth" className=" w-full flex justify-center mt-6 "></div>
   </>
  )
}

export default GoogleAuthButton;

