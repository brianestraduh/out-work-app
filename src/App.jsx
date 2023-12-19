import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Success from "./Success.jsx";
import Login from "./Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
