import { Link, useParams } from "react-router-dom";
import { setWorkoutId } from "./redux/navigation/workoutIdSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import supabase from "../supaBase.js";
import { reorderExercises } from "./helpers/sortHelper.js";
export default function EditWorkout() {
  const [exercises, setExercises] = useState([]);
  const [exerciseOrder, setExerciseOrder] = useState([]);
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
  }, []);

  //
  function handleDrag(dragIndex, dropIndex) {
    const { newExercises, newOrder } = reorderExercises(
      dragIndex,
      dropIndex,
      exercises
    );
    setExercises(newExercises);
    setExerciseOrder(newOrder);
  }

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
                  handleDrag(dragExcercise.current, overTakenExcercise.current)
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
