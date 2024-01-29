import { Link, useParams } from "react-router-dom";
import { setWorkoutId } from "./redux/workoutSession/workoutIdSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import supabase from "../supaBase.js";
import { reorderExercises } from "./helpers/sortHelper.js";
import ExerciseListItem from "./components/ExerciseListItem.jsx";
import Button from "./components/Button.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
export default function EditWorkout() {
  const [exercises, setExercises] = useState([]);
  const [exerciseOrder, setExerciseOrder] = useState([]);
  const [exerciseToRemove, setExerciseToRemove] = useState();
  const [showModal, setShowModal] = useState(false);
  const [workoutUpdated, setWorkoutUpdated] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  //dragging reference
  const dragExcercise = useRef(0);
  const overTakenExcercise = useRef(0);

  //load exercises
  useEffect(() => {
    dispatch(setWorkoutId(id));
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from("workout_exercises")
        .select(
          `
          exercises (
            *
          )
        `
        )
        .eq("workout_id", id);
      const exercises = data.map((item) => item.exercises);
      setExercises(exercises);
      if (error) console.log("Error: ", error);
    };

    fetchExercises();
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
    <div>
      <h1> {`Edit Workout ${id}`}</h1>
      <form>
        <div>
          <Link to={"/exerciseLibrary"}>Add from Excercise Library</Link>
        </div>
      </form>
      <ul>
        {exercises
          .sort((a, b) => a.index - b.index)
          .map((exercise, index) => {
            return (
              <ExerciseListItem
                key={exercise.id}
                exercise={exercise}
                className="drag"
                draggable={true}
                onDragStart={() => {
                  dragExcercise.current = index;
                }}
                onDragEnter={() => {
                  overTakenExcercise.current = index;
                }}
                onDragEnd={() =>
                  handleDrag(dragExcercise.current, overTakenExcercise.current)
                }
                onDragOver={(e) => e.preventDefault()}
              >
                <Button onClick={() => handleRemove(exercise.id)}>
                  Remove
                </Button>
              </ExerciseListItem>
            );
          })}
      </ul>
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      <button onClick={handleSaveSort}>Save Order</button>
      <Link to="/createEditWorkouts">Back</Link>
    </div>
  );
}
