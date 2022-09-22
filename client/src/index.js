import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "routes/ErrorPage";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error) => {
        console.log(error);
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
