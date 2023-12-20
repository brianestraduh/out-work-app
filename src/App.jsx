import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Workout from "./Workout.jsx";
import CreateWorkouts from "./CreateWorkouts.jsx";
import PreviousWorkouts from "./PreviousWorkouts.jsx";
import Progresssion from "./Progression.jsx";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workout" element={<Workout />}></Route>
          <Route path="/createWorkouts" element={<CreateWorkouts />}></Route>
          <Route
            path="/previousWorkouts"
            element={<PreviousWorkouts />}
          ></Route>
          <Route path="/progression" element={<Progresssion />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
