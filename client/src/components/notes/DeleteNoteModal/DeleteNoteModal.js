import NotesContext from "@contexts/NotesContext";
import React, { useContext } from "react";
import Modal from "react-modal";
import styles from "./DeleteNoteModal.module.scss";

const DeleteNoteModal = () => {
  const {
    activeNote: note,
    isDeletingModalOpen,
    deleteNote,
    closeDeletingModal,
    shouldReturnToEditing,
    setIsEditingModalOpen,
  } = useContext(NotesContext);

  const handleClose = () => {
    if (shouldReturnToEditing) {
      setIsEditingModalOpen(true);
    }
    return closeDeletingModal();
  };

  const handleDelete = () => {
    deleteNote(note._id);
    return closeDeletingModal();
  };

  return note ? (
    <Modal
      isOpen={isDeletingModalOpen}
      contentLabel={`Deleting ${note.name}`}
      shouldFocusAfterRender={true}
      className={styles.modalWindow}
      overlayClassName={styles.modalOverlay}
      onRequestClose={handleClose}
    >
      <>
        <p>
          Are you sure you want to delete{" "}
          {note.name ? (
            <strong className={styles.noteName}>{note.name}</strong>
          ) : (
            "this note"
          )}
          ?
        </p>
        <form className={styles.buttons}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button type="button" className={styles.btn} onClick={handleClose}>
            Close
          </button>
        </form>
      </>
    </Modal>
  ) : null;
};

export default DeleteNoteModal;
