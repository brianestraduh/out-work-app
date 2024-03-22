import { Link, useParams } from "react-router-dom";
import { setWorkoutId } from "./redux/workoutSession/workoutIdSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import supabase from "../supaBase.js";
import { reorderExercises } from "./helpers/sortHelper.js";
import WorkoutExerciseItems from "./components/WorkOutExerciseItems.jsx";
import Button from "./components/Button.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
export default function EditWorkout() {
  const [exercises, setExercises] = useState([]);
  const [exerciseOrder, setExerciseOrder] = useState([]);
  const [exerciseToRemove, setExerciseToRemove] = useState();
  const [showModal, setShowModal] = useState(false);
  const [workoutUpdated, setWorkoutUpdated] = useState(false);
  const dispatch = useDispatch();
  const workoutId = useSelector((state) => state.workoutId.id);
  const { id: idString } = useParams();
  const id = Number(idString);
  const isDarkTheme = useSelector((state) => state.darkMode);
  //dragging reference
  const dragExcercise = useRef(0);
  const overTakenExcercise = useRef(0);

  //load exercises
  useEffect(() => {
    dispatch(setWorkoutId(id));
    const fetchExercises = async (id) => {
      console.log("workoutId", id);

      const { data, error } = await supabase
        .from("workout_exercises")
        .select(
          "*, exercises!workout_exercises_exercise_id_fkey(name, description, default_sets, default_reps, muscle_group)"
        )
        .eq("workout_id", id);

      console.log("error", error);

      // Restructure the objects in the data array
      const exercises = data.map((item) => ({
        ...item,
        name: item.exercises.name,
        description: item.exercises.description,
        defaultSets: item.exercises.default_sets,
        defaultReps: item.exercises.default_reps,
      }));
      console.log("exercise", exercises);
      setExercises(exercises);
      if (error) console.log("Error: ", error);
    };

    fetchExercises(id);
  }, [workoutUpdated]);

  //reordering of exercise order
  function handleDrag(dragIndex, dropIndex) {
    const { newExercises, newOrder } = reorderExercises(
      dragIndex,
      dropIndex,
      exercises
    );
    setExercises(newExercises);
    setExerciseOrder(newOrder);
  }
  //saving changes to the db
  async function handleSaveSort() {
    for (let exercise of exerciseOrder) {
      const { error } = await supabase
        .from("workout_exercises")
        .update({ index: exercise.index })
        .eq("exercise_id", exercise.name);

      if (error) {
        console.error("Error: ", error);
      }
    }
  }

  function handleRemove(id) {
    setExerciseToRemove(id);
    setShowModal(true);
  }
  const handleCancel = () => {
    // handle cancel action
    setShowModal(false);
  };
  // removing row from db, which removes exercise from workout
  const handleConfirm = async () => {
    // handle confirm action

    try {
      await supabase
        .from("workout_exercises")
        .delete()
        .eq("workout_id", id)
        .eq("exercise_id", exerciseToRemove);

      setShowModal(false);
      setWorkoutUpdated(!workoutUpdated);
      console.log("success!");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="previous-wo-container">
      <Link
        to="/createEditWorkouts"
        className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
      >
        Back
      </Link>
      <h2
        className={isDarkTheme ? "header-title-dark-text" : "header-title-text"}
      >
        {" "}
        {`Edit Workout ${id}`}
      </h2>
      <form>
        <div>
          <Link to={"/exerciseLibrary"} className="secondary-dark-btn">
            Add from Excercise Library
          </Link>
        </div>
      </form>
      <ul className="exercise-workout-flex">
        {exercises
          .sort((a, b) => a.index - b.index)
          .map((exercise, index) => {
            return (
              <li
                key={exercise.id}
                className="exercise-card"
                draggable={true}
                onDragStart={() => {
                  dragExcercise.current = index;
                }}
                onTouchStart={() => {
                  dragExcercise.current = index;
                }}
                onDragEnter={() => {
                  overTakenExcercise.current = index;
                }}
                onTouchMove={() => {
                  overTakenExcercise.current = index;
                }}
                onDragEnd={() =>
                  handleDrag(dragExcercise.current, overTakenExcercise.current)
                }
                onTouchEnd={() =>
                  handleDrag(dragExcercise.current, overTakenExcercise.current)
                }
              >
                <WorkoutExerciseItems exercise={exercise}>
                  <Button
                    onClick={() => handleRemove(exercise.id)}
                    className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
                  >
                    Remove
                  </Button>
                </WorkoutExerciseItems>
              </li>
            );
          })}
      </ul>
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      <button onClick={handleSaveSort} className="secondary-dark-btn">
        Save Order
      </button>
    </div>
  );
}
