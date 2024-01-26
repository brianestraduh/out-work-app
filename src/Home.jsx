import "./App.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkoutId } from "./redux/workoutSession/workoutIdSlice.js";
import { clearExerciseId } from "./redux/exercises/exerciseIdSlice.js";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    // used to ensure that these 2 slices are cleared when the user leaves the home page
    // this to ensure navigation works as intended
    return () => {
      dispatch(setWorkoutId(null));
      dispatch(clearExerciseId());
    };
  }, []);

  return (
    <div>
      <ul>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/startWorkout">Start Workout</Link>
        </li>
        <li>
          <Link to="/createEditWorkouts">Create or Edit Workouts</Link>
        </li>
        <li>
          <Link to="/editCreateExercises">Create or Edit Exercises</Link>
        </li>
        <li>
          <Link to="/previousWorkouts">Previous WorkOuts</Link>
        </li>
        <li>
          <Link to="/progression">Progression</Link>
        </li>
      </ul>
    </div>
  );
}
export default Home;
