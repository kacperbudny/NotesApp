import React from "react";
import { XBlock, XMasonry } from "react-xmasonry";
import Note from "@components/notes/Note";
import PropTypes from "prop-types";
import styles from "./NotesGroup.module.scss";

const NotesGroup = ({ label, notes, displayLabel = true }) => {
  //TODO: Add ref
  return (
    <div className={styles.container}>
      {displayLabel && <h5 className={styles.label}>{label}</h5>}
      <XMasonry targetBlockWidth={300} center={false}>
        {notes
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => (
            <XBlock key={note._id} width={1}>
              <Note note={note} />
            </XBlock>
          ))}
      </XMasonry>
    </div>
  );
};

NotesGroup.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  displayLabel: PropTypes.bool,
};

export default NotesGroup;
