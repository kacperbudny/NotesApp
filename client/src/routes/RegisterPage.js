import Button from "@components/common/Button/Button";
import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import ErrorMessage from "@components/common/ErrorMessage/ErrorMessage";
import Form from "@components/common/Form/Form";
import Input from "@components/common/Input/Input";
import useAuth from "@hooks/useAuth";
import { validateEmail, validatePassword } from "@utils/validation";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signUp } = useAuth();

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
      return setError("You must fill all fields.");
    }

    if (!isValidEmail) {
      return setError("Please enter valid e-mail.");
    }

    if (!doPasswordsMatch) {
      return setError("Your passwords must match.");
    }

    if (!isValidPassword) {
      return setError("The password must be at least 5 characters long.");
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
      <Link to="/login">Already have an account? Sign in!</Link>
    </CenteredContainer>
  );
};

export default RegisterPage;
