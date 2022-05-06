import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";
import { NotesProvider } from "./contexts/NotesContext";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
