import React, { useContext } from "react";
import NotesContext from "../../contexts/NotesContext";

const ChangeColorButton = ({ color, note }) => {
  const { changeNoteColor } = useContext(NotesContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (!color) color = "white";
    changeNoteColor(color, note);
  };

  return (
    <button
      className="color-button"
      style={
        color
          ? { background: `${color}` }
          : { background: "white", border: "2px solid #ccc" }
      }
      onClick={(e) => handleClick(e)}
    ></button>
  );
};

export default ChangeColorButton;
