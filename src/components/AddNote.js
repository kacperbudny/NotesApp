import React, { useState } from "react";

const AddNote = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      resetForm();
      return;
    }

    onAdd({ text, name });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setText("");
    setIsEditing(false);
  };

  const autoGrow = (e) => {
    e.style.height = e.scrollHeight + "px";
  };

  return (
    <div onFocus={() => setIsEditing(true)}>
      <form className="add-note-form" onSubmit={onSubmit}>
        {isEditing && (
          <input
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="add-note-text-input title"
          />
        )}
        <textarea
          placeholder="New note..."
          onInput={(e) => autoGrow(e.target)}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="add-note-text-input text"
          rows="1"
        />
        {isEditing && (
          <input type="submit" value="Close" className="add-note-btn" />
        )}
      </form>
    </div>
  );
};

export default AddNote;
