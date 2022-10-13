import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import { useEffect } from "../../../../node_modules/react/cjs/react.development";
import ButtonsBar from "../ButtonsBar/ButtonsBar";
import useNotes from "@hooks/useNotes";

const EditNoteModal = () => {
  const {
    activeNote: note,
    isEditingModalOpen,
    closeEditingModal,
  } = useNotes();
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("white");
  const contentRef = useRef(null);

  useEffect(() => {
    if (!note) return;
    setContent(note.content);
    setName(note.name);
    setColor(note.color);
  }, [note]);

  const handleClose = () => {
    return closeEditingModal({ ...note, name, content, color });
  };

  const handleAfterOpen = () => {
    const textarea = contentRef.current;
    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
    textarea.focus();
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
            changeColor={setColor}
            note={note}
            isColorPaletteOpen={isColorPaletteOpen}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
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
