import React, { useState } from "react";

const Modal = ({ note, onClose }) => {
  const [text, setText] = useState(note.text);
  const [name, setName] = useState(note.name);

  const autoGrow = (e) => {
    e.style.height = e.scrollHeight + "px";
  };

  return (
    <div className="modal">
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
            onInput={(e) => autoGrow(e.target)}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="add-note-text-input text"
            rows="1"
          />
          <button
            onClick={() => {
              onClose();
            }}
          >
            Close
          </button>
      </div>
    </div>
  );
};

export default Modal;
