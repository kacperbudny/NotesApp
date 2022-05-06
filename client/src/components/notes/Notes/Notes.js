import React, { useContext, useState, useEffect } from "react";
import NotesContext from "@contexts/NotesContext";
import Note from "../Note";
import styles from "./Notes.module.scss";
import Masonry from "react-masonry-css";
import useWindowSize from "@hooks/useWindowSize";

const Notes = () => {
  const { notes } = useContext(NotesContext);
  const windowSize = useWindowSize();
  const [columnCount, setColumnCount] = useState();

  useEffect(() => {
    const NOTE_WIDTH = 300;
    const NOTE_MARGIN = 10;
    setColumnCount(windowSize.width / (NOTE_WIDTH + NOTE_MARGIN));
  }, [windowSize]);

  return (
    <Masonry className={styles.notes} breakpointCols={columnCount}>
      {notes.length > 0 ? (
        notes
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => <Note key={note._id} note={note} />)
      ) : (
        <p className={styles.noNotes}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </Masonry>
  );
};

export default Notes;
