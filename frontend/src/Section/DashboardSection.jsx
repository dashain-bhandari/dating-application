import React from "react";
import DashboardCard from "../newComponent/DashboardCard/DashboardCard";
import ConnectionRequestCard from "../newComponent/ConnectionRequestCard/ConnectionRequestCard";
import ConnectionRequestSection from "./connectionRequestSection";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { SocketContext } from "../utils/context/SocketContext";
import { useEffect } from "react";
import { fetchConnectionRequestThunk } from "../Store/thunk/connectionsThunk";
import RecommendSection from "../newComponent/RecommendSection/RecommendSection";
import { fetchConnectionRequest } from "../utils/api";
import { setConnectionRequest } from "../Store/features/connectionSlice";
import ProfileBox from "../newComponent/ProfileBox/ProfileBox";
import { useOutletContext } from "react-router-dom";

function DashboardSection() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { connections, connectionRequests } = useSelector(
    (state) => state.connection
  );

  const [showFilter, setShowFilter] = useOutletContext();

  return (
    <div className="min-h-[90vh] overflow-x-hidden">
      {/* <ConnectionRequestSection />  */}

      <RecommendSection />
    </div>
  );
}

export default DashboardSection;
