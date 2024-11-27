import React from "react";
import "../App.css";
import s2 from "../images/third_c.png";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const Fifth = () => {
  return (
    <>
      <div className="Fifth overflow-hidden max-w-screen-2xl mx-auto z-0">
        {/* <Marquee pauseOnHover> */}
        <div className="h-96 w-screen relative overflow-hidden">
          <div className="h-96">
            <img
              src={s2}
              alt="cover2"
              className="absolute w-full animate-slideUp h-96 object-cover"
            />
          </div>
          <div className="h-96">
            <img
              src={s2}
              alt="cover2"
              className="absolute w-full animate-slideUp h-96 object-cover"
            />
          </div>
        </div>

        {/* </Marquee> */}
        <div className="third_cover"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:mx-20 z-10">
          <h3 className="text-white font-semibold uppercase">
            WE HELPED THEM FIND THEIR MATCH
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-semibold">
            Join us and let's find <br /> the best match for you <br /> too.
          </h2>
          <div>
            <button className="px-6 py-2 text-sm opacity-80 hover:!opacity-100 border border-white text-white !bg-[##E6303D] rounded-full mt-4">
              <Link to="/home/main/dashboard" >
              Click here to find a match
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fifth;
