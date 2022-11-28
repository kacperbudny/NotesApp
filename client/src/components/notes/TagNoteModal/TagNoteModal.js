import { useNotesContext } from "@contexts/NotesContext";
import React from "react";
import Modal from "react-modal";
import styles from "./TagNoteModal.module.scss";

const TagNoteModal = () => {
  const { noteToTag: note, closeTaggingModal } = useNotesContext();

  const isModalOpen = !!note;

  const handleClose = () => {
    return closeTaggingModal();
  };

  const handleDelete = () => {
    if (!note) return;
    //tag(note._id);
    return closeTaggingModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel={`Deleting ${note ? note.name : "note"}`}
      shouldFocusAfterRender={true}
      className={styles.modalWindow}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={200}
      onRequestClose={handleClose}
    >
      <p>
        Are you sure you want to delete{" "}
        {note ? (
          <strong className={styles.noteName}>{note.name}</strong>
        ) : (
          "this note"
        )}
        ?
      </p>
      <form className={styles.buttons}>
        <button type="button" className={styles.btn} onClick={handleClose}>
          Done
        </button>
      </form>
    </Modal>
  );
};

export default TagNoteModal;
