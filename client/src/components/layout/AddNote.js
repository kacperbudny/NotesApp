import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import OutsideAlerter from "../wrappers/OutsideAlerter";

const AddNote = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
  };

  const handleClickOutside = () => {
    if (isEditing) {
      handleAddNote();
    }
  };

  const handleAddNote = () => {
    if (!content && !name) {
      resetForm();
      return;
    }
    onAdd({ content, name });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setContent("");
    setIsEditing(false);
  };

  return (
    <div onFocus={() => setIsEditing(true)} className="centering-container">
      <OutsideAlerter onClickOutside={handleClickOutside}>
        <form className="add-note-form" onSubmit={handleSubmit}>
          {isEditing && (
            <input
              type="text"
              placeholder="Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-note-text-input title"
            />
          )}
          <TextareaAutosize
            placeholder="New note..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
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
