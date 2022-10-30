import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ColorPalette from "../ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";
import useNotes from "@hooks/useNotes";
import IconButton from "@components/common/IconButton";

const ButtonsBar = ({
  note,
  isHovered: isParentHovered = true,
  changeColor,
  isAdding = false,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
  archive,
}) => {
  const { openDeletingModal } = useNotes();

  const handleColorPaletteClick = (e) => {
    e.preventDefault();
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  const handleArchiveClick = () => {
    archive();
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
        <IconButton
          onClick={() => {
            openDeletingModal(note);
          }}
        >
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
      <IconButton onClick={handleArchiveClick}>
        <FontAwesomeIcon icon={faInbox} />
      </IconButton>
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
  archive: PropTypes.func.isRequired,
};

export default ButtonsBar;
