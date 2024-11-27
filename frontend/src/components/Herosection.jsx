import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import CustomSelect from "./CustomSelect";
import "../Store/data.json";
import { useState, useRef } from "react";
import HeroSection from "../images/herosection.png";
import HeroSection2 from "../images/herosection2.jpg";
import HeroSection3 from "../images/herosection3.jpg";
import Underline from "../images/underline.png";
import { useDispatch } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import {
  setAgeFrom,
  setAgeto,
  setCaste,
  setLetsBegin,
  setSearchingFor,
} from "../Store/features/searchFromHome";
import { Button, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

const images = [
  {
    img: HeroSection,
  },
  {
    img: HeroSection2,
  },
  {
    img: HeroSection3,
  },
];

const Herosection = () => {
  const [currentImage, setCurrentImage] = useState(images[0].img); //state for background image

  const partner = useRef();
  const match = useRef();
  const soulmate = useRef();

  //changing images of background on repeat
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.findIndex(
          (image) => image.img === prevImage
        );
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex].img;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const partnersplit = new SplitType(partner.current);
    const matchsplit = new SplitType(match.current);
    const soulmatesplit = new SplitType(soulmate.current);
    const tl = gsap.timeline({
      repeat: -1, // Repeat indefinitely
      yoyo: true, // Reverses the animation on repeat
    });

    tl.to(partnersplit.chars, {
      // rotateX: "120deg",
      delay: 1,
      duration: 1,
      opacity: 0,
      stagger: 0.05,
    });

    tl.fromTo(
      matchsplit.chars,
      {
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        stagger: 0.05,
      }
    ).to(matchsplit.chars, {
      delay: 0.5,
      // rotateX: "120deg",
      opacity: 0,
      duration: 1,
      stagger: 0.05,
    });
    tl.fromTo(
      soulmatesplit.chars,
      {
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        stagger: 0.05,
      }
    ).to(matchsplit.chars, {
      delay: 0.5,
      // rotateX: "120deg",
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
    });
  });
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    searching_for: "",
    // looking_for: "",
    agefrom: "",
    ageto: "",
    caste: "",
  });
  const navigate = useNavigate();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

  useEffect(() => {
    dispatch(setSearchingFor(""));
    dispatch(setAgeFrom(""));
    dispatch(setAgeto(""));
    dispatch(setCaste(""));
  }, []);
  const handleSearchingChange = (value) => {
    setValues({ ...values, searching_for: value });
    dispatch(setSearchingFor(value.value));
  };

  const handleAgeFrom = (value) => {
    setValues({ ...values, agefrom: value });
    dispatch(setAgeFrom(value.value));
  };

  const handleAgeTo = (value) => {
    setValues({ ...values, ageto: value });
    dispatch(setAgeto(value.value));
  };

  const handleCaste = (value) => {
    setValues({ ...values, caste: value });
    dispatch(setCaste(value.value));
  };

  const handleSearch = () => {
    if (
      !values.searching_for &&
      !values.agefrom &&
      !values.ageto &&
      !values.caste
    ) {
      return showNotification({
        title: "Please fill all fields 😷",
      });
    }

    dispatch(setLetsBegin(true));
    navigate("/home/main/letsBegin");
  };
  console.log(values);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${currentImage})` }}
        className="hero-section relative overflow-hidden  bg-no-repeat bg-center bg-cover bg-zinc-900 bg-opacity-80 bg-blend-overlay pt-[3rem] w-full mx-auto md:h-screen h-[87vh]"
      >
        {/* <div id="overlay"> */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:top-[18em] 5xl:top-1/2 md:top-[10em] top-[6em] text-center whitespace-nowrap text-white font-poppins ">
          <h1 className="font-bold font-poppins md:text-[64px]   sm:text-5xl text-3xl md:leading-[64px] ">
            We Find You The
          </h1>
          <h1 className="font-bold md:text-[64px] sm:text-5xl text-3xl md:leading-[64px] py-2 absolute sm:left-20">
            Best
            <span
              className="absolute md:left-40 sm:left-32 left-20 text-[#EB4566]"
              ref={partner}
            >
              Partner
            </span>
          </h1>
          <h1
            className="font-extrabold md:text-[64px] sm:text-5xl text-3xl md:leading-[64px] py-2 absolute md:left-60 sm:left-52 left-20 md:top-16 sm:top-12 text-[#EB4566] "
            ref={match}
          >
            Match
          </h1>
          <h1
            className="font-extrabold md:text-[64px] sm:text-5xl text-3xl md:leading-[64px] py-2 absolute md:left-60 sm:left-52 left-20 md:top-16 sm:top-12 text-[#EB4566]"
            ref={soulmate}
          >
            Soulmate
          </h1>

          {/* underscore line */}
          <img
            src={Underline}
            alt="underline"
            className="absolute md:left-60 sm:left-44 md:top-36 sm:top-24 top-[5em] left-[5em] sm:w-60 w-36 "
          />
        </div>

        {/* find your partner box */}
        <div className="absolute lg:top-[60%] top-[44%] left-1/2 -translate-x-1/2 lg:w-screen md:w-[46em] sm:w-[40em] w-[19.5em] h-[30%] bg-transparnet flex justify-center items-center  mt-5">
          <div className=" bg-gradient-to-b from-[#EB4566] to-[#9F1632]  w-[900px] border border-gray-600 pb-4 mb-4 md:mb-4 rounded-3xl flex flex-col items-center ">
            <p className="text-xl lg:text-xl 2xl:text-2xl font-semibold text-white py-4">
              Find Your Match Today
            </p>
            <div className="middlehero">
              <div className="input1 ipt">
                <label className="lbl">Searching For</label>
                <CustomSelect
                  onChange={handleSearchingChange}
                  name="searching_for"
                  value={values.searching_for}
                  options={[
                    { value: "man", label: "Man" },
                    { value: "Woman", label: "Woman" },
                  ]}
                />
              </div>
              {/* 
                <div className="input2 ipt">
                  <label className="lbl">I'm looking for a</label>
                  <CustomSelect
                    setValues={setValues}
                    name="looking_for"
                    value={values}
                    options={[
                      { value: "Men", label: "Men" },
                      { value: "Women", label: "Women" },
                      { value: "Widow", label: "Widow" },
                      { value: "Naver Married", label: "Naver Married" },
                    ]}
                  />
                </div> */}

              <div className="age">
                <div className="input3 ipt">
                  <label className="lbl">Age</label>
                  <CustomSelect
                    onChange={handleAgeFrom}
                    name="agefrom"
                    value={values.agefrom}
                    options={[
                      { value: 22, label: 22 },
                      { value: 23, label: 23 },
                      { value: 24, label: 24 },
                      { value: 25, label: 25 },
                      { value: 26, label: 26 },
                      { value: 27, label: 27 },
                    ]}
                  />
                </div>

                <div className="input4 ipt">
                  <label className="lbl ms-2">to</label>
                  <CustomSelect
                    onChange={handleAgeTo}
                    name="ageto"
                    value={values.ageto}
                    className="Age-input4"
                    options={[
                      { value: 22, label: 22 },
                      { value: 23, label: 23 },
                      { value: 24, label: 24 },
                      { value: 25, label: 25 },
                      { value: 26, label: 26 },
                      { value: 27, label: 27 },
                    ]}
                  />
                </div>
              </div>

              <div className="input5 ipt">
                <label className="lbl">Caste</label>
                <CustomSelect
                  onChange={handleCaste}
                  name="caste"
                  value={values.caste}
                  options={[
                    { value: "Tharu", label: "Tharu" },
                    { value: "Brahmin", label: "Brahmin" },
                    { value: "chhetri", label: "Chhetri" },
                    { value: "Magar", label: "Magar" },
                    { value: "Rai", label: "Rai" },
                    { value: "Limbu", label: "Limbu" },
                    { value: "Sherpa", label: "Sherpa" },
                  ]}
                />
              </div>
              <Group align="end">
                <button
                  onClick={handleSearch}
                  size={largeDesktop ? "lg" : mediumDesktop ? "sm" : "md"}
                  className="relative rounded-lg border border-white mx-auto mt-2 text-white whitespace-nowrap px-4 py-2 hover:bg-primary duration-300 ease-in-out"
                >
                  Let's Begin
                </button>
              </Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Herosection;
