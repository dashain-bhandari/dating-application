import React from "react";
import "../styles/UserProfile.css";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
import LayoutwithoutFooter from "../components/LayoutwithoutFooter";
const UserProfile = () => {
  return (
    <>
      <LayoutwithoutFooter>
        <div className="userprofilemain">
          <div className="container py-5">
            <div className="userprofile py-3 px-2">
              <div className="user-profile-image">
                <img
                  src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg"
                  alt="pp"
                />

                <div className="userprofile-details">
                  <h3>Sameer Magar</h3>
                  <p>
                    <i className="bi bi-geo-alt-fill"></i> Nepal, Kathmandu
                  </p>
                  <Link to="/chat">
                    {" "}
                    <button className="userprofile-outline-btn">
                      <i class="bi bi-chat-dots"></i> Send Message
                    </button>
                  </Link>
                  <button className="searchedlist-btn">Connect</button>
                </div>
              </div>
              <div className="userprofile-about-photos py-3">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link user-cool-link active me-3"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      About Me
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link user-cool-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Photos
                    </button>
                  </li>
                </ul>
                <hr />
                <div className="tab-content mt-2" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabindex="0"
                  >
                    <div className="about-tab">
                      <div className="about-tab-left">
                        <h2>Bio</h2>
                        <p>
                          "Just enjoying life and sharing my adventures with
                          friends and family."
                        </p>
                        <h2>Age</h2>
                        <p>23 Years</p>
                        <h2>Height</h2>
                        <p>5.9 ft.</p>
                        <h2>Religion</h2>
                        <p>Hindu</p>
                        <h2>Caste</h2>
                        <p>Magar</p>
                      </div>
                      <div className="about-tab-right">
                        <h2>Education</h2>
                        <p>BCA</p>
                        <h2>Profession</h2>
                        <p>Web Developer</p>
                        <h2>Marital Status</h2>
                        <p>Never Married</p>
                        <h2>Income</h2>
                        <p>Rs. 2 lakh per Month</p>
                        <h2>State</h2>
                        <p>Bagmati</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    tabindex="0"
                  >
                    <Gallery />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutwithoutFooter>
    </>
  );
};

export default UserProfile;
