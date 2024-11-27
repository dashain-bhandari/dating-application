import React, { useEffect, useState } from "react";
import "../styles/Homebtn.css";
const Homebtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const listenToScroll = () => {
    let heightToHidden = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  });
  return (
    <>
      {isVisible && (
        <div className="homebtn !z-50 md:flex hidden" onClick={goToBtn}>
          <i className="bi bi-house-up"></i>
        </div>
      )}
    </>
  );
};

export default Homebtn;
