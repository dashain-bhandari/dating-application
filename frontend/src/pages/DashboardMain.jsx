import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";
import profile1 from "../images/exploreProfile/profile1.png";
import profile2 from "../images/exploreProfile/profile2.png";
import profile3 from "../images/exploreProfile/profile3.png";
import profile4 from "../images/exploreProfile/profile4.png";
import giftImage from "../images/giftImage.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NewProfileSearch from "../components/NewProfileSearch";
import NewRecommandedProfile from "./NewRecommandedProfile";
import RecentChat from "./RecentChat";
import Search from "./InnerHome/InnerHeader/Search";
import ConnectionRequestCard from "../newComponent/ConnectionRequestCard/ConnectionRequestCard";
import { fetchConversationsThunk } from "../Store/features/conversationSlice";
import SearchResultSection from "../Section/SearchResultSection";
import { chatContext } from "../utils/context/ChatContext";
import { axiosInstance } from "../http";
import DashBoardSidebar from "./DashBoardSidebar";
import noDataFound from "../images/nodata.jpg";


export default function DashboardMain() {
  const navigate = useNavigate()
  const [popupOpen, setPopupOpen] = useState(false);
  console.log("Called");
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  // pending request
  const [invitations, setInvitations] = useState([]);
  const [pending, setPending] = useState([]);
  const { user, paymentStatus } = useContext(AuthContext);

  const connectionRequests = useSelector(
    (state) => state.connection.connectionRequests
  );

  useEffect(() => {
    if (connectionRequests) {
      const sentRequests = connectionRequests.filter(
        (cr) => cr.sender.id === user.id && cr.status === "pending"
      );

      const invite = connectionRequests.filter(
        (cr) => cr.receiver.id === user.id && cr.status === "pending"
      );
      setInvitations(invite);
      setPending(sentRequests);
    }
  }, [connectionRequests]);

  const dispatch = useDispatch();
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

  return (
    <main className="sm:pl-10 pl-4 sm:mt-2 mt-10">
      <div>
        <div className="flex justify-end items-center gap-4 pb-4 sm:pr-10">
          {/* <div className="relative">
            <input
              type="text"
              className="outline-none py-2 pl-12 pr-4 bg-white rounded-3xl border border-white focus:!border-[#79489F] text-sm"
              placeholder="Search by Name"
            />
            <div className="absolute bottom-1 left-4">
              <Icon
                icon="material-symbols:search"
                className="text-2xl text-[#555555]"
              />
            </div>
          </div> */}
          <Search />
          <div className="w-fit" onClick={openPopup}>
            <Icon icon="mage:filter" className="text-2xl text-[#555555]" />
          </div>
        </div>
        <NewRecommandedProfile />
        {/* <SearchResultSection/> */}

        <div className="flex flex-col xl:flex-row gap-10 pb-10 whitespace-nowrap ">
          <div className="">
            {
              paymentStatus != "unpaid" && <h1 className="text-base text-[#555555] pb-4 font-bold">
                Profile Details
              </h1>
            }
            {
              paymentStatus != "unpaid" ? (<>
                <div className="bg-white flex flex-col  gap-4 p-4 w-fit rounded-2xl justify-center items-center font-medium ">
                  <h2 className="text-[#555555] text-lg font-bold">
                    Subscription Type
                  </h2>
                  <div>
                    <img src={giftImage} alt="giftImage" />
                  </div>
                  <div className="text-[#828282] flex flex-col gap-2 justify-center items-center">
                    <div>
                     Package name: <span className="text-[#525050]">Standard</span>
                    </div>
                    <div>
                      Subscribed date:{" "}
                      <span className="text-[#525050]">{user?.subscription?.startDate?.slice(0, 10)}</span>{" "}
                    </div>
                    <div>
                      Expiry date:{" "}
                      <span className="text-[#C41E3A]">{user?.subscription?.expiryDate?.slice(0, 10)}</span>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#7C4BA1] hover:bg-[#8c4ebb] px-6 py-2 rounded-md w-fit text-white whitespace-nowrap" onClick={() => navigate('/home/payment')}>
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </>) :

                (<>
                  <div className="bg-white flex flex-col  gap-4 p-4 w-72 lg:w-fit rounded-2xl justify-center items-center font-medium ">
                    <h2 className="text-black sm:text-lg font-semibold">
                      Subscription Type
                    </h2>
                    <div>
                      <img src={giftImage} alt="giftImage" />
                    </div>
                    <div className="text-gray-500 font-medium sm:text-sm text-sm flex flex-col gap-2 justify-center items-center">
                      <div>
                       Package name: <span className="text-black font-semibold">Free</span>
                      </div>

                    </div>
                    <div>
                      <button className="bg-[#EB4566] hover:bg-[#fe5375] sm:text-sm text-sm sm:px-6 px-2 py-2 rounded-md w-fit text-white whitespace-nowrap" onClick={() => navigate('/home/payment')}>
                        Upgrade Plan
                      </button>
                    </div>
                  </div>
                </>)
            }
          </div>
          <RecentChat />
        </div>
        <div>
          <h1 className="text-base text-black pb-4 font-semibold">Pending Requests</h1>
          <>
          {invitations == 0 && (
            <div className="xl:max-w-[68em]  bg-white  h-[16em] flex justify-center items-center rounded-2xl border">
                              <img src={noDataFound} alt="no-data" className="w-20" />
            </div>
          )}
            {invitations &&
              invitations.map((connectionRequest, index) => {
                return (
                  <ConnectionRequestCard
                    key={index}
                    type="pending"
                    connectionRequest={connectionRequest}
                  />
                );
              })}
          </>
        </div>
      </div>
      <Popup
        open={popupOpen}
        onClose={closePopup}
        modal
        closeOnDocumentClick={false}
        contentStyle={{
          padding: 30,
          borderRadius: 30,
          maxWidth: "fit-content",
        }}
        position="center center"
      >
        <NewProfileSearch  setPopupOpen={setPopupOpen}/>
      </Popup>
    </main>

  );
}

const profileitems = [
  {
    img: profile1,
    name: "Raj Sharma",
    age: "23 years",
    address: "kathmandu",
  },
  {
    img: profile2,
    name: "Hari Tamang",
    age: "23 years",
    address: "kathmandu",
  },
  {
    img: profile3,
    name: "Loki Chaualgain",
    age: "24 years",
    address: "kathmandu",
  },
  {
    img: profile4,
    name: "Rahul Chhetri",
    age: "23 years",
    address: "kathmandu",
  },
];
