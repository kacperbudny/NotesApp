import React, { useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import OutsideAlerter from "@components/wrappers/OutsideAlerter/OutsideAlerter";
import NotesContext from "@contexts/NotesContext";
import styles from "./AddNote.module.scss";
import AddNoteButtonsBar from "../AddNoteButtonsBar/AddNoteButtonsBar";
import OutsideClickHandler from "react-outside-click-handler";

const AddNote = () => {
  const { addNote } = useContext(NotesContext);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("white");
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
    resetForm();
    addNote({ content, name, color });
  };

  const resetForm = () => {
    setName("");
    setContent("");
    setIsEditing(false);
  };

  return (
    <div
      onFocus={() => setIsEditing(true)}
      className={styles.centeringContainer}
    >
      <OutsideAlerter onClickOutside={handleClickOutside}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          style={{ background: color }}
        >
          {isEditing && (
            <input
              type="text"
              placeholder="Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.title}
            />
          )}
          <TextareaAutosize
            placeholder="New note..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className={styles.text}
            rows="1"
          />
          {isEditing && (
            <div className={styles.buttonsRow}>
              <AddNoteButtonsBar changeColor={setColor} />
              <input type="submit" value="Close" className={styles.btn} />
            </div>
          )}
        </form>
      </OutsideAlerter>
    </div>
  );
};

export default AddNote;
