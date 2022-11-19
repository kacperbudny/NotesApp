import React, { useState, useRef, useEffect, useReducer } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";

const actionTypes = {
  SET_NOTE: "SET_NOTE",
  SET_COLOR: "SET_COLOR",
  TOGGLE_PINNED: "TOGGLE_PINNED",
  SET_NAME: "SET_NAME",
  SET_CONTENT: "SET_CONTENT",
};

const noteReducer = (state, action) => {
  if (action.type === actionTypes.SET_NOTE) {
    return {
      name: action.payload.name,
      content: action.payload.content,
      color: action.payload.color,
      pinned: action.payload.pinned,
    };
  }
  if (action.type === actionTypes.SET_COLOR) {
    return {
      ...state,
      color: action.payload,
    };
  }
  if (action.type === actionTypes.TOGGLE_PINNED) {
    return {
      ...state,
      pinned: !state.pinned,
    };
  }
  if (action.type === actionTypes.SET_NAME) {
    return {
      ...state,
      name: action.payload,
    };
  }
  if (action.type === actionTypes.SET_CONTENT) {
    return {
      ...state,
      content: action.payload,
    };
  }
  throw Error("Unknown action: " + action.type);
};

const initialValues = { name: "", content: "", color: "white", pinned: false };

const EditNoteModal = () => {
  const [note, dispatchNote] = useReducer(noteReducer, initialValues);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
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
        <div className={styles.buttonsRow}>
          <ButtonsBar
            onChangeColorClick={handleChangeColor}
            isVisible={true}
            isColorPaletteOpen={isColorPaletteOpen}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
            onArchiveClick={handleArchive}
            onDeleteClick={handleDelete}
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
