// import { Icon } from "@iconify/react";
// import React, { useState, useContext, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";
// import { useNavigate, useParams } from "react-router-dom";
// import profile1 from "../images/exploreProfile/profile1.png";
// import profile2 from "../images/exploreProfile/profile2.png";
// import profile3 from "../images/exploreProfile/profile3.png";
// import profile4 from "../images/exploreProfile/profile4.png";
// import { GlobalContext } from "../utils/context/GlobalContext";
// import profileAvatar from "../images/olp_avatar.avif";
// import { AuthContext } from "../utils/context/AuthContext";
// import {
//   MdCallMade,
//   MdCallMissedOutgoing,
//   MdCallReceived,
//   MdOutlineCallMissed,
// } from "react-icons/md";

// export default function RecentChat() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useContext(AuthContext);
//   const [recepient, setRecepient] = useState("");
//   const [isOnline, setIsOnline] = useState("");
//   const { id } = useParams();

//   const [conver, setConver] = useState([]);
//   const isDesktop = useMediaQuery({ query: "(max-width: 992px)" });

//   const { selectedConversation, type } = useSelector(
//     (state) => state.selectedConversation
//   );
//   const { conversations } = useSelector((state) => state?.conversation);

//   const { refresh, setRefresh } = useContext(GlobalContext);

//   console.log(conversations);

//   useEffect(() => {
//     setRefresh(0);
//     if (type == "createConversation" && conversations) {
//       setConver([
//         { ...selectedConversation, type: "createConversation" },
//         ...conversations,
//       ]);
//     } else {
//       setConver([...conversations]);
//       !isDesktop &&
//         selectedConversation.id &&
//         conversations.length > 0 &&
//         //navigate(`/home/main/chat/conversation/${conversations[0].id}`);
//         navigate(`/home/main/chat/conversation/${selectedConversation.id}`);
//     }
//   }, [selectedConversation, conversations, refresh]);
//   console.log("conver check", conver);

//   useEffect(() => {
//     if (!conver.type) {
//       setRecepient(
//         user?.id == (conver && conver?.creator?.id)
//           ? conver && conver?.recepient
//           : conver && conver?.creator
//       );
//     } else {
//       setRecepient(conver);
//     }
//   }, [conver]);
//   const { activeUsers } = useContext(GlobalContext);

//   useEffect(() => {
//     if (activeUsers && recepient) {
//       console.log("activeusers", activeUsers);
//       console.log("recepient", recepient);
//       const isAvailable = activeUsers.find((conn) => conn == recepient.id);
//       if (isAvailable) {
//         console.log(isAvailable);
//         setIsOnline(true);
//       } else {
//         setIsOnline(false);
//       }
//     }
//   }, [activeUsers, recepient]);

//   return (
//     <div className="w-full">
//       <h1 className="text-base text-[#555555] pb-4">Recent chats</h1>
//       <div className="bg-white w-full p-4 flex flex-col gap-4">
//         {conversations.map((item, index) => (
//           <div key={index}>
//             <div className="flex items-center justify-between w-full">
//               <div className="flex items-center gap-4">
//                 <div className="h-12 w-12 rounded-full overflow-hidden">
//                   <img
//                     src={`${
//                       recepient && recepient.avatarId
//                         ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
//                             recepient && recepient.avatarId
//                           }`
//                         : profileAvatar
//                     }`}
//                     alt="profile1"
//                     className="h-full w-full object-cover object-top "
//                   />
//                 </div>
//                 <div>
//                   <h1 className="text-base font-semibold">
//                     {" "}
//                   {item?.recepient.profile.fullname}
//                   </h1>
//                   {console.log(recepient)}
//                   <div className="text-sm">
//                     {conver && (
//                       <>
//                         {conver.type === "createConversation" && (
//                           <h3 className="text-md">Create new Conversation</h3>
//                         )}
//                         {conver.lastMessageSent &&
//                           conver.lastMessageSent.content && (
//                             <h3
//                               className={`text-sm line-clamp-1 ${
//                                 conver.read ? "" : "font-bold"
//                               }`}
//                             >
//                               {conver.lastMessageSent.content}
//                             </h3>
//                           )}

//                         {conver.lastMessageSent &&
//                           !conver.lastMessageSent.content &&
//                           !conver.lastMessageSent.call && (
//                             <h3 className="flex items-center">
//                               <CiImageOn size={25} />
//                               <span className="ml-2">File message</span>
//                             </h3>
//                           )}

