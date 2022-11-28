import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPalette, faInbox, faTag } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ColorPalette from "@components/notes/ColorPalette";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";
import IconButton from "@components/common/IconButton";

const ButtonsBar = ({
  isVisible,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
  onArchiveClick,
  onDeleteClick,
  onChangeColorClick,
  onTagClick,
}) => {
  const handleColorPaletteClick = (e) => {
    e.preventDefault();
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  return (
    <div className={`${styles.buttonsBar} ${isVisible && styles.visible}`}>
      {onDeleteClick && (
        <IconButton onClick={onDeleteClick} icon={faTrashAlt} />
      )}

      <div className={styles.relativeContainer}>
        <IconButton onClick={handleColorPaletteClick} icon={faPalette} />
        {isColorPaletteOpen && (
          <ColorPalette
            changeColor={onChangeColorClick}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
          />
        )}
      </div>

      <IconButton onClick={onArchiveClick} icon={faInbox} />

      <IconButton onClick={onTagClick} icon={faTag} />
    </div>
  );
};

ButtonsBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isColorPaletteOpen: PropTypes.bool.isRequired,
  setIsColorPaletteOpen: PropTypes.func.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func,
  onChangeColorClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default ButtonsBar;
