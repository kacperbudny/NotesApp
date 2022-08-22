import useAuth from "@hooks/useAuth";
import React from "react";
import {
  Navigate,
  useLocation,
} from "../../../../node_modules/react-router-dom/index";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
