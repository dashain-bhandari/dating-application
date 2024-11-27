import React, { useContext, useEffect, useState } from "react";
import profileAvatar from "../../images/profileAvatar.png";
import ProfileTab from "./ProfileTab";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { VscDeviceCamera, VscUnverified } from "react-icons/vsc";
import { AuthContext } from "../../utils/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import defaultCover from "../../images/default-cover-4.jpg";
import axios from "axios";
import { AiFillEdit, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import coverImage from "../../images/cover.jpg";
import { BiEdit, BiPhotoAlbum } from "react-icons/bi";
import {
  ActionIcon,
  Box,
  Center,
  Group,
  SegmentedControl,
  Text,
  Title,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { GoVerified } from "react-icons/go";
import { toast } from "react-toastify";

const useStyle = createStyles((theme) => ({}));

function NewProfileSection(props) {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const CoverFileRef = useRef(null);
  const { user, setUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [isProfileEditable, setIsProfileEditable] = useState(true);
const location=useLocation()
console.log(location.pathname.includes('about'))
  const { connections } = useSelector((state) => state.connection);


console.log(connections)
  useEffect(() => {
    if (user.id == id) {
      return;
    }
  }, []);



  useEffect(() => {
    if (!user.avatarId) {
      setSelectedImage(
        "https://www.caltrain.com/files/images/2021-09/default.jpg"
      );
    } else {
      setSelectedImage(
        `${import.meta.env.VITE_BASE_URL}/user-avatar/${user && user.avatarId}`
      );
    }

    if (!user.banner && !user?.banner?.url) {
      setSelectedCoverFile(defaultCover);
    } else {
      setSelectedCoverFile(
        `${user?.banner?.url}`
      );
    }
  }, [user]);

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileSelect = (event) => {
  //    setSelectedImage(event.target.files[0]);
  //    setProfile(event.target.files[0]);
  // };

  const handleCoverEdit = () => {
    CoverFileRef.current.click();
  };

  // const CoverFileSeelct = (e) => {
  //    setSelectedCoverFile(e.target.files[0])
  // }

  const handleBannerChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return console.log("Please select a Banner");
    }

    const formData = new FormData();
    formData.append("banner", file);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/banner/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res?.data);
        toast.success("Cover updated");
        setUser({ ...user, banner: res?.data[0] });
        //  navigate('/home/dashboard');
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleProfileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return console.log("Please select a profile");
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({ ...user, avatarId: res.data.id });
        //  navigate('/home/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (value) => {
    console.log(value)
    value == "0" && navigate("/home/main/profile/me/about");
    value == "1" && navigate("/home/main/profile/me/photos");
  };

  const handleAbout=()=>{
    navigate("/home/main/profile/me/about");
  }

  const handlePhotos=()=>{
    navigate("/home/main/profile/me/photos");
  }

  const { classes, theme } = useStyle();

  return (
    <div className="w-full h-full bg-light md:pb-4 pl-2 z-0 mt-16 md:mt-16 lg:mt-0">
      <div className="h-full flex flex-col mx-auto  lg:px-4 lg:pt-16">
        <div className="absolute top-0 left-0 w-[100vw] h-[300px] overflow-hidden hidden lg:block"></div>
        <div
          className="relative border-none md:h-[300px] h-[180px] border-[var(--secondary)]  rounded-2xl bg-white sm:w-[100%] md:w-[80%] w-[100%] mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full h-full flex justify-center lg:rounded-sm items-center ">
            <img
              className="w-full h-full rounded-t-2xl object-cover object-center"
              src={selectedCoverFile}
              alt="cover-photo"
            />
            <div
              className={`absolute bg-[rgba(0,0,0,0,1)] px-4 cursor-pointer py-4 top-2 rounded-full z-30 right-2 ${
                isHovered ? "block" : "hidden"
              }`}
              onClick={() => handleCoverEdit()}
            >
              <Tooltip label="Change cover" withArrow radius={"md"}>
                <span className="absolute rounded-[50%] right-0 bottom-0 bg-screen px-2 py-2">
                  <BiEdit size={20} color="var(--primary)" />
                </span>
              </Tooltip>
              <input
                type="file"
                ref={CoverFileRef}
                className="hidden"
                onChange={(e) => handleBannerChange(e)}
              />
            </div>
          </div>
         <div className="w-full flex justify-center items-center">
          <div
            className="flex w-[150px] h-[150px] md:w-[150px] z-30 md:h-[150px] p-[5px] bg-white cursor-pointer xl:w-[170px] xl:h-[170px] rounded-[50%] absolute bottom-[-15%] lg:bottom-[-30%] xl:bottom-[-15%] "
            onClick={() => handleProfileClick()}
          >
            <img
              src={selectedImage}
              className="w-full h-full object-cover object-center rounded-[50%]"
            />
            <Tooltip label="Change Profile" withArrow radius={"md"}>
              <span className="absolute rounded-[50%] right-2 bottom-0 bg-screen px-2 py-2">
                <BsFillCameraFill size={20} color="var(--primary)" />
              </span>
            </Tooltip>
          </div>
         </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleProfileChange}
          />
        </div>

        <div className=" w-full md:w-[80%] mx-auto mt-0 pt-2 bg-white rounded-b-3xl shadow-sm">
          <div className="w-full flex md:flex-row flex-col justify-center md:justify-between items-center lg:items-start mt-4 mb-2">
            <div className="w-full flex flex-col items-center md:items-start  justify-center my-2 px-4 ">
              <Group align="center">
                <Title
                  transform="capitalize"
                  className="text-gray-600"
                  order={1}
                >
                  {user && user.profile && user.profile.fullname}
                </Title>
                {/* <Tooltip withArrow label="Verified"><ActionIcon><GoVerified color='var(--secondary)' size={20} /></ActionIcon></Tooltip> */}
                {user & user.emailVerified ? (
                  <Tooltip label="User Verified" withArrow size="sm">
                    <ActionIcon variant="transparent">
                      <GoVerified size={15} color="var(--secondary)" />
                    </ActionIcon>
                  </Tooltip>
                ) : (
                  <Tooltip label="Unverified" withArrow size="sm">
                    <ActionIcon variant="transparent">
                      <VscUnverified size={25} color="var(--secondary)" />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
              <Group spacing={0}>
                <Text size={"lg"} color="dimmed">
                  {user.email}
                </Text>
              </Group>
              <Title
                order={3}
                size={"xl"}
              >{`${connections.length} connections`}</Title>
            </div>

            {/* <div className='lg:w-[200px]'>
            <button className='w-full flex bg-[var(--secondary)] hover:bg-[var(--secondary-light)] rounded-xl px-4 py-2 border-none outline-none' onClick={() => setIsProfileEditable((prev) => !prev)}>
              <span><AiOutlineEdit size={25} color="white" /></span>
              <h3 className='w-full ml-2 font-bold text-white'>Edit Profile</h3>
            </button>
          </div> */}
          </div>
          {/* <div className='w-full flex justify-between px-2'>
            <span className='text-xl font-[500]'>24 years</span>
            <span className='text-xl font-[500]'>5ft 2in</span>
          </div> */}

          {/* 
            <div className='w-full flex justify-between px-2 my-2'>
            <span className='text-xl font-[500]'>Hindu, chhetri</span>
            <span className='text-xl font-[500]'>Web Developer</span>
            </div> */}

          {/* <div className='w-full flex justify-between'>  */}
          {/* <button className='px-2 py-2 xl:py-3 w-full rounded-xl mr-3 text-md text-white bg-[#E61A52]'>Connect Now </button> */}
          {/* <button className='px-2 py-2 xl:py-3 w-full shadow-md rounded-xl text-md'>Send Message</button> */}
          {/* </div> */}
        </div>

        <div className="w-[80%] mx-auto pt-4 ">
          {/* <div className='flex'> */}
          {/* <ProfileTab name={'About me'} link='/home/profile/me/about' /> */}
          {/* <ProfileTab name={'Photos'} link='/home/profile/me/photos' /> */}
          {/* <ProfileTab name={'Connections'} link="/home/profile/me/connections" /> */}
          {/* </div> */}

          <button className={` md:px-4 p-2 md:py-3 md:text-l outline-none font-medium text-sm rounded ${location.pathname.includes('about')? 'bg-[#EB4566] text-white':"bg-white text-gray-700"} hover:text-black`} onClick={handleAbout}>About me</button>
          <button className={` md:px-4 p-2 md:py-3 md:text-l outline-none font-medium text-sm   rounded ${location.pathname.includes('photos') ? 'bg-[#EB4566] text-white':"bg-white text-gray-700"} hover:text-black`} onClick={handlePhotos}>Photos</button>
          {/* <SegmentedControl
            transitionDuration={100}
            color={theme.colors.second[3]}
            size="lg"
            radius={"sm"}
            mt={10}
            pb={10}
            style={{ backgroundColor: "white" }}
            onChange={handleChange}
            data={[
              {
                value: "0",
                label: (
                  <Center>
                    <AiOutlineUser size={20} />
                    <Box ml={10} className="text-sm sm:text-base ">About me</Box>
                  </Center>
                ),
              },
              // {value: '1', label: 'Sent Request'},
              {
                value: "1",
                label: (
                  <Center>
                    <BiPhotoAlbum size={20} />
                    <Box ml={10} className="text-sm sm:text-base">Photos</Box>
                  </Center>
                ),
              },
            ]}
          /> */}
        </div>
      </div>
      <div className="w-full lg:w-[80%] mx-auto mt-2  md:mb-8">
        <Outlet context={[isProfileEditable]} />
      </div>
    </div>
  );
}

export default NewProfileSection;
