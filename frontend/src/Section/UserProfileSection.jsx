import React from 'react'
import UserProfileAvatarComponent from '../newComponent/UserProfileAvatarComponent/UserProfileAvatarComponent'
import ProfileFirstForm from '../newComponent/ProfileSectionForm/ProfileFirstForm'
import ProfileThirdForm from '../newComponent/ProfileSectionForm/ProfileThirdForm';
import ProfileSecondForm from '../newComponent/ProfileSectionForm/ProfileSecondForm'
import ProfileFourthForm from '../newComponent/ProfileSectionForm/ProfileFourthForm';
import { useContext } from 'react';
import { AuthContext } from '../utils/context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';

function UserProfileSection({isMe}) {
   
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

   useEffect(() => {
      if(user) {

        if(user.profile) {
             setFirstFormValues(user.profile)
        } 
         if(user.family) {
            setSecondFormValues(user.family)
        } 
        if(user.education) {
            setThirdFormValues(user.education)
        }
         if(user.preferance) {
          console.log(user.preferance)
          console.log(fourthFormValues)
           setFourthFormValues(user.preferance);
        }
      }    
   }, [user])

  return (


    <div className=''>
       {/* <UserProfileAvatarComponent /> */}
       <ProfileFirstForm firstFormValues={firstFormValues} setFirstFormValues={setFirstFormValues} isMe={isMe} />
       <ProfileSecondForm secondFormValues={secondFormValues} setSecondFormValues={setSecondFormValues} isMe={isMe} />
       <ProfileThirdForm thirdFormValues={thirdFormValues} setThirdFormValues={setThirdFormValues} isMe={isMe} />
       <ProfileFourthForm fourthFormValues={fourthFormValues} setFourthFormValues={setFourthFormValues} isMe={isMe} />
    </div>
    
  )
}

export default UserProfileSection;