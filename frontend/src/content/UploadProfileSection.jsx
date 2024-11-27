import React, { useEffect, useRef, useState } from "react";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { VscDeviceCamera } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UploadProfileSection.css";
import ProgressBar from "./Progressbar";
import { axiosInstance } from "../http";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Store/features/authSlice";

const UploadProfileSection = (props) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://www.caltrain.com/files/images/2021-09/default.jpg"
  );

  const { user } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCircleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileSelect = (event) => {
    setSelectedImage(event.target.files[0]);
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    if (user.avatarId) {
      setImageUrl(`${import.meta.env.VITE_BASE_URL}/v1/api/user-avatar/${user.avatarId}`);
    }
    console.log(user.avatarId);
  }, [user]);

  const handelProfileUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedImage);

    axios
      .post("http://localhost:3000/v1/api/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const userWithNewAvatarId = { ...user, avatarId: res.data.id };
        console.log(userWithNewAvatarId);
        dispatch(setCurrentUser(userWithNewAvatarId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="UploadProfileSection">
        <ProgressBar />
        <h1>"Please Upload your Profile Picture"</h1>
        <div className="container">
          <div className="upload-form">
            <div className="upload-box">
              {selectedImage ? (
                <img src={imageUrl} alt="" className="profilepic" />
              ) : (
                ""
              )}
              <div className="ppupload" onClick={handleCircleClick}>
                <VscDeviceCamera className="profilecamera" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
            <div className="profile-bio">
              <h2>{user && user.username}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="UploadProfileSection-btn">
        <Link to="/preferencedetails">
          {" "}
          <button type="reset" className="btnprev">
            <HiChevronDoubleLeft /> Prev
          </button>
        </Link>

        <button
          type="submit"
          className="btnnext"
          onClick={(e) => handelProfileUpload(e)}
        >
          Next <HiChevronDoubleRight />
        </button>
      </div>
    </>
  );
};
export default UploadProfileSection;
