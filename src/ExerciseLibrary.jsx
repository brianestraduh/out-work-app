import { useEffect, useState } from "react";
import supabase from "../supaBase.js";
import { useSelector, useDispatch } from "react-redux";
import ErrorDialog from "./ErrorDialog.jsx";
import { Link, useNavigate } from "react-router-dom";
import ExerciseListItem from "./components/ExerciseListItem.jsx";
import FormInput from "./components/FormInput.jsx";
import FormSelect from "./components/FormSelect.jsx";
import { filterExercises } from "./helpers/filterHelper.js";
import Button from "./components/Button.jsx";
import { addExerciseId } from "./redux/exercises/exerciseIdSlice.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { setExerciseList } from "./redux/exercises/exerciseListSlice.js";
import dumbell from "./assets/dumbell.svg";
import darkDumbell from "./assets/dumbell-dark.svg";
import backDark from "./assets/back-dark.svg";
import backLight from "./assets/back-light.svg";

export default function ExerciseLibrary() {
  const exercises = useSelector((state) => state.exerciseList.exerciseList);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState();
  const session = useSelector((state) => state.session);
  const { user } = session;
  const workoutId = useSelector((state) => state.workoutId.id);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.darkMode);

  // Inital load of exercises from supabase table
  useEffect(() => {
    if (Array.isArray(exercises) && exercises.length !== 0) {
      return;
    }

    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select();
      dispatch(setExerciseList(data));
      console.log("store", exercises);
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
      //This is to update exerciseList in store and update UI of ExerciseLibrary
      try {
        const { data, error } = await supabase.from("exercises").select();
        if (error) {
          console.error("Error fetching exercises:", error);
          // Handle the error as needed
          return;
        }

        dispatch(setExerciseList(data));
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function handleDelete(id) {
    setExerciseToDelete(id);
    setShowModal(true);
  }

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
    <div className="exercise-container">
      {workoutId === null && (
        <Link to="/newExcercise" className="blank-exercise-btn">
          <img
            className="img-exercise"
            src={isDarkTheme ? darkDumbell : dumbell}
          ></img>
          <span
            className={
              isDarkTheme ? "new-exercise-dark-txt" : "new-exercise-txt"
            }
          >
            Add New Exercise
          </span>
        </Link>
      )}
      {workoutId === null && (
        <Link to="/">
          <img
            src={isDarkTheme ? backDark : backLight}
            alt="back-arrow-icon"
            className="back-btn img-back"
          />
        </Link>
      )}
      {workoutId && (
        <Link to={`/workout/${workoutId}`}>Back to Edit Workout</Link>
      )}
      <FormSelect
        label="Search by Muscle:"
        htmlFor="muscle-group-filter"
        name="muscle-group-filter"
        id="muscle-group-filter"
        onChange={(e) => setMuscleGroup(e.target.value)}
        value={muscleGroup}
        className="width-50"
        isDarkTheme={isDarkTheme}
      />
      <FormInput
        label="Search Exercises:"
        htmlFor="search"
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="width-50"
        isDarkTheme={isDarkTheme}
      />
      <ul>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <ExerciseListItem
              key={exercise.id}
              exercise={exercise}
              className="drag"
              isDarkTheme={isDarkTheme}
            >
              <div className="btn-container">
                {workoutId && (
                  <Button onClick={() => handleAdd(exercise.id)}>Add</Button>
                )}
                {workoutId === null && (
                  <Link
                    to={"/editExcercise"}
                    onClick={() => editExercise(exercise)}
                    className={
                      isDarkTheme ? "secondary-btn" : "secondary-dark-btn"
                    }
                  >
                    Edit
                  </Link>
                )}
                {workoutId === null && (
                  <Button
                    onClick={() => handleDelete(exercise.id)}
                    className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}
                  >
                    Delete
                  </Button>
                )}
              </div>
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
      {showDialog && <ErrorDialog onOk={handleOk} />}
    </div>
  );
}
