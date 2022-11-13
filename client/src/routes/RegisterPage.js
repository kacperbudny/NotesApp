import Button from "@components/common/Button";
import CenteredContainer from "@components/common/CenteredContainer";
import ErrorMessage from "@components/common/ErrorMessage";
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import { useAuthContext } from "@contexts/AuthContext";
import { validateEmail, validatePassword } from "@utils/validation";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    email: false,
    password: false,
    repeatPassword: false,
  });

  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const areInputsEmpty =
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    repeatPassword.trim().length === 0;
  const doPasswordsMatch = password === repeatPassword;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

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

    if (areInputsEmpty) {
      return setError({
        message: "You must fill all fields.",
        email: email.trim().length === 0,
        password: password.trim().length === 0,
        repeatPassword: repeatPassword.trim().length === 0,
      });
    }

    if (!isValidEmail) {
      return setError({
        message: "Please enter valid e-mail.",
        email: true,
        password: false,
        repeatPassword: false,
      });
    }

    if (!doPasswordsMatch) {
      return setError({
        message: "Your passwords must match.",
        email: false,
        password: true,
        repeatPassword: true,
      });
    }

    if (!isValidPassword) {
      return setError({
        message: "The password must be at least 5 characters long.",
        email: false,
        password: true,
        repeatPassword: false,
      });
    }

    try {
      await signUp({ email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
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
          error={error.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={error.password}
        />
        <Input
          label="Repeat password"
          name="repeat-password"
          type="password"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
          error={error.repeatPassword}
        />
        <ErrorMessage isVisible={!!error.message}>{error.message}</ErrorMessage>
        <Button>Sign up</Button>
      </Form>
      <Link to="/login">Already have an account? Sign in!</Link>
    </CenteredContainer>
  );
};

export default RegisterPage;
