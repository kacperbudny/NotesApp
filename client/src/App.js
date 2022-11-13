import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "@routes/HomePage";
import LoginPage from "@routes/LoginPage";
import RequireAuth from "@components/auth/RequireAuth";
import { ToastContainer } from "react-toastify";
import toastConfig from "@utils/toastConfig";
import NotFoundPage from "@routes/NotFoundPage";
import RegisterPage from "@routes/RegisterPage";
import RequireNonAuth from "@components/auth/RequireNonAuth";
import "react-toastify/dist/ReactToastify.css";
import { NotesProvider } from "@contexts/NotesContext";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";

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
                <Outlet />
              </NotesProvider>
            </RequireAuth>
          }
        >
          <Route index element={<HomePage />}></Route>
          <Route
            path="/archive"
            element={<HomePage displayAs={homePageDisplayModes.archive} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
