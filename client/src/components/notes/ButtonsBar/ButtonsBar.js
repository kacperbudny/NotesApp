import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import NotesContext from "@contexts/NotesContext";
import ColorPalette from "../ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";

const ButtonsBar = ({ note, isHovered: isParentHovered }) => {
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
      <button
        className={styles.paletteContainer}
        onClick={() => setIsColorPaletteOpen(true)}
      >
        <FontAwesomeIcon icon={faPalette} />
        {isColorPaletteOpen && (
          <ColorPalette
            note={note}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
          />
        )}
      </button>
    </div>
  );
};

ButtonsBar.propTypes = {
  note: PropTypes.object.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default ButtonsBar;
