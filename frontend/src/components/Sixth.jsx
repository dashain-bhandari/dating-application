import React, { useState } from "react";
import "../App.css";
import ringLogo from "../images/doubleRing.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import nepalpayment from "../images/logo-nepal-payment-normal.png";
import { IoMdClose } from "react-icons/io";
import { axiosInstance } from "../http";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import petals from "../images/petals.png";
import { useAuth } from "../hooks/useAuth";
import cardbg from "../images/cardbackground.png";
import { motion } from "framer-motion";
import { textanimate,freeplanAnimation,premiumplanAnimation } from "./animation/Animation";

const Sixth = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const { loading, user } = useAuth();

  const buy = async (p, price) => {
    try {
      const { data } = await axiosInstance.post(
        "/orders",
        { package: p, price },
        { withCredentials: true }
      );
      console.log(data);
      if (data) {
        navigate(`${data.id}/payment`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="Sixth md:py-20 py-10 bg-light px-4 relative">
        <div className="container">
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
              Our <span className="text-[#EB4566] ">Plan</span>
            </p>
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
          </motion.div>

          
      {/* petals on the screen */}
      <figure className="md:block absolute hidden z-10 left-60 top-10">
      <img src={petals} alt="petals" />
      </figure>
      <figure className="md:block absolute hidden z-10 right-[10em] bottom-10 rotate-90">
      <img src={petals} alt="petals" />
      </figure>
      
          <div className="flex flex-wrap gap-10 justify-center items-center px-10">
            <motion.div
             variants={freeplanAnimation}
             initial="initial"
             whileInView="animate"
             viewport={{ once: true, amount: 0.2 }}
             transition={{ease:"easeInOut",duration:0.5}}
            >
              <div className="shadow-md shadow-gray-100 py-4 flex flex-col md:w-[20em] w-[18em] md:max-h-[60vh] align-items-center rounded-2xl bg-white">
                <h1 className="text-2xl text-[#676767] font-medium">
                  Free Plan
                </h1>
                <ul className="text-[#cf2c3d] py-6">
                  {freePackage.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icon
                        icon="mdi:tick-circle-outline"
                        className="text-xl"
                      />
                      <p className="text-sm py-2 font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className=" border-black border mt-2 px-8  py-2 font-medium 
                      bg-[#e23e4f] text-white hover:bg-[#fc5b6b] rounded-xl"
                  onClick={() => navigate("/home/payment")}
                >
                  Start Now
                </button>
              </div>
            </motion.div>

            <motion.div
            variants={premiumplanAnimation}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ease:"easeInOut",duration:1}}
            >
              <div
                style={{ backgroundImage: `url(${cardbg})` }}
                className=" bg-cover bg-no-repeat shadow-md shadow-gray-100 py-4 flex flex-col md:w-[20em] w-[18em] md:max-h-[60vh] align-items-center rounded-2xl bg-[#cf2c3d] text-white "
              >
                <h1 className="text-2xl font-medium">Premium Plan</h1>
                <ul className="text-white py-4">
                  {premiumPackage.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icon
                        icon="mdi:tick-circle-outline"
                        className="text-xl"
                      />
                      <p className="text-sm py-2 font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className=" !bg-transparent text-white !border mt-0 px-6  py-2  border-white !outline-none !text-sm rounded-xl"
                  onClick={() => navigate("/home/payment")}
                >
                  Upgrade Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* <Popup
        open={popupOpen}
        onClose={closePopup}
        modal
        closeOnDocumentClick={true}
        contentStyle={{
          padding: 30,
          borderRadius: 30,
          maxWidth: "fit-content",
        }}
        position="center center"
      >
        <div>
          <div className=" text-[#cf2c3d] font-bold text-xl flex justify-center items-center text-centr ">
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
            <span>Our Life Partner</span>
          </div>
          <div className="text-[#555555] text-xl font-medium flex justify-center items-center py-3 sm:whitespace-nowrap">
            Select your desigred Premimum plan!!
          </div>
          <div className="flex flex-col gap-4 justify-center w-full items-center">
            <button
              className="bg-[#7C4BA1] text-white rounded-md px-6 py-2 w-fit"
              onClick={() => buy(1, 500)}
            >
              1 months @Rs.500
            </button>
            <button
              className="bg-[#7C4BA1] text-white rounded-md px-6 py-2 w-fit"
              onClick={() => buy(3, 1200)}
            >
              3 months @Rs.1200
            </button>
            <button
              className="bg-[#7C4BA1] text-white rounded-md px-6 py-2 w-fit"
              onClick={() => buy(6, 2400)}
            >
              6 months @Rs.2400
            </button>
            <button className="bg-[#7C4BA1] text-white rounded-md px-6 py-2 w-fit"
            onClick={() => buy(12, 5500)}
            >
              1 Year @Rs.5500
            </button>
          </div>
        </div>
      </Popup> */}
    </>
  );
};

export default Sixth;

const freePackage = [
  "Browse 20 Profiles",
  "Shortlist & Send Interest",
  "Message and chat",
  "limited users recommendation",
  "limited Profile Details",
  "Search option",
  "View Control details",
  "Voice call available",
];
const premiumPackage = [
  "Unlimited Profiles browsing ",
  "Shortlist & Send Interest",
  "Message and chat",
  "Unlimited users",
  "Top & bold Search list",
  "Unlock access to advance search",
  "View all profile details",
  "Unlimited  voice and video call",
];
