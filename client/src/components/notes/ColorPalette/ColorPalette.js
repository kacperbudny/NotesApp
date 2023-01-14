import React from "react";
import ChangeColorButton from "@components/notes/ChangeColorButton";
import COLORS from "@constants/colors";
import PropTypes from "prop-types";
import FloatingBox from "@components/common/FloatingBox";
import styles from "./ColorPalette.module.scss";

const ColorPalette = ({ setIsColorPaletteOpen, changeColor }) => {
  const handleOutsideClick = () => {
    setIsColorPaletteOpen(false);
  };

  return (
    <FloatingBox onOutsideClick={handleOutsideClick}>
      <div className={styles.container}>
        {Object.values(COLORS).map((color) => (
          <ChangeColorButton
            key={`${color}-button`}
            color={color}
            changeColor={changeColor}
          />
        ))}
      </div>
    </FloatingBox>
  );
};

ColorPalette.propTypes = {
  changeColor: PropTypes.func.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
};

export default ColorPalette;
