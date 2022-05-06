import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import NotesContext from "@contexts/NotesContext";
import ColorPalette from "../ColorPalette";
import styles from "./ButtonsBar.module.scss";
import useHover from "@hooks/useHover";
import PropTypes from "prop-types";

const ButtonsBar = ({ note, isHovered: isParentHovered }) => {
  const { deleteNote } = useContext(NotesContext);
  const [hoverRef, isHovered] = useHover();

  return (
    <div
      className={styles.buttonsBar}
      style={{ opacity: `${isParentHovered ? "100%" : "0"}` }}
    >
      <div
        className={styles.iconContainer}
        onClick={() => deleteNote(note._id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
      <div ref={hoverRef} className={styles.paletteContainer}>
        <FontAwesomeIcon icon={faPalette} />
        <ColorPalette note={note} isHovered={isHovered} />
      </div>
    </div>
  );
};

ButtonsBar.propTypes = {
  note: PropTypes.object.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default ButtonsBar;
