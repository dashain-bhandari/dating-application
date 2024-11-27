import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setEducationDetail } from "../../Store/features/educationDetailSlice";
import { axiosInstance } from "../../http";
import { addToast } from "../../Store/features/toastSlice";
import {
  Button,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { useState } from "react";
import { Loader } from "lucide-react";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--primary)",
  },
}));

function NewThirdForm({ prevStep, nextStep, thirdForm }) {
  const { educationDetail } = useSelector((state) => state.educationDetail);
  const dispatch = useDispatch();
  const {user, setUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (value) => {
    // if(!thirdFormValues.education_degree || !thirdFormValues.subject || !thirdFormValues.college || !thirdFormValues.occupation || !thirdFormValues.sector || !thirdFormValues.annualIncome || !thirdFormValues.companyName) {
    //    return dispatch(addToast({kind: 'ERROR', msg: 'Please fill all fields'}));
    // }
    setIsLoading(true);
    axiosInstance
      .post("/users/education-detail", value)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setEducationDetail(response.data));
        setUser({ ...user, education: response.data });
        nextStep();
        showNotification({
          title: "Education Info updated! 🚩",
        });
    setIsLoading(false);
      })
      .catch((error) => {
    setIsLoading(false);
        console.log(error);
        showNotification({
          title: error.message,
        });
      });
  };

  useEffect(() => {
    if (educationDetail) {
      thirdForm.setValues(educationDetail);
    }
  }, [educationDetail]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

  useEffect(() => {
    const targetCaste = educationQualificationOptions.find(
      (caste) => caste.value == thirdForm.values.education_degree
    );
    console.log(targetCaste);
    if (!targetCaste && thirdForm.values.education_degree) {
      setEducationQualificationOptions([
        ...educationQualificationOptions,
        {
          value: thirdForm.values.education_degree,
          label: thirdForm.values.education_degree,
        },
      ]);
    }
  }, [thirdForm]);

  useEffect(() => {
    const targetCaste = subjectOptions.find(
      (caste) => caste.value == thirdForm.values.subject
    );
    console.log(targetCaste);
    if (!targetCaste && thirdForm.values.subject) {
      setSubjectOptions([
        ...subjectOptions,
        { value: thirdForm.values.subject, label: thirdForm.values.subject },
      ]);
    }
  }, [thirdForm]);

  return (
    <div className="mt-8 xl:mt-12 2xl:mt-16 min-h-full mb-4 px-2  w-[100%] md:w-[100%] lg:w-[95%] xl:w-[80%] rounded-lg mx-auto">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Let's setup your account.</h1> */}

      <Paper
        className={classes.formWrapper}
        withBorder
        radius={2}
        py={30}
        px={30}
      >
        {/* <form className=" mx-auto" onSubmit={handleSubmit}> */}
        {/* <h1 className='text-2xl font-semibold w-[90%] mx-auto'>Education and Profession Information</h1> */}

        <form className="mx-auto" onSubmit={thirdForm.onSubmit(handleSubmit)}>
          <Title
            order={largeDesktop ? 1 : mediumDesktop ? 3 : 2}
            ta="center"
            mt="md"
            mb={"md"}
          >
            Education and Profession Information
          </Title>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
               <InputSelect value={thirdFormValues.education_degree} onChange={handleEducationalQualification} label="Education Qualification" classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-[40%]" options={educationQualificationOptions}/>
               <InputSelect value={thirdFormValues.subject} onChange={handleSubjectChange} label="Field/Subject/Program" classes1="block font-semibold text-xl lg:text-xl xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-[40%]" options={subjectOptions}/>
           </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
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
              value={thirdForm.values.education_degree}
              onChange={(value) =>
                thirdForm.setFieldValue("education_degree", value)
              }
              required
              searchable
              creatable
              label="Educational Qualification"
              placeholder="Enter highest level of education qualification"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={educationQualificationOptions}
            />
            <Select
              onCreate={(query) => {
                const item = { value: query, label: query };
                setSubjectOptions([...subjectOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              value={thirdForm.values.subject}
              onChange={(value) => thirdForm.setFieldValue("subject", value)}
              required
              searchable
              creatable
              label="Field/Subject/Program"
              placeholder="Enter major subject"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={subjectOptions}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center"> */}
          {/* <Input value={thirdFormValues.college} name="college" onChange={handleInputChange} label="Enter your College/University Name" classes3="w-full lg:w-[40%]" classes="px-2 text-xl" classes2="block font-semibold text-xl lg:text-lg xl:text-xl" type="text" placeholder="College/University" /> */}
          {/* <Input label="Religo" classes3="basis-[40%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter full Name" /> */}
          {/* <InputSelect value={thirdFormValues.occupation} onChange={handleOccupationChange} label="Current Profession and Position" classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-[40%]" /> */}
          {/* </div>     */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <TextInput
              value={thirdForm.values.college}
              onChange={(e) =>
                thirdForm.setFieldValue("college", e.currentTarget.value)
              }
              required
              label="College/University Name"
              placeholder="college you attended"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
            <TextInput
              value={thirdForm.values.occupation}
              onChange={(e) =>
                thirdForm.setFieldValue("occupation", e.currentTarget.value)
              }
              required
              label="Current Profession and Position"
              placeholder="Enter current profession"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center"> */}

          {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          {/* <InputSelect value={thirdFormValues.sector} onChange={handleSectorChange} label="Sector You are working in" classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-[40%]" options={sectorOptions}/> */}
          {/* <Input name="companyName" value={thirdFormValues.companyName} onChange={handleInputChange} label="Institution/Company Name ?" classes3="w-full lg:w-[40%]" classes="px-2 text-xl" classes2="block text-xl font-semibold lg:text-lg xl:text-xl" type="text" placeholder="Name of Employer" /> */}

          {/* </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <Select
              value={thirdForm.values.sector}
              onChange={(value) => thirdForm.setFieldValue("sector", value)}
              required
              label="Sector"
              searchable
              creatable
              placeholder="Select sector you are working"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={sectorOptions}
            />
            <TextInput
              value={thirdForm.values.companyName}
              onChange={(e) =>
                thirdForm.setFieldValue("companyName", e.currentTarget.value)
              }
              required
              label="Institution/Company Name"
              placeholder="Enter name of the employer"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className="w-[90%]  mx-auto flex justify-start items-center"> */}
          {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          {/* <Input label="Enter your Date Of Birth" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="date" placeholder="Enter full Name" /> */}
          {/* <InputSelect onChange={handleAnnualIncomeChange} value={thirdFormValues.annualIncome} label="Annual Income" classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[45%] lg:basis-[45%]" options={annualIncomeOptions}/> */}
          {/* </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <Select
              value={thirdForm.values.annualIncome}
              onChange={(value) =>
                thirdForm.setFieldValue("annualIncome", value)
              }
              required
              label="Annual Income"
              placeholder="Select yearly income range"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={annualIncomeOptions}
            />
          </Group>

          {/* <div className="w-full flex justify-around">
             <Button label="Previous" classes="px-8 lg:px-16 py-2 rounded-xl bg-[var(--secondary)] text-white" classes2="w-full flex justify-center py-4" onClick={() => handlePrevClick()} />
             <Button type="submit" label="Next" classes="px-8 lg:px-16 py-2 rounded-xl bg-[var(--primary)] text-white" classes2="w-full flex justify-center py-4" />
          </div> */}

          <Group position="center" mt="xl">
            <Button
              // className={classes.button}
              variant="outline"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              type="submit"
              className={classes.button}
              variant="filled"
              style={{ backgroundColor: "var(--secondary)" }}
              disabled={isLoading}
            >
             {isLoading ? <Loader className="animate-spin" /> : "Next"}
            </Button>
          </Group>

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

export default NewThirdForm;
