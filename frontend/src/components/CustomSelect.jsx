import React, { useState } from "react";
import Select from "react-select";

const CustomSelect = ({ options, value, onChange }) => {
  const colorStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: styles.isFocused ? "#f21d3d" : "#f21d3d",
      boxShadow: styles.isFocused ? "0 0 0 transparent" : "0 0 0 transparent",
      "&:hover": {
        borderColor: styles.isFocused ? "#f21d3d" : "#f21d3d",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: data.color,
        "&:hover": { backgroundColor: "#f21d3d67" },
      };
    },
  };

  return (
    <>
      <Select
        menuPlacement="top"
        options={options}
        defaultvalue={value}
        onChange={onChange}
        styles={colorStyles}
        value={value}
        className="select w-[100%] lg:w-[150px] rounded-2xl border-none outline-none"
      />
    </>
  );
};

export default CustomSelect;
