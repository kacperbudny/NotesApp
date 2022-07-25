import React, { useContext, forwardRef, useState } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "../ButtonsBar";
import styles from "./Note.module.scss";
import NotesContext from "@contexts/NotesContext";
import PropTypes from "prop-types";

const Note = forwardRef(({ note }, ref) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const { openEditingModal, changeNoteColor, activeNote } =
    useContext(NotesContext);

  const handleClick = () => {
    openEditingModal(note._id);
  };

  const setColor = (color) => {
    return changeNoteColor(color, note);
  };

  return (
    <div ref={ref}>
      <div
        ref={hoverRef}
        className={styles.note}
        style={{
          background: `${note.color}`,
          opacity: activeNote && activeNote._id === note._id ? "0" : "1",
        }}
      >
        <div className={styles.noteContent} onClick={handleClick}>
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
        />
      </div>
    </div>
  );
});

Note.propTypes = {
  note: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Note;