//                         {conver.lastMessageSent &&
//                           conver.lastMessageSent.call && (
//                             <div className="w-full">
//                               <span className="flex w-full items-center">
//                                 {conver.lastMessageSent.call.status ==
//                                   "missed" ||
//                                 conver.lastMessageSent.call.status ==
//                                   "initiate" ||
//                                 conver.lastMessageSent.call.status ==
//                                   "rejected" ? (
//                                   <>
//                                     {user.id ===
//                                     conver.lastMessageSent.author.id ? (
//                                       <>
//                                         <MdCallMissedOutgoing
//                                           size={25}
//                                           color="var(--primary)"
//                                         />
//                                         <span className="ml-1 text-sm">
//                                           Call Not Received
//                                         </span>
//                                       </>
//                                     ) : (
//                                       <>
//                                         <MdOutlineCallMissed
//                                           size={25}
//                                           color="var(--primary)"
//                                         />
//                                         <span className="ml-1 text-sm">
//                                           Missed a Call
//                                         </span>
//                                       </>
//                                     )}
//                                   </>
//                                 ) : (
//                                   <>
//                                     {user.id ===
//                                     conver.lastMessageSent.author.id ? (
//                                       <>
//                                         <MdCallMade
//                                           size={20}
//                                           color="var(--secondary)"
//                                         />
//                                         <span className="ml-1 text-sm">
//                                           Call finished.
//                                         </span>
//                                       </>
//                                     ) : (
//                                       <>
//                                         <MdCallReceived
//                                           size={20}
//                                           color="var(--secondary)"
//                                         />
//                                         <span className="ml-1 text-sm">
//                                           Call received
//                                         </span>
//                                       </>
//                                     )}
//                                   </>
//                                 )}
//                               </span>
//                             </div>
//                           )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <Icon
//                   icon="lets-icons:back"
//                   className="text-2xl text-gray-500"
//                 />
//               </div>
//             </div>
//             <div className="h-0.5 w-[90%] my-2 bg-gray-300 justify-center items-center mx-auto"></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const profileitems = [
//   {
//     img: profile1,
//     name: "Raj Sharma",
//     age: "23 years",
//     address: "kathmandu",
//   },
//   {
//     img: profile2,
//     name: "Hari Tamang",
//     age: "23 years",
//     address: "kathmandu",
//   },
//   {
//     img: profile3,
//     name: "Loki Chaualgain",
//     age: "24 years",
//     address: "kathmandu",
//   },
//   {
//     img: profile4,
//     name: "Rahul Chhetri",
//     age: "23 years",
//     address: "kathmandu",
//   },
// ];

// change

import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import profileAvatar from "../images/olp_avatar.avif";
import { GlobalContext } from "../utils/context/GlobalContext";
import { AuthContext } from "../utils/context/AuthContext";
import {
  MdCallMade,
  MdCallMissedOutgoing,
  MdCallReceived,
  MdOutlineCallMissed,
} from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { updateSelectedConversation } from "../Store/features/selectedConversationSlice";
import { chatContext } from "../utils/context/ChatContext";
import { fetchVisitUserThunk } from "../Store/thunk/visitUserThunk";
import { axiosInstance } from "../http";
import noDataFound from "../images/nodata.jpg";

