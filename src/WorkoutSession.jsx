import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function WorkoutSession() {
  const workoutID = useSelector((state) => state.workoutID);
  return (
    <div>
      <h2>{`Workout ${workoutID}`}</h2>
      {/* NEED LOGIC TO MAKE SURE USER UNDERSTANDS PRESSING BACK WILL DELETE THE WORKOUT*/}
      <Link to="/startWorkout">Back</Link>
    </div>
  );
}

/// NEED TO DEBUG WHY THE WORKOUT ID IS UNDEFINED!
