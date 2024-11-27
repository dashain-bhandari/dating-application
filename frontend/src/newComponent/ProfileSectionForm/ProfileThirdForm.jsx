import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Profile/Input";
import InputSelect from "../Profile/Select";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { addToast } from "../../Store/features/toastSlice";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../http";
import { setEducationDetail } from "../../Store/features/educationDetailSlice";
import {
  ActionIcon,
  Button,
  Group,

  Paper,
  Select,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";


const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--seondary)",
  },
}));

function ProfileThirdForm({ thirdFormValues, setThirdFormValues, isMe }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");
  const [submitting,setSubmitting]=useState(false)
  const handleSubmit = (event) => {
    setSubmitting(true)

    event.preventDefault();
    if (
      !thirdFormValues.education_degree ||
      !thirdFormValues.subject ||
      !thirdFormValues.college ||
      !thirdFormValues.occupation ||
      !thirdFormValues.sector ||
      !thirdFormValues.annualIncome ||
      !thirdFormValues.companyName
    ) {
      dispatch(addToast({ kind: "ERROR", msg: "Please fill all fields" }));
      setSubmitting(false)

    }
    else{
      axiosInstance
      .post("/users/education-detail", thirdFormValues)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setEducationDetail(response.data));
        dispatch(
          addToast({ kind: "SUCCESS", msg: "Education detail updated!" })
        );
        setSubmitting(false)

        // navigate('/contactdetails')
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false)

        dispatch(addToast({ kind: "ERROR", msg: "Failed to update" }));
      });
    }
   
  };

  const handlePrevClick = () => {
    setCurrentFormCount((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentFormCount((prev) => prev + 1);
  };

  const [profileOptions, setProfileOptions] = useState([
    { value: "myself", label: "MySelf" },
    { value: "brother", label: "Brother" },
    { value: "sister", label: "Sister" },
    { value: "son", label: "Son" },
    { value: "daughter", label: "Daughter" },
    { value: "friend", label: "Friend" },
    { value: "relative", label: "Relative" },
  ]);

  const [religionOptions, setReligionOptions] = useState([
    { value: "hindu", label: "Hinduism" },
    { value: "buddhist", label: "Buddhism" },
    { value: "islam", label: "Islam" },
    { value: "christianity", label: "Christianity" },
    { value: "sikh", label: "Sikhism" },
    { value: "Jain", label: "Jainism" },
    { value: "kirat", label: "Kirat" },
    { value: "no", label: "Non-Religious" },
    { value: "other", label: "Other" },
  ]);

  const genderOptions = [
    { value: "Man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "other", label: "Other" },
  ];

  const [casteOptions, setCasteOptions] = useState([
    { value: "brahmin", label: "Brahmin" },
    { value: "chhetri", label: "chhetri" },
    { value: "thakuri", label: "Thakuri" },
    { value: "magar", label: "Magar" },
    { value: "tamang", label: "Tamang" },
    { value: "sherpa", label: "Sherpa" },
    { value: "newar", label: "Newar" },
  ]);

  const [educationQualificationOptions, setEducationQualificationOptions] =
    useState([
      { value: "undergraduate", label: "Undergraduate" },
      { value: "graduate", label: "Graduate" },
      { value: "doctarate", label: "P.h.d/Doctorate" },
      { value: "highSchool", label: "High School" },
      { value: "literate", label: "Literate" },
      { value: "illiterate", label: "Illiterate" },
    ]);

  const [subjectOptions, setSubjectOptions] = useState([
    { value: "engineering", label: "Engineering" },
    { value: "medical", label: "Medical" },
    { value: "business", label: "Business" },
    { value: "law", label: "Law" },
    { value: "socialScience", label: "Social Science" },
    { value: "commerce", label: "Commerce/Finance" },
    { value: "agriculture", label: "Agriculture" },
  ]);

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

  const handleInputChange = (prop,e) => {
    setThirdFormValues({ ...thirdFormValues, [prop]: e.target.value });
  };

  const handleEducationalQualification = (values) => {
    setThirdFormValues({ ...thirdFormValues, education_degree: values });
  };

  const handleSubjectChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, subject: values });
  };

  const handleOccupationChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, occupation: values });
  };

  const handleSectorChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, sector: values });
  };

  const handleAnnualIncomeChange = (values) => {
    setThirdFormValues({ ...thirdFormValues, annualIncome: values });
  };

  useEffect(() => {
    const targetCaste = educationQualificationOptions.find(
      (caste) => caste.value == thirdFormValues.education_degree
    );
    console.log(targetCaste);
    if (!targetCaste && thirdFormValues.education_degree) {
      setEducationQualificationOptions([
        ...educationQualificationOptions,
        {
          value: thirdFormValues.education_degree,
          label: thirdFormValues.education_degree,
        },
      ]);
    }
  }, [thirdFormValues]);

  useEffect(() => {
    const targetCaste = subjectOptions.find(
      (caste) => caste.value == thirdFormValues.subject
    );
    console.log(targetCaste);
    if (!targetCaste && thirdFormValues.subject) {
      setSubjectOptions([
        ...subjectOptions,
        { value: thirdFormValues.subject, label: thirdFormValues.subject },
      ]);
    }
  }, [thirdFormValues]);

  return (
    <div className="min-h-full lg:mb-8 mb-4 shadow-md  lg:w-[100%] xl:w-[100%] rounded-lg ">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Let's setup your account.</h1> */}

      <Paper
        className={classes.formWrapper}
        py={30}
        px={30}
      >
        <form className=" mx-auto" onSubmit={handleSubmit}>
          <Group
            position="apart"
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
          >
            <Title order={largeDesktop ? 1 : mediumDesktop ? 3 : 2}  className="md:text-xl text-[18px]">
              Education/Profession
            </Title>
            {isMe && (
              <ActionIcon onClick={() => setProfileEdit((prev) => !prev)}>
                <BiEdit
                  size={30}
                  className={`${
                    !profileEdit
                      ? "text-[#EB4566]"
                      : "text-[#EB4566]"
                  } hover:text-[var(--primary)] cursor-pointer`}
                />
              </ActionIcon>
            )}
          </Group>

          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >

            <Select
              onCreate={(query) => {
                const item = { value: query, label: query };
                setEducationQualificationOptions([
                  ...educationQualificationOptions,
                  item,
                ]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              onChange={handleEducationalQualification}
              value={thirdFormValues.education_degree}
              readOnly={profileEdit ? false : true}
              label="Education Qualification"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={educationQualificationOptions}
            />
            <Select
              onCreate={(query) => {
                const item = { value: query, label: query };
                setSubjectOptions([...subjectOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              onChange={handleSubjectChange}
              value={thirdFormValues.subject}
              readOnly={profileEdit ? false : true}
              label="Field/Subject/Program"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={subjectOptions}
            />
          </Group>

          <Group
          //  grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

           >

            <TextInput
              onChange={(e)=>handleInputChange('college',e)}
              value={thirdFormValues.college}
              disabled={profileEdit ? false : true}
              label="Enter your College/University Name"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes3="w-full lg:w-[40%]"
              // classes="px-2"
              // classes2="block text-md lg:text-lg xl:text-xl font-semibold"
              type="text"
              placeholder="College/University"
            />
            {/* <Input label="Religo" classes3="basis-[40%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter full Name" /> */}
            <TextInput
              onChange={(e)=>handleInputChange("occupation",e)}
              value={thirdFormValues.occupation}
              readOnly={profileEdit ? false : true}
              label="Current Profession and Position"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
            />
          </Group>
          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            <Select
              onChange={handleSectorChange}
              value={thirdFormValues.sector}
              readOnly={profileEdit ? false : true}
              label="Sector You are working in"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={sectorOptions}
            />
            <TextInput
              onChange={(e)=>handleInputChange("companyName",e)}
              value={thirdFormValues.companyName}
              disabled={profileEdit ? false : true}
              label="Institution/Company Name ?"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes3="w-full lg:w-[40%]"
              // classes="px-2"
              // classes2="block text-md lg:text-lg xl:text-xl font-semibold"
              type="text"
              placeholder="Name of Employer"
            />
          </Group>

          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            {/* <Input label="Enter your Date Of Birth" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="date" placeholder="Enter full Name" /> */}
            <Select
              onChange={handleAnnualIncomeChange}
              value={thirdFormValues.annualIncome}
              readOnly={profileEdit ? false : true}
              label="Annual Income"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[14.5em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[45%] basis-[45%]"
              data={annualIncomeOptions}
            />
          </Group>

          {profileEdit && (
            <Group position="right">
              {/* <Button label="Previous" classes="px-16 py-3 rounded-xl btnnext text-white" classes2="w-full flex justify-center py-4" onClick={() => handlePrevClick()} /> */}
              <Button
                className={classes.button}
                style={{ backgroundColor: "var(--secondary)" }}
                variant="filled"
                size="md"
                type="submit"
                disabled={submitting}
              >
                {submitting ? <Loader className="animate-spin" /> : "Save"}
              </Button>
            </Group>
          )}

          {/* <button className="btnprev" onClick={() => handlePrevClick()}>
            <HiChevronDoubleLeft /> Prev
          </button>
    
          <button type="submit" className="btnnext">
            Next <HiChevronDoubleRight /> */}
          {/* </button> */}
        </form>
      </Paper>
    </div>
  );
}

export default ProfileThirdForm;
