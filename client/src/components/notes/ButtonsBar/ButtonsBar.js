import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ColorPalette from "@components/notes/ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";
import { useNotesContext } from "@contexts/NotesContext";
import IconButton from "@components/common/IconButton";

const ButtonsBar = ({
  note,
  isVisible,
  changeColor,
  isAdding = false,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
  onArchiveClick,
}) => {
  const { openDeletingModal } = useNotesContext();

  const handleColorPaletteClick = (e) => {
    e.preventDefault();
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  const handleDeleteClick = () => {
    openDeletingModal(note);
  };

  return (
    <div className={`${styles.buttonsBar} ${isVisible && styles.visible}`}>
      {!isAdding && (
        <IconButton onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      )}
      <div className={styles.paletteContainer}>
        <IconButton onClick={handleColorPaletteClick}>
          <FontAwesomeIcon icon={faPalette} />
        </IconButton>
        {isColorPaletteOpen && (
          <ColorPalette
            changeColor={changeColor}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
          />
        )}
      </div>
      <IconButton onClick={onArchiveClick}>
        <FontAwesomeIcon icon={faInbox} />
      </IconButton>
    </div>
  );
};

ButtonsBar.propTypes = {
  note: PropTypes.object,
  isVisible: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
  isAdding: PropTypes.bool,
  isColorPaletteOpen: PropTypes.bool.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
};

export default ButtonsBar;
