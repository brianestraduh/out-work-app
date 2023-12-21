import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const session = supabase.auth.getSession();

    setIsAuthenticated(!!session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar></Navbar>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/workout" element={<Workout />}></Route>
                <Route
                  path="/createWorkouts"
                  element={<CreateWorkouts />}
                ></Route>
                <Route
                  path="/previousWorkouts"
                  element={<PreviousWorkouts />}
                ></Route>
                <Route path="/progression" element={<Progresssion />}></Route>
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
export default App;
