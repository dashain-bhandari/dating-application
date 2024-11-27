import React, { useEffect } from "react";
import "../styles/Model.css";
const Model = ({ clickedImg, handleRotationRight, setClickedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };
  useEffect(() => {
    document.body.classList.add("body-class");
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("body-class");
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="gallery-overlay" onClick={handleClick}>
        <img src={clickedImg} alt="biggerpic" />
        <span className="dismiss" onClick={handleClick}>
          x
        </span>
        <div className="overlay-arrows-left" onClick={handleRotationRight}>
          <i class="bi bi-arrow-left"></i>
        </div>
        <div className="overlay-arrows-right" onClick={handleRotationRight}>
          <i class="bi bi-arrow-right"></i>
        </div>
      </div>
    </>
  );
};

export default Model;
