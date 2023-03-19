import LogoutButton from "@components/auth/LogoutButton";
import { useAuthContext } from "@contexts/AuthContext";
import React from "react";
import styles from "./Header.module.scss";
import { useLayoutContext } from "@contexts/LayoutContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@components/common/IconButton";
import { useParams } from "react-router-dom";
import SearchBar from "@components/layout/SearchBar";
import { Link } from "react-router-dom";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";
import usePath from "@hooks/usePath";

const getPageName = (path, tag) => {
  switch (path) {
    case FRONTEND_ROUTES.homePage:
    case FRONTEND_ROUTES.search: {
      return "Notes App";
    }
    case FRONTEND_ROUTES.tag: {
      return tag || "Tags";
    }
    default: {
      return path
        .slice(1)
        .split("")
        .map((letter, index) =>
          index === 0 ? letter.toUpperCase() : letter.toLowerCase()
        )
        .join("");
    }
  }
};

const Header = () => {
  const { user } = useAuthContext();
  const { toggleSidebarOpen } = useLayoutContext();
  const { tag } = useParams();
  const path = usePath();

  const pageName = getPageName(path, tag);

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
          {path === FRONTEND_ROUTES.homePage ||
          path === FRONTEND_ROUTES.search ? (
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
          <p className={styles.greeting}>
            Hello, <strong>{user.email}</strong>!
          </p>
        )}
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
