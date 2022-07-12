import React, { useContext, forwardRef } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "../ButtonsBar";
import styles from "./Note.module.scss";
import NotesContext from "@contexts/NotesContext";
import PropTypes from "prop-types";
import { NOTE_WIDTH, NOTE_MARGIN } from "@constants/noteDimensions";

const Note = forwardRef(({ note }, ref) => {
  const [hoverRef, isHovered] = useHover();
  const { openEditingModal, changeNoteColor } = useContext(NotesContext);

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
          margin: NOTE_MARGIN,
          width: NOTE_WIDTH,
        }}
      >
        <div
          className={styles.noteContent}
          onClick={() => openEditingModal(note._id)}
        >
          {note.name || note.content ? (
            <div>
              <h3>{note.name}</h3>
              <p>{note.content}</p>
            </div>
          ) : (
            <p className={styles.emptyNote}>Empty note</p>
          )}
        </div>
        <ButtonsBar note={note} isHovered={isHovered} changeColor={setColor} />
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
