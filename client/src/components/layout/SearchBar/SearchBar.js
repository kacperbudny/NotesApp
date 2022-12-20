import IconButton from "@components/common/IconButton";
import React, { useRef, useState } from "react";
import styles from "./SearchBar.module.scss";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isOnSearchRoute = location.pathname === "/search";

  const handleSearchButtonClick = () => {
    navigate("/search");
    inputRef.current.focus();
  };

  const handleInputClick = () => {
    navigate("/search");
  };

  const handleCloseButtonClick = () => {
    navigate("/");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`${styles.container} ${isFocused && styles.focused}`}>
      <div className={styles.iconContainer}>
        <IconButton
          onClick={handleSearchButtonClick}
          icon={faMagnifyingGlass}
          iconSize="lg"
          variant="grey"
          size={36}
        />
      </div>
      <input
        className={styles.input}
        onClick={handleInputClick}
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
      />
      <div
        className={`${styles.iconContainer} ${
          !isOnSearchRoute && styles.hidden
        }`}
      >
        <IconButton
          onClick={handleCloseButtonClick}
          icon={faXmark}
          iconSize="lg"
          variant="grey"
          size={36}
        />
      </div>
    </div>
  );
};

export default SearchBar;
