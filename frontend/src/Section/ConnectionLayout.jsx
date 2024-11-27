// import React, { useState } from "react";
// import ConnectionRequestSection from "./connectionRequestSection";
// import ConnectionSection from "./ConnectionSection";
// import { Box, Center, SegmentedControl, createStyles } from "@mantine/core";
// import { BiPhotoAlbum } from "react-icons/bi";
// import { AiOutlinePullRequest } from "react-icons/ai";

// const useStyles = createStyles((theme) => ({
//   segment: {
//     color: theme.colors.second[4],
//   },
// }));

// function ConnectionLayout() {
//   const [active, setActive] = useState("0");

//   const handleChange = (value) => {
//     setActive(value);
//   };

//   const { classes, theme } = useStyles();

//   return (
//     <div className="w-full h-full  flex flex-col min-h-screen  bg-screen mt-6 ">
//       <div className=" w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] mx-auto">
//         <SegmentedControl
//           size="md"
//           radius={"sm"}
//           className={classes.segment}
//           color={theme.colors.second[5]}
//           my={20}
//           style={{ backgroundColor: "white" }}
//           onChange={handleChange}
//           data={[
//             {
//               value: "0",
//               label: (
//                 <Center>
//                   <BiPhotoAlbum size={20} />
//                   <Box ml={10}>Invitation</Box>
//                 </Center>
//               ),
//             },
//             {
//               value: "1",
//               label: (
//                 <Center>
//                   <AiOutlinePullRequest size={20} />
//                   <Box ml={10}>Connection</Box>
//                 </Center>
//               ),
//             },
//           ]}
//         />
//       </div>
//       {active == "0" && <ConnectionRequestSection />}
//       {active == "1" && <ConnectionSection />}
//     </div>
//   );
// }

// export default ConnectionLayout;

import { Icon } from "@iconify/react";
import React, { useState, useEffect, useContext } from "react";
import profile1 from "../images/exploreProfile/profile1.png";
import profile2 from "../images/exploreProfile/profile2.png";
import profile3 from "../images/exploreProfile/profile3.png";
import profile4 from "../images/exploreProfile/profile4.png";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";
import ConnectionSection from "./ConnectionSection";
import {
  acceptConnectionRequestThunk,
  cancelConnectionRequestThunk,
  fetchConnectionRequestThunk,
  fetchConnectionsThunk,
} from "../Store/thunk/connectionsThunk";
import { SocketContext } from "../utils/context/SocketContext";
import { createConversationThunk } from "../Store/features/conversationSlice";
import ConnectionRequestCard from "../newComponent/ConnectionRequestCard/ConnectionRequestCard";
import NoDataFound from "../newComponent/NoDataFound/NoDataFound";
import { axiosInstance } from "../http";
import { fetchConnectionRequest, fetchConnections } from "../utils/api";
import { setConnection, setConnectionRequest } from "../Store/features/connectionSlice";
import { ClipLoader } from "react-spinners";

