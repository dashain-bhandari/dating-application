import React, { useContext, useState } from "react";
import ConnectionCard from "../newComponent/ConnectionCard/ConnectionCard";
import NotificationCard from "../newComponent/NotificaitonCard/NotificationCard";
import { useEffect } from "react";
import { getNotifications, markNotificationAsRead } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUnreadNotification,
  setInitialNotification,
  setNotification,
} from "../Store/features/notificationSlice";
import NoDataFound from "../newComponent/NoDataFound/NoDataFound";
import NotificationMissedCallCard from "../newComponent/NotificaitonCard/NotificationCard";
import NotificationCreateConnectionRequest from "../newComponent/NotificaitonCard/NotificationCreateConnectionRequest";
import NotificationAcceptedConnectionRequest from "../newComponent/NotificaitonCard/NotificationAcceptedConnectionRequest";
import NotificationMessageReceived from "../newComponent/NotificaitonCard/NotificationMessageReceived";
import NotificationConversationReceived from "../newComponent/NotificaitonCard/NotificationConversationReceived";
import { AuthContext } from "../utils/context/AuthContext";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";

function NotificationSection() {
  const dispatch = useDispatch();
  const { user, setUser } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(30);
  const [initial, setInitial] = useState(true);
  const [color, setColor] = useState("var(--primary)");
  const [loading, setLoading] = useState(false);
  const { notification, unReadNotificationCount } = useSelector(
    (state) => state.notification
  );
  // console.log(unReadNotificationCount, user.lastReadNotification)
  useEffect(() => {
    if (initial) {
       setLoading(true)
      getNotifications(page, limit)
        .then((res) => {
          console.log(res.data);
          dispatch(setInitialNotification(res.data));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
           setLoading(false)
        });
    }
  }, []);

  useEffect(() => {
    if (!initial) {
       setLoading(true);
      getNotifications(page, limit)
        .then((res) => {
          dispatch(setNotification(res.data));
           setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [page]);

  useEffect(() => {
    console.log(notification.length > 0);
    // console.log(notification && notification[0].markAsRead);
    if (notification.length > 0 && notification[0].markAsRead == false) {
      console.log("marking notification");
      markNotificationAsRead(notification[0].id)
        .then((res) => {
          console.log(res.data);
          setUser({ ...user, lastReadNotification: res.data });
          dispatch(resetUnreadNotification());
        })
        .catch((error) => {
          dispatch(resetUnreadNotification());
        });
    }
  }, [notification]);

  const handleLoadMore = () => {
    setInitial(false);
    setPage((prev) => prev + 1);
  };

  console.log(notification);



  const [no, setNo] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(1);

  const [lastIndex, setLastIndex] = useState(5);
  const [pageForm, setPageForm] = useState(1);

  useEffect(() => {
    setPageForm(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (pageForm <= no.length) {
      console.log(pageForm);
      setCurrentPage(pageForm);
    }
  }, [pageForm]);

  const prevPage = () => {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    currentPage !== no.length && setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    if (notification) {
      const noOfRecordsPerPage = 10;
      const noOfPages = Math.ceil(notification.length / noOfRecordsPerPage) || 1;

      const newLastIndex = currentPage * noOfRecordsPerPage;
      const newFirstIndex = newLastIndex - noOfRecordsPerPage;
      console.log(newFirstIndex);
      console.log(newLastIndex);
      setLastIndex(newLastIndex);
      setFirstIndex(newFirstIndex);

      const numbers = [];
      for (let i = 1; i <= noOfPages; i++) {
        numbers.push(i);
      }

      setNo(numbers);
    }
  }, [notification, currentPage]);

  useEffect(() => {
    console.log(no);
  }, [no]);

  const changeCPage = (n) => {
    setCurrentPage(n);
  };

  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (notification) {
      console.log(firstIndex);
      console.log(lastIndex);
      console.log(notification.length);
      console.log(notification.slice(firstIndex, lastIndex));
      setRecords(notification.slice(firstIndex, lastIndex));
    }
  }, [firstIndex, lastIndex, notification]);

  useEffect(() => {
    console.log(records);
  }, [records]);


  return (<>
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
      </>) : (<>
        <div className="w-full min-h-screen bg-screen p-2 md:p-4 mt-4 bg-light">
          <div className="flex mx-auto flex-col my-3 rounded-xl ">
            <div
              // className="px-2 border-b-2 border-[rgba(0, 0, 0, 0.6)] flex justify-between py-1"
              onClick={() => setShowRequests((prev) => !prev)}
            >
              {/* <h2 className='text-lg font-bold text-[rgba(0, 0, 0, 0.6)] xl:text-xl mx-2 2xl:text-2xl'>Notifications</h2>         */}
            </div>
            <div className="w-full">
              {records && records.length > 0 ? (
                records.map((notif, index) => {
                  return (
                    <>
                      {notif.type == "missedCall" && (
                        <NotificationMissedCallCard
                          notification={notif}
                          key={index}
                        />
                      )}

                      {notif.type == "createConnectionRequest" && (
                        <NotificationCreateConnectionRequest
                          notification={notif}
                          key={index}
                        />
                      )}

                      {notif.type == "connectionRequestAccepted" && (
                        <NotificationAcceptedConnectionRequest
                          notification={notif}
                          key={index}
                        />
                      )}

                      {notif.type == "messageReceived" && (
                        <NotificationMessageReceived
                          notification={notif}
                          key={index}
                        />
                      )}

                      {notif.type == "conversationReceived" && (
                        <NotificationConversationReceived
                          notification={notif}
                          key={index}
                        />
                      )}
                      {/* {notification && notification.length % 30 == 0 && (
                    <div className="w-full flex justify-center items-center rounded-3xl">
                      <button
                        onClick={() => handleLoadMore()}
                        className="px-4 py-2 rounded-3xl border-2 border-[var(--secondary)] hover:text-[var(--primary)]"
                      >
                        See More
                      </button>
                    </div>
                  )} */}

                      
                    </>
                  );
                })
              ) : (
                <NoDataFound />
              )}
            </div>
            {records && no.length > 1 && (
                        <>
                          <nav className="flex justify-end mt-2">
                            <ul className="flex flex-row gap-[10px]">
                              <li
                                className={` px-1 py-1 rounded ${currentPage === 1 || pageForm == 1
                                    ? "bg-gray-400"
                                    : "bg-[#7C4BA1]"
                                  }`}
                              >
                                <button className="px-2 py-1 rounded " onClick={prevPage}>
                                  <ChevronLeft size={20} color="white" />
                                </button>
                              </li>
                              {no.length > 1 && (
                                <>
                                  <div className="flex flex-row gap-1 items-center bg-[#7C4BA1] px-2 py-1 rounded ">
                                    <input
                                      type="number"
                                      min="1"
                                      max={no.length}
                                      value={pageForm}
                                      onChange={(e) => setPageForm(e.target.value)}
                                      className="px-1 rounded focus:outline-simoBlue"
                                    ></input>
                                    <div className="text-white">of</div>
                                    <div className="text-white">{no.length}</div>
                                  </div>
                                </>
                              )}
                              <li
                                className={` px-1 py-1 rounded ${currentPage === no.length || pageForm == no.length
                                    ? "bg-gray-400"
                                    :  "bg-[#7C4BA1]"
                                  }`}
                              >
                                <button className="px-2 py-1 rounded " onClick={nextPage}>
                                  <ChevronRight size={20} color="white" />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </>
                      )}
          </div>
        </div>
      </>)
    }
  </>

  );
}

export default NotificationSection;
