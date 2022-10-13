import useNotes from "@hooks/useNotes";
import React from "react";
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
  } = useNotes();

  const handleClose = () => {
    if (shouldReturnToEditing) {
      setIsEditingModalOpen(true);
    }
    return closeDeletingModal();
  };

  const handleDelete = () => {
    if (!note) return;
    deleteNote(note._id);
    return closeDeletingModal();
  };

  return (
    <Modal
      isOpen={isDeletingModalOpen}
      contentLabel={`Deleting ${note ? note.name : "note"}`}
      shouldFocusAfterRender={true}
      className={styles.modalWindow}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={200}
      onRequestClose={handleClose}
    >
      <>
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
  );
};

export default DeleteNoteModal;
