import React from "react";
import ButtonsBar from "./ButtonsBar";

const Note = ({ note, onDelete, onEdit, changeNoteColor }) => {
  return (
    <div className="note" style={{ background: `${note.color}` }}>
      <div className="note-content" onClick={() => onEdit(note.id)}>
        {note.name || note.text ? (
          <div>
            <h3>{note.name}</h3>
            <p>{note.text}</p>
          </div>
        ) : (
          <p style={{ color: "gray" }}>Empty note</p>
        )}
      </div>
      <ButtonsBar
        note={note}
        onDelete={onDelete}
        changeNoteColor={changeNoteColor}
      />
    </div>
  );
};

export default Note;
