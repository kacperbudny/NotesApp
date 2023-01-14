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
import HOME_PAGE_DISPLAY_MODES from "@utils/constants/homePageDisplayModes";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route
          path={FRONTEND_ROUTES.login}
          element={
            <RequireNonAuth>
              <LoginPage />
            </RequireNonAuth>
          }
        />
        <Route
          path={FRONTEND_ROUTES.signup}
          element={
            <RequireNonAuth>
              <RegisterPage />
            </RequireNonAuth>
          }
        />
        <Route
          path={FRONTEND_ROUTES.homePage}
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
            path={FRONTEND_ROUTES.archive}
            element={<HomePage displayAs={HOME_PAGE_DISPLAY_MODES.archive} />}
          />
          <Route
            path={`${FRONTEND_ROUTES.tag}/:tag`}
            element={<HomePage displayAs={HOME_PAGE_DISPLAY_MODES.tags} />}
          />
          <Route
            path={FRONTEND_ROUTES.search}
            element={<HomePage displayAs={HOME_PAGE_DISPLAY_MODES.search} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
