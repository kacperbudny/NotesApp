import React from "react";
import Note from "./Note";

const Notes = ({ notes, onDelete, onEdit, changeNoteColor }) => {
  return (
    <div className="notes">
      {notes.length > 0 ? (
        notes
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => (
            <Note
              key={note._id}
              note={note}
              onDelete={onDelete}
              onEdit={onEdit}
              changeNoteColor={changeNoteColor}
            />
          ))
      ) : (
        <p style={{ margin: "auto", marginTop: "50px" }}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </div>
  );
};

export default Notes;
