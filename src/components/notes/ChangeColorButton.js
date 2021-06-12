import React from "react";

const ChangeColorButton = ({ color }) => {
  return (
    <button
      className="color-button"
      style={
        color
          ? { background: `${color}` }
          : { background: "white", border: "2px solid #ccc" }
      }
    ></button>
  );
};

export default ChangeColorButton;
