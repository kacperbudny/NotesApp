import FloatingBox from "@components/common/FloatingBox/FloatingBox";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TaggingBox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNotesContext } from "@contexts/NotesContext";
import TaggingBoxTagItem from "../TaggingBoxTagItem/TaggingBoxTagItem";

const TaggingBox = ({ setIsOpen, noteTags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState("");
  const { tags: savedTags } = useNotesContext();

  const allTags = Array.from(new Set([...savedTags, ...noteTags]));

  const filteredTags = allTags.filter((tag) =>
    tag.toUpperCase().includes(inputValue.toUpperCase())
  );
  const showAddButton =
    inputValue.length > 0 &&
    !allTags.map((tag) => tag.toUpperCase()).includes(inputValue.toUpperCase());

  const addTag = () => {
    if (inputValue.length === 0) {
      return;
    }
    onAddTag(inputValue);
    setInputValue("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeInput = (e) => {
    if (e.target.value.length > 20) {
      return;
    }
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTag();
    }
  };

  const handleAddButtonClick = () => {
    addTag();
  };

  return (
    <FloatingBox onOutsideClick={handleClose}>
      <div>
        <div className={styles.container}>
          <div className={styles.topPart}>
            <h4 className={styles.header}>Tag note</h4>
            <div className={styles.inputWithIconContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter a tag"
                value={inputValue}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xs"
                className={styles.searchIcon}
              />
            </div>
          </div>
          <ul className={styles.tagsList}>
            {filteredTags.map((tag) => (
              <TaggingBoxTagItem
                key={tag}
                tag={tag}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
                noteTags={noteTags}
              />
            ))}
          </ul>
        </div>
        {showAddButton && (
          <button className={styles.addButton} onClick={handleAddButtonClick}>
            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
            <span className={styles.buttonText}>
              Add tag "<strong>{inputValue}</strong>"
            </span>
          </button>
        )}
      </div>
    </FloatingBox>
  );
};

TaggingBox.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  noteTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

export default TaggingBox;
