import React from "react";
import "../styles/Profile_page.css";
import Layout from "./Layout";
import Filter from "../content/Filter";
import Searchedlist from "../content/Searchedlist";
import { useMediaQuery } from "react-responsive";
import data from "../Store/data.json";
import { Link, useNavigate } from "react-router-dom";

const Profile_Page = () => {
  const navigate = useNavigate();
  const handleCardClick = (value) => {
    navigate(`/userprofile/${value.id}`, { state: { value } });
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTabletOrMobileFilter = useMediaQuery({ query: "(max-width: 992px)" });
  return (
    <>
      <div className="profiles py-4">
        <div className="container">
          <div className="profile-section position-relative">
            {isTabletOrMobileFilter ? (
              <>
                <div className="profiles-dropdowns">
                  <ul>
                    <li>Rahul</li>
                    <li>ersge</li>
                    <li>Raedghul</li>
                    <li>Raegrerul</li>
                    <li>t</li>
                    <li>Radfsdhul</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {" "}
                <Filter className="filtersearch" />
              </>
            )}
            <div className="profile-right px-3">
              <div className="profile-right-title">
                <h1>Here is your Perfect Match...</h1>
                <div className="profile-details">
                  <div className="p1">
                    {" "}
                    <p className="">
                      20 <span>Profiles</span>
                    </p>
                  </div>
                  <div className="p1">
                    {" "}
                    <p>
                      Female, <span>18 - 25 Years</span>
                    </p>
                  </div>
                </div>
              </div>
              {isTabletOrMobile ? (
                <>
                  {data.map((value) => (
                    <div className="searched-list">
                      <img
                        src="https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="user-profile"
                      />
                      <div className="user-profile-overlay"></div>
                      <div className="searchedlist-right">
                        <h3>{value.full_name}</h3>
                        <hr />
                        <div className="user-details">
                          <div className="user-details-left">
                            <p>{value.marital_status}</p>
                            <p>
                              {value.religion}, <span>{value.caste}</span>
                            </p>
                          </div>
                          <div className="user-details-middle">
                            <p>{value.country}</p>
                            <p>{value.occupation}</p>
                          </div>
                          <div className="user-details-right">
                            <Link to="/userprofile">
                              <button
                                onClick={() => handleCardClick()}
                                className="searchedlist-outline-btn"
                              >
                                View Profile
                              </button>
                            </Link>

                            <button className="searchedlist-btn">
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <Searchedlist />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile_Page;
