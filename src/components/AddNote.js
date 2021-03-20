import React, { useEffect, useState } from "react";
import OutsideAlerter from "./OutsideAlerter";

const AddNote = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [textareaStyle, setTextareaStyle] = useState({ height: "auto" });
  const [prevTextLength, setPrevTextLength] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
  };

  const onClickOutside = () => {
    if (isEditing) {
      handleAddNote();
    }
  };

  const handleAddNote = () => {
    if (!text && !name) {
      resetForm();
      return;
    }
    onAdd({ text, name });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setText("");
    setTextareaStyle({ height: "36px" });
    setIsEditing(false);
  };

  const autoGrow = (e) => {
    if (text.length > prevTextLength) {
      setTextareaStyle({ height: `${e.scrollHeight}px` });
      setPrevTextLength(text.length);
    } else {
      setTextareaStyle({ height: "auto" });
    }
  };

  return (
    <div onFocus={() => setIsEditing(true)} className="centering-container">
      <OutsideAlerter onClickOutside={onClickOutside}>
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
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              autoGrow(e.target);
            }}
            style={textareaStyle}
            className="add-note-text-input text"
            rows="1"
          />
          {isEditing && (
            <input type="submit" value="Close" className="add-note-btn" />
          )}
        </form>
      </OutsideAlerter>
    </div>
  );
};

export default AddNote;
