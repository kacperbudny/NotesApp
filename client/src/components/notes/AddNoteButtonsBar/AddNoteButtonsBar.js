import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ColorPalette from "../ColorPalette";
import styles from "./AddNoteButtonsBar.module.scss";
import PropTypes from "prop-types";

const AddNoteButtonsBar = ({ setColor }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  return (
    <div className={styles.buttonsBar}>
      <div className={styles.paletteContainer}>
        <button
          className={styles.iconContainer}
          onClick={() => setIsColorPaletteOpen(true)}
        >
          <FontAwesomeIcon icon={faPalette} />
        </button>
        {isColorPaletteOpen && (
          <ColorPalette
            setColor={setColor}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
          />
        )}
      </div>
    </div>
  );
};

AddNoteButtonsBar.propTypes = {
  note: PropTypes.object.isRequired,
};

export default AddNoteButtonsBar;
