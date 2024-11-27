import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionRequestCard from "../newComponent/ConnectionRequestCard/ConnectionRequestCard";
import { RiArrowDownSFill } from "react-icons/ri";
import { useState } from "react";
import noData from "../images/noDataImage.png";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import { fetchConnectionRequestThunk } from "../Store/thunk/connectionsThunk";

export default function ConnectionRequestSection() {
  const [showRequests, setShowRequests] = useState(true);

  const [invitations, setInvitations] = useState([]);
  const [pending, setPending] = useState([]);
  const { user } = useContext(AuthContext);

  const connectionRequests = useSelector(
    (state) => state.connection.connectionRequests
  );
  //  const connectionRequests = [1, 2, 3, 4]

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchConnectionRequestThunk);
  // }, []);



  useEffect(() => {
    if (connectionRequests) {
      const sentRequests = connectionRequests.filter(
        (cr) => cr.sender.id === user.id && cr.status === "pending"
      );

      const invite = connectionRequests.filter(
        (cr) => cr.receiver.id === user.id && cr.status === "pending"
      );
      //  console.log(sentRequests, invite);
      console.log(invite)
      setInvitations(invite);
      setPending(sentRequests);
    }
  }, [connectionRequests]);

  console.log("check", pending);
  console.log(invitations)

  return (
    <div className="w-full h-full">
      <div className="flex flex-col mb-3 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] mx-auto h-full bg-screen rounded-xl overflow-hidden">
        {connectionRequests ? (
          <>
            {invitations && (
              <>
                <div
                  className="px-2 py-2 flex justify-between pr-4 border-b-2 border-[rgba(0,0,0,0.2)]"
                  onClick={() => setShowRequests((prev) => !prev)}
                >
                  <h2 className="text-lg font-bold text-[rgba(0, 0, 0, 0.6)] xl:text-xl">
                    Invitations
                  </h2>
                  {/* <span><RiArrowDownSFill size={25} /></span> */}
                </div>
                {/* { connectionRequests.length === 0 && <div>No Connection Requests :</div>} */}
                <div
                  className={`my-2 transition-all duration-500 overflow-hidden  ${showRequests ? "h-full" : "h-0"
                    }`}
                >
                  { invitations && invitations.length > 0 ? (
                    invitations.map((connectionRequest, index) => {
                      return (
                        <ConnectionRequestCard
                          key={index}
                          type="invite"
                          connectionRequest={connectionRequest}
                        />
                      );
                    })
                  ) : (
                    <div className="w-full h-[25vh] flex justify-center items-center rounded-xl ">
                      <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
                        <img
                          src={noData}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute bottom-0 left-[20%] lg:bottom-5 lg:left-[30%] font-semibold  ">
                          No Data
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {/* pending request */}
            {pending.length > 0 && (
              <>
                <div
                  className="px-2 py-2 border-b-2 border-[rgba(0,0,0,0.4)] flex justify-between pr-4"
                  onClick={() => setShowRequests((prev) => !prev)}
                >
                  <h2 className="text-lg font-bold text-[rgba(0, 0, 0, 0.6)] xl:text-xl ">
                    Sent Requests
                  </h2>
                  {/* <span><RiArrowDownSFill size={25} /></span> */}
                </div>
                {/* { connectionRequests.length === 0 && <div>No Connection Requests :</div>} */}
                <div
                  className={`transition-all my-2 duration-500 overflow-hidden  ${showRequests ? "h-full" : "h-0"
                    }`}
                >
                  {pending &&
                    pending.map((connectionRequest, index) => {
                      return (
                        <ConnectionRequestCard
                          key={index}
                          type="pending"
                          connectionRequest={connectionRequest}
                        />
                      );
                    })}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-[25vh] flex justify-center items-center rounded-xl ">
            <div className="w-[100px] h-[100px] md:w-[150px]  md:h-[150px]  relative">
              <img
                src={noData}
                alt=""
                className="w-full h-full object-contain object-center"
              />
              <span className="absolute bottom-5 left-[20%] md:left-[30%] font-semibold  ">
                No Data
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
