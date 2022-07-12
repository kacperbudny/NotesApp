import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import NotesContext from "@contexts/NotesContext";
import ColorPalette from "../ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";

const ButtonsBar = ({ note, isHovered: isParentHovered, changeColor }) => {
  const { openDeletingModal } = useContext(NotesContext);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  return (
    <div
      className={styles.buttonsBar}
      style={{
        opacity: `${isParentHovered || isColorPaletteOpen ? "100%" : "0"}`,
      }}
    >
      <button
        className={styles.iconContainer}
        onClick={() => openDeletingModal(note)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <div className={styles.paletteContainer}>
        <button
          className={styles.iconContainer}
          onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
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

ButtonsBar.propTypes = {
  note: PropTypes.object.isRequired,
  isHovered: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
};

export default ButtonsBar;
