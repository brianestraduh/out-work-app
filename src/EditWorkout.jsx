import { Link } from "react-router-dom";
export default function EditWorkout() {
  return (
    <div>
      <h1> Edit Workout</h1>
      <form>
        <button>Create New Excercise</button>
        <button>Add Existing Excercise</button>
      </form>
      <Link to="/createEditWorkouts">Back</Link>
    </div>
  );
}
