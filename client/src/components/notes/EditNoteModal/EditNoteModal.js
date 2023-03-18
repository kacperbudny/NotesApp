import React, { useState, useRef, useEffect, useReducer } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./EditNoteModal.module.scss";
import Modal from "react-modal";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";
import { actionTypes, initialValues, noteReducer } from "reducers/noteReducer";
import TagsBar from "@components/notes/TagsBar";
import NOTE_TYPES from "@utils/constants/noteTypes";
import EditableChecklist from "@components/notes/EditableChecklist";

const EditNoteModal = () => {
  const [note, dispatchNote] = useReducer(noteReducer, initialValues);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isTaggingBoxOpen, setIsTaggingBoxOpen] = useState(false);
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
    if (!textarea) {
      return;
    }
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

  const handleAddTag = (tag) => {
    dispatchNote({ type: actionTypes.ADD_TAG, payload: tag });
  };

  const handleRemoveTag = (tag) => {
    dispatchNote({ type: actionTypes.REMOVE_TAG, payload: tag });
  };

  const handleTagBadgeClick = () => {
    handleClose();
  };

  const handleChecklistClick = () => {
    dispatchNote({ type: actionTypes.SWAP_MODE });
  };

  const handleUpdateChecklistItem = (checklistItem) => {
    dispatchNote({
      type: actionTypes.UPDATE_CHECKLIST_ITEM,
      payload: checklistItem,
    });
  };

  const handleAddNewChecklistItem = (newChecklistItemContent) => {
    const id = crypto.randomUUID();
    dispatchNote({
      type: actionTypes.ADD_CHECKLIST_ITEM,
      payload: { content: newChecklistItemContent, id },
    });
    return id;
  };

  const handleRemoveChecklistItem = (itemIdToRemove) => {
    dispatchNote({
      type: actionTypes.REMOVE_CHECKLIST_ITEM,
      payload: itemIdToRemove,
    });
  };

  const handleReorderChecklistItems = (sourceItemId, targetItemId) => {
    dispatchNote({
      type: actionTypes.SWAP_CHECKLIST_ITEMS,
      payload: { sourceItemId, targetItemId },
    });
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
      preventScroll={true}
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
        {note.type === NOTE_TYPES.text ? (
          <TextareaAutosize
            placeholder="New note..."
            value={note.content}
            onChange={handleChangeContent}
            className={styles.text}
            ref={contentRef}
          />
        ) : (
          <EditableChecklist
            noteColor={note.color}
            checklistItems={note.checklistItems}
            onChecklistItemUpdate={handleUpdateChecklistItem}
            onAddChecklistItem={handleAddNewChecklistItem}
            onRemoveChecklistItem={handleRemoveChecklistItem}
            onReorderChecklistItems={handleReorderChecklistItems}
          />
        )}
        <div className={styles.tagsBarContainer}>
          <TagsBar
            tags={note.tags}
            onRemoveTag={handleRemoveTag}
            onBadgeClick={handleTagBadgeClick}
          />
        </div>
        <div className={styles.buttonsRow}>
          <ButtonsBar isVisible={true}>
            <ButtonsBar.ArchiveButton onArchive={handleArchive} />
            <ButtonsBar.DeleteButton onDelete={handleDelete} />
            <ButtonsBar.PaletteButton
              isColorPaletteOpen={isColorPaletteOpen}
              setIsColorPaletteOpen={setIsColorPaletteOpen}
              onChangeColor={handleChangeColor}
            />
            <ButtonsBar.TagButton
              isTaggingBoxOpen={isTaggingBoxOpen}
              setIsTaggingBoxOpen={setIsTaggingBoxOpen}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              tags={note.tags}
            />
            <ButtonsBar.ChecklistButton onChecklist={handleChecklistClick} />
          </ButtonsBar>
          <button type="button" className={styles.btn} onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditNoteModal;
