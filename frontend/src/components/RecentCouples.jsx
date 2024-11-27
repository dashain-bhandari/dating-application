import React from "react";
import couple1 from "../images/couplesImage/couple1.png";
import couple2 from "../images/couplesImage/couple2.png";
import couple3 from "../images/couplesImage/couple3.png";
import couple4 from "../images/couplesImage/couple4.png";
import ring from "../images/ringoutline.png";
import ringLogo from "../images/doubleRing.png";
import { Link } from "react-router-dom";
import { textanimate,recentAnimation,findyours } from "./animation/Animation";
import { motion } from "framer-motion";

export default function RecentCouples() {
  return (
    <div className="bg-[#F3F4F6] max-w-screen-2xl mx-auto md:pt-20 pt-10">
      <motion.div 
      initial="hidden"
      whileInView="visible"
      variants={textanimate}
      transition={{ duration: 0.5 }}
      className=" flex justify-center items-center pb-8">
        <span>
          <img src={ringLogo} alt="ringLogo" />
        </span>
        <p className="md:text-2xl font-bold ">
          Recent <span className="text-[#EB4566] ">Couples</span>
        </p>
        <span>
          <img src={ringLogo} alt="ringLogo" />
        </span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 cursor-pointer ">
        {recentCouples?.map((item, index) => (
          <motion.div 
            key={index}
            variants={recentAnimation}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ease:"easeInOut",duration:0.5}}
            className="relative group mb-0">
            <div className="sm:h-[500px] h-[400px] w-full overflow-hidden">
              <img
                src={item?.img}
                alt={item?.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out md:group-hover:scale-125"
              />
            </div>
            
            <div
  className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-500 ease-in-out md:h-0 md:w-0 md:group-hover:h-full md:group-hover:w-full"
></div>
<div
//  initial="hidden"
//  whileInView="visible"
//  variants={findyours}
//  viewport={{ once: true, amount: 0.5 }}
//  transition={{ease:"easeInOut",duration:0.5}}
  className="inset-0 absolute flex flex-col justify-center items-center text-white group-hover:opacity-100 md:opacity-5 transition-all duration-300 ease-in-out md:group-hover:opacity-100"
>
  <div>
    <img src={ring} alt="ring" />
  </div>
  <div className="py-8 text-center">
    <h1 className="text-2xl font-semibold">{item?.name}</h1>
    <h2 className="text-sm text-gray-300">{item?.address}</h2>
  </div>
  <button 
  
  className="px-6 py-2 md:block group-hover:block hidden font-medium rounded-xl border  bg-gradient-to-b from-[#EB4566] to-[#9F1632] md:hover:bg-[#cf2c4d] group-hover:translate-y-0 translate-y-10 ease-in-out duration-500">
    <Link to="/home/main/dashboard">Find Yours</Link>
  </button>
</div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}

const recentCouples = [
  {
    img: couple1,
    name: "Mr & Mrs Singh",
    address: "Lalitpur",
  },
  {
    img: couple2,
    name: "Mr & Mrs Warner",
    address: "Kathmandu",
  },
  {
    img: couple3,
    name: "Mr & Mrs Adhikari",
    address: "Butwal",
  },
  {
    img: couple4,
    name: "Mr & Mrs Shrestha",
    address: "Kathmandu",
  },
];
