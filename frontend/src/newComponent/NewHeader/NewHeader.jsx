import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
// import { GoThreeBars } from "react-icons/go";
import logo from "../../images/lifepartnerlogo.png";

function NewHeader() {

 const sidenav = useRef();
  const sidenavblur = useRef();

    const sidenavs = () => {
    sidenav.current.style.bottom = "0px";
    sidenavblur.current.style.bottom = "0px";
  };

  const sidenavss = () => {
    sidenav.current.style.bottom = "-100%";
    sidenavblur.current.style.bottom = "-100%";
  };


  return (
    <div className="bg-white">
        <header className="Navbar flex justify-between">
        <NavLink className="navbar-logo basis-1/3" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <ul className="Navbar-items xl:basis-1/2 2xl:basis-1/3">
          <li className="navbar-item mt-2">
            <NavLink
              className="navbar-link cool-link "
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-item mt-2">
            <NavLink className="navbar-link cool-link" to="/about">
              About Our Life Partner
            </NavLink>
          </li>
          <li className="navbar-item mt-2">
            <NavLink className="navbar-link cool-link" to="/help">
              Help?
            </NavLink>
          </li>
          {/* {!user ? (
              <li className="navbar-item">
                <Link to="/signup">
                  {" "}
                  <button className="nav-btn">Login</button>
                </Link>
              </li>
              ):(
                <li className="navbar-item">
                <Link >
                  {" "}
                  <button className="nav-btn" onClick={(e) => handleLogout(e)}>Logout</button>
                </Link>
              </li>
              )} */}
        </ul>
        <div className="sidenavbar">
          {/* <GoThreeBars onClick={sidenavs} className="navbar-toggle" /> */}
          <div ref={sidenav} className="sidenav">
            <div className="snbar"></div>
            <ul className="sidenavbar-items">
              <li className="sidenavbar-item">
                <NavLink
                  className="navbar-link cool-link "
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="sidenavbar-item">
                <NavLink className="navbar-link cool-link" to="/about">
                  About Our Life Partner
                </NavLink>
              </li>
              <li className="sidenavbar-item">
                <NavLink className="navbar-link cool-link" to="/help">
                  Help?
                </NavLink>
              </li>
              {/* {!user ? (
            //   <li className="sidenavbar-item">
            //     <Link to="/signup">
            //       {" "}
            //       <button className="sidenav-btn">Register Now</button>
            //     </Link>
            //   </li>
              ):(
                <li className="sidenavbar-item">
                <Link >
                  {" "}
                  <button className="sidenav-btn" onClick={(e) => handleLogout(e)}>Logout</button>
                </Link>
              </li>
              )} */}
            </ul>
          </div>
          <div
            ref={sidenavblur}
            className="sidenavblur"
            onClick={sidenavss}
          ></div>
        </div>
      </header>
    </div>
  )
}

export default NewHeader