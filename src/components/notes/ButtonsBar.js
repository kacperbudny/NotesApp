import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ButtonsBar = ({ note, onDelete }) => {
  return (
    <div className="buttons-bar">
      <div className="icon-container" onClick={() => onDelete(note.id)}>
        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
      </div>
    </div>
  );
};

export default ButtonsBar;
