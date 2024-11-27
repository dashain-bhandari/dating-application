import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Profile/Input";
import InputSelect from "../Profile/Select";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { addToast } from "../../Store/features/toastSlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../http";
import { setPersonalDetail } from "../../Store/features/personalDetailSlice";
import { Loader } from "lucide-react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  
  Paper,
  Select,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--seondary)",
  },
}));

function ProfileFirstForm({ firstFormValues, setFirstFormValues, isMe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileEdit, setProfileEdit] = useState(false);

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

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
    { value: "man", label: "Man" },
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

  const maritalStatusOptions = [
    { value: "unmarried", label: "Unmarried" },
    { value: "awatingdivorce", label: "Awating Divorce" },
    { value: "divorced", label: "Divorced" },
  ];

  const heightOptions = [
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

  const disabilityOptions = [
    { value: "no", label: "No" },
    { value: "physicalDisability", label: "Physical Disability" },
  ];

  const dayOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
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
  ];

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const yearOptions = [
    { value: "1980", label: "1980" },
    { value: "1981", lable: "1982" },
    { value: "1983", label: "1983" },
    { value: "1984", label: "1984" },
    { value: "1985", label: "1985" },
    { value: "1986", label: "1986" },
    { value: "1987", label: "1987" },
    { value: "1988", label: "1988" },
    { value: "1989", label: "1989" },
    { value: "1990", label: "1990" },
    { value: "1991", label: "1991" },
    { value: "1992", label: "1992" },
    { value: "1993", label: "1993" },
    { value: "1994", label: "1994" },
    { value: "1995", label: "1996" },
    { value: "1997", label: "1997" },
    { value: "1998", label: "1998" },
    { value: "1999", label: "1999" },
    { value: "2000", label: "2000" },
    { value: "2001", label: "2001" },
  ];

  const [subcasteOptions, setSubcasteOptions] = useState([
    { value: "Not Applicable", label: "Not Applicable" },
  ]);

  const [submitting,setSubmitting]=useState(false);

  const handleSubmit = (event) => {
    setSubmitting(true)
    event.preventDefault();
    console.log(firstFormValues)
    if (
      !firstFormValues.fullname ||
      !firstFormValues.height ||
      !firstFormValues.profileCreatedFor ||
      !firstFormValues.religion ||
      !firstFormValues.sex ||
      !firstFormValues.caste ||
      !firstFormValues.marital_status ||
      !firstFormValues.day ||
      !firstFormValues.month ||
      !firstFormValues.year ||
      !firstFormValues.physicalDisability ||
      !firstFormValues.address
    ) {
      setSubmitting(false)
      dispatch(addToast({ kind: "ERROR", msg: "Please fill all fields." }));
    }

    else{
      
      axiosInstance
      .post("/users/personal-detail", firstFormValues)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setPersonalDetail(response.data));
        dispatch(
          addToast({
            kind: "SUCCESS",
            msg: "Personal Details updated successfully",
          })
        );
        setSubmitting(false);
        // navigate('/contactdetails')
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

  const handleInputChange = (prop,e) => {
    console.log(e.target.value)
    console.log(prop)
    setFirstFormValues({ ...firstFormValues, [prop]: e.target.value });
  };


  const handleProfileForChange = (values) => {
    console.log(values);
    setFirstFormValues({ ...firstFormValues, profileCreatedFor: values});
  };


  
  const handleGenderChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, sex: values });
  };

  const handleReligionChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, religion: values });
  };

  const handleCasteChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, caste: values });
  };

  const handleSubCasteChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, subcaste: values });
  };

  const handleMaritalStatusChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, marital_status: values });
  };

  const handleHeightChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, height: values });
  };

  const handlePhysicalDisabilityChange = (values) => {
    console.log(values)
    setFirstFormValues({
      ...firstFormValues,
      physicalDisability: values,
    });
  };
  const handleYearChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, year: values});
  };

  const handleMonthChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, month: values });
  };

  const handleDayChange = (values) => {
    console.log(values)
    setFirstFormValues({ ...firstFormValues, day: values });
  };

  // useEffect(() => {
  //    if(day || month || year)
  //     setFirstFormValues({...firstFormValues, dateOfBirth: `${day && day}/${month && month}/${year && year}`})
  // }, [day, month, year])

  useEffect(() => {
    const targetCaste = profileOptions.find(
      (profile) => profile.value == firstFormValues.profileCreatedFor
    );

    if (!targetCaste && firstFormValues.profileCreatedFor) {
      setProfileOptions([
        ...profileOptions,
        {
          value: firstFormValues.profileCreatedFor,
          label: firstFormValues.profileCreatedFor,
        },
      ]);
    }
  }, [firstFormValues]);

  useEffect(() => {
    const targetCaste = casteOptions.find(
      (caste) => caste.value == firstFormValues.caste
    );
    console.log(targetCaste);
    if (!targetCaste && firstFormValues.caste) {
      setCasteOptions([
        ...casteOptions,
        { value: firstFormValues.caste, label: firstFormValues.caste },
      ]);
    }
  }, [firstFormValues]);

  useEffect(() => {
    const targetReligion = religionOptions.find(
      (religion) => religion.value == firstFormValues.religion
    );
    if (!targetReligion && firstFormValues.religion) {
      setReligionOptions([
        ...religionOptions,
        { value: firstFormValues.religion, label: firstFormValues.religion },
      ]);
    }
  }, [firstFormValues]);

  useEffect(() => {
    const targetSubCaste = subcasteOptions.find(
      (caste) => caste.value == firstFormValues.subcaste
    );

    if (!targetSubCaste && firstFormValues.subcaste) {
      setSubcasteOptions([
        ...subcasteOptions,
        { value: firstFormValues.subcaste, label: firstFormValues.subcaste },
      ]);
    }
  }, [firstFormValues]);

  return (
    <div className="min-h-full  lg:mb-8  rounded-lg z-0 shadow-md mb-4 ">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-3xl my-4">Let's setup your account.</h1> */}

      <Paper
        className={classes.formWrapper}
        py={30}
        px={30}
      >
        <form className="" onSubmit={handleSubmit} >
          <Group
            position="apart"
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
          >
            <Title order={largeDesktop ? 1 : mediumDesktop ? 3 : 2} className="md:text-xl text-[18px]">
              Basic Information
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
          //  grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"
           >

            <TextInput
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={(e)=>handleInputChange('fullname',e)}
              value={firstFormValues.fullname}
              label="Full Name"
              disabled={profileEdit ? false : true}
              type="text"
              // className="sm:w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              placeholder="Enter full Name"
            />
            <Select
              searchable
              creatable
              defaultValue={firstFormValues.profileCreatedFor}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setProfileOptions([...profileOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleProfileForChange}
              value={firstFormValues.profileCreatedFor}
              readOnly={profileEdit ? false : true}
              label="Profile for"
              // className="sm:w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              data={profileOptions}
            />
          </Group>

          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}  className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleGenderChange}
              label="Gender"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              value={firstFormValues.sex}
              readOnly={profileEdit ? false : true}
              data={genderOptions}
            />
            {/* <Input label="Religo" classes3="basis-[40%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter full Name" /> */}
            <Select
              defaultValue={firstFormValues.religion}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setReligionOptions([...religionOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleReligionChange}
              label="Religion"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              value={firstFormValues.religion}
              readOnly={profileEdit ? false : true}
              data={religionOptions}
            />
          </Group>

          <Group 
          // grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "sm"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}

            <Select
              onChange={handleCasteChange}
              label="Caste"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              value={firstFormValues.caste}
              readOnly={profileEdit ? false : true}
              data={casteOptions}
            />
            {/* <Input label="Sub Caste" type="text" classes3="w-[70%]" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[70%]" /> */}
            <TextInput
              onChange={handleInputChange}
              label="Sub Caste"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              value={firstFormValues.subcaste}
              disabled={profileEdit ? false : true}
              type="text"
              placeholder="Enter your Sub Caste"
            />
          </Group>

          {/* <div className="w-[90%]  lg:w-full flex flex-col lg:flex-row justify-around items-center">
            <div className='w-[90%] flex justify-between mx-auto'>
               <InputSelect onChange={handleDayChange} value={firstFormValues.day} label="Day" isDisabled={profileEdit ? false : true} classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold" classes2="xl:w-[30%] basis-[30%]" options={dayOptions}/>
               <InputSelect onChange={handleMonthChange} value={firstFormValues.month} label="Month" isDisabled={profileEdit ? false : true} classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold" classes2="xl:w-[25%] basis-[25%]" options={monthOptions}/>
               <InputSelect onChange={handleYearChange} value={firstFormValues.year} label="Year" isDisabled={profileEdit ? false : true} classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold" classes2="xl:w-[30%] basis-[30%]" options={yearOptions}/>
               </div>
          </div> */}

          <Group 
          // grow mb={largeDesktop ? "md" : "sm"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            <DatePickerInput
              value={
                firstFormValues.month &&
                firstFormValues.day &&
                firstFormValues.year
                  ? new Date(
                      `${firstFormValues.month}/${firstFormValues.day}/${firstFormValues.year}`
                    )
                  : null
              }
              onChange={(value) => {
                console.log(value)
                firstForm.setFieldValue("year", new Date(value).getFullYear());
                firstForm.setFieldValue("month", new Date(value).getMonth());
                firstForm.setFieldValue("day", new Date(value).getDate());
              }}
              dropdownType="modal"
              label="Date of Birth"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[14.5em]"
              placeholder="Select Date of Birth"
              readOnly={profileEdit ? true : false}
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
            />
            {/* <Select size='md' label="Day" placeholder='Select Day' data={dayOptions} /> */}
            {/* <Select size='md' label="Month" placeholder='Select Month' data={monthOptions} /> */}
            {/* <Select size='md' label="Year" placeholder='Enter year' data={yearOptions} searchable creatable /> */}
          </Group>

          <Group
          //  grow mb={largeDesktop ? "md" : "sm"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

           >
            <TextInput
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={(e)=>handleInputChange('address',e)}
              value={firstFormValues.address}
              label="Where do you live ?"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              disabled={profileEdit ? false : true}
              // classes3="w-full lg:w-[40%]"
              // classes="px-2"
              // classes2="block text-md font-semibold xl:text-xl lg:text-lg"
              type="text"
              placeholder="Enter your current address"
            />
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleMaritalStatusChange}
              value={firstFormValues.marital_status}
              label="Marital Status"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              readOnly={profileEdit ? false : true}
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={maritalStatusOptions}
            />
          </Group>

          <Group 
          // grow mb={largeDesktop ? "md" : "sm"} className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            <Select
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleHeightChange}
              value={firstFormValues.height}
              label="Your Height "
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              readOnly={profileEdit ? false : true}
              data={heightOptions}
            />

            {/* <Input label="Where do you live ?" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter your current address" /> */}
            {/* <InputSelect label="Blood Group" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[70%]" options={bloodGroupOptions} /> */}
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handlePhysicalDisabilityChange}
              value={firstFormValues.physicalDisability}
              label="Any Disability"
              readOnly={profileEdit ? false : true}
              data={disabilityOptions}
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
                {/* Save */}
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

export default ProfileFirstForm;
