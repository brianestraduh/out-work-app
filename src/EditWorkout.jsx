import { Link, useParams } from "react-router-dom";
import { setWorkoutId } from "./redux/navigation/workoutIdSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function EditWorkout() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(setWorkoutId(id));
  }, []);
  console.log(id, "id");
  return (
    <div>
      <h1> Edit Workout</h1>
      <form>
        <Link to={{ pathname: "/newExcercise", state: { workoutId: id } }}>
          Add New Excercise
        </Link>
        <button>Add Existing Excercise</button>
      </form>
      <Link to="/createEditWorkouts">Back</Link>
    </div>
  );
}
//what do I want to do? When I create an excerise what should happen
// I want to do 2 things, first add it to the excercise table but I then also want to associate it with
// the workout I created
// then I will display it within this EditWorkout Component
