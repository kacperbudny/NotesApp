import React, { useReducer, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./AddNote.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import { toast } from "react-toastify";
import PinButton from "@components/notes/PinButton";
import { actionTypes, initialValues, noteReducer } from "reducers/noteReducer";
import TagsBar from "../TagsBar/TagsBar";

const AddNote = () => {
  const [note, dispatchNote] = useReducer(noteReducer, initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const { addNote } = useNotesContext();

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
    if (!note.content && !note.name) {
      return resetForm();
    }
    resetForm();
    addNote({ ...note, archived: false });
  };

  const handleChangeName = (e) => {
    dispatchNote({ type: actionTypes.SET_NAME, payload: e.target.value });
  };

  const handleChangeContent = (e) => {
    dispatchNote({ type: actionTypes.SET_CONTENT, payload: e.target.value });
  };

  const handleChangeColor = (color) => {
    dispatchNote({ type: actionTypes.SET_COLOR, payload: color });
  };

  const handleArchive = () => {
    if (note.name || note.content) {
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

  const handlePin = () => {
    dispatchNote({ type: actionTypes.TOGGLE_PINNED });
  };

  const resetForm = () => {
    dispatchNote({ type: actionTypes.SET_NOTE, payload: initialValues });
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
          style={{ background: note.color }}
        >
          {isEditing && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={note.name}
                onChange={handleChangeName}
                className={styles.title}
              />
              <PinButton note={note} onClick={handlePin} isVisible={true} />
            </>
          )}
          <TextareaAutosize
            placeholder="New note..."
            value={note.content}
            onChange={handleChangeContent}
            className={styles.text}
            rows="1"
          />
          {isEditing && (
            <>
              <TagsBar tags={note.tags} />
              <div className={styles.buttonsRow}>
                <ButtonsBar
                  isVisible={true}
                  isColorPaletteOpen={isColorPaletteOpen}
                  setIsColorPaletteOpen={setIsColorPaletteOpen}
                  onArchiveClick={handleArchive}
                  onChangeColorClick={handleChangeColor}
                />
                <input type="submit" value="Close" className={styles.btn} />
              </div>
            </>
          )}
        </form>
      </OutsideClickHandler>
    </div>
  );
};

export default AddNote;
