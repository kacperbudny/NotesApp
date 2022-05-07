import React, { useContext, useState, useEffect } from "react";
import NotesContext from "@contexts/NotesContext";
import Note from "../Note";
import styles from "./Notes.module.scss";
import Masonry from "react-masonry-css";
import useWindowSize from "@hooks/useWindowSize";
import { NOTE_WIDTH, NOTE_MARGIN } from "@constants/noteDimensions";

const Notes = () => {
  const { notes } = useContext(NotesContext);
  const windowSize = useWindowSize();
  const [columnCount, setColumnCount] = useState();

  useEffect(() => {
    setColumnCount(
      Math.floor(windowSize.width / (NOTE_WIDTH + NOTE_MARGIN * 2))
    );
  }, [windowSize]);

  return (
    <div className={styles.notesContainer}>
      <div className={styles.centeringContainer}>
        {notes.length > 0 ? (
          <Masonry
            className={styles.notesGrid}
            breakpointCols={columnCount}
            style={{
              width: `${(NOTE_WIDTH + NOTE_MARGIN * 2) * columnCount}px`,
            }}
          >
            {notes
              .sort((a, b) => b.displayOrder - a.displayOrder)
              .map((note) => (
                <Note key={note._id} note={note} />
              ))}
          </Masonry>
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
