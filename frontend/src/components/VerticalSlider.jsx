import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import test1 from "../images/test1.png";
import test2 from "../images/test2.png";
import test3 from "../images/test3.png";
import { Pagination } from "swiper/modules";

const VerticalSlider = () => {
  return (
    <>
      <div>
        <Swiper
          direction="horizontal"
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          navigation={true}
          className="mySwiper"
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },

            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },

            1250: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {/* <SwiperSlide>
            <div className="slidercard">
              <img src={test1} alt="" />
              <div className="slidecard_caption">
                <div className="slider_caption_title">
                  <p>Shrawan Parsai</p>
                  <div className="">
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill checked"></span>
                  </div>
                </div>
                <p>
                  <em>
                    <q>
                      This is the amazing website to find a right partner in
                      meantime
                    </q>
                    .
                  </em>
                </p>
              </div>
            </div>
          </SwiperSlide> */}

          {testimonialItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white flex flex-col justify-center items-center p-4 rounded-2xl">
                <div className="h-36 w-36">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="rounded-full"
                  />
                </div>
                <p className="font-semibold py-1">{item?.title}</p>
                <div className="">
                  <span className="bi bi-star-fill checked"></span>
                  <span className="bi bi-star-fill checked"></span>
                  <span className="bi bi-star-fill checked"></span>
                  <span className="bi bi-star-fill checked"></span>
                  <span className="bi bi-star-fill checked"></span>
                </div>
                <div className="text-center py-1">{item?.desc}</div>.
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default VerticalSlider;

const testimonialItems = [
  {
    image: test2,
    title: "Shrawan Parsai",
    desc: "This is the amazing website to find a right partner in meantime",
  },
  {
    image: test2,
    title: "Shrawan Parsai",
    desc: "This is the amazing website to find a right partner in meantime",
  },
  {
    image: test2,
    title: "Shrawan Parsai",
    desc: "This is the amazing website to find a right partner in meantime",
  },
  {
    image: test2,
    title: "Shrawan Parsai",
    desc: "This is the amazing website to find a right partner in meantime",
  },
];
