import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";
import { NotesProvider } from "./contexts/NotesContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NotesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
