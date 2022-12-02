import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette, faInbox, faTag } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ColorPalette from "@components/notes/ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";
import IconButton from "@components/common/IconButton";
import TaggingBox from "@components/notes/TaggingBox";

const ButtonsBar = ({
  isVisible,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
  isTaggingBoxOpen,
  setIsTaggingBoxOpen,
  onArchiveClick,
  onDeleteClick,
  onChangeColorClick,
  tags,
}) => {
  const handleColorPaletteButtonClick = (e) => {
    e.preventDefault();
    setIsColorPaletteOpen((prev) => !prev);
  };

  const handleTaggingButtonClick = (e) => {
    e.preventDefault();
    setIsTaggingBoxOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.buttonsBar} ${isVisible && styles.visible}`}>
      {onDeleteClick && (
        <IconButton onClick={onDeleteClick} icon={faTrashAlt} />
      )}

      <div className={styles.relativeContainer}>
        <IconButton onClick={handleColorPaletteButtonClick} icon={faPalette} />
        {isColorPaletteOpen && (
          <ColorPalette
            changeColor={onChangeColorClick}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
          />
        )}
      </div>

      <IconButton onClick={onArchiveClick} icon={faInbox} />

      <div className={styles.relativeContainer}>
        <IconButton onClick={handleTaggingButtonClick} icon={faTag} />
        {isTaggingBoxOpen && (
          <TaggingBox setIsOpen={setIsTaggingBoxOpen} tags={tags} />
        )}
      </div>
    </div>
  );
};

ButtonsBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isColorPaletteOpen: PropTypes.bool.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
  isTaggingBoxOpen: PropTypes.bool.isRequired,
  setIsTaggingBoxOpen: PropTypes.func.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
  onChangeColorClick: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default ButtonsBar;
