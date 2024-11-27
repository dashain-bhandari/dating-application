import React from "react";
import ProgressBar from "./Progressbar";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { useState } from "react";
import "../styles/PreferenceDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../http";
import { setPreferanceDetail } from "../Store/features/preferanceDetailSlice";
// import { setPreferanceDetail } from '../Store/features/preferanceDetailSlice';
const PreferenceDetails = () => {
  const { preferanceDetail } = useSelector((state) => state.preferanceDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(preferanceDetail);
  const [values, setValues] = useState({
    minAge: "",
    maxAge: "",
    maritalStatus: "",
    height: "",
    religion: "",
    caste: "",
    subcaste: "",
    language: "",
    education: "",
    occupation: "",
    country: "",
    smokeOrDrink: "",
  });

  useEffect(() => {
    if (preferanceDetail) {
      setValues(preferanceDetail);
    }
  }, [preferanceDetail]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/users/preferance-detail", values)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setPreferanceDetail(response.data));
        navigate("/uploadprofile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="preferenceSection">
        <ProgressBar />
        <h1>"Please fill the important preference"</h1>
        <div className="container">
          <div className="row">
            <form className="preferenceSection-form" onSubmit={handleSubmit}>
              <div className="preferanceSection-detail">
                <div className="preferenceSection-form-left">
                  <div className="minage group">
                    <input
                      type="number"
                      value={values.minAge}
                      name="minAge"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>Minimum age</label>
                  </div>
                  <div className="maxage group">
                    <input
                      type="number"
                      value={values.maxAge}
                      name="maxAge"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>Maximum age</label>
                  </div>
                  <div className="maritalstatus group">
                    <input
                      type="text"
                      value={values.maritalStatus}
                      name="maritalStatus"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>marital status</label>
                  </div>
                  <div className="height group">
                    <input
                      type="text"
                      value={values.height}
                      name="height"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>height</label>
                  </div>
                </div>

                <div className="PreferenceSection-form-middle">
                  <div className="smokedrink group">
                    <input
                      type="text"
                      value={values.religion}
                      name="religion"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>Religion</label>
                  </div>
                  <div className="caste group">
                    <input
                      type="text"
                      value={values.caste}
                      name="caste"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>caste</label>
                  </div>
                  <div className="subcaste group">
                    <input
                      type="text"
                      value={values.subcaste}
                      name="subcaste"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>subcaste</label>
                  </div>
                  <div className="Religion group">
                    <input
                      type="text"
                      value={values.language}
                      name="language"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>language</label>
                  </div>
                </div>

                <div className="PreferenceSection-form-right">
                  <div className="education group">
                    <input
                      type="text"
                      value={values.education}
                      name="education"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>education</label>
                  </div>
                  <div className="occupation group">
                    <input
                      type="text"
                      value={values.occupation}
                      name="occupation"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>occupation</label>
                  </div>
                  <div className="country group">
                    <input
                      type="text"
                      value={values.country}
                      name="country"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>country</label>
                  </div>

                  <div className="country group">
                    <input
                      type="text"
                      value={values.smokeOrDrink}
                      name="smokeOrDrink"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>smokeOrDrink</label>
                  </div>
                </div>
              </div>
              <div className="PreferenceSection-form-btn">
                <Link to="/familydetails">
                  {" "}
                  <button type="reset" className="btnprev">
                    <HiChevronDoubleLeft /> Prev
                  </button>
                </Link>

                <button type="submit" className="btnnext">
                  Next <HiChevronDoubleRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default PreferenceDetails;
