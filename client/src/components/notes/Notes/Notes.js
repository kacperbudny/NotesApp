import React from "react";
import Note from "../Note";
import styles from "./Notes.module.scss";
import { XMasonry, XBlock } from "react-xmasonry";
import useNotes from "@hooks/useNotes";
import PropTypes from "prop-types";

const filterNotes = (displayAs) => {
  return (note) => {
    switch (displayAs) {
      case "Home":
        return !note.archived;
      case "Archive":
        return note.archived;
      default:
        return true;
    }
  };
};

const Notes = ({ displayAs }) => {
  const { notes } = useNotes();

  const filteredNotes = notes.filter(filterNotes(displayAs));

  return (
    <div className={styles.notesContainer}>
      {filteredNotes.length > 0 ? (
        <XMasonry targetBlockWidth={300} center={false}>
          {filteredNotes
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
    </div>
  );
};

Notes.propTypes = {
  displayAs: PropTypes.oneOf(["Home", "Archive"]).isRequired,
};

export default Notes;
