import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import NotesContext from "@contexts/NotesContext";
import ColorPalette from "../ColorPalette";

const ButtonsBar = ({ note }) => {
  const { deleteNote } = useContext(NotesContext);

  return (
    <div className="buttons-bar">
      <div className="icon-container" onClick={() => deleteNote(note._id)}>
        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
      </div>
      <div className="icon-container palette-container">
        <FontAwesomeIcon icon={faPalette} className="icon" />
        <ColorPalette note={note} />
      </div>
    </div>
  );
};

export default ButtonsBar;
