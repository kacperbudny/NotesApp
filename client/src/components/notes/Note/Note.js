import React, { useState } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "@components/notes/ButtonsBar";
import styles from "./Note.module.scss";
import PropTypes from "prop-types";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";
import TagsBar from "@components/notes/TagsBar";
import { useDrag, useDrop } from "react-dnd";
import DRAG_TYPES from "@utils/constants/dragTypes";
import usePath from "@hooks/usePath";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";
import NOTE_TYPES from "@utils/constants/noteTypes";
import NoteChecklist from "@components/notes/NoteChecklist";
import { swapChecklistMode } from "@utils/noteUtils";

const Note = ({ note }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isTaggingBoxOpen, setIsTaggingBoxOpen] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const {
    openEditingModal,
    updateNote,
    reorderNotes,
    noteToEdit,
    noteToDelete,
    openDeletingModal,
  } = useNotesContext();
  const path = usePath();

  const areFloatingBoxesOpen = isColorPaletteOpen || isTaggingBoxOpen;

  const [, drop] = useDrop({
    accept: DRAG_TYPES.note,
    drop(item) {
      if (!hoverRef.current) {
        return;
      }

      const draggedItem = item;
      const hoveredItem = note;

      if (draggedItem._id === hoveredItem._id) {
        return;
      }

      if (draggedItem.pinned !== hoveredItem.pinned) {
        return;
      }

      reorderNotes(draggedItem, hoveredItem);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPES.note,
    item: () => {
      return note;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => path === FRONTEND_ROUTES.homePage && !areFloatingBoxesOpen,
  });

  drag(drop(hoverRef));

  const handleClick = () => {
    openEditingModal(note._id);
  };

  const handleChangeColor = (color) => {
    updateNote({ ...note, color });
  };

  const handleDelete = () => {
    openDeletingModal(note);
  };

  const handleArchive = () => {
    updateNote({
      ...note,
      archived: !note.archived,
      pinned: false,
    });
  };

  const handlePin = () => {
    updateNote({ ...note, pinned: !note.pinned, archived: false });
  };

  const handleAddTag = (tag) => {
    updateNote({ ...note, tags: [...note.tags, tag] });
  };

  const handleRemoveTag = (tag) => {
    updateNote({ ...note, tags: note.tags.filter((t) => t !== tag) });
  };

  const handleChecklist = () => {
    const newNote = swapChecklistMode(note);
    updateNote(newNote);
  };

  const activeNote = noteToEdit || noteToDelete;

  const isActiveNote = activeNote && activeNote._id === note._id;

  const areButtonsVisible = isHovered || areFloatingBoxesOpen;

  const isHidden = isActiveNote || isDragging;

  return (
    <div
      ref={hoverRef}
      className={`${styles.note} ${isHidden && styles.hidden}`}
      style={{
        background: `${note.color}`,
      }}
    >
      <div className={styles.noteContent} onClick={handleClick}>
        <PinButton
          isVisible={areButtonsVisible}
          note={note}
          onClick={handlePin}
        />
        {note.name || note.content || note.checklistItems.length ? (
          <div>
            <h3>{note.name}</h3>

            {note.type === NOTE_TYPES.text ? (
              <p>{note.content}</p>
            ) : (
              <NoteChecklist checklistItems={note.checklistItems} />
            )}

            <TagsBar tags={note.tags} onRemoveTag={handleRemoveTag} />
          </div>
        ) : (
          <p className={styles.emptyNote}>Empty note</p>
        )}
      </div>
      <ButtonsBar isVisible={areButtonsVisible}>
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
        <ButtonsBar.ChecklistButton onChecklist={handleChecklist} />
      </ButtonsBar>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Note;
