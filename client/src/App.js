import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Login from "routes/Login";
import RequireAuth from "components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
