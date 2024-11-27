import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Profile/Input";
import InputSelect from "../Profile/Select";
import Button from "../Profile/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEducationDetail } from "../../Store/features/educationDetailSlice";
import { axiosInstance } from "../../http";
import { setFamilyDetail } from "../../Store/features/familyDetailSlice";
import { addToast } from "../../Store/features/toastSlice";

function SecondForm({
  secondFormValues,
  setSecondFormValues,
  setCurrentFormCount,
  currentFromCount,
}) {
  const { familyDetail } = useSelector((state) => state.familyDetail);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !secondFormValues.familyType ||
      !secondFormValues.noOfSiblings ||
      !secondFormValues.noOfFamilyMember ||
      !secondFormValues.noOfUnmarried ||
      !secondFormValues.familyValues ||
      !secondFormValues.parentStatus ||
      !secondFormValues.familyAddress ||
      !secondFormValues.nativePlace ||
      !secondFormValues.motherTongue
    ) {
      return dispatch(
        addToast({ kind: "ERROR", msg: "Please fill all fields." })
      );
    }
    console.log(secondFormValues);
    axiosInstance
      .post("/users/family-detail", secondFormValues)
      .then((response) => {
        console.log("updated successfully");
        console.log(response.data);
        dispatch(setFamilyDetail(response.data));
        setCurrentFormCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (familyDetail) {
      setSecondFormValues(familyDetail);
    }
  }, [familyDetail]);

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

  const handleInputChange = (e) => {
    setSecondFormValues({
      ...secondFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFamilyTypeChange = (values) => {
    setSecondFormValues({ ...secondFormValues, familyType: values.value });
  };

  const handleYouLiveWithFamilyChange = (values) => {
    setSecondFormValues({ ...secondFormValues, liveWithFamily: values.value });
  };

  const handleFamilyValuesChange = (values) => {
    setSecondFormValues({ ...secondFormValues, familyValues: values.value });
  };

  const handleParentStatusChange = (values) => {
    setSecondFormValues({ ...secondFormValues, parentStatus: values.value });
  };

  return (
    <div className="mt-16 min-h-full mb-8 px-2 py-4 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] rounded-lg mx-auto">
      {/* <h1 className="text-2xl w-full text-center font-semibold xl:text-4xl my-4">Some Personal details</h1> */}

      <form className=" mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-xl pb-2 border-b-2 border-[rgba(0,0,0,0.2)] font-bold w-[90%] mx-auto">
          Family Information
        </h1>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
          <InputSelect
            value={secondFormValues.familyType}
            onChange={handleFamilyTypeChange}
            label="Family Type"
            classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:xl:w-[40%] lg:basis-[40%]"
            options={familytypeOptions}
          />
          <Input
            value={secondFormValues.noOfFamilyMember}
            onChange={handleInputChange}
            name="noOfFamilyMember"
            label="No of family Members"
            classes3="w-full lg:w-[40%]"
            classes="px-2 py-2 text-xl mt-2"
            classes2="block font-semibold mt-2 text-xl xl:text-xl lg:text-lg"
            type="number"
            placeholder="Family Member Number"
          />
          {/* <InputSelect label="Father's Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" /> */}
        </div>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around lg:items-center">
          {/* <Input label="No of sibling" type="number" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          <Input
            value={secondFormValues.noOfSiblings}
            onChange={handleInputChange}
            name="noOfSiblings"
            label="No of Sibling"
            classes3="w-full lg:w-[40%]"
            classes="px-2 py-2 mt-2 text-xl"
            classes2="block font-semibold text-xl xl:text-xl lg:text-lg"
            type="number"
            placeholder="Enter full Name"
          />
          <InputSelect
            value={secondFormValues.liveWithFamily}
            onChange={handleYouLiveWithFamilyChange}
            label="Do you live with your family"
            classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-[40%]"
            options={liveWithFamilyOptions}
          />
        </div>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row lg:justify-around items-center">
          {/* <InputSelect label="N" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" options={familytypeOptions}  /> */}
          <Input
            value={secondFormValues.nativePlace}
            onChange={handleInputChange}
            name="nativePlace"
            label="Native/Ancestors Place"
            classes3="w-full lg:w-[40%]"
            classes="px-2 text-xl"
            classes2="block font-semibold text-xl xl:text-xl lg:text-lg"
            type="text"
            placeholder="Native Place"
          />
          {/* <InputSelect label="Father's Status" classes1="block text-2xl my-2" classes2="xl:w-[70%] basis-[40%]" /> */}
          <Input
            value={secondFormValues.motherTongue}
            onChange={handleInputChange}
            name="motherTongue"
            label="Mother Tongue"
            classes3="w-full lg:w-[40%]"
            classes="px-2 text-xl"
            classes2="block font-semibold text-xl lg:text-lg xl:text-xl"
            type="text"
            placeholder="Enter your mother tongue"
          />
        </div>

        <div className="w-[90%] mx-auto lg:w-full flex flex-col lg:flex-row  lg:justify-around items-center">
          {/* <Input label="Enter your Gotra" type="text" classes1="block text-2xl my-2" classes2="xl:w-[60%] basis-[40%]" options={genderOptions} /> */}
          <Input
            value={secondFormValues.gotra}
            name="gotra"
            onChange={handleInputChange}
            label="Enter your gotra"
            classes3="w-full lg:w-[40%]"
            classes="px-2 text-xl"
            classes2="block font-semibold text-xl lg:text-lg xl:text-xl"
            type="text"
            placeholder="Enter your gotra (if applied)"
          />
          <InputSelect
            value={secondFormValues.familyValues}
            onChange={handleFamilyValuesChange}
            label="Family Values"
            classes1="block font-semibold text-xl lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-40%]"
            options={familyValueOptions}
          />
        </div>

        <div className="w-[90%] mx-auto flex-col lg:flex-row lg:w-full flex lg:justify-around items-center">
          <InputSelect
            value={secondFormValues.parentStatus}
            onChange={handleParentStatusChange}
            label="Parent Status"
            classes1="block text-xl font-semibold lg:text-lg xl:text-xl my-2"
            classes2="w-full lg:w-[40%] basis-[40%]"
            options={parentStatusOptions}
          />
          <Input
            name="noOfUnmarried"
            value={secondFormValues.noOfUnmarried}
            onChange={handleInputChange}
            label="No of Unmarried Sibling"
            classes3="w-full lg:w-[40%]"
            classes="px-2 text-xl"
            classes2="block font-semibold text-xl xl:text-xl lg:text-lg"
            type="number"
            placeholder="Enter full Name"
          />
        </div>

        <div className="w-[90%] mx-auto flex flex-col lg:flex-row lg:justify-between items-center mt-2">
          <Input
            name="familyAddress"
            value={secondFormValues.familyAddress}
            onChange={handleInputChange}
            label="Where do your family live ?"
            classes3="w-full lg:w-[45%]"
            classes="px-2 text-xl"
            classes2="block text-xl font-semibold xl:text-xl lg:text-lg"
            type="text"
            placeholder="Enter your family location"
          />
        </div>

        <div className="w-full flex justify-around">
          <Button
            label="Previous"
            classes="px-8 py-2 rounded-xl bg-[var(--secondary)] text-white "
            classes2="flex justify-center py-2"
            onClick={() => handlePrevClick()}
          />
          <Button
            type="submit"
            label="Next"
            classes="px-8 py-2 rounded-xl bg-[var(--primary)] text-white"
            classes2=" flex justify-center py-2"
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

export default SecondForm;
