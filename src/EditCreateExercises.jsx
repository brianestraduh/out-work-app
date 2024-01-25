import { useEffect, useState } from "react";
import supabase from "../supaBase.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addExerciseId } from "./redux/exercises/exerciseIdSlice.js";
import ExerciseListItem from "./components/ExerciseListItem.jsx";
import { filterExercises } from "./helpers/filterHelper.js";
import FormSelect from "./components/FormSelect.jsx";
import FormInput from "./components/FormInput.jsx";
import Button from "./components/Button.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
export default function EditCreateExercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState();
  const [exercisesUpdated, setExercisesUpdated] = useState(false);
  const dispatch = useDispatch();
  // Inital load of exercises from supabase table
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select();
      setExercises(data);
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();
  }, [exercisesUpdated]);
  //HANDLES FILTER using search in combination with muscleGroup filter
  useEffect(() => {
    const filtered = filterExercises(exercises, muscleGroup, searchTerm);

    // Set the filtered exercises
    setFilteredExercises(filtered);
  }, [muscleGroup, searchTerm, exercises]);

  function editExercise(exercise) {
    dispatch(addExerciseId(exercise));
  }

  const handleCancel = () => {
    // handle cancel action
    setShowModal(false);
  };
  // removing row from db, which removes exercise from workout
  const handleConfirm = async () => {
    try {
      // Delete from workout_exercises
      await supabase
        .from("workout_exercises")
        .delete()
        .eq("exercise_id", exerciseToDelete);

      // Delete from exercise_sets
      await supabase
        .from("exercise_sets")
        .delete()
        .eq("exercise_id", exerciseToDelete);

      // Delete from exercises
      await supabase.from("exercises").delete().eq("id", exerciseToDelete);

      setShowModal(false);
      setExercisesUpdated(!exercisesUpdated);
      console.log("success!");
    } catch (error) {
      alert(error.message);
    }
  };

  function handleDelete(id) {
    setExerciseToDelete(id);
    setShowModal(true);
  }
  return (
    <div>
      <h2>Edit and Create Exercises</h2>
      <div>
        <Link to="/newExcercise">Add New Exercise</Link>
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
              className="drag"
              exercise={exercise}
            >
              <Link
                to={"/editExcercise"}
                onClick={() => editExercise(exercise)}
              >
                Edit
              </Link>
              <Button onClick={() => handleDelete(exercise.id)}>Delete</Button>
            </ExerciseListItem>
          ))
        ) : (
          <p>No exercises match your search.</p>
        )}
      </ul>
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      <Link to="/">Back</Link>
    </div>
  );
}
