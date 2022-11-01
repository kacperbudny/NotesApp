import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./AddNote.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import ButtonsBar from "../ButtonsBar/ButtonsBar";
import useNotes from "@hooks/useNotes";
import { toast } from "react-toastify";

const AddNote = () => {
  const { addNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("white");

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
    addNote({ content, name, color, archived: false });
  };

  const handleAddArchivedNote = () => {
    if (name || content) {
      addNote({
        name,
        content,
        color,
        archived: true,
      });
      resetForm();
    } else {
      toast.warn("Your note cannot be empty.");
    }
  };

  const resetForm = () => {
    setName("");
    setContent("");
    setColor("white");
    setIsEditing(false);
  };

  return (
    <div
      onFocus={() => setIsEditing(true)}
      className={styles.centeringContainer}
    >
      <OutsideClickHandler onOutsideClick={handleClickOutside}>
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
              <ButtonsBar
                note={{ name, content, color }}
                changeColor={setColor}
                isAdding={true}
                isColorPaletteOpen={isColorPaletteOpen}
                setIsColorPaletteOpen={setIsColorPaletteOpen}
                archive={handleAddArchivedNote}
              />
              <input type="submit" value="Close" className={styles.btn} />
            </div>
          )}
        </form>
      </OutsideClickHandler>
    </div>
  );
};

export default AddNote;
