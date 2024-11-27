import React from "react";
import "../App.css";
import t1 from "../images/secureImage.svg";
import t2 from "../images/manuallyTested.svg";
import t3 from "../images/privacyImage.svg";
import simple from "../images/phone.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ringLogo from "../images/doubleRing.png";
const Fourth = () => {
  return (
    // <div className=" w-screen py-10 bg-light px-4 sm:px-8 md:px-20">
      <div className="py-10 bg-light">
        <div className=" bg-white flex flex-col mx-auto  justify-center items-center text-center py-10 px-4 w-fit rounded-2xl">
          <div className=" flex justify-center items-center pb-8">
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
            <p className="text-2xl font-bold  ">
              Why <span className="text-[#D22D3E] ">Trust</span> Us ?
            </p>
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 px-4 sm:px-8 md:px-20">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-light flex flex-col justify-between py-4 w-72"
              >
                <div className="m-4 h-40">
                  <img
                    className="w-full h-full object-cover"
                    src={item?.img}
                    alt="trust1"
                  />
                </div>
                <h1 className="text-[#585858] text-2xl font-semibold flex justify-start px-4 py-2">
                  {item?.title}
                </h1>
                <p className="flex justify-start px-4 ">{item?.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="row py-16 align-items-center w-full">
          <div className=" flex justify-center items-center pb-8">
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
            <p className="text-2xl font-bold ">
              Simple <span className="text-[#D22D3E] ">Guide</span>
            </p>
            <span>
              <img src={ringLogo} alt="ringLogo" />
            </span>
          </div>

          <div className=" flex gap-8 justify-center flex-col-reverse md:flex-row items-center">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <span>How does OurLifePartner operates?</span>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      The vast amount of verified registration gives each
                      profile <br /> more chances to find perfect match for them{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Creation of true and geniune self profile
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>This is the second item's accordion body.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Selection of right membership package
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      This is the third item's accordion body.It is hidden by
                      default, until the collapse plugin adds the appropriate
                      classes that we use to style each element.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Search of your match in organized manner
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>This is the third item's accordion body.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Chances of finding geniune & perfect match
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>This is the third item's accordion body.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center text-center ">
              <img className="simple" src={simple} alt="fourth_img" />
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Fourth;

const trustItems = [
  {
    img: t1,
    title: "100% Secured Profiles",
    desc: " We give you guaranteed information security.",
  },
  {
    img: t2,
    title: "Manually Tested Accounts",
    desc: " Each accounts are varified by our specialized team members.",
  },
  {
    img: t3,
    title: "Privacy & Security Control",
    desc: " Highly measured means of security provided. ",
  },
];
