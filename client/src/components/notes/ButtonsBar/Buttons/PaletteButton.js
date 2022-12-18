import React from "react";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import ColorPalette from "@components/notes/ColorPalette";
import PropTypes from "prop-types";
import IconButtonWithFloatingBox from "@components/common/IconButtonWithFloatingBox";

const PaletteButton = ({
  isColorPaletteOpen,
  setIsColorPaletteOpen,
  onChangeColor,
}) => {
  return (
    <IconButtonWithFloatingBox
      isOpen={isColorPaletteOpen}
      setIsOpen={setIsColorPaletteOpen}
      icon={faPalette}
    >
      <ColorPalette
        changeColor={onChangeColor}
        setIsColorPaletteOpen={setIsColorPaletteOpen}
      />
    </IconButtonWithFloatingBox>
  );
};

PaletteButton.propTypes = {
  isColorPaletteOpen: PropTypes.bool.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
};

export default PaletteButton;
