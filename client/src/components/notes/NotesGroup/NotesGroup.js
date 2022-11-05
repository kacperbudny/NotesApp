import React from "react";
import { XBlock, XMasonry } from "react-xmasonry";
import Note from "@components/notes/Note";
import PropTypes from "prop-types";

const NotesGroup = ({ label, notes, displayLabel = true }) => {
  //TODO: Add ref
  return (
    <>
      {displayLabel && <h4>{label}</h4>}
      <XMasonry targetBlockWidth={300} center={false}>
        {notes
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => (
            <XBlock key={note._id} width={1}>
              <Note note={note} />
            </XBlock>
          ))}
      </XMasonry>
    </>
  );
};

NotesGroup.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  displayLabel: PropTypes.bool,
};

export default NotesGroup;
