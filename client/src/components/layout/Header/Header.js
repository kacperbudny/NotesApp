import LogoutButton from "@components/auth/LogoutButton/LogoutButton";
import useAuth from "@hooks/useAuth";
import React from "react";
import styles from "./Header.module.scss";
import PropTypes from "prop-types";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";
import { useLayoutContext } from "@contexts/LayoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@components/common/IconButton";

const getPageName = (displayAs) => {
  if (displayAs === homePageDisplayModes.home) {
    return "Notes App";
  } else {
    return displayAs
      .split("")
      .map((letter, index) =>
        index === 0 ? letter.toUpperCase() : letter.toLowerCase()
      )
      .join("");
  }
};

const Header = ({ displayAs }) => {
  const { user } = useAuth();
  const { toggleSidebarOpen } = useLayoutContext();

  const pageName = getPageName(displayAs);

  return (
    <header className={styles.header}>
      <div className={styles.groupContainer}>
        <IconButton onClick={toggleSidebarOpen} size={38}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </IconButton>
        <h1 className={styles.appName}>{pageName}</h1>
      </div>
      <div className={styles.groupContainer}>
        {user && (
          <p>
            Hello, <strong>{user.email}</strong>!
          </p>
        )}
        <LogoutButton />
      </div>
    </header>
  );
};

Header.propTypes = {
  displayAs: PropTypes.oneOf(Object.values(homePageDisplayModes)).isRequired,
};

export default Header;
