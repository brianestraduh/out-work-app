import { useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { useNavigate, Link } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";

export default function EditExcerciseForm() {
  const exerciseData = useSelector((state) => state.exerciseId);
  const [name, setName] = useState(exerciseData.name);
  const [description, setDescription] = useState(exerciseData.description);
  const [muscleGroup, setMuscleGroup] = useState(exerciseData.muscle_group);
  const [defaultSets, setDefaultSets] = useState(exerciseData.default_sets);
  const [defaultReps, setDefaultReps] = useState(exerciseData.default_reps);
  const [showDialog, setShowDialog] = useState(false);
  const session = useSelector((state) => state.session);

  const navigate = useNavigate();

  async function updateExercise(event) {
    event.preventDefault();
    const { user } = session;

    const updatedExcercise = {
      name,
      description,
      created_by: user.id,
      muscle_group: muscleGroup,
      default_sets: defaultSets,
      default_reps: defaultReps,
    };

    try {
      const { data, error } = await supabase
        .from("exercises")
        .update(updatedExcercise)
        .eq("id", exerciseData.id);

      if (error) {
        if (error.code === "23505") {
          setShowDialog(true);
          throw error;
        }
      }

      console.log(data);
      console.log("Update successful");
      navigate("/editCreateExercises");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  }
  function handleOk() {
    setShowDialog(false);
  }

  return (
    <div>
      <h2>Edit Exercise</h2>
      <form onSubmit={updateExercise}>
        <label htmlFor="exercise-name">Exercise Name:</label>
        <input
          type="text"
          name="exercise-name"
          id="exercise-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="exercise-description">Description: </label>
        <input
          type="text"
          name="exercise-description"
          id="exercise-description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          name="muscle-group"
          id="muscle-group"
          onChange={(e) => setMuscleGroup(e.target.value)}
          value={muscleGroup}
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
          value={defaultSets}
          onChange={(e) => setDefaultSets(e.target.value)}
        />
        <label htmlFor="default-reps">Default Reps:</label>
        <input
          type="number"
          step="1"
          name="default-reps"
          id="default-reps"
          required
          value={defaultReps}
          onChange={(e) => setDefaultReps(e.target.value)}
        />
        <div>
          <button type="submit">Edit Excercise</button>
        </div>

        <Link to="/editCreateExercises">Back to Create or Edit Exercises</Link>
        {showDialog && <ErrorDialog onOk={handleOk} />}
      </form>
    </div>
  );
}
