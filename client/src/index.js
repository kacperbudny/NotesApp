import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";
import { LayoutProvider } from "@contexts/LayoutContext";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LayoutProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LayoutProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
