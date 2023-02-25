import React, { useEffect, useMemo, useReducer, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./AddNote.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import ButtonsBar from "@components/notes/ButtonsBar";
import { useNotesContext } from "@contexts/NotesContext";
import { toast } from "react-toastify";
import PinButton from "@components/notes/PinButton";
import { actionTypes, initialValues, noteReducer } from "reducers/noteReducer";
import TagsBar from "@components/notes/TagsBar";
import { useParams } from "react-router-dom";
import EditableChecklist from "@components/notes/EditableChecklist";
import NOTE_TYPES from "@utils/constants/noteTypes";
import IconButton from "@components/common/IconButton/IconButton";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const AddNote = () => {
  const [note, dispatchNote] = useReducer(noteReducer, initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isTaggingBoxOpen, setIsTaggingBoxOpen] = useState(false);
  const { addNote } = useNotesContext();
  const { tag: tagFromParams } = useParams();

  const initialValuesWithTagFromParams = useMemo(
    () => ({
      ...initialValues,
      tags: tagFromParams ? [tagFromParams] : [],
    }),
    [tagFromParams]
  );

  useEffect(() => {
    dispatchNote({
      type: actionTypes.SET_NOTE,
      payload: initialValuesWithTagFromParams,
    });
  }, [initialValuesWithTagFromParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
  };

  const handleClickOutside = () => {
    if (isEditing) {
      handleAddNote();
    }
  };

  const handleAddNote = () => {
    const isEmptyChecklist =
      !note.checklistItems ||
      note.checklistItems.length === 0 ||
      note.checklistItems[0].content.length === 0;

    if (!note.content && !note.name && isEmptyChecklist) {
      return resetForm();
    }

    resetForm();
    addNote({ ...note, archived: false });
  };

  const handleChangeName = (e) => {
    dispatchNote({ type: actionTypes.SET_NAME, payload: e.target.value });
  };

  const handleChangeContent = (e) => {
    dispatchNote({ type: actionTypes.SET_CONTENT, payload: e.target.value });
  };

  const handleChangeColor = (color) => {
    dispatchNote({ type: actionTypes.SET_COLOR, payload: color });
  };

  const handleAddTag = (tag) => {
    dispatchNote({ type: actionTypes.ADD_TAG, payload: tag });
  };

  const handleRemoveTag = (tag) => {
    dispatchNote({ type: actionTypes.REMOVE_TAG, payload: tag });
  };

  const handleArchive = () => {
    if (note.name || note.content) {
      addNote({
        ...note,
        pinned: false,
        archived: true,
      });
      resetForm();
    } else {
      toast.warn("Your note cannot be empty.");
    }
  };

  const handlePin = () => {
    dispatchNote({ type: actionTypes.TOGGLE_PINNED });
  };

  const resetForm = () => {
    dispatchNote({
      type: actionTypes.SET_NOTE,
      payload: initialValuesWithTagFromParams,
    });
    setIsEditing(false);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleTagBadgeClick = () => {
    handleAddNote();
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

  return (
    <div onFocus={handleFocus} className={styles.centeringContainer}>
      <OutsideClickHandler onOutsideClick={handleClickOutside}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          style={{ background: note.color }}
        >
          {isEditing && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={note.name}
                onChange={handleChangeName}
                className={styles.title}
              />
              <PinButton note={note} onClick={handlePin} isVisible={true} />
            </>
          )}
          {note.type === NOTE_TYPES.text ? (
            <TextareaAutosize
              placeholder="New note..."
              value={note.content}
              onChange={handleChangeContent}
              className={styles.text}
              rows="1"
            />
          ) : (
            <EditableChecklist
              checklistItems={note.checklistItems}
              onChecklistItemUpdate={handleUpdateChecklistItem}
              onAddChecklistItem={handleAddNewChecklistItem}
              onRemoveChecklistItem={handleRemoveChecklistItem}
            />
          )}
          {isEditing && (
            <>
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
                  <ButtonsBar.ChecklistButton
                    onChecklist={handleChecklistClick}
                  />
                </ButtonsBar>
                <input type="submit" value="Close" className={styles.btn} />
              </div>
            </>
          )}
          {!isEditing && (
            <div className={styles.checklistButton}>
              <IconButton
                onClick={() => {}}
                icon={faSquareCheck}
                iconSize={"lg"}
                size={40}
                variant="grey"
              />
            </div>
          )}
        </form>
      </OutsideClickHandler>
    </div>
  );
};

export default AddNote;
