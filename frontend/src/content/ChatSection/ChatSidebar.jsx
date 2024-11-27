import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationsThunk } from "../../Store/features/conversationSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import ChatPerson from "../../components/ChatPerson";
import {
  BsChatDots,
  BsChatDotsFill,
  BsChatLeftText,
  BsSearchHeart,
} from "react-icons/bs";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import ConversationBox from "./ConversationBox";
import CallBox from "./CallBox";
import "./style.css";
import InputSelect from "../../newComponent/Profile/Select";
import SearchSelect from "../../newComponent/Profile/SearchSelect";
import debounce from "debounce-promise";
import { axiosInstance } from "../../http";
import OptionComponent from "./OptionComponent";
import AsyncSelect from "react-select/async";
import { AuthContext } from "../../utils/context/AuthContext";
import { updateSelectedConversation } from "../../Store/features/selectedConversationSlice";
import { MdAddIcCall } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { Select, Title } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import classNames from "classnames";
import { GlobalContext } from "../../utils/context/GlobalContext";

function ChatSidebar() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showCall, setShowCall] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [conver, setConver] = useState([]);
  const isDesktop = useMediaQuery({ query: "(max-width: 992px)" });
  // useEffect(() => {
  //     dispatch(fetchConversationsThunk());
  // }, [dispatch])
  const { selectedConversation, type } = useSelector(
    (state) => state.selectedConversation
  );
  const { conversations } = useSelector((state) => state.conversation);
  const { refresh, setRefresh } = useContext(GlobalContext);

  console.log(conversations);
  
  const searchConv = async (value) => {
    if (value) {
      const response = await axiosInstance.get(
        `/users/search/conversation?username=${value}`
      );
      console.log(response.data);
      return response.data
        .filter((search) => search.id !== user.id)
        .map((search) => {
          return {
            value: search.id,
            label: search.profile.fullname,
            avatarId: search.avatarId,
            username: search.profile.fullname,
            id: search.id,
          };
        });
    }
  };
  const delayfetchConversation = useCallback(debounce(searchConv, 3000), []);

  const fetchConversation = (value) => {
    return delayfetchConversation(value);
  };

  const getConversationByUserId = (userId) => {
    const targetConversation = conversations.find((conv) => {
      const recepientId =
        user.id == conv.creator.id ? conv.recepient.id : conv.creator.id;
      if (recepientId == userId) {
        return conv;
      }
    });
    return targetConversation;
  };

  const handleChange = (value) => {
    setSearchValue(value);
    console.log("we are here");

    const targetConversation = getConversationByUserId(value.value);
    console.log(value);
    console.log(targetConversation);

    if (targetConversation) {
      console.log("targetConversation is true");
      dispatch(
        updateSelectedConversation({
          conversation: targetConversation,
          type: "conversation",
        })
      );
      navigate(`/home/main/chat/conversation/${targetConversation.id}`);
    } else {
      console.log("auto here.");

      dispatch(
        updateSelectedConversation({
          conversation: value,
          type: "createConversation",
        })
      );

      // setConver([value, ...conversations]);
    }
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  });

  useEffect(() => {
    setRefresh(0)
    if (type == "createConversation" && conversations) {
      setConver([
        { ...selectedConversation, type: "createConversation" },
        ...conversations,
      ]);

    } else {
      setConver([...conversations]);
      !isDesktop && selectedConversation.id &&
        conversations.length > 0 &&
        //navigate(`/home/main/chat/conversation/${conversations[0].id}`);
        navigate(`/home/main/chat/conversation/${selectedConversation.id}`);
    }
  }, [selectedConversation, conversations, refresh]);

  console.log(selectedConversation, type);

  const [filteredConv, setFilteredCov] = useState([]);
  useEffect(() => {
    const filterConv = () => {
      if (conver && conver.length > 0) {
        const newA = conver.filter((item) => {
          if (item.recepient.id == user.id && !item.deletedByRecepient) {
            return item;
          }
          if (item.creator.id == user.id && !item.deletedByCreator) {
            return item;
          }
        })
        console.log(newA)
        setFilteredCov(newA)
      }
    }
    filterConv();
  }, conver)

  return (
    <div className=" pt-6 w-full min-h-[90vh] lg:basis-1/3 my-2 lg:rounded-tr-none lg:rounded-br-none bg-white pb-2 lg:border-r-[1px] lg:border-[rgba(0,0,0,0.2)] lg:fixed lg:h-[90vh] lg:w-[30vw] lg:bottom-0 lg:left-0">
      <div className="chat-friend-list h-full overflow-hidden ">
        <div className="w-full flex  flex-col justify-around relative">
          <div className="w-[90%] mx-auto flex justify-center ">
            {/* <div className='flex items-center justify-center hover:bg-screen px-1 py-2 rounded-md'> */}
            {/* <span className='mr-2'><BsChatDots size={20} color={!showCall && 'var(--primary)'} /></span> */}
            <Title order={1} fw={"700"} size={"h3"}>
              Chats
            </Title>
            {/* </div> */}

            {/* <div className='flex items-center justify-center hover:bg-screen px-3 py-2 rounded-xl'>
                   <span className='mr-2'><FiPhoneCall size={20} color={showCall && 'var(--primary)'} /></span>
                   <span  className={ showCall ? 'font-bold xl:text-xl text-[var(--primary)]' : 'font-bold xl:text-xl'} onClick={() => setShowCall(true)}>Call</span>
                 </div> */}
          </div>
          <div className=" xl:py-1 my-1  z-20 w-[90%] mx-auto">
            <AsyncSelect
              placeholder="Search Conversation"
              onChange={handleChange}
              loadOptions={fetchConversation}
              id="aysnc-select"
              name="async-select"
              value={searchValue}
              classNamePrefix={classNames({ "react-select": true })}
              components={{ Option: OptionComponent }}
              styles={{
                menuItemSelected: (provided, state) => ({
                  ...provided,
                  backgroundColor: "var(--secondary)",
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  // border: 'none',

                  padding: "0px 4px",
                  borderRadius: "20px",
                  zIndex: "9999",

                  "& .react-select__indicator": {
                    display: "none",
                  },
                  "& .react-select__indicator-separator": {
                    display: "none",
                  },
                }),
              }}
            />

            {/* <Select creatable searchable icon={<AiOutlineSearch size={20} />} data={[]}  placeholder='Search ...'/>  */}
          </div>
        </div>
        <div>
          <form className="w-full mx-2 my-2 z-50 flex rounded-3xl shoadow-none overflow-hidden">
            {/* <input className='border-none bg-transparent w-full outline-none shadow-none' type="text" name="search" placeholder="Search.." /> */}

            {/* <button type='submit' className='mx-2 px-2 rounded-lg border-l-[1px] border-[rgba(0 ,0 ,0 ,0.6)]'>
                    <BsSearchHeart size={25}  color="var(--primary)" />
                  </button> */}
          </form>
        </div>
        <div className="chat-sidebar lg:w-full px-2 md:w-[90%] mx-auto">
          {!showCall ? <ConversationBox conversations={filteredConv} /> : <CallBox />}
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;