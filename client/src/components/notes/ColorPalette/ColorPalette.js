import React from "react";
import ChangeColorButton from "@components/notes/ChangeColorButton";
import colors from "@constants/colors";
import PropTypes from "prop-types";
import FloatingBox from "@components/common/FloatingBox";

const ColorPalette = ({ setIsColorPaletteOpen, changeColor }) => {
  const handleOutsideClick = () => {
    setIsColorPaletteOpen(false);
  };

  return (
    <FloatingBox onOutsideClick={handleOutsideClick}>
      {Object.values(colors).map((color) => (
        <ChangeColorButton
          key={`${color}-button`}
          color={color}
          changeColor={changeColor}
        />
      ))}
    </FloatingBox>
  );
};

ColorPalette.propTypes = {
  changeColor: PropTypes.func.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
};

export default ColorPalette;
