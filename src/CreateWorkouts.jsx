import { useState } from "react";
import supabase from "../supaBase.js";
import { useSelector } from "react-redux";
export default function CreateWorkouts() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const session = useSelector((state) => state.session);

  async function addWorkout(event) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const newWorkout = {
      name,
      description,
      created_by: user.id,
    };

    const { error } = await supabase.from("workouts").upsert(newWorkout);

    if (error) alert(error.message);

    setLoading(false);
  }
  return (
    <div>
      <h2>Create Workouts</h2>
      <form onSubmit={addWorkout}>
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
  );
}
