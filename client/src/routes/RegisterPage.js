import Button from "@components/common/Button/Button";
import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import ErrorMessage from "@components/common/ErrorMessage/ErrorMessage";
import Form from "@components/common/Form/Form";
import Input from "@components/common/Input/Input";
import useAuth from "@hooks/useAuth";
import useHandleError from "@hooks/useHandleError";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signUp } = useAuth();
  const handleError = useHandleError();

  useEffect(() => {
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      repeatPassword.trim().length === 0
    ) {
      return setError("You must fill all fields.");
    }

    if (password !== repeatPassword) {
      return setError("Your passwords must match.");
    }

    return setError("");
  }, [email, password, repeatPassword]);

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

    if (error) return;

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

      <Form onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          label="Repeat password"
          name="repeat-password"
          type="password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
        <ErrorMessage isVisible={!!error}>{error}</ErrorMessage>
        <Button>Sign up</Button>
      </Form>
    </CenteredContainer>
  );
};

export default RegisterPage;
