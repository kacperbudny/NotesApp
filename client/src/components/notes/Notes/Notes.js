import React, { useContext, createRef } from "react";
import NotesContext from "@contexts/NotesContext";
import Note from "../Note";
import styles from "./Notes.module.scss";
import { XMasonry, XBlock } from "react-xmasonry";

const Notes = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div className={styles.notesContainer}>
      {notes.length > 0 ? (
        <XMasonry targetBlockWidth={300}>
          {notes
            .sort((a, b) => b.displayOrder - a.displayOrder)
            .map((note) => (
              <XBlock key={note._id} width={1}>
                <Note note={note} ref={createRef()} />
              </XBlock>
            ))}
        </XMasonry>
      ) : (
        <p className={styles.noNotes}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </div>
  );
};

export default Notes;
