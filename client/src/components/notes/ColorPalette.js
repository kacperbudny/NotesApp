import React from "react";
import ChangeColorButton from "./ChangeColorButton";
import colors from "../../utils/constants/colors";

const ColorPalette = ({ note, changeNoteColor }) => {
  return (
    <div className="color-palette">
      <ChangeColorButton note={note} changeNoteColor={changeNoteColor} />
      {Object.values(colors).map((color) => (
        <ChangeColorButton
          key={`${color}-button`}
          color={color}
          note={note}
          changeNoteColor={changeNoteColor}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
