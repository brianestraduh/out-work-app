import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "../supaBase.js";
import "./App.css";
import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Workout from "./Workout.jsx";
import CreateWorkouts from "./CreateWorkouts.jsx";
import PreviousWorkouts from "./PreviousWorkouts.jsx";
import Progresssion from "./Progression.jsx";

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {session === null ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/createWorkouts" element={<CreateWorkouts />} />
        <Route path="/previousWorkouts" element={<PreviousWorkouts />} />
        <Route path="/progression" element={<Progresssion />} />
      </Routes>
    </Router>
  );
}
export default App;
