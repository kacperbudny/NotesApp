import { useAuthContext } from "@contexts/AuthContext";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { token } = useAuthContext();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate to={FRONTEND_ROUTES.login} state={{ from: location }} replace />
    );
  }

  return children;
};

export default RequireAuth;
