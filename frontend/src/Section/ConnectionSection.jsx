import React, { useContext } from "react";
import noData from "../images/noDataImage.png";
import ConnectionCard from "../newComponent/ConnectionCard/ConnectionCard";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../utils/context/SocketContext";
import { useEffect } from "react";
import { fetchConnectionsThunk } from "../Store/thunk/connectionsThunk";
import { ClipLoader } from "react-spinners";
import {
  removeConnection,
  setOfflineConnections,
  setOnlineConnections,
} from "../Store/features/connectionSlice";
import { RiArrowDownSFill } from "react-icons/ri";
import { useState } from "react";
import { fetchConnections } from "../utils/api";
import { setConnection } from "../Store/features/connectionSlice";
import { addToast } from "../Store/features/toastSlice";
import NoDataFound from "../newComponent/NoDataFound/NoDataFound";

function ConnectionSection() {
  const [color, setColor] = useState("var(--primary)");
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [conn, setConn] = useState([]);
  const [onlineConnection, setOnlineConnection] = useState([]);
  const [offlineConnection, setOfflineConnection] = useState([]);
  const { connections, onlineConnections, offlineConnections } =
    
  useSelector((state) => state.connection);

  useEffect(() => {
    setLoading(true)
    fetchConnections()
      .then((res) => {

        console.log(res.data);
        dispatch(setConnection(res.data));
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
      
  }, []);

  useEffect(() => {
    socket.emit("getConnectionOnline");

    const interval = setInterval(() => {
      socket.emit("getConnectionOnline");
    }, 10000);

    socket.on("onConnectionRemoved", (connection) => {
      console.log("connection removed");
      dispatch(removeConnection(connection));
      socket.emit("getConnectionOnline");
    });

    return () => {
      clearInterval(interval);
      socket.off("onConnectionRemoved");
      socket.off("getConnectionOnline");
    };
  }, []);

  useEffect(() => {
    socket.on("getConnectionOnline", (connections) => {
      console.log("connections online");
      dispatch(setOnlineConnections(connections));
      dispatch(setOfflineConnections());
    });
  }, []);

  useEffect(() => {
    if (connections) {
      setConn(connections);
      setOfflineConnection(offlineConnections);
    }

    if (onlineConnections) {
      setOnlineConnection(onlineConnections);
    }

    if (offlineConnections) {
      setOfflineConnection(offlineConnections);
    }
  }, [connections, onlineConnections, offlineConnections]);

  console.log(connections, onlineConnections, offlineConnections);

  // if (loading) {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <ClipLoader
  //         color={color}
  //         loading={loading}
  //         cssOverride={{}}
  //         size={150}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </div>
  //   );
  // }

  const [loading, setLoading] = useState(false);

  const onViewProfile = async () => {
    if (!user.subscription || user?.subscription?.status == "expired") {
      if (!user.profiles || user.profiles?.length < 2) {
        navigate(
          `/home/main/profile/other/${recepient && recepient?.id}/about`
        )
      }
      else {
        dispatch(addToast({ kind: "WARN", msg: "View limit exceeded on free version." }))
      }
    }
    else {
      navigate(
        `/home/main/profile/other/${recepient && recepient?.id}/about`
      )
    }

  }
  return (
    <>
      {
        loading ? (<>
          <div className="w-full h-full flex justify-center items-center">
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={{}}
              size={75}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>) : (<> <div className="flex mx-auto flex-col my-3 rounded-xl overflow-hidden">
          {/* <div className='px-2 border-b-2 border-[rgba(0,0,0,0.2)] flex justify-between py-1' onClick={() => setShowRequests((prev) => !prev)}> */}
          {/* <h2 className='text-lg font-bold text-[rgba(0, 0, 0, 0.6)] xl:text-xl mx-2 '>Your Connection </h2> */}
          {/* <span><RiArrowDownSFill size={25} /></span> */}
          {/* </div>   */}
          {connections.length > 0 ? (
            <>
              {/* <div className='w-full'>
        {onlineConnections.length > 0 && <span className="text-lg font-bold text-[rgba(0, 0, 0, 0.6)] xl:text-xl my-0 mx-3">Online ({onlineConnections.length})</span>}
        {onlineConnections && onlineConnection.length > 0 && onlineConnections.map((connection, index) => {
            return (  <ConnectionCard key={index} connection={connection} />)

        })}
    </div> */}

              {/* <div className=' w-full'>
        {offlineConnections.length > 0 && <span className="text-lg font-bold text-[rgba(0, 0, 0, 0.6)] xl:text-xl my-0 mx-3">Offline ({offlineConnections.length})</span>}
        {offlineConnections && offlineConnection.length > 0 && offlineConnections.map((connection, index) => {
            return ( <ConnectionCard key={index} connection={connection} />)
        })}
    </div> */}

              <div className="w-full py-2">
                {connections &&
                  connections.length > 0 &&
                  connections.map((connection, index) => {
                    return (
                      <>
                        <ConnectionCard key={index} connection={connection} />
                      </>
                    );
                  })}
              </div>
            </>
          ) : (
            <NoDataFound />
          )}
        </div></>)
      }
    </>
  );
}

export default ConnectionSection;
