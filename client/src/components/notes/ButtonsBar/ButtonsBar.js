import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import NotesContext from "@contexts/NotesContext";
import ColorPalette from "../ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";

const ButtonsBar = ({
  note,
  isHovered: isParentHovered = true,
  changeColor,
  isAdding = false,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
}) => {
  const { openDeletingModal } = useContext(NotesContext);

  const handleColorPaletteClick = (e) => {
    e.preventDefault();
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  return (
    <div
      className={styles.buttonsBar}
      style={
        isAdding
          ? { opacity: "100%" }
          : {
              opacity: `${
                isParentHovered || isColorPaletteOpen ? "100%" : "0"
              }`,
            }
      }
    >
      {!isAdding && (
        <button
          className={styles.iconContainer}
          onClick={() => openDeletingModal(note)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
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

ButtonsBar.propTypes = {
  note: PropTypes.object,
  isHovered: PropTypes.bool,
  changeColor: PropTypes.func.isRequired,
  isAdding: PropTypes.bool,
  isColorPaletteOpen: PropTypes.bool.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
};

export default ButtonsBar;
