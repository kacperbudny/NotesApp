import { useAuthContext } from "@contexts/AuthContext";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";
import React from "react";
import { Navigate } from "react-router-dom";

const RequireNonAuth = ({ children }) => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to={FRONTEND_ROUTES.homePage} replace />;
  }

  return children;
};

export default RequireNonAuth;
