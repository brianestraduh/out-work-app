import "./App.css";
import { Link } from "react-router-dom";

function Home() {
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
          <Link to="/exerciseLibrary">Create or Edit Exercises</Link>
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
