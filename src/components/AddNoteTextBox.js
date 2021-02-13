import React, { useState } from "react";

const AddNoteTextBox = ({ onAdd }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a note");
      return;
    }

    onAdd({ text });
    setText("");
  };

  return (
    <form className="add-note-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="New note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="add-note-text-input"
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default AddNoteTextBox;
