import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Profile/Input";
import InputSelect from "../Profile/Select";
import Button from "../Profile/Button";
import { useDispatch, useSelector } from "react-redux";
import { setEducationDetail } from "../../Store/features/educationDetailSlice";
import { axiosInstance } from "../../http";
import { addToast } from "../../Store/features/toastSlice";

function ThirdForm({
  thirdFormValues,
  setThirdFormValues,
  setCurrentFormCount,
  currentFromCount,
}) {
  const { educationDetail } = useSelector((state) => state.educationDetail);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(thirdFormValues);

    if (
      !thirdFormValues.education_degree ||
      !thirdFormValues.subject ||
      !thirdFormValues.college ||
      !thirdFormValues.occupation ||
      !thirdFormValues.sector ||
      !thirdFormValues.annualIncome ||
      !thirdFormValues.companyName
    ) {
      return dispatch(
        addToast({ kind: "ERROR", msg: "Please fill all fields" })
      );
    }

    axiosInstance
      .post("/users/education-detail", thirdFormValues)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setEducationDetail(response.data));
        setCurrentFormCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (educationDetail) {
      setThirdFormValues(educationDetail);
    }
  }, [educationDetail]);

  const handlePrevClick = () => {
    setCurrentFormCount((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentFormCount((prev) => prev + 1);
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

  const educationQualificationOptions = [
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate" },
    { value: "doctarate", label: "P.h.d/Doctorate" },
    { value: "highSchool", label: "High School" },
    { value: "literate", label: "Literate" },
    { value: "illiterate", label: "Illiterate" },
  ];

  const subjectOptions = [
    { value: "engineering", label: "Engineering" },
    { value: "medical", label: "Medical" },
    { value: "business", label: "Business" },
    { value: "law", label: "Law" },
    { value: "socialScience", label: "Social Science" },
    { value: "commerce", label: "Commerce/Finance" },
    { value: "agriculture", label: "Agriculture" },
  ];

  const sectorOptions = [
    { value: "private", label: "Private Company" },
    { value: "government", label: "Government" },
    { value: "ngo", label: "NGO's/INGO's" },
    { value: "selfEmployed", label: "Self Employed" },
    { value: "unEmployed", label: "Unemployed" },
  ];

  const annualIncomeOptions = [
    { value: "2L", label: "Upto 2L" },
    { value: "3L", label: "Upto 3L" },
    { value: "3L-4L", label: "3L-4L" },
    { value: "4L-5L", label: "4L-5L" },
    { value: "5L-6L", label: "5L-6L" },
    { value: "6L-7L", label: "6L-7L" },
    { value: "7L-8L", label: "7L-8L" },
    { value: "8L-9L", label: "8L-9L" },
    { value: "9L-10L", label: "9L-10L" },
    { value: "10L-15L", label: "10L-15L" },
    { value: "15L-20L", label: "15L-20L" },
    { value: "20L-30L", label: "20L-30L" },
    { value: "abover30L", label: "Above 30L" },
  ];

  const handleInputChange = (e) => {
    setThirdFormValues({ ...thirdFormValues, [e.target.name]: e.target.value });
  };

  const handleFamilyTypeChange = (values) => {
    setThirdFormValues({ ...secondFormValues, familyType: values.value });
  };

  const handleYouLiveWithFamilyChange = (values) => {
    setThirdFormValues({ ...secondFormValues, liveWithFamily: values.value });
  };

  const handleFamilyValuesChange = (values) => {
    setSecondFormValues({ ...secondFormValues, familyValues: values.value });
  };

  const handleParentStatusChange = (values) => {
    setSecondFormValues({ ...secondFormValues, parentStatus: values.value });
  };

  const handleEducationalQualification = (values) => {
    setThirdFormValues({ ...thirdFormValues, education_degree: values.value });
  };

  const handleSubjectChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, subject: values.value });
  };

  const handleOccupationChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, occupation: values.value });
  };

  const handleSectorChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, sector: values.value });
  };

  const handleAnnualIncomeChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, annualIncome: values.value });
  };
  return (
    <div className="mt-16 min-h-full mb-8 px-2 py-4  w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] rounded-lg mx-auto">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Let's setup your account.</h1> */}

      <form className=" mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold w-[90%] mx-auto">
          Education and Profession Information
        </h1>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
          <InputSelect
            value={thirdFormValues.education_degree}
            onChange={handleEducationalQualification}
            label="Education Qualification"
            classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-[40%]"
            options={educationQualificationOptions}
          />
          <InputSelect
            value={thirdFormValues.subject}
            onChange={handleSubjectChange}
            label="Field/Subject/Program"
            classes1="block font-semibold text-xl lg:text-xl xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-[40%]"
            options={subjectOptions}
          />
        </div>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
          <Input
            value={thirdFormValues.college}
            name="college"
            onChange={handleInputChange}
            label="Enter your College/University Name"
            classes3="w-full lg:w-[40%]"
            classes="px-2 text-xl"
            classes2="block font-semibold text-xl lg:text-lg xl:text-xl"
            type="text"
            placeholder="College/University"
          />
          {/* <Input label="Religo" classes3="basis-[40%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter full Name" /> */}
          <InputSelect
            value={thirdFormValues.occupation}
            onChange={handleOccupationChange}
            label="Current Profession and Position"
            classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-[40%]"
          />
        </div>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
          {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          <InputSelect
            value={thirdFormValues.sector}
            onChange={handleSectorChange}
            label="Sector You are working in"
            classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-[40%]"
            options={sectorOptions}
          />
          <Input
            name="companyName"
            value={thirdFormValues.companyName}
            onChange={handleInputChange}
            label="Institution/Company Name ?"
            classes3="w-full lg:w-[40%]"
            classes="px-2 text-xl"
            classes2="block text-xl font-semibold lg:text-lg xl:text-xl"
            type="text"
            placeholder="Name of Employer"
          />
        </div>

        <div className="w-[90%]  mx-auto flex justify-start items-center">
          {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          {/* <Input label="Enter your Date Of Birth" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="date" placeholder="Enter full Name" /> */}
          <InputSelect
            onChange={handleAnnualIncomeChange}
            value={thirdFormValues.annualIncome}
            label="Annual Income"
            classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[45%] lg:basis-[45%]"
            options={annualIncomeOptions}
          />
        </div>

        <div className="w-full flex justify-around">
          <Button
            label="Previous"
            classes="px-8 lg:px-16 py-2 rounded-xl bg-[var(--secondary)] text-white"
            classes2="w-full flex justify-center py-4"
            onClick={() => handlePrevClick()}
          />
          <Button
            type="submit"
            label="Next"
            classes="px-8 lg:px-16 py-2 rounded-xl bg-[var(--primary)] text-white"
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
  );
}

export default ThirdForm;
