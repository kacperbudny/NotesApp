import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./AddNote.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import { toast } from "react-toastify";
import PinButton from "@components/notes/PinButton";

const AddNote = () => {
  const { addNote } = useNotesContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("white");
  const [pinned, setPinned] = useState(false);

  const note = { name, content, color, pinned };

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
    addNote({ ...note, archived: false });
  };

  const handleArchiveClick = () => {
    if (name || content) {
      addNote({
        ...note,
        pinned: false,
        archived: true,
      });
      resetForm();
    } else {
      toast.warn("Your note cannot be empty.");
    }
  };

  const handlePinClick = () => {
    setPinned((prev) => !prev);
  };

  const resetForm = () => {
    setName("");
    setContent("");
    setColor("white");
    setPinned(false);
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
            <>
              <input
                type="text"
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.title}
              />
              <PinButton note={note} onClick={handlePinClick} />
            </>
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
                note={note}
                changeColor={setColor}
                isAdding={true}
                isColorPaletteOpen={isColorPaletteOpen}
                setIsColorPaletteOpen={setIsColorPaletteOpen}
                archive={handleArchiveClick}
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
