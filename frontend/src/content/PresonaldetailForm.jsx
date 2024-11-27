import React, { useEffect, useState } from "react";
import "../styles/PresonaldetailForm.css";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import ProgressBar from "./Progressbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../http";
import { setPersonalDetail } from "../Store/features/personalDetailSlice";
import Select from "../newComponent/Profile/Select";
import InputSelect from "../newComponent/Profile/Select";
import Input from "../newComponent/Profile/Input";
import Button from "../newComponent/Profile/Button";
function PresonaldetailForm() {
  const { personalDetail } = useSelector((state) => state.personalDetail);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(personalDetail);
  const [values, setValues] = useState({
    fullname: "",
    age: "",
    height: "",
    profileCreatedBy: "",
    religion: "",
    sex: "",
    caste: "",
    subcaste: "",
    language: "",
    marital_status: "",
    dateOfBirth: "",
    smokeOrdrink: "",
  });

  useEffect(() => {
    if (personalDetail) {
      setValues(personalDetail);
    }
  }, [personalDetail]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePrevClick = () => {
    navigate("/");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/users/personal-detail", values)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setPersonalDetail(response.data));
        navigate("/contactdetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const profileOptions = [
    { value: "myself", label: "MySelf" },
    { value: "brother", label: "Brother" },
    { value: "sister", label: "Sister" },
    { value: "son", label: "Son" },
    { value: "daughter", label: "Daughter" },
    { value: "friend", label: "Friend" },
    { value: "relative", label: "Relative" },
  ];

  const religionOptions = [
    { value: "hindu", label: "Hinduism" },
    { value: "buddhist", label: "Buddhism" },
    { value: "islam", label: "Islam" },
    { value: "christianity", label: "Christianity" },
    { value: "sikh", label: "Sikhism" },
    { value: "Jain", label: "Jainism" },
    { value: "kirat", label: "Kirat" },
    { value: "no", label: "Non-Religious" },
    { value: "other", label: "Other" },
  ];

  const genderOptions = [
    { value: "Man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "other", label: "Other" },
  ];

  const casteOptions = [
    { value: "brahmin", label: "Brahmin" },
    { value: "chhetri", label: "chhetri" },
    { value: "thakuri", label: "Thakuri" },
    { value: "magar", label: "Magar" },
    { value: "tamang", label: "Tamang" },
    { value: "sherpa", label: "Sherpa" },
    { value: "newar", label: "Newar" },
  ];

  const community = [];

  const ethinicOptions = [];

  return (
    <div className="w-full min-h-[100vh] pt-16 pb-16 bg-[#DEDEDE]">
      <ProgressBar />
      <div className="mt-16 min-h-full mb-8 px-2 py-4  w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] bg-white shadow-xl rounded-lg mx-auto">
        <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">
          Let's setup your account.
        </h1>

        <form className=" mx-auto" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col-reverse justify-between items-center">
            <Input
              label="Full Name"
              classes3="w-[70%]"
              classes="px-2"
              classes2="block 2xl:text-2xl lg:text-2xl"
              type="text"
              placeholder="Enter full Name"
            />
            <InputSelect
              label="Profile for "
              classes1="block text-2xl my-2"
              classes2="xl:w-[70%] basis-[40%]"
              options={profileOptions}
            />
          </div>

          <div className="w-full flex flex-col justify-between items-center">
            <InputSelect
              label="Gender "
              classes1="block text-2xl my-2"
              classes2="xl:w-[70%] basis-[40%]"
              options={genderOptions}
            />
            {/* <Input label="Religo" classes3="basis-[40%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter full Name" /> */}
            <InputSelect
              label="Religion "
              classes1="block text-2xl my-2"
              classes2="xl:w-[70%] basis-[40%]"
              options={religionOptions}
            />
          </div>

          <div className="w-full flex justify-between flex-col-reverse items-center">
            {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            <Input
              label="Enter your Date Of Birth"
              classes3="w-[70%]"
              classes="px-2"
              classes2="block 2xl:text-2xl lg:text-2xl"
              type="date"
              placeholder="Enter full Name"
            />
            <InputSelect
              label="Caste "
              classes1="block text-2xl my-2"
              classes2="xl:w-[70%] basis-[70%]"
              options={casteOptions}
            />
          </div>

          <div className="w-full flex justify-between flex-col items-center">
            {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            <Input
              label="Where do you live ?"
              classes3="w-[70%]"
              classes="px-2"
              classes2="block 2xl:text-2xl lg:text-2xl"
              type="text"
              placeholder="Enter your current address"
            />
            {/* <InputSelect label="Caste " classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={casteOptions}/> */}
          </div>

          <div>
            <Button
              label="Continue"
              classes="px-24 py-3 rounded-xl btnnext text-white"
              classes2="w-full flex justify-center py-4"
            />
          </div>

          {/* <button className="btnprev" onClick={() => handlePrevClick()}>
            <HiChevronDoubleLeft /> Prev
          </button>
    
          <button type="submit" className="btnnext">
            Next <HiChevronDoubleRight /> */}
          {/* </button> */}
        </form>
      </div>
    </div>
  );
}

export default PresonaldetailForm;
