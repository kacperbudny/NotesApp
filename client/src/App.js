import { Routes, Route } from "react-router-dom";
import HomePage from "@routes/HomePage";
import LoginPage from "@routes/LoginPage";
import RequireAuth from "components/auth/RequireAuth";
import { NotesProvider } from "./contexts/NotesContext";
import { ToastContainer } from "react-toastify";
import toastConfig from "@utils/toastConfig";
import NotFoundPage from "@routes/NotFoundPage";
import RegisterPage from "@routes/RegisterPage";
import RequireNonAuth from "@components/auth/RequireNonAuth/RequireNonAuth";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNonAuth>
              <LoginPage />
            </RequireNonAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireNonAuth>
              <RegisterPage />
            </RequireNonAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <NotesProvider>
                <HomePage />
              </NotesProvider>
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
