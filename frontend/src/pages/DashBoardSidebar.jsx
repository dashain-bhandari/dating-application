import React, { useContext, useEffect, useState } from "react";
import dashboardimage from "../images/dashboardimage.png";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../http";
import { useDispatch } from "react-redux";
import { logOutUser } from "../Store/features/authSlice";
import { addToast } from "../Store/features/toastSlice";
import { useMediaQuery } from "react-responsive";
import { AuthContext } from "../utils/context/AuthContext";
import { socket } from "../utils/context/SocketContext";

export default function DashBoardSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const urlPath = location.pathname;
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`/authentication/log-out`, {})
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            addToast({ msg: "Logged Out successfully", kind: "SUCCESS" })
          );
          dispatch(logOutUser());
          socket.disconnect();
          navigate("/auth", { replace: true });
        }
      })
      .catch((error) => {
        if (error.response) {
          const response = error.response;
          const { message } = response.data;
          console.log(message);
          switch (response.status) {
            case 401:
              dispatch(
                addToast({ msg: "Logged Out successfully", kind: "SUCCESS" })
              );
              dispatch(logOutUser());
              navigate("/auth", { replace: true });
              break;
            case 400:
            case 500:
              console.log(message);
              dispatch(addToast({ kind: "ERROR", msg: message }));
              break;
            default:
              dispatch(
                addToast({
                  kind: "ERROR",
                  msg: "Oops, Something went wrong",
                })
              );
              break;
          }
        }
      });
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  useEffect(() => {
    if (!user.avatarId) {
      setSelectedImage(
        "https://www.caltrain.com/files/images/2021-09/default.jpg"
      );
    } else {
      setSelectedImage(
        `${import.meta.env.VITE_BASE_URL}/user-avatar/${user && user.avatarId}`
      );
    }
  }, [user]);

  return (
    <main
      className={`bg-white rounded-2xl gap-2 my-10 !shadow-md ml-2 flex ${
        isMobile ? "absolute -top-10 left-14 sm:left-60 md:left-72 min-w-10 flex items-center w-[12.5em] py-1 px-2" : "w-62 p-4 grid"
      }`}
    >
      <div className={`w-full overflow-hidden ${isMobile ? "hidden" : "block"}`}>
        <img
          src={selectedImage}
          alt="dashboard image"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex lg:flex-col gap-3">
        <div className="flex lg:flex-col gap-3">
          {sidemenuItems.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className={`flex items-center gap-2 hover:text-[#EB4566] hover:bg-gray-100 py-1 rounded-md ${urlPath === item?.href ? " text-[#EB4566]" : "text-gray-600"} ${isMobile ? "px-0 mx-auto" : "px-4"}`}
            >
              <span>
                <Icon icon={item?.icon} className="text-2xl" />
              </span>
              <span className={`whitespace-nowrap font-medium ${isMobile ? "hidden" : ""}`}>
                {item?.title}
              </span>
            </Link>
          ))}
          <div
            onClick={(e) => handleLogout(e)}
            className={`${isMobile ? "hidden" : "block"} cursor-pointer flex items-center gap-2 text-gray-600 hover:text-[#EB4566] hover:bg-gray-200 py-1 rounded-md ${isMobile ? "px-0 mx-auto" : "px-4"}`}
          >
            <div>
              <Icon icon="material-symbols:logout" className="text-2xl" />
            </div>
            <span className={`${isMobile ? "hidden" : "block"}`}>LogOut</span>
          </div>
        </div>
      </div>
    </main>
  );
}

const sidemenuItems = [
  { icon: "dashicons:dashboard", title: "Dashboard", href: "/home/main/dashboard" },
  { icon: "iconamoon:profile-fill", title: "My Profile", href: "/home/main/profile/me/about" },
  { icon: "mdi:people", title: "Matched Profiles", href: "/home/main/connection" },
  { icon: "fluent:chat-48-filled", title: "Chat", href: "/home/main/chatlist" },
  { icon: "mingcute:notification-fill", title: "Notification", href: "/home/main/notification" },
];
