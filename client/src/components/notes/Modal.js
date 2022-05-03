import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const Modal = ({ note, onClose }) => {
  const [content, setContent] = useState(note.content);
  const [name, setName] = useState(note.name);
  let isMouseDownOnModalBackground = false;

  const handleMouseDown = (e) => {
    if (e.target && e.target.className === "modal") {
      isMouseDownOnModalBackground = true;
    }
  };

  const handleMouseUp = (e) => {
    if (
      e.target &&
      e.target.className === "modal" &&
      isMouseDownOnModalBackground
    ) {
      handleClose();
    }
  };

  const handleClose = () => {
    return onClose({ ...note, name: name, content: content });
  };

  return (
    <div
      className="modal"
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
    >
      <div className="modal-content" style={{ background: note.color }}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-note-text-input title"
        />
        <TextareaAutosize
          placeholder="New note..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="add-note-text-input text"
          style={{ background: "none" }}
        />
        <button
          className="add-note-btn"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
