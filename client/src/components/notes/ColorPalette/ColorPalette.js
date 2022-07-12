import React from "react";
import ChangeColorButton from "../ChangeColorButton";
import colors from "@constants/colors";
import styles from "./ColorPalette.module.scss";
import PropTypes from "prop-types";
import OutsideAlerter from "@components/wrappers/OutsideAlerter/OutsideAlerter";

const ColorPalette = ({ setIsColorPaletteOpen, changeColor }) => {
  return (
    <OutsideAlerter onClickOutside={() => setIsColorPaletteOpen(false)}>
      <div className={styles.colorPalette}>
        <ChangeColorButton changeColor={changeColor} />
        {Object.values(colors).map((color) => (
          <ChangeColorButton
            key={`${color}-button`}
            color={color}
            changeColor={changeColor}
          />
        ))}
      </div>
    </OutsideAlerter>
  );
};

ColorPalette.propTypes = {
  changeColor: PropTypes.func.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
};

export default ColorPalette;
