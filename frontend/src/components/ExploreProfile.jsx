import React from "react";
import loveicon from "../images/loveicon.png";
import image1 from "../images/exploreProfile/image1.png";
import image2 from "../images/exploreProfile/image2.png";
import image3 from "../images/exploreProfile/image3.png";
import image4 from "../images/exploreProfile/image4.png";
import image5 from "../images/exploreProfile/image5.png";
import petals from "../images/petals.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { exploreAnimation } from "./animation/Animation";
import { motion } from "framer-motion";

export default function ExploreProfile() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTab = useMediaQuery({ query: "(max-width: 768px)" });
  

  return (
    <div className=" relative bg-light md:py-10 py-4 max-w-screen-2xl mx-auto ">

      {/* petals on the screen */}
      <figure className="md:block absolute hidden z-10 left-60 top-10">
      <img src={petals} alt="petals" />
      </figure>
      <figure className="md:block absolute hidden z-10 left-[40em] bottom-10 rotate-90">
      <img src={petals} alt="petals" />
      </figure>

      <motion.div 
      variants={exploreAnimation}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ease:"easeInOut",duration:1}}
      className={`max-w-[80em] grid grid-cols-1 xl:grid-cols-2 gap-4 shadow-md shadow-zinc-200 py-10 place-items-center bg-white md:my-10  md:rounded-[2em] rounded-xl
          ${isMobile ? "mx-4" : (isTab ? "mx-8" : "mx-auto")}
      `}>
        <div className="sm:px-4 px-2 lg:ml-20 ">
          <div className="sm:pb-4 pb-2">
            <img src={loveicon} alt="loveicon" />
          </div>
          <div className="flex flex-col sm:gap-4 gap-3">
            <h1 className="xl:text-4xl md:text-3xl text-lg font-semibold text-black">
              Love knows no distance! Let's cross the miles and unite in
              marriage.
            </h1>
            <p className="md:text-lg text-sm text-[#7C7C7C] font-medium">
              Search the whole world for your potential partner with our wide
              range search scale.
            </p>
            <button className="sm:px-6 px-3 sm:py-3 py-2 md:text-[16px] text-[14px]  w-fit text-white bg-[#D22D3E] hover:bg-[#b93c48]  rounded-2xl outline:none font-medium">
             <Link to="/home/main/dashboard">
              Explore Profiles
             </Link>
            </button>
          </div>
        </div>

        <div className="xl:flex hidden flex-col -mt-20 justify-center items-center gap-4">
          <div className="h-60 w-60 sm:h-32 sm:w-32   rounded-3xl overflow-hidden">
            <img
              src={image1}
              alt="explore image"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="h-60 w-60 sm:h-32 sm:w-32  rounded-3xl overflow-hidden">
              <img
                src={image2}
                alt="explore image"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="h-60 w-60 sm:h-32 sm:w-32   rounded-3xl overflow-hidden">
              <img
                src={image3}
                alt="explore image"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="h-60 w-60 sm:h-32 sm:w-32   rounded-3xl overflow-hidden">
              <img
                src={image4}
                alt="explore image"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="h-60 w-60 rounded-3xl overflow-hidden">
            <img
              src={image5}
              alt="explore image"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
