import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "../supaBase.js";
import "./App.css";
import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Account from "./Account.jsx";
import Workout from "./Workout.jsx";
import CreateEditWorkouts from "./CreateEditWorkouts.jsx";
import AddExcerciseForm from "./AddExcerciseForm.jsx";
import PreviousWorkouts from "./PreviousWorkouts.jsx";
import Progresssion from "./Progression.jsx";
import EditWorkout from "./EditWorkout.jsx";
import EditCreateExercises from "./EditCreateExercises.jsx";
import WorkoutSession from "./WorkoutSession.jsx";
import EditExerciseForm from "./EditExcerciseForm.jsx";
import ExerciseLibrary from "./ExerciseLibrary.jsx";
import { setSession } from "./redux/session/sessionSlice.js";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      dispatch(setSession(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {session === null ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/account" element={<Account />} />
        <Route path="/startWorkout" element={<Workout />} />
        <Route path="/workoutSession" element={<WorkoutSession />} />
        <Route path="/workout/:id" element={<EditWorkout />} />
        <Route path="/createEditWorkouts" element={<CreateEditWorkouts />} />
        <Route path="/newExcercise" element={<AddExcerciseForm />} />
        <Route path="/editExcercise" element={<EditExerciseForm />} />
        <Route path="/editCreateExercises" element={<EditCreateExercises />} />
        <Route path="/exerciseLibrary" element={<ExerciseLibrary />} />
        <Route path="/previousWorkouts" element={<PreviousWorkouts />} />
        <Route path="/progression" element={<Progresssion />} />
      </Routes>
    </Router>
  );
}
export default App;
