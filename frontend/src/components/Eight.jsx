import React from "react";
import "../styles/Eight.css";
import esewa from "../images/esewa.png";
import imepay from "../images/imepay.png";
import khalti from "../images/khalti.png";
import NMB from "../images/NMB.png";
import visa from "../images/visa.png";
import Marquee from "react-fast-marquee";

const Eight = () => {
  return (
    <>
      <div className="nine py-4 my-5">
        <div className="container">
          <p className="text-center py-2">Our Associated Partners</p>
          {/* <div className="row"> */}
          {/* <div className="payment"> */}
          <Marquee pauseOnHover>
            {/* <img src={esewa} alt="esewa" />
                <img src={imepay} alt="imepay" className="imepay" />
                <img src={khalti} alt="khalti" className="khalti" />
                <img src={NMB} alt="NMB" className="NMB" />
                <img src={visa} alt="Visa" className="visa" /> */}
            {paymentPartner.map((item, index) => (
              <div key={index} className="px-20">
                <img src={item} alt="payment partner" />
              </div>
            ))}
          </Marquee>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Eight;

const paymentPartner = [esewa, imepay, khalti, NMB, visa];
