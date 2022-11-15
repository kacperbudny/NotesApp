import React, { useState } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "@components/notes/ButtonsBar";
import styles from "./Note.module.scss";
import PropTypes from "prop-types";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";

const Note = ({ note }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const { openEditingModal, updateNote, activeNote } = useNotesContext();

  const handleClick = () => {
    openEditingModal(note._id);
  };

  const handleChangeColor = (color) => {
    note.color = color;
    updateNote(note);
  };

  const handleArchive = () => {
    if (note.pinned) {
      note.pinned = false;
    }
    note.archived = !note.archived;
    updateNote(note);
  };

  const handlePin = () => {
    if (note.archived) {
      note.archived = false;
    }
    note.pinned = !note.pinned;
    updateNote(note);
  };

  const isActiveNote = activeNote && activeNote._id === note._id;

  const areButtonsVisible = isHovered || isColorPaletteOpen;

  return (
    <div
      ref={hoverRef}
      className={`${styles.note} ${isActiveNote && styles.hidden}`}
      style={{
        background: `${note.color}`,
      }}
    >
      <div className={styles.noteContent} onClick={handleClick}>
        <PinButton
          isVisible={areButtonsVisible}
          note={note}
          onClick={handlePin}
        />
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
        isVisible={areButtonsVisible}
        changeColor={handleChangeColor}
        isColorPaletteOpen={isColorPaletteOpen}
        setIsColorPaletteOpen={setIsColorPaletteOpen}
        onArchiveClick={handleArchive}
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