export default function RecentChat() {
  const {connected,setConnected,connections}=useContext(chatContext)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [recepient, setRecepient] = useState("");
  const [isOnline, setIsOnline] = useState("");
  const { id } = useParams();

  const [conver, setConver] = useState([]);
  const isDesktop = useMediaQuery({ query: "(max-width: 992px)" });

  const { selectedConversation, type } = useSelector(
    (state) => state.selectedConversation
  );
  const { conversations } = useSelector((state) => state?.conversation);

  const { refresh, setRefresh } = useContext(GlobalContext);

  console.log(conversations);


  // const {setConnections}=useContext(chatContext)
  // useEffect(()=>{
  //   const getConnection = async () => {
  //     try {
  //       const { data } = await axiosInstance.get(`connection`)
  //       console.log(data);
  //       if (data) {
  //         console.log(data);
  //         let newA = []
  //         newA = data.length > 0 ? data.map((item) => (
  //           user?.id == item?.sender?.id ? item?.receiver?.id : item?.sender?.id
  //         )) : []
  //         console.log(newA)
  //         setConnections(newA)
  //       }
  //     } catch (error) {
  //       console.log(error.message);// setConnected(false);
  //     }
  
  //   }
  //   getConnection()
  // },[])

  useEffect(() => {
    setRefresh(0);
    if (type == "createConversation" && conversations) {
      setConver([
        { ...selectedConversation, type: "createConversation" },
        ...conversations,
      ]);
    } else {
      setConver([...conversations]);
      // !isDesktop &&
      //   selectedConversation.id &&
      //   conversations.length > 0 &&
        //navigate(`/home/main/chat/conversation/${conversations[0].id}`);
       // navigate(`/home/main/chat/conversation/${selectedConversation.id}`);
    }
  }, [selectedConversation, conversations, refresh]);
  console.log("conver check", conver);

  useEffect(() => {
    if (!conver.type) {
      setRecepient(
        user?.id == (conver && conver?.creator?.id)
          ? conver && conver?.recepient
          : conver && conver?.creator
      );
    } else {
      setRecepient(conver);
    }
  }, [conver]);
  const { activeUsers } = useContext(GlobalContext);

  useEffect(() => {
    if (activeUsers && recepient) {
      console.log("activeusers", activeUsers);
      console.log("recepient", recepient);
      const isAvailable = activeUsers.find((conn) => conn == recepient.id);
      if (isAvailable) {
        console.log(isAvailable);
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    }
  }, [activeUsers, recepient]);



  const handleChatPersonClick = async(item,recepient) => {
    console.log(connections)
    // if(connections && connections.length>0 && connections.find((i)=>i==item?.recepient?.id||i==item?.creator?.id)){
    //   console.log("hiii")
    //   setConnected(true)
    // }
    // else{
    //   setConnected(false)
    // }
    // dispatch(fetchVisitUserThunk(recepient?.id));
    if(connections && connections.length>0 && connections.find((i)=>i==item?.recepient?.id||i==item?.creator?.id)){
      console.log("hiii")
      setConnected(true)
    }
    else{
      setConnected(false)
    }
    if(!item?.lastMessageSent?.read){
      try {
        const conversation = await axiosInstance.post(`/message/read/${item?.lastMessageSent?.id}`);
        console.log(conversation);
  
      } catch (error) {
        console.log(error.message);
      }
    }
    dispatch(updateSelectedConversation({ conversation: conver, type: "" }));
    navigate(`/home/main/chat/conversation/${item?.id}`);
  };


  const [filteredConv, setFilteredCov] = useState([]);

  useEffect(() => {
    const filterConv = () => {
      if (conver && conver.length > 0) {
        const newA = conver.filter((item) => {
          if (item.recepient?.id == user?.id && !item?.deletedByRecepient) {
            console.log("hii")
            return item;
          }
          if (item.creator?.id == user?.id && !item?.deletedByCreator) {
            console.log("hii")
            return item;
          }
        })
        console.log(newA)
        setFilteredCov(newA)
      }
    }
    filterConv();
  }, [conver])


  return (
    <div className="w-full">
      <h1 className="text-base text-black pb-4 font-semibold">Recent chats</h1>
      {filteredConv && filteredConv.length == 0 &&  (
        <div className="bg-white xl:max-w-[52em] h-[16em] flex justify-center items-center border rounded-2xl">
                 <img src={noDataFound} alt="no-data" className="w-20" />
        </div>
      )}
      {filteredConv && filteredConv.length > 0 && filteredConv.map((item, index) => {
        const recepient =
          user.id === item?.creator?.id ? item?.recepient : item?.creator;
        return (
          <div
            key={index}
            onClick={() => handleChatPersonClick(item,recepient)}
            className="cursor-pointer bg-white hover:!bg-[#EAF3FF] w-full p-4 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={`${
                      recepient && recepient?.avatarId
                        ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                            recepient?.avatarId
                          }`
                        : profileAvatar
                    }`}
                    alt="profile1"
                    className="h-full w-full object-cover object-top "
                  />
                </div>
                
                <div>
                  <h1 className="text-base font-semibold">
                    {recepient?.profile?.fullname}
                  </h1>
                  <div className="text-sm">
                    {item.type === "createConversation" && (
                      <h3 className="text-md">Create new Conversation</h3>
                    )}
                    {item.lastMessageSent && item.lastMessageSent?.content && (
                      <h3
                      className={`text-sm line-clamp-1 ${item.lastMessageSent?.author?.id==user.id?  "" : item.lastMessageSent?.read?"":"font-bold"
                        }`}
                    >
                        {item.lastMessageSent.content}
                      </h3>
                    )}
                    {item.lastMessageSent &&
                      !item.lastMessageSent?.content &&
                      !item.lastMessageSent?.call && (
                        <h3 className="flex items-center">
                          <CiImageOn size={25} />
                          <span className="ml-2">File message</span>
                        </h3>
                      )}
                    {item.lastMessageSent && item.lastMessageSent.call && (
                      <div className="w-full">
                        <span className="flex w-full items-center">
                          {item.lastMessageSent.call.status === "missed" ||
                          item.lastMessageSent.call.status === "initiate" ||
                          item.lastMessageSent.call.status === "rejected" ? (
                            <>
                              {user.id === item.lastMessageSent.author.id ? (
                                <>
                                  <MdCallMissedOutgoing
                                    size={25}
                                    color="var(--primary)"
                                  />
                                  <span className="ml-1 text-sm">
                                    Call Not Received
                                  </span>
                                </>
                              ) : (
                                <>
                                  <MdOutlineCallMissed
                                    size={25}
                                    color="var(--primary)"
                                  />
                                  <span className="ml-1 text-sm">
                                    Missed a Call
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {user?.id === item.lastMessageSent?.author?.id ? (
                                <>
                                  <MdCallMade
                                    size={20}
                                    color="var(--secondary)"
                                  />
                                  <span className="ml-1 text-sm">
                                    Call finished.
                                  </span>
                                </>
                              ) : (
                                <>
                                  <MdCallReceived
                                    size={20}
                                    color="var(--secondary)"
                                  />
                                  <span className="ml-1 text-sm">
                                    Call received
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Icon
                  icon="lets-icons:back"
                  className="text-2xl text-gray-500"
                />
              </div>
            </div>
            <div className="h-0.5 w-[90%] my-2 bg-gray-300 justify-center items-center mx-auto"></div>
          </div>
        );
      })}
    </div>
  );
}
