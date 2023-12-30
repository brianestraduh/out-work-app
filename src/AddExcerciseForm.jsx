import { useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { Link } from "react-router-dom";

export default function AddExcerciseForm() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [muscleGroup, setMuscleGroup] = useState();
  const [defaultSets, setDefaultSets] = useState();
  const [defaultReps, setDefaultReps] = useState();
  const workoutId = useSelector((state) => state.workoutId);
  const session = useSelector((state) => state.session);

  async function handleAddNew(event) {
    event.preventDefault();
    const { user } = session;

    const newExcercise = {
      name,
      description,
      created_by: user.id,
      muscle_group: muscleGroup,
      default_sets: defaultSets,
      default_reps: defaultReps,
    };

    try {
      const { error } = await supabase.from("exercises").upsert(newExcercise);
      if (error) throw error;

      // Navigate away or change state here, after the upsert operation has completed
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  }

  return (
    <div>
      <h2>New Excercise</h2>
      <form onSubmit={handleAddNew}>
        <label htmlFor="exercise-name">Exercise Name:</label>
        <input
          type="text"
          name="exercise-name"
          id="exercise-name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="exercise-description">Description: </label>
        <input
          type="text"
          name="exercise-description"
          id="exercise-description"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          name="muscle-group"
          id="muscle-group"
          onChange={(e) => setMuscleGroup(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="chest-muscle">Chest</option>
          <option value="back-muscle">Back</option>
          <option value="shoulder-muscle">Shoulder</option>
          <option value="arm-muscle">Arm</option>
          <option value="abdominal-muscle">Abdominal</option>
          <option value="leg-muscle">Leg</option>
          <option value="hip-muscle">Hip</option>
          <option value="core-muscle">Core</option>
          <option value="forearm-muscle">Forearm</option>
          <option value="neck-muscle">Neck</option>
        </select>
        <label htmlFor="default-sets">Default Sets:</label>
        <input
          type="number"
          step="1"
          name="default-sets"
          id="default-sets"
          required
          onChange={(e) => setDefaultSets(e.target.value)}
        />
        <label htmlFor="default-reps">Default Reps:</label>
        <input
          type="number"
          step="1"
          name="default-reps"
          id="default-reps"
          required
          onChange={(e) => setDefaultReps(e.target.value)}
        />
        <button type="submit">Create New Excercise</button>
        <Link to={`/workout/${workoutId}`}>Back to Edit Workout</Link>
      </form>
    </div>
  );
}
