import useAuth from "@hooks/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <button onClick={logout} className={styles.button}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
