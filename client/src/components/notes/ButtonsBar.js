import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ColorPalette from "./ColorPalette";

const ButtonsBar = ({ note, onDelete, changeNoteColor }) => {
  return (
    <div className="buttons-bar">
      <div className="icon-container" onClick={() => onDelete(note.id)}>
        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
      </div>
      <div className="icon-container" id="palette-container">
        <FontAwesomeIcon icon={faPalette} className="icon" />
        <ColorPalette note={note} changeNoteColor={changeNoteColor}/>
      </div>
    </div>
  );
};

export default ButtonsBar;
