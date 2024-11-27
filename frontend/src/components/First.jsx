import React from "react";
import "../App.css";
const First = (props) => {
  return (
    <>
      <div className="first">
        <p>{props.text}</p>
      </div>
    </>
  );
};

export default First;
