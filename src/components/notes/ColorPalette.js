import React from "react";
import ChangeColorButton from "./ChangeColorButton";
import colors from "../../utils/colors";

const ColorPalette = ({ note, changeNoteColor }) => {
  return (
    <div className="color-palette">
      <ChangeColorButton note={note} changeNoteColor={changeNoteColor} />
      <ChangeColorButton
        color={colors.red}
        note={note}
        changeNoteColor={changeNoteColor}
      />
      <ChangeColorButton
        color={colors.orange}
        note={note}
        changeNoteColor={changeNoteColor}
      />
      <ChangeColorButton
        color={colors.yellow}
        note={note}
        changeNoteColor={changeNoteColor}
      />
      <ChangeColorButton
        color={colors.green}
        note={note}
        changeNoteColor={changeNoteColor}
      />
      <ChangeColorButton
        color={colors.blue}
        note={note}
        changeNoteColor={changeNoteColor}
      />
      <ChangeColorButton
        color={colors.purple}
        note={note}
        changeNoteColor={changeNoteColor}
      />
      <ChangeColorButton
        color={colors.pink}
        note={note}
        changeNoteColor={changeNoteColor}
      />
    </div>
  );
};

export default ColorPalette;
