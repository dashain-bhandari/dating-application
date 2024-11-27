import React, { useState } from 'react'
import ProgressBar from '../content/Progressbar'
import Footer from '../components/Footer';
import NewHeader from '../newComponent/NewHeader/NewHeader';
import NewProgressBar from '../newComponent/NewProgressBar/NewProgressBar';
import { current } from '@reduxjs/toolkit';
import FirstForm from '../newComponent/Forms/FirstForm';
import SecondForm from '../newComponent/Forms/SecondForm';
import FourthForm from '../newComponent/Forms/FourthForm';
import ThirdForm from '../newComponent/Forms/ThirdForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useContext } from 'react';
import { AuthContext } from '../utils/context/AuthContext';

function FormLayout() {
  const {personalDetail} = useSelector((state) => state.personalDetail);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentFormCount, setCurrentFormCount] = useState(0)
  const {user} = useContext(AuthContext);

  const [firstFormValues, setFirstFormValues] = useState({
    fullname: '',
    height: '',
    profileCreatedFor: '',
    religion: '',
    sex: '',
    caste: '',
    subcaste: '',
    marital_status: '',
    day: '',
    month: '',
    year: '',
    physicalDisability: '',
    address: '',
    // smokeOrDrink: '',
  })


   const [secondFormValues, setSecondFormValues] = useState({
    familyType: '',
    noOfSiblings: "",
    noOfFamilyMember: '',
    noOfUnmarried: '',
    liveWithFamily: '',
    familyValues: '',
    gotra: '',
    parentStatus: '',
    familyAddress: '',
    nativePlace: '',
    motherTongue: '',
  })

    const [thirdFormValues, setThirdFormValues] = useState({
    education_degree: '',
    subject: '',
    college: '',
    occupation: '',
    sector: '',
    annualIncome: '',
    companyName: '',

  })

  const [fourthFormValues, setFourthFormValues] = useState({
    minAge: '',
    maxAge: '',
    minHeight: '',
    maxHeight: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    subcaste: '',
    education: '',
    // occupation: '',
    subject: '',
    annualIncome: '',
    sector: '',
    motherTongue: ''
  })
   
   const allForms = [
     <FirstForm firstFormValues={firstFormValues} setFirstFormValues={setFirstFormValues} currentFromCount={currentFormCount} setCurrentFormCount={setCurrentFormCount} />,
     <SecondForm secondFormValues={secondFormValues} setSecondFormValues={setSecondFormValues} currentFormCount={currentFormCount} setCurrentFormCount={setCurrentFormCount} />,
     <ThirdForm thirdFormValues={thirdFormValues} setThirdFormValues={setThirdFormValues} currentFormCount={currentFormCount} setCurrentFormCount={setCurrentFormCount} />,
     <FourthForm fourthFormValues={fourthFormValues} setFourthFormValues={setFourthFormValues} currentFormCount={currentFormCount} setCurrentFormCount={setCurrentFormCount} />,
   ]


  return (
     <div className="w-full min-h-[100vh] bg-screen pt-[4rem]">
      {/* <Header /> */}
       <NewProgressBar currentFormCount={currentFormCount} setCurrentFormCount={setCurrentFormCount} />
         {allForms[currentFormCount]}
       {/* <Footer /> */}
    </div>
  )
}

export default FormLayout;