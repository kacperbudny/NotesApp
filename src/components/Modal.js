import React, { useState } from "react";

const Modal = ({ note, onClose }) => {
  const [text, setText] = useState(note.text);
  const [name, setName] = useState(note.name);

  const handleClick = (e) => {
    if (e.target && e.target.className === "modal") {
      return onClose({ id: note.id, name: name, text: text });
    }
  };

  const autoGrow = (e) => {
    e.style.height = e.scrollHeight + "px";
  };

  return (
    <div className="modal" onClick={(e) => handleClick(e)}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-note-text-input title"
        />
        <textarea
          placeholder="New note..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoGrow(e.target);
          }}
          className="add-note-text-input text"
        />
        <button
          className="add-note-btn"
          onClick={() => {
            onClose({ id: note.id, name: name, text: text });
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
