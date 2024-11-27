import React from "react";
import "../styles/Filter.css";
const Filter = () => {
  return (
    <>
      <div className="filter mt-3">
        <div className="refine-text py-2">
          <h6 className="">Refine your search</h6>
        </div>
        <div className="accordion1 " id="accordionExample">
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingOne">
              <button
                className="accordion-button1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Marital Status
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse1"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    All
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Naver Married
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Married
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Widowed
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingTwo">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Income
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingThree">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Working As
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Doctor
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Nurse
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingFour">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Education
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    BBA
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingFive">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Diet
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Non-veg
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingSix">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Country
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Nepal
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    India
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingSeven">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                State
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingSeven"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingEight">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
              >
                City
              </button>
            </h2>
            <div
              id="collapseEight"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingEight"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Kathmandu
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Pokhara
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingNine">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseNine"
                aria-expanded="false"
                aria-controls="collapseNine"
              >
                Age
              </button>
            </h2>
            <div
              id="collapseNine"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingNine"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingTen">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTen"
                aria-expanded="false"
                aria-controls="collapseTen"
              >
                Religion
              </button>
            </h2>
            <div
              id="collapseTen"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingTen"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Hindu
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Sikh
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingEleven">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEleven"
                aria-expanded="false"
                aria-controls="collapseEleven"
              >
                Caste
              </button>
            </h2>
            <div
              id="collapseEleven"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingEleven"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Bahun
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Rai
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item1">
            <h2 className="accordion-header1" id="headingTwelve">
              <button
                className="accordion-button1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwelve"
                aria-expanded="false"
                aria-controls="collapseTwelve"
              >
                Mother Tongue
              </button>
            </h2>
            <div
              id="collapseTwelve"
              className="accordion-collapse1 collapse"
              aria-labelledby="headingTwelve"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    All
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    Nepali
                  </label>
                </div>{" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" for="flexCheckChecked">
                    English
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
