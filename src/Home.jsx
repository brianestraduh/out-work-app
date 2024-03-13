import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkoutId } from "./redux/workoutSession/workoutIdSlice.js";
import { clearExerciseId } from "./redux/exercises/exerciseIdSlice.js";
import Card from "./components/Card.jsx";

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
    <div className="menu-container">
      <div className="menu-grid">
        <Card section="Account">Account</Card>
        <Card section="previousWorkouts">Previous Workouts</Card>
        <Card section="createEditWorkouts">Create or Edit Workouts</Card>
        <Card section="editCreateExercises">Edit or Create Exercises</Card>
        <Card section="progression">Prgoression</Card>
        <Card section="startWorkout">Start Workout</Card>
      </div>
    </div>
  );
}
export default Home;

//figure out container issues. Go look at a previous project and figure it out to avoid the issu
