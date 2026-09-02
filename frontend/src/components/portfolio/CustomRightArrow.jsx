import arrow2 from "../../assets/img/arrow2.svg";
import React from "react";


const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{
          position: "absolute",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src={arrow2}
          alt="Right Arrow"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
    );
  };

  export default CustomRightArrow;