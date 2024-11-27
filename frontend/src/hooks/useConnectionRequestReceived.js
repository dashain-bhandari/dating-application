import { useContext } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addToast } from "../Store/features/toastSlice";
import { addConnectionRequest } from "../Store/features/connectionSlice";

export function useConnectionRequestReceived() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("onConnectionRequestReceived", (payload) => {
      console.log("onConnectionRequestReceived");
      dispatch(addConnectionRequest(payload));
      //  dispatch(addToast({ kind: 'INFO', msg: `Incoming Connection Request from ${payload.sender.username}`}))
    });

    return () => {
      socket.off("onConnectionRequestReceived");
    };
  }, []);
}
