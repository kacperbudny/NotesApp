import LogoutButton from "@components/auth/LogoutButton/LogoutButton";
import useAuth from "@hooks/useAuth";
import React from "react";
import styles from "./Header.module.scss";
import PropTypes from "prop-types";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";

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

  const pageName = getPageName(displayAs);

  return (
    <header className={styles.header}>
      <h1 className={styles.appName}>{pageName}</h1>
      <div className={styles.userPanel}>
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
