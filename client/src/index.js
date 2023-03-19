import React from "react";
import ReactDOM from "react-dom";
import "./styles/general.scss";
import App from "./App";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";
import { LayoutProvider } from "@contexts/LayoutContext";
import { DndProvider } from "react-dnd";
import {
  MouseTransition,
  MultiBackend,
  TouchTransition,
} from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const dndOptions = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { delayTouchStart: 500 },
      transition: TouchTransition,
    },
  ],
};

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={MultiBackend} options={dndOptions}>
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
