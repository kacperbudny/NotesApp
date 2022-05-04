import React from "react";
import ChangeColorButton from "../ChangeColorButton";
import colors from "@constants/colors";
import styles from "./ColorPalette.module.scss";

const ColorPalette = ({ note, isHovered }) => {
  return (
    <div className={`${styles.colorPalette} ${isHovered && styles.visible}`}>
      <ChangeColorButton note={note} />
      {Object.values(colors).map((color) => (
        <ChangeColorButton key={`${color}-button`} color={color} note={note} />
      ))}
    </div>
  );
};

export default ColorPalette;
