import React from "react";
import ProgressBar from "./Progressbar";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { useState } from "react";
import "../styles/ContactDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFamilyDetail } from "../Store/features/familyDetailSlice";
import { axiosInstance } from "../http";

const ContactDetails = () => {
  const { familyDetail } = useSelector((state) => state.familyDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    familyType: "",
    fatherOccupation: "",
    motherOccupation: "",
    noOfBrother: "",
    noOfSister: "",
    noOfFamilyMember: "",
    noOfUnmarried: "",
    municipality: "",
    district: "",
    province: "",
    country: "",
    mobile: "",
  });

  useEffect(() => {
    if (familyDetail) {
      setValues(familyDetail);
    }
  }, [familyDetail]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(values);
    axiosInstance
      .post("/users/family-detail", values)
      .then((response) => {
        console.log(response.data);
        console.log("hello");
        dispatch(setFamilyDetail(response.data));
        navigate("/familydetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="Contact-detail-form">
        <ProgressBar />
        <h1>"Please fill up the important details"</h1>
        <div className="container">
          <div className="row">
            <form className="" onSubmit={(e) => handleSubmit(e)}>
              <div className="Contact-details">
                <div className="Contact-details-form-left">
                  <div className="mobileNo group">
                    <input
                      type="text"
                      value={values.mobile}
                      name="mobile"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>Mobile No</label>
                  </div>
                  <div className="country group">
                    <input
                      type="text"
                      value={values.familyType}
                      name="familyType"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>Family Type</label>
                  </div>
                  <div className="municipility group">
                    <input
                      type="text"
                      value={values.fatherOccupation}
                      name="fatherOccupation"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>Father Occupation</label>
                  </div>
                  <div className="province group">
                    <input
                      type="text"
                      value={values.motherOccupation}
                      name="motherOccupation"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>Mother Occupation</label>
                  </div>
                </div>

                <div className="Contact-details-form-middle">
                  <div className="district group">
                    <input
                      type="text"
                      value={values.noOfBrother}
                      name="noOfBrother"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>no. of Brother</label>
                  </div>
                  <div className="fatheroccupation group">
                    <input
                      type="text"
                      value={values.noOfSister}
                      name="noOfSister"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>no. of Sister</label>
                  </div>
                  <div className="motheroccupation group">
                    <input
                      type="text"
                      value={values.noOfFamilyMember}
                      name="noOfFamilyMember"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>no. of Family Memeber</label>
                  </div>
                  <div className="familymember group">
                    <input
                      type="text"
                      value={values.noOfUnmarried}
                      name="noOfUnmarried"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label> No of Unmarried</label>
                  </div>
                </div>

                <div className="Contact-details-form-right">
                  <div className="familytype group">
                    <input
                      type="text"
                      value={values.municipality}
                      name="municipality"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>Municipality</label>
                  </div>
                  <div className="unmarried group">
                    <input
                      type="text"
                      value={values.district}
                      name="district"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <label>District</label>
                  </div>
                  <div className="siblings group">
                    <input
                      type="text"
                      value={values.province}
                      name="province"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>Province</label>
                  </div>

                  <div className="siblings group">
                    <input
                      type="text"
                      value={values.country}
                      name="country"
                      onChange={(e) => handleChange(e)}
                      required
                    />{" "}
                    <label>Country</label>
                  </div>
                </div>
              </div>
              <div className="Contact-details-btn">
                <Link to="/personaldetails">
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

export default ContactDetails;
