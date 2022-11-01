import React from "react";
import Note from "../Note";
import styles from "./Notes.module.scss";
import { XMasonry, XBlock } from "react-xmasonry";
import useNotes from "@hooks/useNotes";
import PropTypes from "prop-types";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";
import { useLayoutContext } from "@contexts/LayoutContext";

const filterNotes = (displayAs) => {
  return (note) => {
    switch (displayAs) {
      case homePageDisplayModes.home:
        return !note.archived;
      case homePageDisplayModes.archive:
        return note.archived;
      default:
        return true;
    }
  };
};

const Notes = ({ displayAs }) => {
  const { notes } = useNotes();
  const { masonryRef } = useLayoutContext();

  const filteredNotes = notes.filter(filterNotes(displayAs));

  return (
    <div className={styles.notesContainer}>
      {filteredNotes.length > 0 ? (
        <XMasonry targetBlockWidth={300} center={false} ref={masonryRef}>
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
  displayAs: PropTypes.oneOf(Object.values(homePageDisplayModes)).isRequired,
};

export default Notes;
