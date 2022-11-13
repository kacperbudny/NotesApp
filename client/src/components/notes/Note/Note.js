import React, { useState } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "../ButtonsBar";
import styles from "./Note.module.scss";
import PropTypes from "prop-types";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";

const Note = ({ note }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const {
    openEditingModal,
    changeNoteColor,
    activeNote,
    toggleNoteArchived,
    toggleNotePinned,
  } = useNotesContext();

  const handleClick = () => {
    openEditingModal(note._id);
  };

  const setColor = (color) => {
    return changeNoteColor(color, note);
  };

  const handleArchive = () => {
    toggleNoteArchived(note);
  };

  const handlePin = () => {
    toggleNotePinned(note);
  };

  const isActiveNote = activeNote && activeNote._id === note._id;

  return (
    <div
      ref={hoverRef}
      className={`${styles.note} ${isActiveNote && styles.hidden}`}
      style={{
        background: `${note.color}`,
      }}
    >
      <div className={styles.noteContent} onClick={handleClick}>
        <PinButton isHovered={isHovered} note={note} onClick={handlePin} />
        {note.name || note.content ? (
          <div>
            <h3>{note.name}</h3>
            <p>{note.content}</p>
          </div>
        ) : (
          <p className={styles.emptyNote}>Empty note</p>
        )}
      </div>
      <ButtonsBar
        note={note}
        isHovered={isHovered}
        changeColor={setColor}
        isColorPaletteOpen={isColorPaletteOpen}
        setIsColorPaletteOpen={setIsColorPaletteOpen}
        archive={handleArchive}
      />
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Note;
