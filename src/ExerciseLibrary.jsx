import { useEffect, useState } from "react";
import supabase from "../supaBase.js";
import { useSelector } from "react-redux";
import ErrorDialog from "./ErrorDialog.jsx";
import { Link, useNavigate } from "react-router-dom";
import ExerciseListItem from "./components/ExerciseListItem.jsx";
import FormInput from "./components/FormInput.jsx";
import FormSelect from "./components/FormSelect.jsx";
import { filterExercises } from "./helpers/filterHelper.js";
import Button from "./components/Button.jsx";

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSelector((state) => state.session);
  const { user } = session;
  const workoutId = useSelector((state) => state.workoutId);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // Inital load of exercises from supabase table
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select();
      setExercises(data);
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();
  }, []);
  //HANDLES FILTER using search in combination with muscleGroup filter
  useEffect(() => {
    const filtered = filterExercises(exercises, muscleGroup, searchTerm);

    // Set the filtered exercises
    setFilteredExercises(filtered);
  }, [muscleGroup, searchTerm, exercises]);

  async function handleAdd(id) {
    try {
      const exerciseToAdd = {
        workout_id: workoutId,
        exercise_id: id,
        user_id: user.id,
      };
      const { error } = await supabase
        .from("workout_exercises")
        .insert(exerciseToAdd)
        .select();

      navigate(`/workout/${workoutId}`);

      if (error) {
        if (error.code === "23505") {
          setShowDialog(true);
        }
        throw error;
      }
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  }
  function handleOk() {
    setShowDialog(false);
  }

  return (
    <div>
      <h2>Exercise Library</h2>
      <div>
        <Link to={`/workout/${workoutId}`}>Back to Edit Workout</Link>
      </div>
      <FormSelect
        label="Search by Muscle:"
        htmlFor="muscle-group-filter"
        name="muscle-group-filter"
        id="muscle-group-filter"
        onChange={(e) => setMuscleGroup(e.target.value)}
        value={muscleGroup}
      />
      <FormInput
        label="Search Exercises:"
        htmlFor="search"
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <ExerciseListItem
              key={exercise.id}
              exercise={exercise}
              className="drag"
            >
              <Button onClick={() => handleAdd(exercise.id)}>Add</Button>
            </ExerciseListItem>
          ))
        ) : (
          <p>No exercises match your search.</p>
        )}
      </ul>
      {showDialog && <ErrorDialog onOk={handleOk} />}
    </div>
  );
}
