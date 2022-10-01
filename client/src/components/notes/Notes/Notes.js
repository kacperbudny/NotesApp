import React from "react";
import Note from "../Note";
import styles from "./Notes.module.scss";
import { XMasonry, XBlock } from "react-xmasonry";
import useNotes from "@hooks/useNotes";

const Notes = () => {
  const { notes } = useNotes();

  return (
    <main className={styles.notesContainer}>
      {notes.length > 0 ? (
        <XMasonry targetBlockWidth={300}>
          {notes
            .sort((a, b) => b.displayOrder - a.displayOrder)
            .map((note) => (
              <XBlock key={note._id} width={1}>
                <Note note={note} />
              </XBlock>
            ))}
        </XMasonry>
      ) : (
        <p className={styles.noNotes}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </main>
  );
};

export default Notes;
