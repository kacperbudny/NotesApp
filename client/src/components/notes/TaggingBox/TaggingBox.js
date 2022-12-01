import FloatingBox from "@components/common/FloatingBox/FloatingBox";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TaggingBox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNotesContext } from "@contexts/NotesContext";

const TaggingBox = ({ setIsOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const { tags } = useNotesContext();

  const filteredTags = tags.filter((tag) =>
    tag.toUpperCase().includes(inputValue.toUpperCase())
  );
  const showAddButton =
    inputValue.length > 0 &&
    !tags.map((tag) => tag.toUpperCase()).includes(inputValue.toUpperCase());

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeInput = (e) => {
    if (e.target.value.length > 20) {
      return;
    }
    setInputValue(e.target.value);
  };

  return (
    <FloatingBox onOutsideClick={handleClose}>
      <div>
        <div className={styles.container}>
          <h4 className={styles.header}>Tag note</h4>
          <div className={styles.inputWithIconContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a tag"
              value={inputValue}
              onChange={handleChangeInput}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xs"
              className={styles.searchIcon}
            />
          </div>
          <ul>
            {filteredTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        {showAddButton && (
          <button className={styles.addButton}>
            <FontAwesomeIcon
              icon={faPlus}
              size="md"
              className={styles.plusIcon}
            />
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
};

export default TaggingBox;
