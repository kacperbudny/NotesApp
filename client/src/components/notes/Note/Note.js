import React from "react";
import ButtonsBar from "../ButtonsBar";

const Note = ({ note, onEdit }) => {
  return (
    <div className="note" style={{ background: `${note.color}` }}>
      <div className="note-content" onClick={() => onEdit(note._id)}>
        {note.name || note.content ? (
          <div>
            <h3>{note.name}</h3>
            <p>{note.content}</p>
          </div>
        ) : (
          <p style={{ color: "gray" }}>Empty note</p>
        )}
      </div>
      <ButtonsBar note={note} />
    </div>
  );
};

export default Note;
