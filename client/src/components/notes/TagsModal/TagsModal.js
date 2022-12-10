import React from "react";
import styles from "./TagsModal.module.scss";
import Modal from "react-modal";
import { useLayoutContext } from "@contexts/LayoutContext";
import { useNotesContext } from "@contexts/NotesContext";
import TagEditItem from "@components/notes/TagEditItem";

const TagsModal = () => {
  const { isTagsModalOpen, setIsTagsModalOpen } = useLayoutContext();
  const { tags } = useNotesContext();

  const handleClose = () => {
    return setIsTagsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isTagsModalOpen}
      contentLabel={`Edit tags`}
      shouldFocusAfterRender={true}
      className={styles.modalWindow}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={200}
      onRequestClose={handleClose}
    >
      <div>
        <h3>Edit tags</h3>
        {tags.map((tag) => (
          <TagEditItem key={tag} tag={tag} />
        ))}
      </div>
      <form className={styles.buttons}>
        <button type="button" className={styles.btn} onClick={handleClose}>
          Done
        </button>
      </form>
    </Modal>
  );
};

export default TagsModal;
