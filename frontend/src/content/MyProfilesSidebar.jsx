import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Myprofiles.css";
import { AiFillSetting, AiOutlineCamera } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import LayoutwithoutFooter from "../components/LayoutwithoutFooter";

const MyProfilesSidebar = () => {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(
    "https://www.caltrain.com/files/images/2021-09/default.jpg"
  );
  const [formData, setFormData] = useState({
    username: "",
    education: "",
    country: "",
    state: "",
    religion: "",
    caste: "",
    profession: "",
    bio: "",
    income: "",
    marital_status: "",
    height: "",
    age: "",
  });
  const handleClick = () => {
    fileInputRef.current.click();
  };

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleFileSelect = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };
  const showimage = () => {
    imageRef.current.classList.add("show");
  };
  const handleClose = () => {
    imageRef.current.classList.remove("show");
  };

  return (
        
             <div className="flex flex-col py-8 px-4 shadow-md my-8 bg-white rounded-xl">
                <div className="flex flex-col items-center justify-center" >  

                    <Link to="/home/dashboard/profile" className="my-2 w-full">
                      <div className="w-full flex items-center">
                      <span className="mr-2"><BsFillPeopleFill className="myprofileside-left-icon" /></span> 
                        <h3 className="text-md lg:text-lg hover:text-primary">My Profile</h3>
                      </div>
                    </Link>
                
                    <Link to="/home/dashboard/connection" className="my-2 w-full">
                     <div className="flex items-center">
                      <span className="mr-2"><i className="bi bi-chat-heart"></i></span>
                      <h3 className="text-md lg:text-xl hover:text-primary">Connection</h3>
                      </div> 
                    </Link>
                
                    <Link to="/home/dashboard/notification" className="my-2 w-full">
                      <div className="flex items-center">
                       <span className="mr-2"><MdNotifications className="myprofileside-left-icon" /></span>
                      <h3 className="text-md lg:text-xl hover:text-primary">Notification</h3>
                     </div> 
                    </Link>
              
                    <Link to="/home/dashboard/events" className="my-2 w-full">
                      <div className="flex  items-center">
                      <span className="mr-2"><MdEventAvailable className="myprofileside-left-icon" /></span>
                      <h3 className="text-md lg:text-xl hover:text-primary">Events</h3>
                      </div>
                    </Link>
                
                    <Link to="/home/dashboard/settings" className="my-2 w-full">
                      <div className="flex items-center">
                      <span className="mr-2"><AiFillSetting className="myprofileside-left-icon me-2" /></span>
                      <h3 className="text-md lg:text-xl hover:text-primary">Settings</h3>
                      </div>
                    </Link>
                   
              </div>
            </div>
  );
};

export default MyProfilesSidebar;
