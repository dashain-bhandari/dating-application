import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../newComponent/Profile/Input";
import InputSelect from "../../newComponent/Profile/Select";
// import Button from '../../newComponent/Profile/Button';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEducationDetail } from "../../Store/features/educationDetailSlice";
import { axiosInstance } from "../../http";
import { setFamilyDetail } from "../../Store/features/familyDetailSlice";
import { addToast } from "../../Store/features/toastSlice";
import {
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
import { showNotification } from "@mantine/notifications";
import { useContext } from "react";
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

function NewSecondForm({ secondForm, prevStep, nextStep }) {
  const { familyDetail } = useSelector((state) => state.familyDetail);
  const {user, setUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    // if(!secondFormValues.familyType || !secondFormValues.noOfSiblings || !secondFormValues.noOfFamilyMember || !secondFormValues.noOfUnmarried || !secondFormValues.familyValues || !secondFormValues.parentStatus || !secondFormValues.familyAddress || !secondFormValues.nativePlace || !secondFormValues.motherTongue) {
    //   return dispatch(addToast({kind: 'ERROR', msg: 'Please fill all fields.'}))
    // }
    setIsLoading(true);
    axiosInstance
      .post("/users/family-detail", value)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setFamilyDetail(response.data));
        setUser({ ...user, family: response.data });
        nextStep();
        showNotification({
          title: "Family Info updated! 🚩",
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
    if (familyDetail) {
      secondForm.setValues(familyDetail);
    }
  }, [familyDetail]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

  return (
    <div className="mt-8 xl:mt-12 2xl:mt-16 min-h-full mb-4 px-2 w-[100%] md:w-[100%] lg:w-[95%] xl:w-[80%] rounded-lg mx-auto">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Some Personal details</h1> */}

      <Paper
        className={classes.formWrapper}
        withBorder
        radius={2}
        py={30}
        px={30}
      >
        {/* <form className=" mx-auto" onSubmit={handleSubmit}> */}
        {/* <h1 className='text-xl pb-2 border-b-2 border-[rgba(0,0,0,0.2)] font-bold w-[90%] mx-auto'>Family Information</h1> */}

        <Title
          order={largeDesktop ? 1 : mediumDesktop ? 3 : 2}
          ta="center"
          mt="md"
          mb={"md"}
        >
          Family Information
        </Title>
        {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center"> */}
        {/* <InputSelect value={secondFormValues.familyType} onChange={handleFamilyTypeChange}  label="Family Type" classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2" classes2="w-full lg:xl:w-[40%] lg:basis-[40%]" options={familytypeOptions}  /> */}
        {/* <Input value={secondFormValues.noOfFamilyMember} onChange={handleInputChange} name="noOfFamilyMember" label="No of family Members" classes3="w-full lg:w-[40%]" classes="px-2 py-2 text-xl mt-2" classes2="block font-semibold mt-2 text-xl xl:text-xl lg:text-lg" type="number" placeholder="Family Member Number" /> */}
        {/* <InputSelect label="Father's Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" /> */}
        {/* </div> */}

        <form className="mx-auto" onSubmit={secondForm.onSubmit(handleSubmit)}>
          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <Select
              value={secondForm.values.familyType}
              onChange={(value) =>
                secondForm.setFieldValue("familyType", value)
              }
              required
              searchable
              creatable
              label="Family Type"
              placeholder="Select family type"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={familytypeOptions}
            />
            <NumberInput
              value={Number(secondForm.values.noOfFamilyMember)}
              onChange={(value) =>
                secondForm.setFieldValue("noOfFamilyMember", value)
              }
              required
              label="No of Family Member"
              placeholder="Enter no. of family members"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around lg:items-center">
               {/* <Input label="No of sibling" type="number" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          {/* <Input value={secondFormValues.noOfSiblings} onChange={handleInputChange} name="noOfSiblings" label="No of Sibling" classes3="w-full lg:w-[40%]" classes="px-2 py-2 mt-2 text-xl" classes2="block font-semibold text-xl xl:text-xl lg:text-lg" type="number" placeholder="Enter full Name" /> */}
          {/* <InputSelect value={secondFormValues.liveWithFamily}  onChange={handleYouLiveWithFamilyChange} label="Do you live with your family" classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-[40%]" options={liveWithFamilyOptions} /> */}
          {/* </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <Select
              value={secondForm.values.liveWithFamily}
              onChange={(value) =>
                secondForm.setFieldValue("liveWithFamily", value)
              }
              required
              searchable
              creatable
              label="Do you live with your family?"
              placeholder="Select..."
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={liveWithFamilyOptions}
            />
            <NumberInput
              value={Number(secondForm.values.noOfSiblings)}
              onChange={(value) =>
                secondForm.setFieldValue("noOfSiblings", value)
              }
              required
              label="No of Siblings"
              placeholder="Enter no. of siblings"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center"> */}
          {/* <InputSelect label="N" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" options={familytypeOptions}  /> */}
          {/* <Input value={secondFormValues.nativePlace} onChange={handleInputChange} name="nativePlace" label="Native/Ancestors Place" classes3="w-full lg:w-[40%]" classes="px-2 text-xl" classes2="block font-semibold text-xl xl:text-xl lg:text-lg" type="text" placeholder="Native Place" /> */}
          {/* <InputSelect label="Father's Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" /> */}
          {/* <Input value={secondFormValues.motherTongue} onChange={handleInputChange} name="motherTongue" label="Mother Tongue" classes3="w-full lg:w-[40%]" classes="px-2 text-xl" classes2="block font-semibold text-xl lg:text-lg xl:text-xl" type="text" placeholder="Enter your mother tongue" /> */}
          {/* </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <TextInput
              value={secondForm.values.nativePlace}
              onChange={(e) =>
                secondForm.setFieldValue("nativePlace", e.currentTarget.value)
              }
              required
              label="Native Place"
              placeholder="Enter Native Place"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />

            <TextInput
              value={secondForm.values.motherTongue}
              onChange={(e) =>
                secondForm.setFieldValue("motherTongue", e.currentTarget.value)
              }
              required
              label="Mother Tongue"
              placeholder="Enter Mother Tongue"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row  lg:justify-around items-center"> */}
          {/* <Input label="Enter your Gotra" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          {/* <Input value={secondFormValues.gotra} name="gotra" onChange={handleInputChange} label="Enter your gotra" classes3="w-full lg:w-[40%]" classes="px-2 text-xl" classes2="block font-semibold text-xl lg:text-lg xl:text-xl" type="text" placeholder="Enter your gotra (if applied)" /> */}
          {/* <InputSelect value={secondFormValues.familyValues} onChange={handleFamilyValuesChange} label="Family Values" classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-40%]" options={familyValueOptions}/> */}

          {/* </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <TextInput
              value={secondForm.values.gotra}
              onChange={(e) =>
                secondForm.setFieldValue("gotra", e.currentTarget.value)
              }
              required
              label="Gotra"
              placeholder="Enter gotra"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />

            <Select
              value={secondForm.values.familyValues}
              onChange={(value) =>
                secondForm.setFieldValue("familyValues", value)
              }
              required
              searchable
              creatable
              label="Family Value"
              placeholder="Select Family Values"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={familyValueOptions}
            />
          </Group>

          {/* <div className='w-[90%] mx-auto flex-col lg:flex-row lg:w-full flex lg:justify-around items-center'>
                   <InputSelect value={secondFormValues.parentStatus} onChange={handleParentStatusChange} label="Parent Status" classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2" classes2="w-full lg:w-[40%] basis-[40%]" options={parentStatusOptions}/>
                   <Input name="noOfUnmarried" value={secondFormValues.noOfUnmarried} onChange={handleInputChange} label="No of Unmarried Sibling" classes3="w-full lg:w-[40%]" classes="px-2 text-xl" classes2="block font-semibold text-xl xl:text-xl lg:text-lg" type="number" placeholder="Enter full Name" />
               </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <Select
              value={secondForm.values.parentStatus}
              onChange={(value) =>
                secondForm.setFieldValue("parentStatus", value)
              }
              required
              searchable
              creatable
              label="Parent Status"
              placeholder="Select Parent Status"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
              data={parentStatusOptions}
            />
            <NumberInput
              value={Number(secondForm.values.noOfUnmarried)}
              onChange={(value) =>
                secondForm.setFieldValue("noOfUnmarried", value)
              }
              required
              label="No of Unmarried Sibling "
              placeholder="Enter no. of Unmarried Siblings"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className='w-[90%] mx-auto flex flex-col lg:flex-row lg:justify-between items-center mt-2'>
                 <Input name="familyAddress" value={secondFormValues.familyAddress} onChange={handleInputChange} label="Where do your family live ?" classes3="w-full lg:w-[45%]" classes="px-2 text-xl" classes2="block text-xl font-semibold xl:text-xl lg:text-lg" type="text" placeholder="Enter your family location" />
               </div> */}

          <Group grow mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}>
            <TextInput
              value={secondForm.values.familyAddress}
              onChange={(e) =>
                secondForm.setFieldValue("familyAddress", e.currentTarget.value)
              }
              required
              label="Where do your family live?"
              placeholder="Enter family address"
              size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "lg"}
            />
          </Group>

          {/* <div className="w-full flex justify-around">
             <Button label="Previous" classes="px-8 py-2 rounded-xl bg-[var(--secondary)] text-white " classes2="flex justify-center py-2" onClick={() => handlePrevClick()} />
             <Button type="submit" label="Next" classes="px-8 py-2 rounded-xl bg-[var(--primary)] text-white" classes2=" flex justify-center py-2" />
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

export default NewSecondForm;
