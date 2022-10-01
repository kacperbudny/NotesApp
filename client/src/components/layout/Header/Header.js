import LogoutButton from "@components/auth/LogoutButton/LogoutButton";
import useAuth from "@hooks/useAuth";
import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.appName}>Notes App</h1>
      <div className={styles.userPanel}>
        <p>
          Hello, <strong>{user && user.email}</strong>!
        </p>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
