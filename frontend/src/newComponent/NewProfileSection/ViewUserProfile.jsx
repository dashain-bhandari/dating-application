import { useState } from "react";
import profileAvatar from "../../images/profileAvatar.png";
import bannerImage from "../../images/default-cover-4.jpg";
import ProfileTab from "./ProfileTab";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  VscDebugDisconnect,
  VscDeviceCamera,
  VscUnverified,
} from "react-icons/vsc";
import { AuthContext } from "../../utils/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import {
  AiOutlineDisconnect,
  AiOutlineEdit,
  AiOutlineSend,
  AiOutlineUser,
} from "react-icons/ai";
import { useEffect } from "react";
import { createConnectionRequest, getUserProfileById } from "../../utils/api";
import { useContext } from "react";
import { fetchVisitUserThunk } from "../../Store/thunk/visitUserThunk";
import {
  cancelConnectionRequestThunk,
  createConnectionRequestThunk,
  removeConnectionThunk,
} from "../../Store/thunk/connectionsThunk";
import { addConnectionRequest } from "../../Store/features/connectionSlice";
import { addToast } from "../../Store/features/toastSlice";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { current } from "@reduxjs/toolkit";

import {
  setConnectionReq,
  setIsConnected,
  setIsPending,
} from "../../Store/features/visitedProfile";

import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { GoVerified } from "react-icons/go";
import { MdOutlinePending } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { fetchConversationsThunk } from "../../Store/features/conversationSlice";
import {
  createConversationThunk,
  selectConversationById,
} from "../../Store/features/conversationSlice";
import {
  resetSelectedConversation,
  updateSelectedConversation,
} from "../../Store/features/selectedConversationSlice";
import { axiosInstance } from "../../http";
import { ClipLoader } from "react-spinners";
import { chatContext } from "../../utils/context/ChatContext";

const useStyle = createStyles((theme) => ({}));

