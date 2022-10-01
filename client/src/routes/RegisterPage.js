import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import useAuth from "@hooks/useAuth";
import useHandleError from "@hooks/useHandleError";
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const navigate = useNavigate();
  const { signUp, token } = useAuth();
  const handleError = useHandleError();

  useEffect(() => {
    if (password !== repeatPassword) {
      return setDoPasswordsMatch(false);
    }
    return setDoPasswordsMatch(true);
  }, [password, repeatPassword]);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doPasswordsMatch) return;

    try {
      await signUp({ email, password });
      navigate("/", { replace: true });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <CenteredContainer>
      <h1>Sign up</h1>

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
        <label>
          Repeat password:{" "}
          <input
            name="repeat-password"
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
        </label>
        {!doPasswordsMatch && <p>Your passwords must match.</p>}
        <button type="submit">Sign up</button>
      </form>
    </CenteredContainer>
  );
};

export default RegisterPage;
