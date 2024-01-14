import "./App.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkoutId } from "./redux/navigation/workoutIdSlice.js";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setWorkoutId(null));
      console.log("dismount");
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
