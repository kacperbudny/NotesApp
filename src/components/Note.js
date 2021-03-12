import React from "react";
import ButtonsBar from "./ButtonsBar";

const Note = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note">
      <div className="note-content" onClick={(e) => onEdit(note.id)}>
        <h3>{note.name}</h3>
        <p>{note.text}</p>
      </div>
      <ButtonsBar note={note} onDelete={onDelete} />
    </div>
  );
};

export default Note;
