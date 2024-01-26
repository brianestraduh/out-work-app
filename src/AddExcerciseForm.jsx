import { useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { Link } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";

export default function AddExcerciseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [defaultSets, setDefaultSets] = useState("");
  const [defaultReps, setDefaultReps] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const workoutId = useSelector((state) => state.workoutId.id);
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
      const { data, error } = await supabase
        .from("exercises")
        .insert(newExcercise)
        .select();
      setName("");
      setDescription("");
      setMuscleGroup("");
      setDefaultSets("");
      setDefaultReps("");

      if (error) {
        if (error.code === "23505") {
          setShowDialog(true);
          throw error;
        }
      }

      // Get the id of the newly inserted exercise
      const exerciseId = data[0].id;

      // Insert a new entry into the workout_exercises table
      const { error: workoutExerciseError } = await supabase
        .from("workout_exercises")
        .insert([
          { workout_id: workoutId, exercise_id: exerciseId, user_id: user.id },
        ]);

      if (workoutExerciseError) throw workoutExerciseError;

      // Navigate away or change state here, after the insert operation has completed
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  }
  function handleOk() {
    setShowDialog(false);
  }

  return (
    <div>
      <h2>New Excercise</h2>
      <form onSubmit={handleAddNew}>
        <FormInput
          label="Exercise Name:"
          htmlFor="exercise-name"
          type="text"
          name="exercise-name"
          id="exercise-name"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Description: "
          htmlFor="exercise-description"
          type="text"
          name="exercise-description"
          id="exercise-description"
          required={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormSelect
          label="Search by Muscle:"
          htmlFor="muscle-group-filter"
          name="muscle-group-filter"
          id="muscle-group-filter"
          onChange={(e) => setMuscleGroup(e.target.value)}
          value={muscleGroup}
        />
        <FormInput
          label="Default Sets:"
          htmlFor="default-sets"
          type="number"
          step="1"
          name="default-sets"
          id="default-sets"
          required={true}
          value={defaultSets}
          onChange={(e) => setDefaultSets(e.target.value)}
        />
        <FormInput
          label="Default Reps:"
          htmlFor="default-reps"
          type="number"
          step="1"
          name="default-reps"
          id="default-reps"
          required={true}
          value={defaultReps}
          onChange={(e) => setDefaultReps(e.target.value)}
        />
        {showDialog && (
          <ErrorDialog onOk={handleOk}>Exercise Already Exists.</ErrorDialog>
        )}
        <button type="submit">Create New Excercise</button>
        {workoutId ? (
          <Link to={`/workout/${workoutId}`}>Back to Edit Workout</Link>
        ) : (
          <Link to="/editCreateExercises">
            Back to Create or Edit Exercises
          </Link>
        )}
      </form>
    </div>
  );
}
