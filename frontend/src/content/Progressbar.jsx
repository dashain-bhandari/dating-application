import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Progressbar.css";
function ProgressBar() {
  const location = useLocation();
  const routes = [
    "/personaldetails",
    "/contactdetails",
    "/familydetails",
    "/preferencedetails",
    "/uploadprofile",
  ];
  const currentRouteIndex = routes.indexOf(location.pathname);
  const percentage = (currentRouteIndex / (routes.length - 1)) * 100;
  return (
    <>
      <div
        className="progress-bar mt-16"
        style={{ backgroundColor: `rgb(${percentage}%, 0, 0)` }}
      >
        <div className="progress" style={{ width: `${percentage}%` }}></div>
        <div className="steps">
          {routes.map((route, index) => (
            <Link
              key={route}
              to={route}
              className={`step ${index === currentRouteIndex ? "active" : ""}`}
            ></Link>
          ))}
        </div>
      </div>
      <div className="stepnumber">
        <div
          className="stepnumber-div"
          style={{ left: "36.5%", top: "-8px" }}
        ></div>
        <div
          className="stepnumber-div"
          style={{ left: "46.5%", top: "-8px" }}
        ></div>
        <div
          className="stepnumber-div"
          style={{ left: "56.5%", top: "-8px" }}
        ></div>
        <div
          className="stepnumber-div"
          style={{ left: "66.5%", top: "-8px" }}
        ></div>
      </div>
    </>
  );
}

export default ProgressBar;
