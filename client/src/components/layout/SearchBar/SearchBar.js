import IconButton from "@components/common/IconButton";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.scss";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isOnSearchRoute = location.pathname === FRONTEND_ROUTES.search;

  useEffect(() => {
    if (isOnSearchRoute) {
      const timeout = setTimeout(() => {
        if (searchQuery.length) {
          setSearchParams({ q: searchQuery });
        } else {
          setSearchParams({});
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [searchQuery, setSearchParams, isOnSearchRoute]);

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const handleSearchButtonClick = () => {
    navigate(FRONTEND_ROUTES.search);
    inputRef.current.focus();
  };

  const handleInputClick = () => {
    navigate(FRONTEND_ROUTES.search);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleCloseButtonClick = () => {
    navigate(FRONTEND_ROUTES.homePage);
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
        value={searchQuery}
        onChange={handleInputChange}
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
