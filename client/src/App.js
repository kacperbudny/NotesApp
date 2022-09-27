import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Login from "routes/Login";
import RequireAuth from "components/auth/RequireAuth";
import { NotesProvider } from "./contexts/NotesContext";
import { ToastContainer } from "react-toastify";
import toastConfig from "@utils/toastConfig";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <NotesProvider>
                <Home />
              </NotesProvider>
            </RequireAuth>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
