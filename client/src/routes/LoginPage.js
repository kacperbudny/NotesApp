import Button from "@components/common/Button/Button";
import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import ErrorMessage from "@components/common/ErrorMessage/ErrorMessage";
import Form from "@components/common/Form/Form";
import Input from "@components/common/Input/Input";
import useAuth from "@hooks/useAuth";
import { validateEmail, validatePassword } from "@utils/validation";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

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
      return setError("You must fill all fields.");
    }

    if (!isValidEmail) {
      return setError("Please enter valid e-mail.");
    }

    if (!isValidPassword) {
      return setError("The password must be at least 5 characters long.");
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
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <ErrorMessage isVisible={!!error}>{error}</ErrorMessage>
        <Button>Login</Button>
      </Form>
      <Link to="/signup">Don't have an account? Create one!</Link>
    </CenteredContainer>
  );
};

export default LoginPage;
