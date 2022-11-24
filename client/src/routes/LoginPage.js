import Button from "@components/common/Button";
import CenteredContainer from "@components/common/CenteredContainer";
import ErrorMessage from "@components/common/ErrorMessage";
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import { useAuthContext } from "@contexts/AuthContext";
import { validateEmail, validatePassword } from "@utils/validation";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuthContext();

  const from = location.state?.from?.pathname || "/";

  const areInputsEmpty =
    email.trim().length === 0 || password.trim().length === 0;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (areInputsEmpty) {
      if (areInputsEmpty) {
        return setError({
          message: "You must fill all fields.",
          email: email.trim().length === 0,
          password: password.trim().length === 0,
        });
      }
    }

    if (!isValidEmail) {
      return setError({
        message: "Please enter valid e-mail.",
        email: true,
        password: false,
      });
    }

    if (!isValidPassword) {
      return setError({
        message: "The password must be at least 5 characters long.",
        email: false,
        password: true,
      });
    }

    try {
      await signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CenteredContainer>
      <h1>Login</h1>

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
        <ErrorMessage isVisible={!!error.message}>{error.message}</ErrorMessage>
        <Button>Login</Button>
      </Form>
      <Link to="/signup">Don't have an account? Create one!</Link>
    </CenteredContainer>
  );
};

export default LoginPage;
