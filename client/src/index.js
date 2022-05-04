import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import { NotesProvider } from "./contexts/NotesContext";

ReactDOM.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
