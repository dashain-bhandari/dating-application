import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Profile/Input";
import InputSelect from "../Profile/Select";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToast } from "../../Store/features/toastSlice";
import { setPreferanceDetail } from "../../Store/features/preferanceDetailSlice";
import { axiosInstance } from "../../http";
import { Loader } from "lucide-react";
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--seondary)",
  },
}));

function ProfileFourthForm({ fourthFormValues, setFourthFormValues, isMe }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");

  console.log(fourthFormValues)
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");
  const [submitting,setSubmitting]=useState(false)
  const handleSubmit = (event) => {
    setSubmitting(true)
    event.preventDefault();
    if (
      !fourthFormValues.minAge ||
      !fourthFormValues.maxAge ||
      !fourthFormValues.minHeight ||
      !fourthFormValues.maxHeight ||
      !fourthFormValues.maritalStatus ||
      !fourthFormValues.religion ||
      !fourthFormValues.caste
    ) {
      setSubmitting(false)
      console.log(fourthFormValues)
      dispatch(addToast({ kind: "ERROR", msg: "Please insert all values" }));
    }
    else {
      axiosInstance
        .post("/users/preferance-detail", fourthFormValues)
        .then((response) => {
         
          console.log(response.data);
          console.log("updated successfully");
          dispatch(setPreferanceDetail(response.data));
          setSubmitting(false)
          // navigate('/contactdetails')
          console.log(submitting)
          dispatch(
            addToast({ kind: "SUCCESS", msg: "Preferance Detail updated!" })
          );
        })
      
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          dispatch(addToast({ kind: "ERROR", msg: "Failed to update!" }));
        });
    }

  };

  const handlePrevClick = () => {
    setCurrentFormCount((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentFormCount((prev) => prev + 1);
  };

  const fromheightOptions = [
    { value: "4ft 5in - 134cm", label: "4ft 5in - 134cm" },
    { value: "4ft 6in - 137cm", label: "4ft 6in - 137cm" },
    { value: "4ft 7in - 139cm", label: "4ft 7in - 139cm" },
    { value: "4ft 8in - 142cm", label: "4ft 8in - 142cm" },
    { value: "4ft 9in - 144cm", label: "4ft 9in - 144cm" },
    { value: "4ft 10in - 147cm", label: "4ft 10in - 147cm" },
    { value: "4ft 11in - 149cm", label: "4ft 11in - 149cm" },
    { value: "5ft 0in - 152cm", label: "5ft 0in - 152cm" },
    { value: "5ft 1in - 154cm", label: "5ft 1in - 154cm" },
    { value: "5ft 2in - 157cm", label: "5ft 2in - 157cm" },
    { value: "5ft 3in - 159cm", label: "5ft 3in - 159cm" },
    { value: "5ft 4in - 162cm", label: "5ft 4in - 162cm" },
    { value: "5ft 5in - 164cm", label: "5ft 5in - 164cm" },
    { value: "5ft 6in - 167cm", label: "5ft 6in - 167cm" },
    { value: "5ft 7in - 169cm", label: "5ft 7in - 169cm" },
    { value: "5ft 8in - 172cm", label: "5ft 8in - 172cm" },
    { value: "5ft 9in - 174cm", label: "5ft 9in - 174cm" },
    { value: "5ft 10in - 177cm", label: "5ft 10in - 177cm" },
    { value: "5ft 11in - 179cm", label: "5ft 11in - 179cm" },
    { value: "6ft 0in - 182cm", label: "6ft 0in - 182cm" },
    { value: "6ft 1in - 184cm", label: "6ft 1in - 184cm" },
    { value: "6ft 2in - 187cm", label: "6ft 2in - 187cm" },
    { value: "6ft 3in - 189cm", label: "6ft 3in - 189cm" },
    { value: "6ft 4in - 192cm", label: "6ft 4in - 192cm" },
  ];

  const toheightOptions = [
    { value: "4ft 5in - 134cm", label: "4ft 5in - 134cm" },
    { value: "4ft 6in - 137cm", label: "4ft 6in - 137cm" },
    { value: "4ft 7in - 139cm", label: "4ft 7in - 139cm" },
    { value: "4ft 8in - 142cm", label: "4ft 8in - 142cm" },
    { value: "4ft 9in - 144cm", label: "4ft 9in - 144cm" },
    { value: "4ft 10in - 147cm", label: "4ft 10in - 147cm" },
    { value: "4ft 11in - 149cm", label: "4ft 11in - 149cm" },
    { value: "5ft 0in - 152cm", label: "5ft 0in - 152cm" },
    { value: "5ft 1in - 154cm", label: "5ft 1in - 154cm" },
    { value: "5ft 2in - 157cm", label: "5ft 2in - 157cm" },
    { value: "5ft 3in - 159cm", label: "5ft 3in - 159cm" },
    { value: "5ft 4in - 162cm", label: "5ft 4in - 162cm" },
    { value: "5ft 5in - 164cm", label: "5ft 5in - 164cm" },
    { value: "5ft 6in - 167cm", label: "5ft 6in - 167cm" },
    { value: "5ft 7in - 169cm", label: "5ft 7in - 169cm" },
    { value: "5ft 8in - 172cm", label: "5ft 8in - 172cm" },
    { value: "5ft 9in - 174cm", label: "5ft 9in - 174cm" },
    { value: "5ft 10in - 177cm", label: "5ft 10in - 177cm" },
    { value: "5ft 11in - 179cm", label: "5ft 11in - 179cm" },
    { value: "6ft 0in - 182cm", label: "6ft 0in - 182cm" },
    { value: "6ft 1in - 184cm", label: "6ft 1in - 184cm" },
    { value: "6ft 2in - 187cm", label: "6ft 2in - 187cm" },
    { value: "6ft 3in - 189cm", label: "6ft 3in - 189cm" },
    { value: "6ft 4in - 192cm", label: "6ft 4in - 192cm" },
  ];

  const familytypeOptions = [
    { value: "nuclear", label: "Nuclear" },
    { value: "joint", label: "Joint" },
    { value: "nofamily", label: "No Family/Orphan" },
  ];

  const familyMemberOptions = [{ value: "1", label: "1" }];

  const liveWithFamilyOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const smokeDrinkOptions = [
    { value: "neitherSmokeNorDrink", label: "Neither Somke nor Drink" },
    { value: "onlySmoke", label: "Only Smoke" },
    { value: "onlyDrink", label: "Only Drink" },
    { value: "bothSmokeAndDrink", label: "Both Smoke and Drink" },
  ];

  // const maritalStatusOptions = [
  //   { value: "unmarried", label: "Unmarried" },
  //   { value: "awatingdivorce", label: "Awating Divorce" },
  //   { value: "divorced", label: "Divorced" },
  // ];

  const maritalStatusOptions = [
    { value: "any", label: "any" },
    { value: "unmarried", label: "Unmarried" },
    { value: "awatingdivorce", label: "Awating Divorce" },
    { value: "divorced", label: "Divorced" },
  ];

  const fromAgeOptions = [
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "40", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
  ];

  const toAgeOptions = [
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "40", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
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
  const [subjectOptions, setSubjectOptions] = useState([
    { value: "any", label: "any" },
    { value: "engineering", label: "Engineering" },
    { value: "medical", label: "Medical" },
    { value: "business", label: "Business" },
    { value: "law", label: "Law" },
    { value: "socialScience", label: "Social Science" },
    { value: "commerce", label: "Commerce/Finance" },
    { value: "agriculture", label: "Agriculture" },
  ]);

  const [religionOptions, setReligionOptions] = useState([
    { value: "any", label: "any" },
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

  const [educationQualificationOptions, setEducationQualificationOptions] =
    useState([
      { value: "undergraduate", label: "Undergraduate" },
      { value: "graduate", label: "Graduate" },
      { value: "doctarate", label: "P.h.d/Doctorate" },
      { value: "highSchool", label: "High School" },
      { value: "literate", label: "Literate" },
      { value: "illiterate", label: "Illiterate" },
    ]);

  const [casteOptions, setCasteOptions] = useState([
    { value: "brahmin", label: "Brahmin" },
    { value: "chhetri", label: "chhetri" },
    { value: "thakuri", label: "Thakuri" },
    { value: "magar", label: "Magar" },
    { value: "tamang", label: "Tamang" },
    { value: "sherpa", label: "Sherpa" },
    { value: "newar", label: "Newar" },
  ]);

  const familyValueOptions = [
    { value: "traditional", label: "Traditional" },
    { value: "moderate", label: "Moderate" },
    { value: "liberal", label: "Liberal" },
  ];

  const parentStatusOptions = [
    { value: "bothAlive", label: "Both Alive" },
    { value: "fatherPassedAway", label: "Father Passed Away" },
    { value: "motherPassedAway", label: "Mother Passed Away" },
    { value: "bothPassedAway", label: "Both Passed Away" },
  ];

  // const sectorOptions = [
  //   { value: "private", label: "Private Company" },
  //   { value: "government", label: "Government" },
  //   { value: "ngo", label: "NGO's/INGO's" },
  //   { value: "selfEmployed", label: "Self Employed" },
  //   { value: "unEmployed", label: "Unemployed" },
  // ];


  const sectorOptions = [
    { value: "any", label: "any" },
    { value: "private", label: "Private Company" },
    { value: "government", label: "Government" },
    { value: "ngo", label: "NGO's/INGO's" },
    { value: "selfEmployed", label: "Self Employed" },
    { value: "unEmployed", label: "Unemployed" },
  ];

  const [motherTongueOptions, setMotherTongueOptions] = useState([
    { value: "Any", label: "any" },
    { value: "Nepali", label: "Nepali" },
    { value: "Newari", label: "Newari" },
    { value: "Bhojpuri", label: "Bhojpuri" },
  ]);

  const handleInputChange = (prop, e) => {
    setFourthFormValues({ ...fourthFormValues, [prop]: e.target.value });
  };
  const handleMinAgeChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, minAge: values });
  };

  const handleMaxAgeChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, maxAge: values });
  };

  const handleMinHeightChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, minHeight: values });
  };

  const handleMaxHeightChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, maxHeight: values });
  };

  const handleMaritalStatusChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, maritalStatus: values });
  };
  const handleReligionChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, religion: values });
  };

  const handleCasteChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, caste: values });
  };

  const handleEducationalQualificationChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, education: values });
  };

  const handleSubjectChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, subject: values });
  };

  const handleAnnualIncomeChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, annualIncome: values });
  };

  const handleSectorChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, sector: values });
  };

  const handleMotherTongueChange = (values) => {
    setFourthFormValues({ ...fourthFormValues, motherTongue: values });
  };

  useEffect(() => {
    const targetCaste = casteOptions.find(
      (caste) => caste.value == fourthFormValues.caste
    );
    console.log(targetCaste);
    if (!targetCaste && fourthFormValues.caste) {
      setCasteOptions([
        ...casteOptions,
        { value: fourthFormValues.caste, label: fourthFormValues.caste },
      ]);
    }
  }, [fourthFormValues]);

  useEffect(() => {
    const targetReligion = religionOptions.find(
      (religion) => religion.value == fourthFormValues.religion
    );
    if (!targetReligion && fourthFormValues.religion) {
      setReligionOptions([
        ...religionOptions,
        { value: fourthFormValues.religion, label: fourthFormValues.religion },
      ]);
    }
  }, [fourthFormValues]);

  useEffect(() => {
    const targetCaste = educationQualificationOptions.find(
      (caste) => caste.value == fourthFormValues.education
    );
    console.log(targetCaste);
    if (!targetCaste && fourthFormValues.education) {
      setEducationQualificationOptions([
        ...casteOptions,
        {
          value: fourthFormValues.education,
          label: fourthFormValues.education,
        },
      ]);
    }
  }, [fourthFormValues]);

  useEffect(() => {
    const targetSubject = subjectOptions.find(
      (subject) => subject.value == fourthFormValues.subject
    );
    if (!targetSubject && fourthFormValues.subject) {
      setSubjectOptions([
        ...subjectOptions,
        { value: fourthFormValues.subject, label: fourthFormValues.subject },
      ]);
    }
  }, [fourthFormValues]);

  // useEffect(() => {
  //     const targetMotherTongue = motherTongueOptions.find((motherTongue) => motherTongue.value == fourthFormValues.motherTongue );
  //     if(!targetMotherTongue && fourthFormValues.motherTongue) {
  //       setMotherTongueOptions([...motherTongueOptions, {value: fourthFormValues.motherTongue, label: fourthFormValues.motherTongue}])
  //     }
  // }, [fourthFormValues])

  return (
    <div className="min-h-full lg:mb-8 mb-4 shadow-md lg:w-[100%] xl:w-[100%] rounded-lg ">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Some Personal details</h1> */}

      <Paper
        className={classes.formWrapper}
        py={30}
        px={30}
      >
        <form className="mx-auto" onSubmit={handleSubmit}>
          <Group
            position="apart"
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
          >
            <Title order={largeDesktop ? 1 : mediumDesktop ? 3 : 2}  className="md:text-xl text-[18px]">
              Preferance Detail
            </Title>
            {isMe && (
              <ActionIcon onClick={() => setProfileEdit((prev) => !prev)}>
                <BiEdit
                  size={30}
                  className={`${!profileEdit
                      ? "text-[#EB4566]"
                      : "text-[#EB45660]"
                    } hover:text-[var(--primary)] cursor-pointer`}
                />
              </ActionIcon>
            )}
          </Group>

          <Stack spacing={0}>
            <Text size="sm">Age Range</Text>
            <Group 
            // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
            className=" grid sm:grid-cols-2 grid-cols-1 w-full"

            >
              <Select
                onChange={handleMinAgeChange}
                value={fourthFormValues.minAge}
                readOnly={profileEdit ? false : true}
                placeholder="From"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                // classes2="xl:w-[45%] basis-[45%]"
                data={fromAgeOptions}
              />
              <Select
                onChange={handleMaxAgeChange}
                value={fourthFormValues.maxAge}
                readOnly={profileEdit ? false : true}
                placeholder="To"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                // classes2="xl:w-[45%] basis-[45%]"
                data={toAgeOptions}
              />
            </Group>
          </Stack>

          <Stack spacing={0}>
            <Text size="sm">Height Range</Text>
            <Group
                      className=" grid sm:grid-cols-2 grid-cols-1 w-full"
            //  grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
             >
              <Select
                onChange={handleMinHeightChange}
                value={fourthFormValues.minHeight}
                readOnly={profileEdit ? false : true}
                placeholder="From"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                // classes2="xl:w-[45%] basis-[45%] "
                data={fromheightOptions}
              />
              <Select
                onChange={handleMaxHeightChange}
                value={fourthFormValues.maxHeight}
                readOnly={profileEdit ? false : true}
                placeholder="To"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                // classes2="xl:w-[45%] basis-[45%] "
                data={toheightOptions}
              />
            </Group>
          </Stack>

          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            {/* <Input label="No of family Members" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="number" placeholder="Family Member Number" /> */}
            <Select
              onCreate={(query) => {
                const item = { value: query, label: query };
                setReligionOptions([...religionOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              value={fourthFormValues.religion}
              onChange={handleReligionChange}
              readOnly={profileEdit ? false : true}
              label="Religion"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={religionOptions}
            />
            <Select
              onCreate={(query) => {
                const item = { value: query, label: query };
                setCasteOptions([...casteOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              value={fourthFormValues.caste}
              onChange={handleCasteChange}
              readOnly={profileEdit ? false : true}
              label="Caste"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={casteOptions}
            />
          </Group>
          {/* 

            <div className="w-full flex justify-between flex-col items-center">
               {/* <Input label="No of sibling" type="number" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          {/* <Input label="No of Sibling" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="number" placeholder="Enter full Name" />
                 <Input label="No of Unmarried Sibling" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="number" placeholder="Enter full Name" />
                <InputSelect label="Do you live with your family" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[70%]" options={liveWithFamilyOptions} />
                */}

          {/* </div> */}

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
              onChange={handleEducationalQualificationChange}
              value={fourthFormValues.education}

              readOnly={profileEdit ? false : true}
              label="Educational Qualification"
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
              value={fourthFormValues.subject}
              readOnly={profileEdit ? false : true}
              label="Subject"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={subjectOptions}
            />
          </Group>

          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            {/* <Input label="Enter your Gotra" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            {/* <Input label="Enter your gotra" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter your gotra (if applied)" />
                <InputSelect label="Family Values" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-70%]" options={familyValueOptions}/>
                <InputSelect label="Parent Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[70%]" options={parentStatusOptions}/>
                  */}
            {/* <Input label="Where do your family live ?" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter your family location" /> */}
            <Select
              value={fourthFormValues.sector}
              onChange={handleSectorChange}
              readOnly={profileEdit ? false : true}
              label="Sector working in"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={sectorOptions}
            />
            <Select
              value={fourthFormValues.annualIncome}
              onChange={handleAnnualIncomeChange}
              readOnly={profileEdit ? false : true}
              label="Annual Income"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={annualIncomeOptions}
            />
          </Group>

          <Group
          //  grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
           className=" grid sm:grid-cols-2 grid-cols-1 w-full"

           >
            <Select
              value={fourthFormValues.maritalStatus}
              onChange={handleMaritalStatusChange}
              readOnly={profileEdit ? false : true}
              label="Marital Status"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md font-semibold  lg:text-lg xl:text-xl my-1"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={maritalStatusOptions}
            />

            {fourthFormValues && (
              <TextInput
                value={fourthFormValues.motherTongue}
                onChange={(e) => handleInputChange("motherTongue", e)}
                disabled={profileEdit ? false : true}
                label="Mother Tongue"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                // classes3="w-full lg:w-[40%]"
                // classes="px-2"
                // classes2="block text-md lg:text-lg xl:text-xl font-semibold"
                type="text"
                placeholder="Enter your mother tongue"
              />
            )}

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

export default ProfileFourthForm;
