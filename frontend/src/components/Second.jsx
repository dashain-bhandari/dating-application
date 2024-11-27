import React from "react";
import "../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import  { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
const Second = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <>
      <div className="second">
        <div className="container">
          <h6>Choose Your best Matches through tags</h6>
          <div className="secondborder">
            <div className="row">
              {isTabletOrMobile ? (
                <div
                  className="nav nav-pills "
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <p
                    className="nav-link active cool  "
                    id="v-pills-Religion-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-Religion"
                    aria-controls="v-pills-Religion"
                  >
                    Religion
                  </p>

                  <p
                    className="nav-link cool"
                    id="v-pills-Caste-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-Caste"
                    aria-controls="v-pills-Caste"
                  >
                    Caste
                  </p>

                  <p
                    className="nav-link cool"
                    id="v-pills-City-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-City"
                    aria-controls="v-pills-City"
                  >
                    City
                  </p>

                  <p
                    className="nav-link cool"
                    id="v-pills-Status-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-Status"
                    aria-controls="v-pills-Status"
                  >
                    Status
                  </p>

                  <p
                    className="nav-link cool"
                    id="v-pills-Country-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-Country"
                    aria-controls="v-pills-Country"
                  >
                    Country
                  </p>

                  <p
                    className="nav-link cool"
                    id="v-pills-Occupation-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-Occupation"
                    aria-controls="v-pills-Occupation"
                  >
                    Occupation
                  </p>
                </div>
              ) : (
                <div
                  className="nav nav-pills "
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <Swiper
                    slidesPerView={5}
                    loopedSlides={6}
                    spaceBetween={0}
                    centeredSlides={true}
                    slideToClickedSlide={true}
                    loop={true}
                    breakpoints={{
                      400: {
                        slidesPerView: 3,
                        loopedSlides: 4,
                      },
                      200: {
                        slidesPerView: 2,
                        loopedSlides: 3,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <p
                        className="nav-link active"
                        id="v-pills-Religion-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-Religion"
                        aria-controls="v-pills-Religion"
                      >
                        Religion
                      </p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <p
                        className="nav-link"
                        id="v-pills-Caste-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-Caste"
                        aria-controls="v-pills-Caste"
                      >
                        Caste
                      </p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <p
                        className="nav-link"
                        id="v-pills-City-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-City"
                        aria-controls="v-pills-City"
                      >
                        City
                      </p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <p
                        className="nav-link"
                        id="v-pills-Status-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-Status"
                        aria-controls="v-pills-Status"
                      >
                        Status
                      </p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <p
                        className="nav-link"
                        id="v-pills-Country-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-Country"
                        aria-controls="v-pills-Country"
                      >
                        Country
                      </p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <p
                        className="nav-link"
                        id="v-pills-Occupation-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-Occupation"
                        aria-controls="v-pills-Occupation"
                      >
                        Occupation
                      </p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              )}
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-Religion"
                  role="tabpanel"
                  aria-labelledby="v-pills-Religion-tab"
                  tabIndex="0"
                >
                  <div className="religion">
                    <button>Hindu</button>
                    <button>Muslim</button>
                    <button>Christian</button>
                    <button>Buddhist</button>
                    <button> Sikh</button>
                    <button>Kirat</button>
                    <button>Prakriti</button>
                    <button>Bon</button>
                    <button>Jainism</button>
                    <button>Bahai</button>
                    <button>View More</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-Caste"
                  role="tabpanel"
                  aria-labelledby="v-pills-Caste-tab"
                  tabIndex="0"
                >
                  {" "}
                  <div className="religion">
                    <button>Bahun</button>
                    <button>Chhetri</button>
                    <button>Thakuri</button>
                    <button>Kami</button>
                    <button>Damai</button>
                    <button>Sarki</button>
                    <button>Badi</button>
                    <button>Rajput</button>
                    <button>Sunar</button>
                    <button>Kushwaha</button>
                    <button>Yadav</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-City"
                  role="tabpanel"
                  aria-labelledby="v-pills-City-tab"
                  tabIndex="0"
                >
                  {" "}
                  <div className="religion">
                    <button>Kathmandu</button>
                    <button>Pokhara</button>
                    <button>Birjung</button>
                    <button>Biratnagar</button>
                    <button>Lalitpur</button>
                    <button>Bharatpur</button>
                    <button>Dharan</button>
                    <button>Janakpur</button>
                    <button>Nepalgunj</button>
                    <button>Patan</button>
                    <button>Barahathawa</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-Status"
                  role="tabpanel"
                  aria-labelledby="v-pills-Status-tab"
                  tabIndex="0"
                >
                  {" "}
                  <div className="religion">
                    <button>Hindu</button>
                    <button>Muslim</button>
                    <button>Christian</button>
                    <button>Buddhist</button>
                    <button>Sikh</button>
                    <button>Kirat</button>
                    <button>Prakriti</button>
                    <button>Bon</button>
                    <button>Jainism</button>
                    <button>Bahai</button>
                    <button>View More</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-Country"
                  role="tabpanel"
                  aria-labelledby="v-pills-Country-tab"
                  tabIndex="0"
                >
                  {" "}
                  <div className="religion ">
                    <button>Nepal</button>
                    <button>India</button>
                    <button>Bhutan</button>
                    <button>Shrilanka</button>
                    <button>Chaina</button>
                    <button>Australia</button>
                    <button>Canada</button>
                    <button>Pakistan</button>
                    <button>America</button>
                    <button>Norway</button>
                    <button>UK</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-Occupation"
                  role="tabpanel"
                  aria-labelledby="v-pills-Occupation-tab"
                  tabIndex="0"
                >
                  {" "}
                  <div className="religion">
                    <button>Web Developer</button>
                    <button>Teacher</button>
                    <button>Farmer</button>
                    <button>Business man</button>
                    <button>BM</button>
                    <button>Project Manager</button>
                    <button>Sales Manager</button>
                    <button>Doctor</button>
                    <button>CA</button>
                    <button>Graphics Designer</button>
                    <button>player</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
