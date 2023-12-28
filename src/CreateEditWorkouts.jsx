import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { addWorkout, deleteWorkout } from "./helpers/workout.js";
function CreateEditWorkouts() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsUpdated, setWorkoutUpdated] = useState(false);
  const session = useSelector((state) => state.session);
  useEffect(() => {
    let ignore = false;
    async function getWorkouts() {
      const { data, error } = await supabase
        .from("workouts")
        .select(`id, name, description`);

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setWorkouts(data);
          console.log(data);
        }
      }
    }
    getWorkouts();

    return () => {
      ignore = true;
    };
  }, [workoutsUpdated]);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      await addWorkout(supabase, session, name, description);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
    setWorkoutUpdated(!workoutsUpdated);
  }

  async function handleDelete(id) {
    try {
      await deleteWorkout(supabase, id);
    } catch (error) {
      alert(error.message);
    }
    setWorkoutUpdated(!workoutsUpdated);
  }
  return (
    <div>
      <div>
        <h2>Create Workouts</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              required
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              Create
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2>Edit Workouts</h2>
        {workouts.map((workout) => (
          <div key={workout.id}>
            <h3>{workout.name}</h3>
            <p>{workout.description}</p>
            <button type="button">Edit</button>
            <button type="button" onClick={() => handleDelete(workout.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}
export default CreateEditWorkouts;
