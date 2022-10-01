import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import useAuth from "@hooks/useAuth";
import useHandleError from "@hooks/useHandleError";
import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, token } = useAuth();
  const handleError = useHandleError();

  if (token) {
    return <Navigate to="/" replace />;
  }

  const from = location.state?.from?.pathname || "/";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <CenteredContainer>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          E-mail
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Create one!</Link>
    </CenteredContainer>
  );
};

export default LoginPage;
