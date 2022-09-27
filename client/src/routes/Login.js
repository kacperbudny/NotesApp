import useAuth from "@hooks/useAuth";
import useHandleError from "@hooks/useHandleError";
import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const Login = () => {
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
    <div>
      <p>You must log in</p>

      <form onSubmit={handleSubmit}>
        <label>
          E-mail:{" "}
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
