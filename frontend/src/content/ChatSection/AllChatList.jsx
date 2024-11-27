import { Icon } from "@iconify/react";
import React, { useContext, useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import {
  MdCallMade,
  MdCallMissedOutgoing,
  MdCallReceived,
  MdOutlineCallMissed,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import profileAvatar from "../../images/olp_avatar.avif";
import { updateSelectedConversation } from "../../Store/features/selectedConversationSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { GlobalContext } from "../../utils/context/GlobalContext";
import { fetchConversationsThunk } from "../../Store/features/conversationSlice";
import { axiosInstance } from "../../http";
import { chatContext } from "../../utils/context/ChatContext";
import NoDataFound from "../../newComponent/NoDataFound/NoDataFound";
import { fetchVisitUserThunk } from "../../Store/thunk/visitUserThunk";

export default function AllChatList() {

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

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);


  const {setConnections}=useContext(chatContext)
  useEffect(()=>{
    const getConnection = async () => {
      try {
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
  },[])

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
      const isAvailable = activeUsers.find((conn) => conn == recepient?.id);
      if (isAvailable) {
        console.log(isAvailable);
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    }
  }, [activeUsers, recepient]);



  const handleChatPersonClick = async (item,recepient) => {
    console.log("hiii")
    // const { data } = await axiosInstance.get(`connection/${item?.recepient?.id}`)
    // console.log(data)
    // if (data) {
    //   setConnected(true)
    // }
    // else {
    //   setConnected(false);
    // }
    console.log(user.id)
    console.log(connections)
    console.log(recepient?.id)
    console.log(item?.recepient?.id)
    // dispatch(fetchVisitUserThunk(recepient.id));
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
    dispatch(updateSelectedConversation({ conversation: item, type: "" }));
   selectedConversation && navigate(`/home/main/chat/conversation/${item?.id}`);
  };

  // useEffect(()=>{
  //   const getConnection = async () => {
  //     if (selectedConversation) {
  //       try {
      
  //         const { data } = await axiosInstance.get(`connection/${selectedConversation.recepient.id}`)
  //         console.log(data)
  //         if (data) {
  //           setConnected(true)
  //         }
  //         else {
  //           setConnected(false);
  //         }
    
  //       } catch (error) {
         
  //         console.log(error.message);
  //          setConnected(false);
  //       }
  //     }
  //   }
  //   getConnection()
  // },[selectedConversation])

  const [filteredConv, setFilteredCov] = useState([]);

  useEffect(() => {
    const filterConv = () => {
      if (conver && conver.length > 0) {
        const newA = conver.filter((item) => {
          if (item?.recepient?.id == user.id && !item?.deletedByRecepient) {
            console.log("hii")
            return item;
          }
          if (item?.creator?.id == user.id && !item?.deletedByCreator) {
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

  const handleDelete = async (item) => {
    if (user) {
      console.log(user.id)
      try {
        console.log(item);
        await axiosInstance.post(`/conversations/delete/${item}`);
        setRefresh(1)

        // dispatch(resetSelectedConversation())

      }
      catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="bg-light p-6">
      <div className="bg-white rounded-2xl overflow-hidden   sm:mt-6 mt-10">

      {filteredConv && filteredConv.length > 0 && filteredConv.map((item, index) => {
        const recepient =
          user.id === item?.creator?.id ? item.recepient : item.creator;
        return (
          <div key={index} onClick={() => handleChatPersonClick(item,recepient)}>
            <div className="bg-white w-full p-4 flex flex-col gap-4 mt-2">
              <div>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={`${recepient && recepient?.avatarId
                            ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${recepient?.avatarId
                            }`
                            : profileAvatar
                          }`}
                        alt="profile1"
                        className="h-full w-full object-cover object-top "
                      />
                    </div>
                    <div>
                      <h1 className="text-base font-semibold">
                        {" "}
                        {recepient?.profile?.fullname}
                      </h1>
                      <div className="text-sm">
                        {item.type === "createConversation" && (
                          <h3 className="text-md">Create new Conversation</h3>
                        )}
                        {item.lastMessageSent &&
                          (
                            <h3
                              className={`text-sm line-clamp-1 ${item.lastMessageSent?.author?.id==user.id?  "" : item.lastMessageSent?.read?"":"font-bold"
                                }`}
                            >
                              {item.lastMessageSent?.content}
                            </h3>
                          )}
                        {item.lastMessageSent &&
                          !item.lastMessageSent.content &&
                          !item.lastMessageSent.call && (
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
                                item.lastMessageSent.call.status ===
                                "rejected" ? (
                                <>
                                  {user.id ===
                                    item.lastMessageSent.author.id ? (
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
                                  {user.id ===
                                    item.lastMessageSent.author.id ? (
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
                  <div className="flex gap-2 items-center">
                    {/* <div className="cursor-pointer" onClick={()=>handleDelete(item.id)}>
                     <Icon
                      icon="ic:baseline-delete"
                      className="text-2xl text-red-500"
                    />
                    </div> */}
                    <Icon
                      icon="lets-icons:back"
                      className="text-2xl text-gray-500"
                    />
                  </div>
                </div>
                <div className="h-0.5 w-[90%] my-2 bg-gray-300 justify-center items-center mx-auto"></div>
              </div>
            </div>
          </div>
        );
      })}

{filteredConv && filteredConv.length== 0 && (<div> <NoDataFound />
</div>)}
      </div>

    </div>
  );
}
