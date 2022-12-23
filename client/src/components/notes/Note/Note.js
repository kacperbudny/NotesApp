import React, { useRef, useState } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "@components/notes/ButtonsBar";
import styles from "./Note.module.scss";
import PropTypes from "prop-types";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";
import TagsBar from "@components/notes/TagsBar";
import { useDrag, useDrop } from "react-dnd";
import { dragTypes } from "@utils/constants/dragTypes";

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

  const handleClick = () => {
    openEditingModal(note._id);
  };

  const handleChangeColor = (color) => {
    note.color = color;
    updateNote(note);
  };

  const handleDelete = () => {
    openDeletingModal(note);
  };

  const handleArchive = () => {
    // if (note.pinned) {
    //   note.pinned = false;
    // }
    // note.archived = !note.archived;
    note.displayOrder = -999;
    updateNote(note);
  };

  const handlePin = () => {
    if (note.archived) {
      note.archived = false;
    }
    note.pinned = !note.pinned;
    updateNote(note);
  };

  const handleAddTag = (tag) => {
    note.tags = [...note.tags, tag];
    updateNote(note);
  };

  const handleRemoveTag = (tag) => {
    note.tags = note.tags.filter((t) => t !== tag);
    updateNote(note);
  };

  const activeNote = noteToEdit || noteToDelete;

  const isActiveNote = activeNote && activeNote._id === note._id;

  const areButtonsVisible = isHovered || isColorPaletteOpen || isTaggingBoxOpen;

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: dragTypes.note,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const draggedItem = item;
      const hoveredItem = note;
      // Don't replace items with themselves
      if (draggedItem._id === hoveredItem._id) {
        return;
      }

      reorderNotes(draggedItem, hoveredItem);
      // Determine rectangle on screen
      // const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // // Get vertical middle
      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // // Determine mouse position
      // const clientOffset = monitor.getClientOffset();
      // // Get pixels to the top
      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // // Only perform the move when the mouse has crossed half of the items height
      // // When dragging downwards, only move when the cursor is below 50%
      // // When dragging upwards, only move when the cursor is above 50%
      // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }
      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }
      // // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);
      // // Note: we're mutating the monitor item here!
      // // Generally it's better to avoid mutations,
      // // but it's good here for the sake of performance
      // // to avoid expensive index searches.
      // item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dragTypes.note,
    item: () => {
      return note;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(hoverRef));

  return (
    <div
      ref={hoverRef}
      className={`${styles.note} ${isActiveNote && styles.hidden}`}
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
        {note.name || note.content ? (
          <div>
            <h3>{note.name}</h3>
            <p>{note.content}</p>
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
