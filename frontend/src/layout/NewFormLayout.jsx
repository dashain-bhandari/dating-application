import { Button, Group, Stepper } from '@mantine/core';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FirstForm from '../newComponent/Forms/FirstForm';
import SecondForm from '../newComponent/Forms/SecondForm';
import ThirdForm from '../newComponent/Forms/ThirdForm';
import FourthForm from '../newComponent/Forms/FourthForm';
import { AuthContext } from '../utils/context/AuthContext';
import NewFirstForm from '../components/NewForm/NewFirstForm';
import { useMediaQuery } from '@mantine/hooks';
import NewSecondForm from '../components/NewForm/NewSecondForm';
import NewThirdForm from '../components/NewForm/NewThirdForm';
import NewFourthForm from '../components/NewForm/NewFourthForm';
import { useForm } from '@mantine/form';

function NewFormLayout() {

  console.log("hiii");

  const {personalDetail} = useSelector((state) => state.personalDetail);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);


  const firstForm = useForm({
    initialValues: {
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
    },

    validate: {
      fullname: (val) => (val.length <=3 ? 'Fullname must have at least three characters' : null),
    }
  })


   const secondForm = useForm({

    initialValues: {
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
    },

    validate: {
      noOfSiblings: (val) => val > 100  ? 'Too much siblings, Not good!' : null,
      noOfFamilyMember: (val) => val > 100 ? 'Too much family members' : null,
      noOfUnmarried: (val) => val > 100 ? 'Too much Unmarried' : null,
    }

  })

    const thirdForm = useForm({
      initialValues: {
    education_degree: '',
    subject: '',
    college: '',
    occupation: '',
    sector: '',
    annualIncome: '',
    companyName: '',
    },
  })

  const fourthForm = useForm({
    initialValues: {
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
    },

    validate: {
      minAge: (val) => val > 100 ? 'Too old to marry!' : null,
      maxAge: (val) => val > 100 ? 'Too old to marry!' : null,

    }
  })

  const largeDesktop = useMediaQuery('(min-width: 1750px)')
  const mediumDesktop = useMediaQuery('(max-width: 1440px)')
  const [active, setActive] = useState(0);
  const nextStep = () => 
    setActive((current) => (current < 3 ? current + 1 : current));
    
  
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

   const allForms = [
     <NewFirstForm prevStep={prevStep} nextStep={nextStep} firstForm={firstForm} />,
     <NewSecondForm prevStep={prevStep} nextStep={nextStep} secondForm={secondForm} />,
     <NewThirdForm prevStep={prevStep} nextStep={nextStep} thirdForm={thirdForm} />,
     <NewFourthForm prevStep={prevStep} nextStep={nextStep} fourthForm={fourthForm} />,
   ]

  return (


 <div className='w-full min-h-[100vh] py-[3rem] 2xl:py-[6rem] bg-screen'>
       <div className='w-[95%] md:w-[80%] xl:w-[70%] mx-auto'>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" size={largeDesktop ? 'xl' : (mediumDesktop ? 'sm' : 'lg' )}>
        <Stepper.Step label="Personal Info" description="About yourself">
          Step 1 content: Add about yourself.
        </Stepper.Step>
        <Stepper.Step label="Family Info" description="About your family">
          Step 2 content: Add about your family.
        </Stepper.Step>
        <Stepper.Step label="Education Info" description="About education and profession">
          Step 3 content: your educational and professional achievement
        </Stepper.Step>

         <Stepper.Step label="Preferance Info" description="Add preferance">
          Step 4 content: Add your preferance.
        </Stepper.Step>     

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

   {allForms[active]}
      {/* <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button variant="outline" onClick={nextStep}>Next step</Button>
      </Group> */}
    </div>
</div>
  )
}

export default NewFormLayout