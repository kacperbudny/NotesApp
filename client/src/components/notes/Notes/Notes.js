import React, { useContext } from "react";
import NotesContext from "@contexts/NotesContext";
import Note from "../Note";
import styles from "./Notes.module.scss";

const Notes = ({ onEdit }) => {
  const { notes } = useContext(NotesContext);

  return (
    <div className={styles.notes}>
      {notes.length > 0 ? (
        notes
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => <Note key={note._id} note={note} onEdit={onEdit} />)
      ) : (
        <p className={styles.noNotes}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </div>
  );
};

export default Notes;
