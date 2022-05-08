import React, { useContext, createRef } from "react";
import NotesContext from "@contexts/NotesContext";
import Note from "../Note";
import styles from "./Notes.module.scss";
import AnimateNotes from "../AnimateNotes";

const Notes = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div className={styles.notesContainer}>
      <div className={styles.centeringContainer}>
        {notes.length > 0 ? (
          <AnimateNotes>
            {notes
              .sort((a, b) => b.displayOrder - a.displayOrder)
              .map((note) => (
                <Note key={note._id} note={note} ref={createRef()} />
              ))}
          </AnimateNotes>
        ) : (
          <p className={styles.noNotes}>
            There are no notes. Maybe it's time to add some?
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
