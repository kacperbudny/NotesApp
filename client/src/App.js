import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Login from "routes/Login";
import RequireAuth from "components/auth/RequireAuth";
import { NotesProvider } from "./contexts/NotesContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "routes/ErrorPage";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error) => {
        console.log(error);
      }}
    >
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
    </ErrorBoundary>
  );
}

export default App;
