import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotesContext from "@contexts/NotesContext";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import { useEffect } from "../../../../node_modules/react/cjs/react.development";

const EditNoteModal = ({ onClose }) => {
  const {
    currentlyEditedNote: note,
    isEditing,
    closeEditingModal,
  } = useContext(NotesContext);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (!note) return;
    setContent(note.content);
    setName(note.name);
    setColor(note.color);
  }, [note]);

  const handleClose = () => {
    return closeEditingModal({ ...note, name, content, color });
  };

  return (
    <Modal
      isOpen={isEditing}
      contentLabel={`Editing ${name}`}
      onRequestClose={() => handleClose()}
      className={styles.modalContent}
      overlayClassName={styles.modal}
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
          />
          <button
            className={styles.btn}
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </button>
        </form>
      )}
    </Modal>
  );
};

export default EditNoteModal;
