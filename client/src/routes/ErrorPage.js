import { RefreshTokenError } from "@utils/errors";
import React from "react";
import { Navigate } from "react-router-dom";

export const ErrorPage = ({ error, resetErrorBoundary }) => {
  if (error instanceof RefreshTokenError) {
    return <Navigate to="/login" />;
  }

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
