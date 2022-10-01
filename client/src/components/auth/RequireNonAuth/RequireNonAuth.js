import useAuth from "@hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

const RequireNonAuth = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireNonAuth;
