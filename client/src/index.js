import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";
import { LayoutProvider } from "@contexts/LayoutContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <LayoutProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LayoutProvider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
