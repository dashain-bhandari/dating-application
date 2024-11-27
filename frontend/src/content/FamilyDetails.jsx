import React from "react";
import ProgressBar from "./Progressbar";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { useState } from "react";
import "../styles/FamilyDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../http";
import { setFamilyDetail } from "../Store/features/familyDetailSlice";
import { setEducationDetail } from "../Store/features/educationDetailSlice";
const FamilyDetails = () => {
  const { educationDetail } = useSelector((state) => state.educationDetail);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    education_degree: "",
    subject: "",
    college: "",
    occupation: "",
    job: "",
    selfEmployed: "",
    monthlySalary: "",
    annualIncome: "",
    companyName: "",
    foreignEmployment: "",
    country: "",
  });

  useEffect(() => {
    if (educationDetail) {
      setValues(educationDetail);
    }
  }, [educationDetail]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axiosInstance
      .post("/users/education-detail", values)
      .then((response) => {
        console.log(response.data);
        console.log("hello");
        dispatch(setEducationDetail(response.data));
        navigate("/preferencedetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="Family-detail-form">
        <ProgressBar />
        <h1>"Please fill up the education and occupation details"</h1>
        <div className="container">
          <div className="row">
            <form className="Family-details" onSubmit={handleSubmit}>
              <div className="family-details-inner">
                <div className="Family-details-form-left">
                  <div className="education group">
                    <input
                      type="text"
                      value={values.education_degree}
                      onChange={(e) => handleChange(e)}
                      name="education_degree"
                      required
                    />
                    <label>Education Degree</label>
                  </div>
                  <div className="subject group">
                    <input
                      type="text"
                      value={values.subject}
                      onChange={(e) => handleChange(e)}
                      name="subject"
                      required
                    />{" "}
                    <label>Subject</label>
                  </div>
                  <div className="occupation group">
                    <input
                      type="text"
                      value={values.college}
                      onChange={(e) => handleChange(e)}
                      name="college"
                      required
                    />{" "}
                    <label>College/University</label>
                  </div>
                  <div className="companyname group">
                    <input
                      type="text"
                      value={values.occupation}
                      onChange={(e) => handleChange(e)}
                      name="occupation"
                      required
                    />{" "}
                    <label>Occupation</label>
                  </div>
                </div>

                <div className="Family-details-form-middle">
                  <div className="monthlysalery group">
                    <input
                      type="text"
                      value={values.job}
                      onChange={(e) => handleChange(e)}
                      name="job"
                      required
                    />{" "}
                    <label>Job</label>
                  </div>
                  <div className="monthlysalery group">
                    <input
                      type="number"
                      value={values.monthlySalary}
                      onChange={(e) => handleChange(e)}
                      name="monthlySalary"
                      required
                    />{" "}
                    <label>monthly Salery</label>
                  </div>
                  <div className="monthlysalery group">
                    <input
                      type="text"
                      value={values.selfEmployed}
                      onChange={(e) => handleChange(e)}
                      name="selfEmployed"
                      required
                    />{" "}
                    <label>Self Employed</label>
                  </div>
                  <div className="annualincome group">
                    <input
                      type="number"
                      value={values.annualIncome}
                      onChange={(e) => handleChange(e)}
                      name="annualIncome"
                      required
                    />{" "}
                    <label>Annual Income</label>
                  </div>
                </div>

                <div className="Family-details-form-right">
                  <div className="universitycollage group">
                    <input
                      type="text"
                      value={values.companyName}
                      onChange={(e) => handleChange(e)}
                      name="companyName"
                      required
                    />
                    <label>Company Name</label>
                  </div>
                  <div className="foreign group">
                    <input
                      type="text"
                      value={values.foreignEmployment}
                      onChange={(e) => handleChange(e)}
                      name="foreignEmployment"
                      required
                    />
                    <label>Foreign Employment</label>
                  </div>
                  <div className="job group">
                    <input
                      type="text"
                      value={values.country}
                      onChange={(e) => handleChange(e)}
                      name="country"
                      required
                    />
                    <label>Country</label>
                  </div>
                  {/* <div className="business group">
                  <input
                    type="text"
                    value={business}
                    onChange={(event) => setBusiness(event.target.value)}
                    required
                  />
                  <label>Business</label>
                </div> */}
                  {/* <div className="noofmarried group">
                  <input
                    type="number"
                    value={noofmarried}
                    onChange={(event) => setNoOfMarried(event.target.value)}
                    required
                  />
                  <label>No of married</label>
                </div> */}
                </div>
              </div>
              <div className="Family-details-btn">
                <Link to="/contactdetails">
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

export default FamilyDetails;
