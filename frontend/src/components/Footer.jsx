import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import i2 from "../images/facebookicon.png";
import i3 from "../images/instaicon.png";
import i4 from "../images/youtubeicon.png";
import visa from "../images/visa.png";
import esewa from "../images/esewa.png";
import khalti from "../images/khalti.png";
import imepay from "../images/imepay.png";
import copyright from '../images/copyright.png'
import ringLogo from "../images/doubleRing.png";
import { FaFacebook } from "react-icons/fa6";


const Footer = () => {
  const id = location?.pathname?.split("/")[3];

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  function scrollToTopLeft() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className=" bg-white max-w-screen-2xl mx-auto ">
      <footer className="md:py-10 py-8 grid lg:grid-cols-4 md:grid-cols-2 justify-center md:gap-4 gap-10 w-11/12 mx-auto ">
      <section className="space-y-2">
        <h2 className="text-[#D22D3E] font-bold lg:text-xl md:l sm:l flex items-center">
          <img src={ringLogo} alt="logo" />
          Our Life Partner</h2>
        <p className="py-2 font-medium text-gray-500 text-sm"> We have millions of registered users from different parts of the country, and filters to match people based on their choices, interests, and lifestyle.</p>

        <div className="border w-60 p-2 rounded-full z-0">
            <ul className="flex items-center gap-2  ">
              <h2 className="bg-gradient-to-b from-[#EB4566] to-[#9F1632] px-3 text-white rounded-full whitespace-nowrap text-sm py-2">Social Media</h2>
              <Link to="#" target="_blank">
              <img src={i2} alt="facebook" className="w-6" />
              </Link>
              <Link to="#" target="_blank">
                <img src={i3} alt="instagram" className="w-7"/>
              </Link>
              <Link to="#" target="_blank">
              <img src={i4} alt="youtube" className="w-8" />
              </Link>
              
            </ul>        
        </div>
      </section>

         <section className="space-y-4 flex flex-col lg:items-center md:items-end ">
          <h2 className="font-bold lg:text-xl md:l sm:l text-[#d22d3e]">Quick Links</h2>
             <div className="space-y-2 list-none font-medium text-gray-500 text-sm">
             <li onClick={scrollToTopLeft}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={scrollToTopLeft}>
              <Link to="/home/main/dashboard">Search For Partners</Link>
            </li>
            <li onClick={scrollToTopLeft}>
              <Link to="/home/main/dashboard">Browse profiles By</Link>
            </li>
             </div>
         </section>


         <section className="space-y-4 flex flex-col lg:items-center ">
          <h2 className="font-bold lg:text-xl md:l sm:l  text-[#d22d3e]">Associate Partners</h2>
          <ul>
          <li className="flex gap-4 ">
              <img src={visa} alt="visa" className="h-8 " />
              <img src={esewa} alt="esewa" className="h-8 " />
              <img src={khalti} alt="khalti" className="h-8 " />
              <img src={imepay} alt="imepay" className="h-8 " />
            </li>
          </ul>

         </section>


         <section className="space-y-4 flex flex-col md:items-end">
          <h2 className="font-bold lg:text-xl md:l sm:l text-[#d22d3e] whitespace-nowrap">About Our Life Partner</h2>
          <div className="space-y-2 text-sm text-gray-500  font-medium list-none flex flex-col  md:items-end w-full">
           <li onClick={scrollToTopLeft}>
              <Link to="/about">Who Are We?</Link>
            </li>
            <li onClick={scrollToTopLeft}>
              <Link to="/about">Contact Us</Link>
            </li>
            <li onClick={scrollToTopLeft}>
              <Link to="/about">Our History</Link>
            </li>
           </div>
         </section>
      </footer>

     <div className="border-t py-6  px-20 flex flex-wrap sm:gap-8 items-center sm:justify-between justify-center w-full mb-12 md:mb-0 whitespace-nowrap">
      <div className="flex items-center justify-center  gap-2 ">
      <img src={copyright} alt="" className="w-4" />

        <h2 className="text-gray-500 md:text-l text-[12px]">2024 || All Rights reserved</h2>
      </div>
     <div >
        <h2 className="text-center text-gray-500 md:text-l text-[12px]">Designed & Developed by <span className="text-gray-600 font-semibold">WebX</span></h2>
          </div>
     </div>
    </div>
  );
};

export default Footer;
