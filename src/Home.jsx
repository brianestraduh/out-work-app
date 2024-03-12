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
    <div className="container">
      <div className="menu-grid">
        <div className="row">
          <Link className="menu-item" to="/account">
            Account
          </Link>
          <Link className="menu-item" to="/previousWorkouts">
            Previous WorkOuts
          </Link>
        </div>
        <div className="row">
          <Link className="menu-item" to="/createEditWorkouts">
            Create or Edit Workouts
          </Link>
          <Link className="menu-item" to="/editCreateExercises">
            Create or Edit Exercises
          </Link>
        </div>
        <div className="row">
          <Link className="menu-item" to="/progression">
            Progression
          </Link>
          <Link className="menu-item" to="/startWorkout">
            Start Workout
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
