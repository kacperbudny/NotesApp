import useAuth from "@hooks/useAuth";
import React from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.appName}>Notes App</h1>
      <button onClick={logout}>Log out</button>
    </header>
  );
};

export default Header;
