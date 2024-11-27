import React from "react";
import "../styles/Nine.css";
import last from "../images/last_cover.png";
import logo from "../images/logo.png";
const Nine = () => {
  return (
    <>
      <div className="Nine">
        <div className="container text-center">
          <div className="Nine-cover-img">
            <img src={last} alt="last_cover" />
            <div className="last_caption">
              <p>
                MAKE |<span> MEET </span>| MARRY
              </p>
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nine;
