import Button from "@components/common/Button/Button";
import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import Form from "@components/common/Form/Form";
import Input from "@components/common/Input/Input";
import useAuth from "@hooks/useAuth";
import useHandleError from "@hooks/useHandleError";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const handleError = useHandleError();

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
        <Button>Login</Button>
      </Form>
      <Link to="/signup">Don't have an account? Create one!</Link>
    </CenteredContainer>
  );
};

export default LoginPage;
