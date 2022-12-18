import React, { useState } from "react";
import useHover from "@hooks/useHover";
import ButtonsBar from "@components/notes/ButtonsBar";
import styles from "./Note.module.scss";
import PropTypes from "prop-types";
import { useNotesContext } from "@contexts/NotesContext";
import PinButton from "@components/notes/PinButton";
import TagsBar from "@components/notes/TagsBar/TagsBar";

const Note = ({ note }) => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isTaggingBoxOpen, setIsTaggingBoxOpen] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const {
    openEditingModal,
    updateNote,
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
    if (note.pinned) {
      note.pinned = false;
    }
    note.archived = !note.archived;
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
