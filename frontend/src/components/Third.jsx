import React from "react";
import "../App.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import s1 from "../images/second_c.png";
import s2 from "../images/third_c.png";
import s3 from "../images/second_c.png";
const Third = () => {
  return (
    <>
      <div className="third">
        <div className="container-fluid px-0">
          <div className="row">
            <OwlCarousel
              className="owl-theme"
              items={1}
              autoplay
              autoplaySpeed={0.3}
              dots
              loop
            >
              <div className="item">
                <img src={s1} alt="cover1" />
              </div>
              <div className="item">
                <img src={s2} alt="cover2" />
              </div>
              <div className="item">
                <img src={s3} alt="cover3" />
              </div>
              <div className="item">
                <img src={s2} alt="cover4" />
              </div>
            </OwlCarousel>

            <div className="third_cover"></div>
            <div className="third_caption">
              <h3>WE HELPED THEM FIND THEIR MATACH</h3>
              <h2>
                Join us and lets find <br /> the best match for you <br /> too.
              </h2>
              <div>
                <button className="px-6 py-2 border border-white text-white rounded-full mt-2">
                  Click here to find match
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Third;
