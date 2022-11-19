import React, { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";

const EditNoteModal = () => {
  const {
    noteToEdit: note,
    noteToDelete,
    closeEditingModal,
    openDeletingModal,
    updateNote,
  } = useNotesContext();
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("white");
  const [pinned, setPinned] = useState(false);
  const contentRef = useRef(null);

  const editedNote = { content, name, color, pinned };
  const isEditingModalOpen = !!(note && !noteToDelete);

  useEffect(() => {
    if (!note) return;
    setContent(note.content);
    setName(note.name);
    setColor(note.color);
    setPinned(note.pinned);
  }, [note]);

  const closeModalAndSave = (note) => {
    updateNote(note);
    closeEditingModal();
  };

  const handleClose = () => {
    closeModalAndSave({
      ...note,
      ...editedNote,
      archived: pinned ? false : note.archived,
    });
  };

  const handleAfterOpen = () => {
    const textarea = contentRef.current;
    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
    textarea.focus();
  };

  const handleChangeColor = (color) => {
    setColor(color);
  };

  const handleDelete = () => {
    openDeletingModal(note);
  };

  const handleArchive = () => {
    closeModalAndSave({
      ...note,
      ...editedNote,
      pinned: note.archived ? pinned : false,
      archived: !note.archived,
    });
  };

  const handlePin = () => {
    setPinned((prev) => !prev);
  };

  return (
    <Modal
      isOpen={isEditingModalOpen}
      onAfterOpen={handleAfterOpen}
      contentLabel={`Editing ${name}`}
      onRequestClose={handleClose}
      shouldFocusAfterRender={false}
      className={styles.modalWindow}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={200}
      style={{
        content: {
          background: color,
        },
      }}
    >
      <form>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.title}
        />
        <PinButton note={editedNote} onClick={handlePin} isVisible={true} />
        <TextareaAutosize
          placeholder="New note..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
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
