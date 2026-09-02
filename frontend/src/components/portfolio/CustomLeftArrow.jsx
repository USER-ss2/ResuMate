
import arrow1 from "../../assets/img/arrow1.svg";

import React from "react";

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: "10px",
        zIndex: 1000,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <img
        src={arrow1}
        alt="Left Arrow"
        style={{ width: "30px", height: "30px" }}
      />
    </button>
  );
};

export default CustomLeftArrow;