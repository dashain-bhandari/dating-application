import React from "react";
import ringLogo from "../images/doubleRing.png";
import testimonial1 from "../images/testimonial1.png";
import testimonial2 from "../images/testimonial2.png";
import testimonial3 from "../images/testimonial3.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import petals from "../images/petals.png";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiStarSFill } from "react-icons/ri";
import Quotes from "../images/Quotes.png"
import { textanimate,testimonialAnimation } from "./animation/Animation";
import { motion } from "framer-motion";



// Testimonial data array
const testimonials = [
  {
    id: 1,
    text:"OurLifePartner exceeded our expectations in every way possible. We never thought we'd find our perfect match online, but OLP proved us wrong.  If you're looking for your life partner, look no further than OLP!",
    name: "Mr. & Mrs. Singh",
    title: "Dynamic Functionality Designer",
    image: testimonial1,
    rating:5,

  },
  {
    id: 2,
    text: "OLP made finding love feel like a fairytale. From the moment we connected on the platform, we knew we had something special. OLP's user-friendly interface and personalized matches made our journey to marriage seamless.",
    name: "Mr. & Mrs. Khadka",
    title: "Dynamic Functionality Designer",
    image: testimonial2,
    rating:5,

  },
  {
    id: 3,
    text:"OurLifePartner exceeded our expectations in every way possible. We never thought we'd find our perfect match online, but OLP proved us wrong.  If you're looking for your life partner, look no further than OLP!",
    name: "Mr. & Mrs. Karki",
    title: "Dynamic Functionality Designer",
    image: testimonial3,
    rating:5,
  },
  {
    id: 4,
    text: "OLP made finding love feel like a fairytale. From the moment we connected on the platform, we knew we had something special. OLP's user-friendly interface and personalized matches made our journey to marriage seamless.",
    name: "Mr. & Mrs. Karki",
    title: "Dynamic Functionality Designer",
    image: testimonial3,
    rating:5,
  },
];

export default function NewTestimonial() {
  return (
    <div className="relative md:py-10 py-4 bg-light max-w-screen-2xl mx-auto z-0">
      <motion.div 
      initial="hidden"
      whileInView="visible"
      variants={textanimate}
      transition={{ duration: 0.5 }}
      className=" flex justify-center items-center pb-8">
        <span>
          <img src={ringLogo} alt="ringLogo" />
        </span>
        <p className="md:text-2xl font-bold  ">
          We <span className="text-[#D22D3E] ">Build</span> Trust ?
        </p>
        <span>
          <img src={ringLogo} alt="ringLogo" />
        </span>
      </motion.div>

       {/* petals on the screen */}
       <figure className="md:block absolute hidden z-10 right-20 top-4">
      <img src={petals} alt="" />
      </figure>


      <Swiper
          // modules={[FreeMode, Pagination]}

        // slidesPerView={3}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
       <div className="">
       {testimonials.map((data,index) => (
          <SwiperSlide key={index} >
           <div
            className={` text-white ${index % 2 === 0?"flex flex-col-reverse":"grid"}`}
           >
           <figure className='max-w-[500px] max-h-[350px] relative'>
              <img src={data.image} alt="couples-img" className='w-full h-full' />
              <div className='absolute bottom-10 left-1/2 -translate-x-1/2 tracking-wide'>
                  <h2 className='font-bold xl:text-[50px] md:text-[30px] text-xl whitespace-nowrap'>{data.name}</h2>
                  <p className='whitespace-nowrap text-gray-200 sm:py-2'>{data.title}</p>
              </div>
              </figure>
                <div className={` ${index % 2 === 1?"bg-gradient-to-r from-[#EB4566] to-[#9F1632] text-white":"bg-white text-black"} relative max-w-[500px] h-[350px]  px-6 py-8 font-extralight`}>
                    <h2 className='text-right uppercase font-light'>What they say about us?</h2>
                    <p className='max-w-[330px] text-center mx-auto py-8 sm:text-l text-sm font-medium'>{data.text}</p>
                    <div className='flex justify-center text-2xl text-yellow-400'>
                    {Array.from({ length: data.rating }).map((_, index) => (
                        <RiStarSFill key={index} />
                    ))}
                    </div>
                   <img src={Quotes} alt="quote-left" className='md:w-20 sm:w-16 w-8 absolute left-10 bottom-16' />
                   <img src={Quotes} alt="quote-right" className='md:w-20 sm:w-16 w-8 absolute right-6 top-12' />
                </div>
           </div>
          </SwiperSlide>
        ))}
       </div>
      </Swiper>
    </div>
  );
}
