import { useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { useNavigate, Link } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
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
        <div>
          <button type="submit">Edit Excercise</button>
        </div>

        <Link to="/editCreateExercises">Back to Create or Edit Exercises</Link>
        {showDialog && (
          <ErrorDialog onOk={handleOk}>Exercise Already Exists.</ErrorDialog>
        )}
      </form>
    </div>
  );
}
