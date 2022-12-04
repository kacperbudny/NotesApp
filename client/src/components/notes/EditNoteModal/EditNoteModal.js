import React, { useState, useRef, useEffect, useReducer } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";
import { actionTypes, initialValues, noteReducer } from "reducers/noteReducer";
import TagsBar from "@components/notes/TagsBar";

const EditNoteModal = () => {
  const [note, dispatchNote] = useReducer(noteReducer, initialValues);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isTaggingBoxOpen, setIsTaggingBoxOpen] = useState(false);
  const contentRef = useRef(null);
  const {
    noteToEdit,
    noteToDelete,
    closeEditingModal,
    openDeletingModal,
    updateNote,
  } = useNotesContext();

  const isEditingModalOpen = !!(noteToEdit && !noteToDelete);

  useEffect(() => {
    if (!noteToEdit) return;
    dispatchNote({ type: actionTypes.SET_NOTE, payload: noteToEdit });
  }, [noteToEdit]);

  const closeModalAndSave = (note) => {
    updateNote(note);
    closeEditingModal();
  };

  const handleChangeName = (e) => {
    dispatchNote({ type: actionTypes.SET_NAME, payload: e.target.value });
  };

  const handleChangeContent = (e) => {
    dispatchNote({ type: actionTypes.SET_CONTENT, payload: e.target.value });
  };

  const handleClose = () => {
    closeModalAndSave({
      ...noteToEdit,
      ...note,
      archived: note.pinned ? false : noteToEdit.archived,
    });
  };

  const handleAfterOpen = () => {
    const textarea = contentRef.current;
    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
    textarea.focus();
  };

  const handleChangeColor = (color) => {
    dispatchNote({ type: actionTypes.SET_COLOR, payload: color });
  };

  const handleDelete = () => {
    openDeletingModal(noteToEdit);
  };

  const handleArchive = () => {
    closeModalAndSave({
      ...noteToEdit,
      ...note,
      pinned: noteToEdit.archived ? note.pinned : false,
      archived: !noteToEdit.archived,
    });
  };

  const handlePin = () => {
    dispatchNote({ type: actionTypes.TOGGLE_PINNED });
  };

  const handleAddTag = (tag) => {
    dispatchNote({ type: actionTypes.ADD_TAG, payload: tag });
  };

  const handleRemoveTag = (tag) => {
    dispatchNote({ type: actionTypes.REMOVE_TAG, payload: tag });
  };

  const handleTagBadgeClick = () => {
    handleClose();
  };

  return (
    <Modal
      isOpen={isEditingModalOpen}
      onAfterOpen={handleAfterOpen}
      contentLabel={`Editing ${note.name}`}
      onRequestClose={handleClose}
      shouldFocusAfterRender={false}
      className={styles.modalWindow}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={200}
      style={{
        content: {
          background: note.color,
        },
      }}
    >
      <form>
        <input
          type="text"
          placeholder="Title"
          value={note.name}
          onChange={handleChangeName}
          className={styles.title}
        />
        <PinButton note={note} onClick={handlePin} isVisible={true} />
        <TextareaAutosize
          placeholder="New note..."
          value={note.content}
          onChange={handleChangeContent}
          className={styles.text}
          ref={contentRef}
        />
        <div className={styles.tagsBarContainer}>
          <TagsBar
            tags={note.tags}
            onRemoveTag={handleRemoveTag}
            onBadgeClick={handleTagBadgeClick}
          />
        </div>
        <div className={styles.buttonsRow}>
          <ButtonsBar
            onChangeColorClick={handleChangeColor}
            isVisible={true}
            isColorPaletteOpen={isColorPaletteOpen}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
            isTaggingBoxOpen={isTaggingBoxOpen}
            setIsTaggingBoxOpen={setIsTaggingBoxOpen}
            onArchiveClick={handleArchive}
            onDeleteClick={handleDelete}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            tags={note.tags}
          />
          <button type="button" className={styles.btn} onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditNoteModal;
