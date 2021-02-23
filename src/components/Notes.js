import React from "react";
import Note from "./Note";

const Notes = ({ notes, onDelete }) => {
  return (
    <div className="notes">
      {notes.length > 0 ? (
        notes.map((note) => (
          <Note key={note.id} note={note} onDelete={onDelete} />
        ))
      ) : (
        <p style={{ margin: "auto", marginTop: "50px" }}>
          You don't have any notes.
        </p>
      )}
    </div>
  );
};

export default Notes;