export default function ConnectionLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const socket = useContext(SocketContext);
  const [color, setColor] = useState("var(--primary)");
  const handleClick = (tab) => {
    setActiveTab(tab);
  };
  // change start

  const [showRequests, setShowRequests] = useState(true);

  const [invitations, setInvitations] = useState([]);
  const [pending, setPending] = useState([]);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const connectionRequests = useSelector(
    (state) => state.connection.connectionRequests
  );
  // const [connectionRequests, setConnectionRequests] = useState([])
  const [loading, setLoading] = useState(false)


  // useEffect(() => {
  //   dispatch(fetchConnectionsThunk);

  // }, []);


  useEffect(() => {

    fetchConnections()
      .then((res) => {

        console.log(res.data);
        dispatch(setConnection(res.data));

      })
      .catch((error) => {
        console.log(error);

      });
  }, []);

  useEffect(() => {
    console.log("hii")
    setLoading(true)
    fetchConnectionRequest()
      .then((res) => {
        console.log(res.data)
        dispatch(setConnectionRequest(res?.data));
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    console.log(connectionRequests)
    if (connectionRequests) {
      const sentRequests = connectionRequests.filter(
        (cr) => cr.sender?.id === user?.id && cr.status === "pending" && cr.receiver?.suspended==false
      );

      const invite = connectionRequests.filter(
        (cr) => cr.receiver?.id === user?.id && cr.status === "pending" && cr.sender?.suspended==false
      );
      setInvitations(invite);
      setPending(sentRequests);
    }
  }, [connectionRequests]);

  console.log("pending check", pending);
  console.log("invitations", invitations);

  // for matchced profile
  const { connections, onlineConnections, offlineConnections } = useSelector(
    (state) => state.connection
  );
  const getRecipient = (connection, userId) => {
    return connection?.sender?.id === userId
      ? connection?.receiver
      : connection?.sender;
  };

  console.log(connections);
  if (!connections || !user) {
    return <div>Loading...</div>;
  }
  // change end
  const handleRequestCancel = (id) => [
    dispatch(cancelConnectionRequestThunk(id)),
  ];

  const createConversation = async () => {
    const formData = new FormData();
    formData.append("userId", recepient && recepient?.id);
    formData.append("message", "");
    console.log(recepient);
    try {
      dispatch(resetSelectedConversation());
      dispatch(createConversationThunk(formData));

      setContent("");

      setAttachments([]);
    } catch (err) {
      console.log(err);
    }
  };

  // accept
  const handleRequestAccept = async (id) => {
    dispatch(acceptConnectionRequestThunk(id, socket));
    await createConversation();
  };

  const onViewProfile = async (id) => {
    console.log("hii")
    if (!user.subscription || user?.subscription?.status == "expired") {
      if (!user.profiles || user.profiles?.length < 2 || user.profiles?.includes(id)) {
        navigate(`/home/main/profile/other/${id}/about`)
      }
      else {
        console.log("hii")
        dispatch(addToast({ kind: "ERROR", msg: "View limit exceeded on free version." }))
      }
    }
    else {
      navigate(`/home/main/profile/other/${id}/about`)
    }
  }

  return (
    <div className="mt-10 py-8 px-2 sm:px-4 md:px-8">
      <div className="flex gap-2 sm:gap-4 md:gap-8 ">
        <div>
          <button
            className={`px-2 sm:px-4 md:px-6 py-2 rounded-t-2xl text-xs sm:text-sm ${activeTab === "pending"
              ? "bg-[#EB4566] text-white"
              : "text-gray-600"
              }`}
            onClick={() => handleClick("pending")}
          >
            Pending
          </button>
        </div>
        <div>
          <button
            className={`px-2 sm:px-4 whitespace-nowrap md:px-6 py-2 rounded-t-2xl text-xs sm:text-sm ${activeTab === "matched"
              ? "bg-[#EB4566] text-white"
              : "text-gray-600"
              }`}
            onClick={() => handleClick("matched")}
          >
            Matched Profiles
          </button>
        </div>
        <div>
          <button
            className={`px-2 sm:px-4 whitespace-nowrap md:px-6 py-2 rounded-t-2xl text-xs sm:text-sm ${activeTab === "sent" ? "bg-[#EB4566] text-white" : "text-gray-600"
              }`}
            onClick={() => handleClick("sent")}
          >
            Sent Request
          </button>
        </div>
      </div>
      <div>
        {activeTab === "pending" && (
          <>
            {!loading && invitations && invitations.length > 0 &&
              invitations.map((connectionRequest, index) => {
                return (
                  <ConnectionRequestCard
                    key={index}
                    type="pending"
                    connectionRequest={connectionRequest}
                  />
                );
              })}
            {!loading && invitations && invitations.length == 0 &&
              (<>
                <NoDataFound />
              </>)}
            {
              loading && (<div className="w-full h-full flex justify-center items-center my-40">
                <ClipLoader
                  color={color}
                  loading={loading}
                  cssOverride={{}}
                  size={75}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>)
            }
          </>
        )}
        {activeTab === "matched" && <ConnectionSection />}




        {activeTab === "sent" && (
          <div className="">
            {pending && pending.length > 0 ? (
              <div className="bg-white p-4 rounded-2xl w-full">
                {pending.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row text-[#555555] w-full justify-center items-center md:justify-between gap-4 md:gap-10 py-4"
                  >
                    <div className="w-40 h-36 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item &&
                          `${import.meta.env.VITE_BASE_URL}/user-avatar/${item?.receiver?.avatarId
                          }`
                        }
                        alt="profile image"
                        className="w-full h-full object-cover "
                      />
                    </div>
                    <div className="flex flex-col gap-3 items-center md:items-start">
                      <h1 className="text-base text-black font-semibold">
                        {item?.receiver?.profile?.fullname}
                      </h1>
                      <ul className="flex flex-wrap gap-x-4 text-[#6F6F6F">
                        <li className="flex gap-1 items-center">
                          <Icon
                            icon="radix-icons:dot-filled"
                            className="text-2xl"
                          />
                          <span className="font-semibold text-black"> City:</span>{" "}
                          {item?.receiver?.profile?.address}
                        </li>
                        <li className="flex gap-1 items-center">
                          <Icon
                            icon="radix-icons:dot-filled"
                            className="text-2xl"
                          />
                          <span className="font-semibold text-black"> Age:</span> 30
                        </li>
                        <li className="flex gap-1 items-center">
                          <Icon
                            icon="radix-icons:dot-filled"
                            className="text-2xl"
                          />
                          <span className="font-semibold text-black"> Height: </span>
                          {item?.receiver?.profile?.height}
                        </li>
                        <li className="flex gap-1 items-center">
                          <Icon
                            icon="radix-icons:dot-filled"
                            className="text-2xl"
                          />
                          <span className="font-semibold text-black"> Religion:</span>{" "}
                          {item?.receiver?.profile?.religion}
                        </li>
                        <li className="flex gap-1 items-center">
                          <Icon
                            icon="radix-icons:dot-filled"
                            className="text-2xl"
                          />
                          <span className="font-semibold text-black">Request on:</span>
                          {item && new Date(new Date(item.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString().slice(0, 10)},
                          {`   ${item && new Date(new Date(item.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString().slice(11, 16)}`}

                        </li>
                      </ul>
                      <button
                        className="px-6 py-2 w-fit font-medium rounded-full border !border-[#EB4566] text-black hover:bg-[#EB4566] hover:!text-white hover:!border-none duration-300 ease-in-out"
                        onClick={() =>
                          // navigate(`/home/main/profile/${item?.receiver?.id}`)
                          onViewProfile(item?.receiver?.id)
                        }
                      >
                        View Profile
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                      <button
                        className="px-6 py-2 rounded-3xl border-[1px] border-red-500 hover:bg-[#EB4566] hover:!text-white hover:!border-none duration-300 ease-in-out"
                        onClick={() => handleRequestCancel(item?.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </div>
    </div>
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
