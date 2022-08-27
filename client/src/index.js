import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
