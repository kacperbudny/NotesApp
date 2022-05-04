import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NotesContext from "@contexts/NotesContext";
import styles from "./EditNoteModal.module.scss";

const EditNoteModal = ({ onClose }) => {
  const { currentlyEditedNote: note } = useContext(NotesContext);
  const [content, setContent] = useState(note.content);
  const [name, setName] = useState(note.name);
  let isMouseDownOnModalBackground = false;

  const handleMouseDown = (e) => {
    if (e.target && e.target.className === "modal") {
      isMouseDownOnModalBackground = true;
    }
  };

  const handleMouseUp = (e) => {
    if (
      e.target &&
      e.target.className === "modal" &&
      isMouseDownOnModalBackground
    ) {
      handleClose();
    }
  };

  const handleClose = () => {
    return onClose({ ...note, name: name, content: content });
  };

  return (
    <div
      className={styles.modal}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
    >
      <div className={styles.modalContent} style={{ background: note.color }}>
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
      </div>
    </div>
  );
};

export default EditNoteModal;
