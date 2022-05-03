import React, { useContext } from "react";
import NotesContext from "../../contexts/NotesContext";
import Note from "./Note";

const Notes = ({ onEdit }) => {
  const { notes } = useContext(NotesContext);

  return (
    <div className="notes">
      {notes.length > 0 ? (
        notes
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => <Note key={note._id} note={note} onEdit={onEdit} />)
      ) : (
        <p style={{ margin: "auto", marginTop: "50px" }}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </div>
  );
};

export default Notes;