function ViewUserProfile(props) {
  const { classes, theme } = useStyle();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const CoverFileRef = useRef(null);
  const [profile, setProfile] = useState("");
  const { user, setUser, paymentStatus, setPaymentStatus, useStates } =
    useContext(AuthContext);
  const [color, setColor] = useState("var(--primary)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [created, setCreated] = useState(false);
  const { conversations } = useSelector((state) => state.conversation);
  const location=useLocation()
  console.log(useStates);
  console.log(user);
  console.log(user);
  console.log(paymentStatus);

  useEffect(() => {
    if (user.id == id) {
      navigate("/home/main/profile/me/about");
    }
  
  }, []);


 

  useEffect(() => {
    dispatch(fetchVisitUserThunk(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    if (created) {
      console.log("hii");
      const s = async () => {
        dispatch(fetchConversationsThunk);
        await handleSendMessage();
      };
      s();
    }
  }, [created]);

  console.log(paymentStatus);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const [submitting, setSubmitting] = useState(false)
  const { currentVisitedUser, loading } = useSelector((state) => state.visitProfile);
  console.log(currentVisitedUser);
  const sendConnectionRequest = () => {
    setSubmitting(true)
    console.log("creating request");
    console.log(id);
    createConnectionRequest(id)
      .then((res) => {
        dispatch(addConnectionRequest(res.data));
        dispatch(
          addToast({ kind: "SUCCESS", msg: "Request Sent Successfully" })
        );
        dispatch(setIsPending(true));
        dispatch(setConnectionReq(res.data))
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(addToast({ kind: "ERROR", msg: "Cannot send request" }));
        setSubmitting(false);
      });
    // dispatch(createConnectionRequestThunk(id));
  };
  //  const recepient = currentVisitedUser && currentVisitedUser.connection && currentVisitedUser.connection.sender.id === user.id ? currentVisitedUser.connection.receiver : currentVisitedUser.connection.sender;
  const { connection, setConnections } = useContext(chatContext);

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getConnection = async () => {
      try {
        setRefresh(false);
        const { data } = await axiosInstance.get(`connection`)
        console.log(data);
        if (data) {
          console.log(data);
          let newA = []
          newA = data.length > 0 ? data.map((item) => (
            user?.id == item?.sender?.id ? item?.receiver?.id : item?.sender?.id
          )) : []
          console.log(newA)
          setConnections(newA)
        }
      } catch (error) {
        console.log(error.message);// setConnected(false);
      }

    }
    getConnection()
  }, [refresh])

  const handleConnectionDisconnect = () => {
    dispatch(
      removeConnectionThunk(
        currentVisitedUser &&
        currentVisitedUser.isConnected &&
        currentVisitedUser.isConnected.id
      )
    );
    dispatch(setIsConnected(false));
    setRefresh(true)
    // getConnection()

  };

  const [content, setContent] = useState("");

  const [attachments, setAttachments] = useState([]);

  const createConversation = async () => {
    const formData = new FormData();
    formData.append("userId", currentVisitedUser && currentVisitedUser.id);
    formData.append("message", "");

    try {
      dispatch(resetSelectedConversation());
      dispatch(createConversationThunk(formData));

      setContent("");

      setAttachments([]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const createC = async () => {
      const requiredUser =
        currentVisitedUser &&
          currentVisitedUser.isConnected &&
          currentVisitedUser.isConnected.sender.id == user.id
          ? currentVisitedUser && currentVisitedUser.isConnected?.receiver
          : currentVisitedUser && currentVisitedUser.isConnected?.sender;
      const requiredConversationId = conversations.find((cov) => {
        console.log(cov);
        return (
          cov.creator.id == requiredUser?.id ||
          cov.recepient.id == requiredUser?.id
        );
      });
      if (!requiredConversationId && currentVisitedUser.isConnected) {
        console.log("create conv");
        await createConversation();
      }
    };
    createC();
  }, [currentVisitedUser]);




  const handleSendMessage = async () => {
    console.log(currentVisitedUser.isConnected)

    if (currentVisitedUser.isConnected) {
      const requiredUser =
        currentVisitedUser &&
          currentVisitedUser.isConnected &&
          currentVisitedUser.isConnected?.sender?.id == user.id
          ? currentVisitedUser && currentVisitedUser.isConnected?.receiver
          : currentVisitedUser && currentVisitedUser.isConnected?.sender;
      const requiredConversationId = conversations.find((cov) => {
        console.log(cov);
        return (
          cov.creator.id == requiredUser.id ||
          cov.recepient.id == requiredUser?.id
        );
      });
      console.log(conversations);
      console.log(requiredUser);
      console.log(requiredConversationId);

      // if ((user.id == requiredConversationId?.creator?.id && requiredConversationId?.deletedByCreator)) {
      //   try {
      //     const conversation = await axiosInstance.get(`conversations/updateDel/${requiredConversationId.id}`, { data: "deletedByCreator" });
      //     console.log(conversation)
      //   } catch (error) {

      //     console.log(error.message);

      //   }
      // }
      // if ((user.id == requiredConversationId?.recepient?.id && requiredConversationId?.deletedByRecepient)) {
      //   try {
      //     const conversation = await axiosInstance.get(`conversations/updateDel/${requiredConversationId.id}`, { data: "deletedByRecepient" });
      //     console.log(conversation)
      //   } catch (error) {

      //     console.log(error.message);

      //   }
      // }
      dispatch(
        updateSelectedConversation({
          conversation: requiredConversationId
            ? requiredConversationId
            : requiredUser,
          type: requiredConversationId ? "conversation" : "createConversation",
        })
      );
      requiredConversationId &&
        navigate(`/home/main/chat/conversation/${requiredConversationId.id}`);
    }

    else {
      dispatch(addToast({ msg: "You can send message to only connected users.", kind: "WARNING" }))
    }
    // navigate(`/home/chat/conversation/`);
  };





  const [value, setValue] = useState("0");
  const handleChange = (value) => {
    value == "0" && navigate(`/home/main/profile/other/${id}/about`);
    //add payment conditioning here.
    value == "1" &&
      paymentStatus == "active" &&
      navigate(`/home/main/profile/other/${id}/photos`);

    value == "1" &&
      (paymentStatus == "unpaid" || paymentStatus == "expired") &&
      navigate(`/home/payment`);
  };

  const handleAbout=()=>{
    navigate(`/home/main/profile/other/${id}/about`);
  }

  const handlePhotos=()=>{
    paymentStatus == "active" && navigate(`/home/main/profile/other/${id}/photos`);
    (paymentStatus == "unpaid" || paymentStatus == "expired") &&
    navigate(`/home/payment`);

  }

  useEffect(() => {
    const updateCount = async () => {
      console.log(currentVisitedUser);
      if (currentVisitedUser && currentVisitedUser.id) {
        console.log(currentVisitedUser.id);
        if (
          user.profiles &&
          user.profiles.length >= 20 &&
          user.profiles.includes(currentVisitedUser.id)
        ) {
          console.log("true");
          return;
        } else {
          try {
            const data = await axiosInstance.put("users/profileVisits", {
              id: currentVisitedUser.id,
            });
            console.log(data?.data);
            data?.data && setUser(data.data);
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    };

    if (user.id != currentVisitedUser.id) {
      if (user.profiles && user.profiles.includes(currentVisitedUser.id)) {
        return;
      } else {
        updateCount();
      }
    }
  }, [currentVisitedUser]);

  const handleRequestCancel = (id) => {
    dispatch(cancelConnectionRequestThunk(id));
    dispatch(setIsPending(false));
  };

  return (
    <>
      {
        loading ? (<>

          <div className="w-full h-screen flex justify-center items-center">
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={{}}
              size={75}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <>

          </></>) : (<>

            {" "}
            <div className="h-full w-full bg-light md:pb-4">
              <div className="h-full flex flex-col mx-auto pb-2 lg:pt-16 lg:px-4 lg:rounded-sm ">
                <div className="absolute top-0 left-[0] w-[100vw] h-[300px] overflow-hidden"></div>
                <div className="relative border-[1px] h-[300px] border-[var(--secondary)] rounded-sm bg-white w-[100%] lg:w-[80%] mx-auto">
                  <div className="w-full h-full flex justify-center rounded-sm items-center bg-red-100">
                    <img
                      className="w-full h-full object-cover object-center z-20 rounded-sm"
                      src={
                        currentVisitedUser && currentVisitedUser.banner
                          ? `${import.meta.env.VITE_BASE_URL}/banner/${currentVisitedUser.banner.fileName
                          }`
                          : bannerImage
                      }
                      alt=""
                    />
                    {/* <h1 className='text-2xl md:text-3xl text-center font-bold text-[rgba(0, 0, 0, 0.9)]'>Life is all about Peace and beauty.</h1> */}
                    {/* <div className={`absolute px-2 py-2 top-2 right-2 ${isHovered ? 'block' : 'hidden'}`} onClick={() => handleCoverEdit()}>
                 <AiOutlineEdit size={30} color="var(--primary)" />
                 <input type='file'  className='hidden' onChange={(e) => setSelectedCoverFile(e)} />
              </div> */}
                  </div>
                  <div className="flex z-30 absolute bottom-[-10%] lg:bottom-[-15%] xl:bottom-[-15%] w-full justify-center items-center">
                    <div className="p-1 h-20 w-20 sm:h-32 sm:w-32 shrink-0 bg-white cursor-pointe rounded-full">
                      <img
                        src={
                          currentVisitedUser &&
                          (currentVisitedUser.avatarId
                            ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${currentVisitedUser.avatarId
                            }`
                            : profileAvatar)
                        }
                        alt=""
                        className="w-full h-full object-cover object-center rounded-[50%]"
                      />
                    </div>

                    {/* <span className='absolute rounded-[50%] right-0 bottom-0 bg-screen'>
                <VscDeviceCamera size={30} color='var(--primary)' />
              </span> */}
                  </div>
                </div>

                <div className=" w-full md:w-[80%] mx-auto pt-10 flex flex-col md:flex-row items-center justify-between">
                  <Stack spacing={0}>
                    <Group align="center">
                      <Title transform="capitalize" className="text-gray-600">
                        {currentVisitedUser &&
                          currentVisitedUser.profile &&
                          currentVisitedUser.profile.fullname}
                      </Title>
                      {/* <Tooltip withArrow label="Verified"><ActionIcon><GoVerified color='var(--secondary)' size={20} /></ActionIcon></Tooltip> */}
                      {currentVisitedUser && currentVisitedUser.emailVerified ? (
                        <Tooltip label="User Verified" withArrow size="sm">
                          <ActionIcon variant="transparent">
                            <GoVerified size={15} color="var(--secondary)" />
                          </ActionIcon>
                        </Tooltip>
                      ) : (
                        <Tooltip label="Unverified" withArrow size="sm">
                          <ActionIcon variant="transparent">
                            <VscUnverified size={15} color="var(--secondary)" />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </Group>
                    <Stack spacing={0}>
                      <Text size={"lg"} color="dimmed">
                        {currentVisitedUser && currentVisitedUser.email}
                      </Text>
                      <Text size={"lg"} transform="capitalize">{`${currentVisitedUser &&
                        currentVisitedUser.profile &&
                        currentVisitedUser.profile.caste
                        }, ${currentVisitedUser &&
                        currentVisitedUser.profile &&
                        currentVisitedUser.profile.religion
                        }`}</Text>
                    </Stack>
                  </Stack>

                  <Stack style={{ flexBasis: "30%" }}>
                    {currentVisitedUser.isConnected ? (
                      <Button
                        fullWidth
                        leftIcon={<AiOutlineDisconnect size={20} />}
                        style={{ backgroundColor: "var(--secondary)" }}
                        onClick={() => handleConnectionDisconnect()}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <>
                        {currentVisitedUser.isPending ? (
                          <Button
                            fullWidth
                            style={{ backgroundColor: "var(--secondary)" }}
                            leftIcon={<MdOutlinePending size={20} />}
                            onClick={() => handleRequestCancel(currentVisitedUser?.connectionReq?.id)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            style={{ backgroundColor: "var(--secondary)" }}
                            fullWidth
                            leftIcon={<VscDebugDisconnect size={20} />}
                            onClick={() => sendConnectionRequest()}
                            disabled={submitting}
                          >

                            {submitting ? <Loader className="animate-spin" /> : "Connect"}
                          </Button>
                        )}
                      </>
                    )}
                    {/* <button className='px-2 py-2 xl:py-3 w-full rounded-xl mr-3 text-md text-white lg:mb-2 bg-[#E61A52]' onClick={() => sendConnectionRequest()}>Connect Now </button> */}
                    {
                      <Button
                        leftIcon={<AiOutlineSend size={20} color="" />}
                        fullWidth
                        variant="outline"
                        onClick={() => handleSendMessage()}
                      >
                        Send Message
                      </Button>
                    }
                  </Stack>
                </div>

                <div className="w-[80%] mx-auto border-t-2 border-[rgba(0,0,0,0.2)] mt-2">
                  {/* <div className='flex'>
             <ProfileTab name={'About'} link={`/home/main/profile/${id}/about`} />
             <ProfileTab name={'Photos'} link={`/home/main/profile/${id}/photos`} />
             {/* <ProfileTab name={'Connections'} link="/home/profile/me/connections" /> */}
                  {/* </div> */}

                  <button className={`mt-2 px-4 py-3 ${location.pathname.includes('about')? 'bg-[#7C4BA1] text-white':"bg-white text-gray-700"} hover:text-black`} onClick={handleAbout}>About me</button>
                  <button className={` px-4 py-3   ${location.pathname.includes('photos') ? 'bg-[#7C4BA1] text-white':"bg-white text-gray-700"} hover:text-black`} onClick={handlePhotos}>Photos</button>

                  {/* <SegmentedControl
                    transitionDuration={100}
                    color={theme.colors.second[3]}
                    size="lg"
                    radius={"sm"}
                    py={10}
                    style={{ backgroundColor: "white" }}
                    onChange={handleChange}
                    data={[
                      {
                        value: "0",
                        label: (
                          <Center>
                            <AiOutlineUser size={20} />
                            <Box ml={10} className="text-sm sm:text-base">
                              About me
                            </Box>
                          </Center>
                        ),
                      },
                      // {value: '1', label: 'Sent Request'},
                      {
                        value: "1",
                        label: (
                          <Center>
                            <BiPhotoAlbum size={20} />
                            <Box ml={10} className="text-sm sm:text-base">
                              Photos
                            </Box>
                          </Center>
                        ),
                      },
                    ]}
                  /> */}
                </div>
              </div>
              <div className="w-full md:w-[80%] mx-auto md:mb-8">
                <Outlet />
              </div>
            </div>

          </>)
      }
    </>
  );
}

export default ViewUserProfile;
