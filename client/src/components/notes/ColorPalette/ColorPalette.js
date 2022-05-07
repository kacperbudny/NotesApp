import React from "react";
import ChangeColorButton from "../ChangeColorButton";
import colors from "@constants/colors";
import styles from "./ColorPalette.module.scss";
import PropTypes from "prop-types";
import OutsideAlerter from "@components/wrappers/OutsideAlerter/OutsideAlerter";

const ColorPalette = ({ note, setIsColorPaletteOpen }) => {
  return (
    <OutsideAlerter onClickOutside={() => setIsColorPaletteOpen(false)}>
      <div className={styles.colorPalette}>
        <ChangeColorButton note={note} />
        {Object.values(colors).map((color) => (
          <ChangeColorButton
            key={`${color}-button`}
            color={color}
            note={note}
          />
        ))}
      </div>
    </OutsideAlerter>
  );
};

ColorPalette.propTypes = {
  note: PropTypes.object.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
};

export default ColorPalette;
