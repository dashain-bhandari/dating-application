import React, { useContext, useEffect } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchConnectionRequestThunk } from "../Store/thunk/connectionsThunk";
import Peer from "peerjs";
import {
  setCall,
  setLocalStream,
  setPeer,
  setPeerId,
  setRemoteStream,
} from "../Store/features/callSlice";
import {
  addConnection,
  removeConnectionRequest,
} from "../Store/features/connectionSlice";
import { useVoiceCallRejected } from "../hooks/useVoiceCallRejected";
import { useVoiceCallHangUp } from "../hooks/useVoiceCallHangUp";
import { useVoiceCallAccept } from "../hooks/useVoiceCallAccept";
import { useVoiceCall } from "../hooks/useVoiceCall";
import { useVideoCallHangUp } from "../hooks/useVideoCallHangUp";
import { useVideoCallAccept } from "../hooks/useVideoCallAccept";
import { useVideoCall } from "../hooks/useVideoCall";
import { useVideoCallRejected } from "../hooks/useVideoCallRejected";
import { useConnectionRequestReceived } from "../hooks/useConnectionRequestReceived";
import CallReceiveDialog from "../newComponent/Call/CallReceiveDialog";
import { useUserUnavailable } from "../hooks/useUserUnavailable";
import { addToast } from "../Store/features/toastSlice";
import {
  addNotification,
  increaseNotification,
} from "../Store/features/notificationSlice";
import { fetchUnreadNotificationThunk } from "../Store/thunk/notificationThunk";
import DashBoardSidebar from "./DashBoardSidebar";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";
import { axiosInstance } from "../http";
import { chatContext } from "../utils/context/ChatContext";
import Header from "../components/Header";
import Mobiletab from "../components/Mobiletab";

function AppLayout({ children }) {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { peer, call, isReceivingCall, caller, connection, callType } =
    useSelector((state) => state.call);

  useEffect(() => {
    dispatch(fetchConnectionRequestThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log(user.lastReadNotification);
      dispatch(fetchUnreadNotificationThunk(user.lastReadNotification));
    }
  }, [user]);



  useEffect(() => {
    if (!user) return;
    const newPeer = new Peer();
    dispatch(setPeer(newPeer));
  }, [user]);
  useConnectionRequestReceived();
  useVideoCall();

  useEffect(() => {
    peer &&
      peer.on("open", (id) => {
        console.log(`My peer ${id}`);
        dispatch(setPeerId(id));
      });
  }, [peer]);

  useEffect(() => {
    socket.on("onConnectionRequestCancelled", (payload) => {
      console.log("onConnectionRequestCancelled");
      dispatch(removeConnectionRequest(payload));
    });

    socket.on("onConnectionRequestAccepted", (payload) => {
      console.log("onConnectionRequestAccepted");
      if (payload.connectionRequest.sender.id == user.id) {
        dispatch(removeConnectionRequest(payload.connectionRequest));
      }

      dispatch(addConnection(payload.connection));
      socket.emit("getConnectionOnline");
      //  if(payload.connectionRequest.sender.id == user.id) {
      //  dispatch(
      //   addToast({kind: 'INFO', msg: `${payload.connectionRequest.receiver.username} accepted your connection request`})
      //  )
      //  }
    });

    socket.on("onConnectionRequestRejected", (payload) => {
      console.log("onConnectionRequestRejected");
      dispatch(removeConnectionRequest(payload));
    });

    socket.on("onNotificationReceived", (payload) => {
      console.log("NotificationReceived");
      dispatch(addNotification(payload));
      dispatch(increaseNotification());
    });

    return () => {
      socket.off("onConnectionRequestCancelled");
      socket.off("onConnectionRequestAccepted");
      socket.off("onConnectionRequestRejected");
      socket.off("onNotificationReceived");
    };
  }, [socket, isReceivingCall]);

  useEffect(() => {
    if (!peer) return console.log("peer is empty in inoming call");
    peer.on("call", async (incomingCall) => {
      const constraints = { video: callType === "video", audio: true };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          console.log(stream);
          incomingCall.answer(stream);
          dispatch(setLocalStream(stream));
          dispatch(setCall(incomingCall));
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => {
      peer.off("call");
    };
  }, [peer, callType, dispatch]);

  useEffect(() => {
    if (!call) return;
    call.on("stream", (remoteStream) =>
      dispatch(setRemoteStream(remoteStream))
    );

    call.on("close", () => console.log("call was closed"));

    return () => {
      call.off("stream");
      call.off("close");
    };
  }, [call]);

  console.log(isReceivingCall);
  console.log(caller);

  useVideoCallAccept();
  useVideoCallRejected();
  useVideoCallHangUp();

  useVoiceCall();
  useVoiceCallAccept();
  useVoiceCallHangUp();
  useVoiceCallRejected();
  useUserUnavailable();

  useEffect(() => {
    if (connection) {
      console.log("connection is up");

      if (connection) {
        connection.on("open", () => {
          console.log("connection opened");
        });

        connection.on("error", () => {
          console.log("an error occured");
        });

        connection.on("data", (data) => {
          console.log("data received", data);
        });

        connection.on("close", () => {
          console.log("connection closed");
        });
      }
      return () => {
        connection.off("open");
        connection.off("error");
        connection.off("data");
      };
    }
  }, [connection]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (

    <div className={`customScrollbar max-w-screen-2xl mx-auto bg-light h-screen overflow-y-scroll overflow-x-hidden flex flex-col`}>
      {isReceivingCall && caller && <CallReceiveDialog />}

      <div className={`w-full flex pb-14  relative  ${isMobile ? "pr-2" : "pr-2"}`}>
        <div className="mt-20 sticky top-20 self-start lg:px-12 md:px-8 z-50">
          <DashBoardSidebar />
        </div>
        <div className="w-full ">{children}</div>
        
      </div>
      <Header/>
      <div className="sm:hidden w-full fixed bottom-0">
      <Mobiletab/>
      </div>
     <div className="w-full">
     <Footer/>

     </div>
    </div>
  );
}

export default AppLayout;
