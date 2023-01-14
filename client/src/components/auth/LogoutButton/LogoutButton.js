import { useAuthContext } from "@contexts/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./LogoutButton.module.scss";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

const LogoutButton = () => {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate(FRONTEND_ROUTES.login);
  };

  return (
    <button onClick={logout} className={styles.button}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
