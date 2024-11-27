import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Profile/Input";
import InputSelect from "../Profile/Select";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToast } from "../../Store/features/toastSlice";
import { axiosInstance } from "../../http";
import { Loader } from "lucide-react";
import { setFamilyDetail } from "../../Store/features/familyDetailSlice";
import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
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
function ProfileSecondForm({ secondFormValues, setSecondFormValues, isMe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileEdit, setProfileEdit] = useState(false);
  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");
  const [submitting,setSubmitting]=useState(false)

  const handleSubmit = (event) => {
    setSubmitting(true)
    event.preventDefault();
    console.log(secondFormValues)
    if (
      !secondFormValues.familyType ||
      !secondFormValues.noOfSiblings ||
      !secondFormValues.noOfFamilyMember ||
      !secondFormValues.noOfUnmarried ||
      !secondFormValues.familyValues ||
      !secondFormValues.parentStatus ||
      !secondFormValues.familyAddress ||
      !secondFormValues.nativePlace ||
      !secondFormValues.motherTongue||
      !secondFormValues.liveWithFamily
      ||!secondFormValues.gotra
    ) {
      setSubmitting(false)

      return dispatch(
        addToast({ kind: "ERROR", msg: "Please fill all fields." })
      );
    }
    else{
      axiosInstance
      .post("/users/family-detail", secondFormValues)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setFamilyDetail(response.data));
        // navigate('/contactdetails')
        dispatch(addToast({ kind: "SUCCESS", msg: "Family details updated!" }));
        setSubmitting(false)

      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false)

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

  const handleInputChange = (prop,e) => {
    console.log(e.target.value)
    console.log(prop)
    setSecondFormValues({ ...secondFormValues, [prop]: e.target.value });
  };

  const handleFamilyTypeChange = (values) => {
    setSecondFormValues({ ...secondFormValues, familyType: values});
  };

  const handleYouLiveWithFamilyChange = (values) => {
    setSecondFormValues({ ...secondFormValues, liveWithFamily: values });
  };

  const handleFamilyValuesChange = (values) => {
    setSecondFormValues({ ...secondFormValues, familyValues: values });
  };

  const handleParentStatusChange = (values) => {
    setSecondFormValues({ ...secondFormValues, parentStatus: values });
  };
  return (
    <div className="min-h-full lg:mb-8 mb-4  lg:w-[100%] xl:w-[100%] rounded-lg !shadow-md">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Some Personal details</h1> */}

      <Paper
        className={classes.formWrapper}
  
      
        py={30}
        px={30}
      >
        <form className=" mx-auto" onSubmit={handleSubmit}>
          <Group
            position="apart"
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "sm"}

          >
            <Title order={largeDesktop ? 1 : mediumDesktop ? 3 : 2}  className="md:text-xl text-[18px]">
              Family Information
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
          <Group className=" grid sm:grid-cols-2 grid-cols-1 w-full"  >
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleFamilyTypeChange}
              value={secondFormValues.familyType}
              readOnly={profileEdit ? false : true}
              label="Family Type"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              data={familytypeOptions}
            />
            <NumberInput
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleInputChange}
              value={Number(secondFormValues.noOfFamilyMember)}
              disabled={profileEdit ? false : true}
              label="No of family Members"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              placeholder="Family Member Number"
            />
            {/* <InputSelect label="Father's Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" /> */}
          </Group>

          <Group
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"
                     >
            {/* <Input label="No of sibling" type="number" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            <NumberInput
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={(e)=>handleInputChange("noOfSiblings",e)}
              value={Number(secondFormValues.noOfSiblings)}
              disabled={profileEdit ? false : true}
              label="No of Sibling"
              // className="w-full"
              // classes3=""
              // classes="px-2"
              // classes2="block text-md xl:text-xl lg:text-lg font-semibold"
              type="number"
              placeholder="Enter full Name"
            />
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleYouLiveWithFamilyChange}
              value={secondFormValues.liveWithFamily}
              readOnly={profileEdit ? false : true}
              label="Do you live with your family"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={liveWithFamilyOptions}
            />
          </Group>

          <Group
            // mb={largeDesktop ? "md" : "sm"}
            // mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "ld"}  className="sm:flex grid w-full"
            // className="w-[90%] lg:w-full mx-auto flex flex-col lg:flex-row lg:justify-around items-center"
            className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            {/* <InputSelect label="N" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" options={familytypeOptions}  /> */}
            {secondFormValues.nativePlace && (
              <TextInput
                // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
                onChange={(e)=>handleInputChange("nativePlace",e)}
                disabled={profileEdit ? false : true}
                value={secondFormValues.nativePlace}
                label="Native/Ancestors Place"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                // classes3="w-full lg:w-[40%]"
                // classes="px-2"
                // classes2="block xl:text-xl lg:text-lg text-md font-semibold"
                type="text"
                placeholder="Native Place"
              />
            )}
            {/* <InputSelect label="Father's Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" /> */}
            {secondFormValues.motherTongue && (
              <TextInput
                // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
                onChange={(e)=>handleInputChange('motherTongue',e)}
                disabled={profileEdit ? false : true}
                label="Mother Tongue"
                // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
                value={secondFormValues.motherTongue}
                // classes3="w-full lg:w-[40%]"
                // classes="px-2"
                // classes2="block text-md lg:text-lg xl:text-xl text-md font-semibold"
                type="text"
                placeholder="Enter your mother tongue"
              />
            )}
          </Group>

          <Group
                    className=" grid sm:grid-cols-2 grid-cols-1 w-full"
            // grow
            // mb={largeDesktop ? "md" : "sm"}
            // mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}  className="sm:flex grid w-full"
            // className="w-[90%] lg:w-full mx-auto flex flex-col lg:flex-row lg:justify-around items-center"
          >
            {/* <Input label="Enter your Gotra" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
            <TextInput
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={(e)=>handleInputChange('gotra',e)}
              value={secondFormValues.gotra}
              disabled={profileEdit ? false : true}
              label="Enter your gotra"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes3="w-full lg:w-[40%]"
              // classes="px-2"
              // classes2="block text-md lg:text-lg xl:text-xl font-semibold"
              type="text"
              placeholder="Enter your gotra (if applied)"
            />
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleFamilyValuesChange}
              value={secondFormValues.familyValues}
              readOnly={profileEdit ? false : true}
              label="Family Values"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-40%]"
              data={familyValueOptions}
            />
          </Group>

          <Group
                    className=" grid sm:grid-cols-2 grid-cols-1 w-full"

            // grow
            // mb={largeDesktop ? "md" : "sm"}
            // mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}  className="sm:flex grid w-full"
            // className="w-[90%] lg:w-full mx-auto flex flex-col lg:flex-row lg:justify-around items-center"
          >
            <Select
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={handleParentStatusChange}
              value={secondFormValues.parentStatus}
              readOnly={profileEdit ? false : true}
              label="Parent Status"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes1="block text-md lg:text-lg xl:text-xl my-1 font-semibold"
              // classes2="w-full lg:w-[40%] basis-[40%]"
              data={parentStatusOptions}
            />
            <NumberInput
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={(e)=>handleInputChange('noOfUnmarried',e)}
              value={Number(secondFormValues.noOfUnmarried)}
              disabled={profileEdit ? false : true}
              label="No of Unmarried Sibling"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[30em]"
              // classes3="w-full lg:w-[40%]"
              // classes="px-2"
              // classes2="block xl:text-xl lg:text-lg font-semibold"
              type="number"
              placeholder="Enter Number of unmarried Siblings"
            />
          </Group>

          <Group 
          // grow mb={largeDesktop ? "md" : "sm"}  className="sm:flex grid w-full"
          className=" grid sm:grid-cols-2 grid-cols-1 w-full"

          >
            <TextInput
              // size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "sm"}
              onChange={(e)=>handleInputChange("familyAddress",e)}
              value={secondFormValues.familyAddress}
              disabled={profileEdit ? false : true}
              label="Where do your family live ?"
              // className="sm:max-w-[35em] md:max-w-[40em] lg:max-w-[26em] w-[14.5em]"
              type="text"
              placeholder="Enter your family location"
            />
          </Group>

          {profileEdit && (
            <Group position="right">
              {/* <Button label="Previous" classes="px-16 py-3 rounded-xl btnnext text-white" classes2="w-full flex justify-center py-4" onClick={() => handlePrevClick()} /> */}
              <Button
                className={classes.button}
                style={{ backgroundColor: "var(--secondary)" }}
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

export default ProfileSecondForm;
