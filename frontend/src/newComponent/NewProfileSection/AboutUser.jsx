import React,{useState} from 'react'
import UserProfileAvatarComponent from '../UserProfileAvatarComponent/UserProfileAvatarComponent'
import ProfileFirstForm from '../ProfileSectionForm/ProfileFirstForm'
import ProfileThirdForm from '../ProfileSectionForm/ProfileThirdForm';
import ProfileSecondForm from '../ProfileSectionForm/ProfileSecondForm'
import ProfileFourthForm from '../ProfileSectionForm/ProfileFourthForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserDetails } from '../../utils/api';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

function AboutUser() {

  const {currentVisitedUser} = useSelector((state) => state.visitProfile);
    
  console.log(currentVisitedUser);
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

   useEffect(() => {
      if(currentVisitedUser) {

        if(currentVisitedUser.profile) {
             setFirstFormValues(currentVisitedUser.profile)
        } 
         if(currentVisitedUser.family) {
            setSecondFormValues(currentVisitedUser.family)
        } 
        if(currentVisitedUser.education) {
            setThirdFormValues(currentVisitedUser.education)
        }
         if(currentVisitedUser.preferance) {
           setFourthFormValues(currentVisitedUser.preferance);
        }
      }    
   }, [currentVisitedUser])

  return (
    <div className=''>
       {/* <UserProfileAvatarComponent /> */}
       <ProfileFirstForm firstFormValues={firstFormValues} isMe={false} />
       <ProfileSecondForm secondFormValues={secondFormValues} isMe={false} />
       <ProfileThirdForm thirdFormValues={thirdFormValues} isMe={false} />
       <ProfileFourthForm fourthFormValues={fourthFormValues} isMe={false} />
    </div>
    
  )
}

export default AboutUser;