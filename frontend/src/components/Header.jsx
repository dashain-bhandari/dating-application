import React, { useRef, useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../images/newLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../http";
import { addToast } from "../Store/features/toastSlice";
import { logOutUser, setCurrentUser } from "../Store/features/authSlice";
import axios, { Axios } from "axios";
import { useMediaQuery } from "react-responsive";
import { AiFillHome } from "react-icons/ai";
import { RiProfileFill } from "react-icons/ri";
import { FiHelpCircle } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { Button, createStyles } from "@mantine/core";
import whiteLogo from "../images/logo.png";
import { AuthContext } from "../utils/context/AuthContext";
import HeaderProfile from "../newComponent/HeaderProfile/HeaderProfile";
import { Icon } from "@iconify/react";
import { socket } from "../utils/context/SocketContext";
import { GiCancel } from "react-icons/gi";
import menubar from "../images/menu.png"

const useStyles = createStyles((theme) => ({}));

const Header = () => {
  // const { user } = useSelector((state) => state.auth);
  const { user } = useContext(AuthContext);
  const sidenav = useRef();
  const sidenavblur = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const location = useLocation();
  const urlPath = location.pathname;
  // const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  // const largeDesktop = useMediaQuery({ query: "(min-width: 1750px)" });
  // const mediumDesktop = useMediaQuery({ query: "(max-width: 1440px)" });

  // console.log("header user", user);

  const sidenavs = () => {
    sidenav.current.style.bottom = "0px";
    sidenavblur.current.style.bottom = "0px";
  };

  const sidenavss = () => {
    sidenav.current.style.bottom = "-100%";
    sidenavblur.current.style.bottom = "-100%";
  };

  const handleLogout = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`${import.meta.env.VITE_BASE_URL}/authentication/log-out`, {})
      .then((response) => {
        console.log("hii");
        console.log(response);
        if (response.status === 200) {
          dispatch(
            addToast({ msg: "Logged Out successfully", kind: "SUCCESS" })
          );
          dispatch(logOutUser());
          socket.disconnect();
          navigate("/auth");
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
              navigate("/auth");
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
  return (
    <>
      <header
        // className={`Navbar shadow-md  ${
        //   location.pathname == "/"
        //     ? " bg-[#e61a52] w-full"
        //     : "bg-gray-50"
        // }`}
        className="fixed  z-50 flex shadow-sm  justify-between items-center !px-4 sm:!px-12 bg-white w-full py-3  "
      >
        <NavLink className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center" to="/">
          {/* <img src={location.pathname !== "/" ? logo : whiteLogo} alt="logo" /> */}
          <div className="lg:h-[40px] md:h-[35px] h-[28px] w-fit outline-none border-none">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-contain"
            />
          </div>
        </NavLink>
        <div className=" items-center gap-8 hidden sm:flex">
          <ul className="flex lg:gap-8 sm:gap-4 whitespace-nowrap font-medium md:text-[14px] text-[10px] max-[768px]  items-center w-full">
            <li
              className={`navbar-item  ${
                urlPath === "/" && "text-[#D22D3E] font-semibold"
              }`}
            >
              <NavLink
                className={`navbar-link  cool-link font-montserrat `}
                aria-current="page"
                to="/"
                // style={{color: 'rgba(255, 255, 255, 1) !important'}}
              >
                <p className="hover:scale-[1.04] transition-all duration-500">
                  Home
                </p>
              </NavLink>
            </li>
            <li
              className={`navbar-item  ${
                urlPath === "/about" && "text-[#D22D3E] font-semibold"
              }`}
            >
              <NavLink className={`navbar-link cool-link`} to="/about">
                {/* {isTablet ? "About Us" : "About Our Life Partner"} */}

                <p className="hover:scale-[1.04] transition-all duration-500">
                  About Partner
                </p>
              </NavLink>
            </li>
            <li className="navbar-item ">
              <NavLink
                className={`navbar-link cool-link ${
                  urlPath === "/home/main/dashboard" &&
                  "text-[#D22D3E] font-semibold"
                }
                 `}
                to="/home/main/dashboard"
              >
                {/* {isTablet ? "About Us" : "About Our Life Partner"} */}

                <p className="hover:scale-[1.04] transition-all duration-500">
                  Dashboard
                </p>
              </NavLink>
            </li>
            <li className="navbar-item ">
              <NavLink
                className={`navbar-link cool-link ${
                  urlPath === "/help" && "text-[#D22D3E] font-semibold"
                }`}
                to="/help"
              >
                <p className="hover:scale-[1.04] transition-all duration-500">
                  Help?
                </p>
              </NavLink>
            </li>
          </ul>

          {/* {!user ? (
            <Link to="/auth">
              {" "}
              <Button
                size={largeDesktop ? "lg" : mediumDesktop ? "sm" : "md"}
                variant="filled"
                style={{ backgroundColor: "var(--secondary)" }}
              >
                Login
              </Button>
            </Link>
          ) : (
            <Link>
              {" "}
              <Button
                size={largeDesktop ? "lg" : mediumDesktop ? "sm" : "md"}
                variant="filled"
                style={{ backgroundColor: "var(--secondary)" }}
                onClick={(e) => handleLogout(e)}
              >
                Logout
              </Button>
            </Link>
          )} */}
          {user ? (
            <Link to="/auth">
              {" "}
              <button className=" text-white bg-[#EB4566] transition-all duration-500 md:px-6 px-4 py-2 rounded-md ">
                Login
              </button>
            </Link>
          ) : (
            <HeaderProfile />
          )}
        </div>
        <div className="sidenavbar ">
          {
            // <GiHamburgerMenu
            //   onClick={sidenavs}
            //   className="p-[2px]  size-[28px]"
            //   color="#622F8E"
            // />
            <img src={menubar} alt="" className="w-6 "  onClick={sidenavs} />

          }

          <div ref={sidenav} className="sidenav">
          <div className="absolute text-3xl -top-[6em] right-4 text-white" onClick={sidenavss}
          >
             <GiCancel />
          </div>

            <div className="snbar"></div>
            <ul className="sidenavbar-items">
              <li className="sidenavbar-item">
                <NavLink
                  className="flex py-2 px-4 text-xl hover:bg-screen rounded-xl"
                  aria-current="page"
                  to="/"
                >
                  <AiFillHome size={25} color="#EB4566" />
                  <span className=" ml-3 font-semibold !text-lg  cursor-pointer">
                    Home
                  </span>
                </NavLink>
              </li>
              <li className="sidenavbar-item text-xl cursor-pointer">
                <NavLink
                  className="w-full flex text-xl py-2 px-4 hover:bg-screen rounded-xl"
                  to="/about"
                >
                  <RiProfileFill size={25} color="#EB4566" />
                  <span className="ml-3 font-semibold !text-lg ">
                    {" "}
                    About
                  </span>
                </NavLink>
              </li>
              <li className="sidenavbar-item text-xl cursor-pointer">
                <NavLink
                  className="w-full flex text-xl py-2 px-4 hover:bg-screen rounded-xl"
                  to="/home/main/dashboard"
                >
                  <Icon
                    icon="dashicons:dashboard"
                    className="text-2xl text-[#EB4566]"
                  />
                  <span className="ml-3 font-semibold !text-lg "> Dashboard</span>
                </NavLink>
              </li>
              <li className="sidenavbar-item">
                <NavLink
                  className="flex py-2 px-4 text-xl hover:bg-screen rounded-xl"
                  to="/help"
                >
                  <FiHelpCircle size={25} color="#EB4566" />
                  <span className="ml-2 font-semibold !text-lg ">Help?</span>
                </NavLink>
              </li>
            </ul>

            <div className="mt-4 ml-2">
              {!user ? (
                <span className="sidenavbar-item ">
                  <Link to="/auth">
                    {" "}
                    <button className="sidenav-btn px-8 py-2 ml-4 bg-[#EB4566] rounded-lg text-white">
                      Login
                    </button>
                  </Link>
                </span>
              ) : (
                <span className="sidenavbar-item ">
                  <Link>
                    {" "}
                    <button
                      className="sidenav-btn px-8 py-2 ml-4 bg-[#EB4566] rounded-lg text-white"
                      onClick={(e) => handleLogout(e)}
                    >
                      Logout
                    </button>
                  </Link>
                </span>
              )}
            </div>
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
};

export default Header;
