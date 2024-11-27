import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../newComponent/Profile/Input";
import InputSelect from "../../newComponent/Profile/Select";
// import Button from '../../newComponent/Profile/Button';
import { AiOutlineConsoleSql } from "react-icons/ai";
import "../../styles/PresonaldetailForm.css";
import { axiosInstance } from "../../http";
import { setPersonalDetail } from "../../Store/features/personalDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../Store/features/toastSlice";
import {
  Group,
  Paper,
  Select,
  Slider,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  Button,
} from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { Rocket } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { AuthContext } from "../../utils/context/AuthContext";
import { Loader } from "lucide-react";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--primary)",
  },
}));

function NewFirstForm({ firstForm, prevStep, nextStep }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { personalDetail } = useSelector((state) => state.personalDetail);
  const [isLoading, setIsLoading] = useState(false);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dispatch = useDispatch();
  console.log(user);
  console.log(personalDetail);
  useEffect(() => {
    if (personalDetail) {
      console.log(personalDetail);
      firstForm.setValues(personalDetail);
    }
  }, [personalDetail]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
    { value: "jain", label: "Jainism" },
    { value: "kirat", label: "Kirat" },
    { value: "no", label: "Non-Religious" },
    { value: "other", label: "Other" },
  ]);

  const [genderOptions, setGenderOptions] = useState([
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
    //   {value: "other", label: "Other"},
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
    { value: "1981", label: "1981" },
    { value: "1982", label: "1982" },
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

  const handleSubmit = (value) => {
    // if(!firstFormValues.fullname || !firstFormValues.height || !firstFormValues.profileCreatedFor || !firstFormValues.religion || !firstFormValues.sex || !firstFormValues.caste || !firstFormValues.marital_status || !firstFormValues.day || !firstFormValues.month || !firstFormValues.year || !firstFormValues.physicalDisability || !firstFormValues.address) {
    //   return dispatch(addToast({kind: 'ERROR', msg: 'Please fill all fields.'}))
    // }
    console.log(value);
    setIsLoading(true);
    axiosInstance
      .post(`/users/personal-detail`, value)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setPersonalDetail(response.data));
        setUser({ ...user, profile: response.data });
        // navigate('/contactdetails')
        nextStep();
        showNotification({
          title: "Personal Info updated! 🚩",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        showNotification({
          title: error.message,
        });
        console.log(error);
      });
  };

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

  useEffect(() => {
    const targetCaste = profileOptions.find(
      (profile) => profile.value == firstForm.values.profileCreatedFor
    );

    if (!targetCaste && firstForm.values.profileCreatedFor) {
      setProfileOptions([
        ...profileOptions,
        {
          value: firstForm.values.profileCreatedFor,
          label: firstForm.values.profileCreatedFor,
        },
      ]);
    }
  }, [firstForm]);

  useEffect(() => {
    const targetCaste = casteOptions.find(
      (caste) => caste.value == firstForm.values.caste
    );
    console.log(targetCaste);
    if (!targetCaste && firstForm.values.caste) {
      setCasteOptions([
        ...casteOptions,
        { value: firstForm.values.caste, label: firstForm.values.caste },
      ]);
    }
  }, [firstForm]);

  useEffect(() => {
    const targetReligion = religionOptions.find(
      (religion) => religion.value == firstForm.values.religion
    );
    if (!targetReligion && firstForm.values.religion) {
      setReligionOptions([
        ...religionOptions,
        { value: firstForm.values.religion, label: firstForm.values.religion },
      ]);
    }
  }, [firstForm]);

  useEffect(() => {
    const targetSubCaste = subcasteOptions.find(
      (caste) => caste.value == firstForm.values.subcaste
    );

    if (!targetSubCaste && firstForm.values.subcaste) {
      setSubcasteOptions([
        ...subcasteOptions,
        { value: firstForm.values.subcaste, label: firstForm.values.subcaste },
      ]);
    }
  }, [firstForm]);

  return (
    <div className="min-h-full mt-8 xl:mt-12 2xl:mt-16 mb-4 px-2  w-[100%] md:w-[100%] lg:w-[95%] xl:w-[80%] rounded-lg mx-auto">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-3xl my-4">Let's setup your account.</h1> */}

      <Paper
        className={classes.formWrapper}
        withBorder
        radius={2}
        py={30}
        px={30}
      >
        {/* <form className="mx-auto" onSubmit={(e) => handleSubmit(e)}> */}
        <Title
          order={largeDesktop ? 1 : mediumDesktop ? 3 : 2}
          ta="center"
          mt="md"
          mb={"md"}
        >
          Basic Personal Information
        </Title>
        {/* <Text size={'xl'} weight={500}>Basic Personal Information</Text> */}
        {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row  lg:justify-around items-center">
               <Input value={firstFormValues.fullname}  onChange={(e) => handleInputChange(e)} name="fullname" label="Full Name" classes3="w-full lg:w-[40%]" classes="px-2 text-xl py-2 rounded-xl mt-2 border-2 border-[rgba(0,0,0,0.4)]" classes2="block text-xl lg:text-lg xl:text-xl font-semibold mt-4" type="text" placeholder="Enter full Name" />
               <InputSelect value={firstFormValues.profileCreatedFor} onChange={handleProfileForChange}  label="Profile for " classes1="block text-xl font-semibold lg:text:lg xl:text-xl my-2" classes2="w-full xl:w-[40%] lg:basis-[40%] text-xl" options={profileOptions} placeholder="Enter Profile for" />

             </div> */}
        <form className="mx-auto" onSubmit={firstForm.onSubmit(handleSubmit)}>
          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <TextInput
              required
              label="Full name"
              placeholder="full name"
              value={firstForm.values.fullname}
              error={
                firstForm.errors.fullname &&
                "Fullname must be more than 3 characters."
              }
              onChange={(e) =>
                firstForm.setFieldValue("fullname", e.currentTarget.value)
              }
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />

            <Select
              required
              searchable
              creatable
              defaultValue={firstForm.values.profileCreatedFor}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setProfileOptions([...profileOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              label="Profile for"
              placeholder="Brother"
              value={firstForm.values.profileCreatedFor}
              onChange={(value) =>
                firstForm.setFieldValue("profileCreatedFor", value)
              }
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={profileOptions}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
              <InputSelect value={firstFormValues.sex} onChange={handleGenderChange}  label="Gender " classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2" classes2="w-full xl:w-[40%] basis-[40%]" options={genderOptions} placeholder="Enter Gender" />
               {/* <Input label="Religo" classes3="basis-[40%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter full Name" /> */}
          {/* <InputSelect value={firstFormValues.religion} onChange={handleReligionChange} label="Religion " classes1="block text-xl font-semibold text-md lg:text-lg xl:text-xl my-2" classes2="w-full xl:w-[70%] basis-[40%]" options={religionOptions} placeholder="Enter Religion" /> */}
          {/* </div> */}

          <Group grow mb={"sm"}>
            <Select
              required
              value={firstForm.values.sex}
              onChange={(value) => firstForm.setFieldValue("sex", value)}
              label="Gender"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              placeholder="Enter your gender"
              data={genderOptions}
            />
            <Select
              required
              value={firstForm.values.religion}
              defaultValue={firstForm.values.religion}
              onChange={(value) => firstForm.setFieldValue("religion", value)}
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              searchable
              creatable
              onCreate={(query) => {
                const item = { value: query, label: query };
                setReligionOptions([...religionOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              label="Religion"
              placeholder="Enter your religion"
              data={religionOptions}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center"> */}
          {/* <Input label="Enter your Date of Birth" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}

          {/* <InputSelect placeholder='Enter Caste' value={firstFormValues.caste} onChange={handleCasteChange} label="Caste" classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2" classes2="w-full xl:w-[40%] basis-[40%]" options={casteOptions} /> */}
          {/* <Input label="Sub Caste" type="text" classes3="w-[70%]" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[70%]" /> */}
          {/* <Input name="subcaste" value={firstFormValues.subcaste} onChange={handleInputChange} label="Sub Caste" classes3="w-full mt-2 lg:w-[40%]" classes="px-2 mt-2 py-2 text-xl" classes2="block text-xl font-semibold xl:text-xl lg:text-xl" type="text" placeholder="Enter your Sub Caste" /> */}
          {/* </div> */}

          <Group grow mb={largeDesktop ? "md" : "sm"}>
            <Select
              onCreate={(query) => {
                const item = { value: query, label: query };
                setCasteOptions([...casteOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              value={firstForm.values.caste}
              onChange={(value) => firstForm.setFieldValue("caste", value)}
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              label="Caste"
              placeholder="Enter Caste (if applicable)"
              searchable
              creatable
              data={casteOptions}
            />
            <Select required
              onCreate={(query) => {
                const item = { value: query, label: query };
                setSubcasteOptions([...subcasteOptions, item]);
                return item;
              }}
              getCreateLabel={(query) => `+Create ${query}`}
              value={firstForm.values.subcaste}
              onChange={(value) => firstForm.setFieldValue("subcaste", value)}
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              label="Sub Caste"
              placeholder="Enter subcaste (if applicable)"
              searchable
              creatable
              data={subcasteOptions}
            />
          </Group>

          {/* <div className='w-[90%] flex justify-between mx-auto'>
               <InputSelect value={firstFormValues.day} onChange={handleDayChange} label="Day" classes1="block text-md lg:text-lg xl:text-xl my-2" classes2="xl:w-[30%] basis-[30%]" options={dayOptions}/>
               <InputSelect value={firstFormValues.month} onChange={handleMonthChange} label="Month" classes1="block text-md lg:text-lg xl:text-xl my-2" classes2="xl:w-[25%] basis-[25%]" options={monthOptions}/>
               <InputSelect value={firstFormValues.year} onChange={handleYearChange} label="Year" classes1="block text-md lg:text-lg xl:text-xl my-2" classes2="xl:w-[30%] basis-[30%]" options={yearOptions}/>
               </div> */}

          <Group grow mb={largeDesktop ? "md" : "sm"}>
            <DatePickerInput
              required
              value={
                firstForm.values.month &&
                firstForm.values.day &&
                firstForm.values.year
                  ? new Date(
                      `${firstForm.values.month}/${firstForm.values.day}/${firstForm.values.year}`
                    )
                  : null
              }
              onChange={(value) => {
                firstForm.setFieldValue("year", new Date(value).getFullYear());
                firstForm.setFieldValue("month", new Date(value).getMonth());
                firstForm.setFieldValue("day", new Date(value).getDate());
              }}
              dropdownType="modal"
              label="Date of Birth"
              placeholder="Select Date of Birth"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
            {/* <Select size='md' label="Day" placeholder='Select Day' data={dayOptions} /> */}
            {/* <Select size='md' label="Month" placeholder='Select Month' data={monthOptions} /> */}
            {/* <Select size='md' label="Year" placeholder='Enter year' data={yearOptions} searchable creatable /> */}
          </Group>

          {/* <div className=" w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around  items-center"> 
               <Input value={firstFormValues.address} onChange={handleInputChange} name="address" label="Where do you live ?" classes3="w-full mt-2 lg:w-[40%]" classes="px-2 py-2 mt-2 text-xl" classes2="block font-semibold text-xl xl:text-xl xl:text-xl lg:text-lg" type="text" placeholder="Enter your current address" />
               <InputSelect value={firstFormValues.marital_status} onChange={handleMaritalStatusChange} label="Marital Status" classes1="block font-semibold  text-xl lg:text-lg xl:text-xl my-2" classes2="w-full xl:w-[40%] basis-[40%]" options={maritalStatusOptions} placeholder="Enter marital Status" />
           </div> */}

          <Group grow mb={largeDesktop ? "md" : "sm"}>
            <TextInput
              required
              value={firstForm.values.address}
              onChange={(e) =>
                firstForm.setFieldValue("address", e.currentTarget.value)
              }
              label="Where do you live?"
              placeholder="Enter your current address"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
            <Select
              required
              value={firstForm.values.marital_status}
              onChange={(value) =>
                firstForm.setFieldValue("marital_status", value)
              }
              label="Marital Status"
              placeholder="Select marital status"
              data={maritalStatusOptions}
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>
          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around  items-center"> 
              <InputSelect value={firstFormValues.height}  onChange={handleHeightChange} label="Your Height " classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2" classes2="w-full xl:w-[40%] basis-[40%]" options={heightOptions} />

               {/* <Input label="Where do you live ?" classes3="w-[70%]" classes="px-2" classes2="block 2xl:text-2xl lg:text-2xl" type="text" placeholder="Enter your current address" /> */}
          {/* <InputSelect label="Blood Group" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[70%]" options={bloodGroupOptions} /> */}
          {/* <InputSelect value={firstFormValues.physicalDisability} onChange={handlePhysicalDisabilityChange} label="Any Disability" classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2" classes2="w-full xl:w-[40%] basis-[40%]" options={disabilityOptions} /> */}
          {/* </div> */}

          <Group grow mb={largeDesktop ? "md" : "sm"}>
            <Select
              required
              value={firstForm.values.height}
              onChange={(value) => firstForm.setFieldValue("height", value)}
              label={"Height"}
              placeholder="Select height"
              data={heightOptions}
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />

            <Select
              required
              value={firstForm.values.physicalDisability}
              onChange={(value) =>
                firstForm.setFieldValue("physicalDisability", value)
              }
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              label="Any Disability"
              placeholder="Selct your condition"
              data={disabilityOptions}
            />
            {/* <Slider 
            thumbChildren={<Rocket
           size={'1rem'}
             strokeWidth={3}
            color={'var(--primary)'}
            thumbSize={48}
             styles={
                { thumb: { borderWidth: rem(2), padding: rem(3) },
                mark: {width: rem(16)}
             }
            }
           />}
           color='var(--primary)'
            marks={heightOptions}
            defaultValue={52}
             /> */}
          </Group>

          {/* <div className="w-full flex justify-center">
             <Button label="Go back" classes="px-8 lg:px-16 py-2 rounded-xl font-semibold bg-[var(--secondary)] text-white" classes2="w-full flex justify-center py-4" onClick={() => navigate('/login')} />
             <Button type="submit"
              // onClick={handleNextClick}
               label="Next" classes="px-8 lg:px-16 py-2 rounded-xl bg-[var(--primary)] font-semibold text-white" classes2="w-full flex justify-center py-4" />
          </div>  */}

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
          {/* </form> */}
        </form>
      </Paper>
    </div>
  );
}

export default NewFirstForm;
