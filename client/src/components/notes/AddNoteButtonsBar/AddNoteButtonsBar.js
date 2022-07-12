import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ColorPalette from "../ColorPalette";
import styles from "./AddNoteButtonsBar.module.scss";
import PropTypes from "prop-types";

const AddNoteButtonsBar = ({ changeColor }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  const handleColorPaletteClick = (e) => {
    e.preventDefault();
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  return (
    <div className={styles.buttonsBar}>
      <div className={styles.paletteContainer}>
        <button
          className={styles.iconContainer}
          onClick={handleColorPaletteClick}
        >
          <FontAwesomeIcon icon={faPalette} />
        </button>
        {isColorPaletteOpen && (
          <ColorPalette
            changeColor={changeColor}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
          />
        )}
      </div>
    </div>
  );
};

AddNoteButtonsBar.propTypes = {
  changeColor: PropTypes.func.isRequired,
};

export default AddNoteButtonsBar;
