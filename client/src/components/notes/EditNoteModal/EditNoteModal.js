import React, { useContext, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotesContext from "@contexts/NotesContext";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import { useEffect } from "../../../../node_modules/react/cjs/react.development";

const EditNoteModal = () => {
  const {
    activeNote: note,
    isEditingModalOpen,
    closeEditingModal,
  } = useContext(NotesContext);
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
      style={{ content: { background: color } }}
    >
      {note && (
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
          <button type="button" className={styles.btn} onClick={handleClose}>
            Close
          </button>
        </form>
      )}
    </Modal>
  );
};

export default EditNoteModal;
