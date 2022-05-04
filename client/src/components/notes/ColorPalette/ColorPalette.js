import React from "react";
import ChangeColorButton from "../ChangeColorButton";
import colors from "@constants/colors";

const ColorPalette = ({ note }) => {
  return (
    <div className="color-palette">
      <ChangeColorButton note={note} />
      {Object.values(colors).map((color) => (
        <ChangeColorButton key={`${color}-button`} color={color} note={note} />
      ))}
    </div>
  );
};

export default ColorPalette;
