import React from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "../ButtonsBar";
import styles from "./Note.module.scss";

const Note = ({ note, onEdit }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div
      ref={hoverRef}
      className={styles.note}
      style={{ background: `${note.color}` }}
    >
      <div className={styles.noteContent} onClick={() => onEdit(note._id)}>
        {note.name || note.content ? (
          <div>
            <h3>{note.name}</h3>
            <p>{note.content}</p>
          </div>
        ) : (
          <p className={styles.emptyNote}>Empty note</p>
        )}
      </div>
      <ButtonsBar note={note} isHovered={isHovered} />
    </div>
  );
};

export default Note;
