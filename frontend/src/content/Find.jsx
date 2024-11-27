import React from "react";
import profile from "../images/pp.jpeg";
import "../styles/Find.css";
const Find = () => {
  return (
    <>
      <div className="find">
        <div className="container">
          <div className="find-user px-3">
            <div className="user-img">
              <img
                src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png"
                alt="profile picture"
                className="profilepicture object-fit-cover "
              />
            </div>
            <div className="user-data">
              <h5>Rahul Singh</h5>
              <h6 className="">
                Age: <span>23</span>
              </h6>
              <div className="d-flex gap-3 ms-3">
                <h6 className="border  px-3 py-1 rounded-5">interests</h6>
                <h6 className="border  px-3 py-1 rounded-5">interests</h6>
              </div>
              <h6>I never give up</h6>
            </div>
            <div>
              <button className="find-outline">View Profile</button>
              <button className="find-btn">Connect</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Find;
