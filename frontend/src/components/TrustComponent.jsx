import React from "react";
import { Link } from "react-router-dom";
import couple1 from "../images/couplesImage/couple1.png";
import couple2 from "../images/couplesImage/couple2.png";
import couple3 from "../images/couplesImage/couple3.png";
import couple4 from "../images/couplesImage/couple4.png";
import trusticon1 from "../images/couplesImage/trusticon1.png";
import trusticon2 from "../images/couplesImage/trusticon2.png";
import trusticon3 from "../images/couplesImage/trusticon3.png";
import petals from "../images/petals.png";
import trusticon4 from "../images/couplesImage/trusticon4.png";
import ringLogo from "../images/doubleRing.png";
import { motion } from "framer-motion";
import { textanimate, CardAnimation } from "./animation/Animation";

export default function TrustComponent() {
  return (
    <div className="relative md:py-24 py-10 md:px-10 px-2 max-w-screen-2xl mx-auto bg-light z-0">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        variants={textanimate}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center pb-8"
      >
        <span>
          <img src={ringLogo} alt="ringLogo" />
        </span>
        <p className="md:text-2xl font-bold">
          Why <span className="text-[#D22D3E]">Us</span>
        </p>
        <span>
          <img src={ringLogo} alt="ringLogo" />
        </span>
      </motion.div>

      {/* petals on the screen */}
      <figure className="md:block absolute hidden z-10 right-20 top-10">
        <img src={petals} alt="petals" />
      </figure>
      <figure className="md:block absolute hidden z-10 left-20 bottom-0 rotate-90">
        <img src={petals} alt="petals" />
      </figure>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:px-2 md:px-10">
        {trustItems.map((item, index) => (
          <motion.div
            key={index}
            variants={CardAnimation}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="relative group mb-0 rounded-2xl overflow-hidden shadow-md shadow-gray-400  cursor-pointer"
          >
            <div className="rounded-2xl overflow-hidden max-h-[30em] ">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="absolute bottom-24 md:group-hover:bottom-28 z-20 flex flex-col justify-center items-center w-full transition-all duration-700 ease-in-out">
              <div className="h-28 w-28 md:group-hover:scale-75 transition-all duration-700 ease-in-out">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* hidden until hover section */}
              <div className="text-white font-medium md:text-xl md:w-[50%] w-[60%] text-center pt-4 md:whitespace-normal whitespace-nowrap">
                {item.title}
              </div>
            </div>
            <div className="absolute md:group-hover:z-20 bottom-4 w-full flex flex-col justify-center items-center text-white gap-2 transition-all duration-300 ease-in-out text-center text-sm font-thin">
              <div className="z-20 md:hidden block whitespace-nowrap sm:whitespace-normal md:group-hover:block text-center px-4 sm:w-60 w-82 font-light text-white md:text-l text-[10px]">
                {item.desc}
              </div>
              <button className="z-20 md:group-hover:flex md:hidden border text-sm px-6 py-2 font-light hover:bg-primary rounded-xl">
                <Link to="/home/main/dashboard">Browse Partner</Link>
              </button>
            </div>
            <div className="z-10 absolute bottom-0 bg-gradient-to-b from-[#EB4566] to-[#771125] md:h-0 h-[130px] rounded-t-3xl md:group-hover:h-[182px] md:group-hover:w-full w-full transition-all duration-500 ease-out"></div>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const trustItems = [
  {
    icon: trusticon3,
    image: couple1,
    title: "100% Secured Profiles",
    desc: "We give you guaranteed information security.",
  },
  {
    icon: trusticon2,
    image: couple2,
    title: "Manually Tested Accounts ",
    desc: "Each account is tested and verified.",
  },
  {
    icon: trusticon1,
    image: couple3,
    title: "Privacy and Security",
    desc: "High measured means of security provided.",
  },
  {
    icon: trusticon4,
    image: couple4,
    title: "Wide Search Range",
    desc: "Wide range of area that you can search for.",
  },
];
