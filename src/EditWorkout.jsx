import { Link, useParams } from "react-router-dom";
import { setWorkoutId } from "./redux/navigation/workoutIdSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import supabase from "../supaBase.js";
export default function EditWorkout() {
  const [exercises, setExercises] = useState([]);
  const [exerciseOrder, setExerciseOrder] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  //dragging reference
  const dragExcercise = useRef(0);
  const overTakenExcercise = useRef(0);
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
  }, []);
  // this function first handles the sorting of exercises based on what was dragged and dropped [39-50]
  //it then creates an array containing the new index and associated workout id
  // which is saved to a state variable where it can be used to save the new order in another function
  function handleSort(dragIndex, dropIndex) {
    const newExercises = [...exercises];
    const draggedExercise = newExercises[dragIndex];

    newExercises.splice(dragIndex, 1); // Remove the dragged item
    newExercises.splice(dropIndex, 0, draggedExercise); // Insert the dragged item at the new position

    // Update the index property of each exercise
    newExercises.forEach((exercise, index) => {
      exercise.index = index;
    });

    setExercises(newExercises);
    //create an array of objects where
    const newOrder = newExercises.map((exercise, index) => ({
      index,
      name: exercise.id,
    }));
    setExerciseOrder(newOrder);
    console.log(newOrder); // Use newIndex instead of indexes
  }
  // this function saves the new order of the exercises associated with this workout.
  async function handleSaveSort() {
    console.log(exerciseOrder);
    for (let exercise of exerciseOrder) {
      const { error } = await supabase
        .from("workout_exercises")
        .update({ index: exercise.index })
        .eq("exercise_id", exercise.name);
      console.log("success");

      if (error) {
        console.error("Error: ", error);
      }
    }
  }
  return (
    <div>
      <h1> {`Edit Workout ${id}`}</h1>
      <form>
        <div>
          <Link to={"/newExcercise"}>Add New Excercise</Link>
        </div>
        <div>
          <Link to={"/exerciseLibrary"}>Add Existing Excercise</Link>
        </div>
      </form>
      <ul>
        {exercises
          .sort((a, b) => a.index - b.index)
          .map((exercise, index) => {
            return (
              <li
                key={exercise.id}
                className="drag"
                draggable
                onDragStart={() => {
                  dragExcercise.current = index;
                }}
                onDragEnter={() => {
                  overTakenExcercise.current = index;
                }}
                onDragEnd={() =>
                  handleSort(dragExcercise.current, overTakenExcercise.current)
                }
                onDragOver={(e) => e.preventDefault()}
              >
                <p>{exercise.name}</p>
                <p>Sets {exercise.default_sets}</p>
                <p>Reps {exercise.default_reps}</p>
              </li>
            );
          })}
      </ul>
      <button onClick={handleSaveSort}>Save Order</button>
      <Link to="/createEditWorkouts">Back</Link>
    </div>
  );
}
