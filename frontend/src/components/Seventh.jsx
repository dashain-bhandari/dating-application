import React from "react";
import "../App.css";
import VerticalSlider from "./VerticalSlider";
const Seventh = () => {
  return (
    <>
      <div className="seventh">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <h3 className="txt">Testimonials</h3>
            </div>
            <div className="col-lg-9 col-sm-12 ">
              <div className="upcarousel">
                <VerticalSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seventh;
