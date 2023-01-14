import LogoutButton from "@components/auth/LogoutButton";
import { useAuthContext } from "@contexts/AuthContext";
import React from "react";
import styles from "./Header.module.scss";
import PropTypes from "prop-types";
import HOME_PAGE_DISPLAY_MODES from "@utils/constants/homePageDisplayModes";
import { useLayoutContext } from "@contexts/LayoutContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@components/common/IconButton";
import { useParams } from "react-router-dom";
import SearchBar from "@components/layout/SearchBar";
import { Link } from "react-router-dom";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

const getPageName = (displayAs, tag) => {
  switch (displayAs) {
    case HOME_PAGE_DISPLAY_MODES.home:
    case HOME_PAGE_DISPLAY_MODES.search: {
      return "Notes App";
    }
    case HOME_PAGE_DISPLAY_MODES.tags: {
      return tag || "Tags";
    }
    default: {
      return displayAs
        .split("")
        .map((letter, index) =>
          index === 0 ? letter.toUpperCase() : letter.toLowerCase()
        )
        .join("");
    }
  }
};

const Header = ({ displayAs }) => {
  const { user } = useAuthContext();
  const { toggleSidebarOpen } = useLayoutContext();
  const { tag } = useParams();

  const pageName = getPageName(displayAs, tag);

  return (
    <header className={styles.header}>
      <div className={styles.groupContainer}>
        <IconButton
          onClick={toggleSidebarOpen}
          size={38}
          icon={faBars}
          iconSize="lg"
        />
        <h1 className={styles.appName}>
          {displayAs === HOME_PAGE_DISPLAY_MODES.home ||
          displayAs === HOME_PAGE_DISPLAY_MODES.search ? (
            <Link to={FRONTEND_ROUTES.homePage} className={styles.link}>
              {pageName}
            </Link>
          ) : (
            pageName
          )}
        </h1>
      </div>
      <SearchBar />
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
  displayAs: PropTypes.oneOf(Object.values(HOME_PAGE_DISPLAY_MODES)).isRequired,
};

export default Header;
