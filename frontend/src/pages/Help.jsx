import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/Help.css";
import { MdKeyboardArrowDown} from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";



const quesdata = [
  {
    ques:"General FAQs",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },
  {
    ques:"Registration and Process",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },
  {
    ques:"Profiles & Photos",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },
  {
    ques:"Login Help",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },
  {
    ques:"Contact Members",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },
  {
    ques:"Search Options & Greeting Responses",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },
  {
    ques:"Upgrade & Paid Services",
    ans:"The vast amount of verified registration gives each profile more chances to find perfect match for them",
  },

]
const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Layout>
      <>
        <div className="helpsection bg-light">
          <div className="container">
            <div className="helpsection-first-details mt-6">
              {/* <h1 className="font-medium">How can we help you today?</h1> */}
              <div className="helpsection-first-details-contact">
                <div className="helpsection-first-details-contact-title ">
                  <h5 className="font-bold lg:!text-4xl md:!text-3xl text-2xl">Frequently Asked Questions</h5>
                  <p className="font-medium py-2 !text-[14px]">
                    We have created FAQs based on various queries and feedback
                    received from our members.
                  </p>
                </div>
                {/* <div className="accordion" id="accordionExample">
                  <div className="accordion-item ">
                    <h2 className="accordion-header " id="headingOne">
                      <button
                        className="accordion-button ps-4 "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        General FAQs
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          The vast amount of verified registration gives each
                          profile <br /> more chances to find perfect match for
                          them{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button ps-4 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Registration & Process
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
                        className="accordion-button ps-4 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Profile & Photos
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
                          This is the third item's accordion body.It is hidden
                          by default, until the collapse plugin adds the
                          appropriate classes that we use to style each element.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button ps-4 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Login Help
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
                        className="accordion-button ps-4 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        Contact Members
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
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                      <button
                        className="accordion-button ps-4 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        Search Options & Getting Responses
                      </button>
                    </h2>
                    <div
                      id="collapseSix"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>This is the third item's accordion body.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                      <button
                        className="accordion-button ps-4 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven"
                        aria-expanded="false"
                        aria-controls="collapseSeven"
                      >
                        Upgrade & Paid Services
                      </button>
                    </h2>
                    <div
                      id="collapseSeven"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSeven"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>This is the third item's accordion body.</p>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* general questions and answers */}
                <div className="grid grid-cols-1 place-items-center mt-4">
                {quesdata.map((data, index) => (
                <div key={index} className="px-2 bg-white shadow-sm border-none outline-none md:mb-4 mb-3  md:py-3 py-2 md:w-[40em] sm:w-[35em] w-[18em] rounded-xl">
                  <button className="flex justify-center outline-none items-center w-full" onClick={() => handleClick(index)}>
                    <h2 className={`text-left text-[#d22d3e] w-full py-2   outline-none ${activeIndex === index ? 'border-b border-[#d22d3e]' : ''}`}>{data.ques}</h2>
                    <p className="duration-300 ease-in-out"> {activeIndex === index ? <MdKeyboardArrowUp size={28} /> : <MdKeyboardArrowDown size={28} />}
                    </p>
                  </button>
                 

                 <div  className={`mt-2 duration-300 ease-in-out  ${activeIndex === index ? 'translate-y-0 opacity-100 duration-300 ease-in-out' : '-translate-y-4 opacity-0 duration-300 ease-in-out'}`}>
                 {activeIndex === index && (
                    <div>
                      <p className="text-left md:py-4 py-2 px-2 font-medium text-sm  text-gray-500 tracking-wide">{data.ans}</p>
                    </div>
                  )}
                 </div>
                </div>
              ))}
                </div>
              </div>
              <div className="helpsection-second-details">
                <div className="helpsection-second-details-firstdiv font-medium">
                  <i class="bi bi-envelope-at"></i>
                  <p>Send your queries to:- </p>
                  <p>webxnepal@gmail.com </p>
                </div>
                <div className="helpsection-second-details-seconddiv font-medium">
                  <i class="bi bi-telephone-outbound"></i>
                  <p>+977-9812456375 (Nepal)</p>
                  <p>9am - 6pm (Sun - Fri)</p>
                </div>
                <div className="helpsection-second-details-thirddiv font-medium">
                  <i class="bi bi-phone-vibrate"></i>
                  <p>For instant answer</p>
                  <p>+977-9812456375 (Nepal)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Help;
