import { Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
