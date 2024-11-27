import React, { useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../../App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import HeaderProfile from "../../../newComponent/HeaderProfile/HeaderProfile";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsChatHeart, BsPersonFillAdd } from "react-icons/bs";
import logo from "../../../images/lifepartnerlogo.png";
import Search from "./Search";
import { RiProfileFill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { MdNotificationsActive } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";

function NewInnerHeader() {
  const { user, setUser } = useContext(AuthContext);
  const sidenav = useRef();
  const sidenavblur = useRef();
  const dispatch = useDispatch();
  const connectionRequests = useSelector(
    (state) => state.connection.connectionRequests
  );
  const [invite, setInvite] = useState(0);
  const { unReadNotificationCount } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    if (connectionRequests) {
      const invite = connectionRequests.filter(
        (cr) => cr.receiver.id === user.id && cr.status === "pending"
      );
      setInvite(invite.length);
    }
  }, [connectionRequests]);
  const location = useLocation();

  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  const sidenavs = () => {
    sidenav.current.style.bottom = "0px";
    sidenavblur.current.style.bottom = "0px";
  };

  const sidenavss = () => {
    sidenav.current.style.bottom = "-100%";
    sidenavblur.current.style.bottom = "-100%";
  };

  return (
    <>
      <header className="h-[5rem] Navbar z-50 fixed shadow-md lg:shadow-sm flex justify-between items-center md:fixed w-full left-0 top-0 bg-white border-b-2 border-[rgba(0,0,0,0.1)]">
        <div className="basis-1/2 flex justify-start items-center">
          <NavLink className="navbar-logo basis-1/3" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            {!user ? (
              <Link to="/auth">
                {" "}
                <button className="nav-btn text-white">Login</button>
              </Link>
            ) : (
              <HeaderProfile />
            )}
          </div>
        </div>
        <div className="sidenavbar">
          <GiHamburgerMenu
            onClick={sidenavs}
            className="navbar-toggle"
            color="black"
          />

          <div ref={sidenav} className="sidenav">
            <div className="snbar"></div>
            <ul className="sidenavbar-items mt-0">
              <li className="sidenavbar-item px-2 py-2">
                <Search />
              </li>
              <li className="sidenavbar-item" onClick={sidenavss}>
                <NavLink
                  className="flex py-2 px-2 hover:bg-screen rounded-xl "
                  aria-current="page"
                  to="/home/main/dashboard"
                >
                  <AiFillHome
                    size={25}
                    color={
                      location.pathname == "/home/main/dashboard"
                        ? "var(--primary)"
                        : "var(--secondary)"
                    }
                  />
                  <span className=" ml-3 font-semibold text-xl cursor-pointer">
                    Home
                  </span>
                </NavLink>
              </li>
              <li className="sidenavbar-item" onClick={sidenavss}>
                <NavLink
                  className="flex py-2 px-2 hover:bg-screen rounded-xl"
                  to="/home/main/chat/conversation"
                >
                  <BsChatHeart
                    size={25}
                    color={
                      location.pathname == "/home/main/chat/conversation"
                        ? "var(--primary)"
                        : "var(--secondary)"
                    }
                  />
                  <span className="ml-3 font-semibold text-xl cursor-pointer">
                    Chat
                  </span>
                </NavLink>
              </li>

              <li className="sidenavbar-item" onClick={sidenavss}>
                <NavLink
                  className="flex py-2 px-2 hover:bg-screen rounded-xl"
                  to="/home/main/connection"
                >
                  <BsPersonFillAdd
                    size={25}
                    color={
                      location.pathname == "/home/main/connection"
                        ? "var(--primary)"
                        : "var(--secondary)"
                    }
                  />
                  <span className="ml-3 font-semibold text-xl cursor-pointer">
                    Network
                  </span>
                </NavLink>
              </li>

              <li onClick={sidenavss}>
                <NavLink
                  to="/home/main/notification"
                  className="flex py-2 px-2 hover:bg-screen rounded-xl"
                >
                  <MdNotificationsActive
                    size={25}
                    color={
                      location.pathname == "/home/main/notification"
                        ? "var(--primary)"
                        : "var(--secondary)"
                    }
                  />
                  <span className="ml-3 font-semibold text-xl cursor-pointer">
                    Notification
                  </span>
                </NavLink>
              </li>

              <li onClick={sidenavss}>
                <NavLink
                  to="/home/main/settings"
                  className={"flex py-2 px-2 hover:bg-screen rounded-xl"}
                >
                  <AiFillSetting
                    size={25}
                    color={
                      location.pathname.includes("settings")
                        ? "var(--primary)"
                        : "var(--secondary)"
                    }
                  />
                  <span className="ml-3 font-semibold text-xl cursor-pointer">
                    Settings
                  </span>
                </NavLink>
              </li>

              {user ? (
                <>
                  <li className="sidenavbar-item" onClick={sidenavss}>
                    <div className="flex py-2 px-2 hover:bg-screen rounded-xl">
                      <RiProfileFill
                        size={25}
                        color={
                          location.pathname == "/home/main/profile/me/about"
                            ? "var(--primary)"
                            : "var(--secondary)"
                        }
                      />
                      <NavLink to={"/home/main/profile/me/about"}>
                        <span className="w-full ml-3 font-semibold text-xl cursor-pointer">
                          My Profile
                        </span>
                      </NavLink>
                    </div>
                  </li>
                  <li className="sidenavbar-item">
                    <div className="flex py-2 px-2 rounded-xl hover:bg-screen">
                      <CgLogOut size={25} color="var(--secondary)" />
                      <span
                        className=" ml-3 font-semibold text-xl cursor-pointer"
                        onClick={(e) => handleLogout(e)}
                      >
                        Logout
                      </span>
                    </div>
                  </li>
                </>
              ) : (
                <li className="sidenavbar-item">
                  <Link>
                    {" "}
                    <button
                      className="sidenav-btn"
                      onClick={(e) => handleLogout(e)}
                    >
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div
            ref={sidenavblur}
            className="sidenavblur"
            onClick={sidenavss}
          ></div>
        </div>
      </header>
    </>
  );
}

export default NewInnerHeader;
