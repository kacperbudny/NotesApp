import React from "react";
import ChangeColorButton from "@components/notes/ChangeColorButton";
import colors from "@constants/colors";
import styles from "./ColorPalette.module.scss";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

const ColorPalette = ({ setIsColorPaletteOpen, changeColor }) => {
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsColorPaletteOpen(false);
      }}
    >
      <div className={styles.colorPalette}>
        {Object.values(colors).map((color) => (
          <ChangeColorButton
            key={`${color}-button`}
            color={color}
            changeColor={changeColor}
          />
        ))}
      </div>
    </OutsideClickHandler>
  );
};

ColorPalette.propTypes = {
  changeColor: PropTypes.func.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
};

export default ColorPalette;
