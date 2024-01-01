import { Link, useParams } from "react-router-dom";
import { setWorkoutId } from "./redux/navigation/workoutIdSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import supabase from "../supaBase.js";
export default function EditWorkout() {
  const [exercises, setExercises] = useState([]);
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
      console.log(data, "exercises");
      if (error) console.log("Error: ", error);
      else console.log("Data: ", data);
    };

    fetchExercises();
  }, []);
  function handleSort(dragIndex, dropIndex) {
    const newExercises = [...exercises];
    const draggedExercise = newExercises[dragIndex];
    newExercises.splice(dragIndex, 1); // Remove the dragged item
    newExercises.splice(dropIndex, 0, draggedExercise); // Insert the dragged item at the new position
    setExercises(newExercises);
  }
  return (
    <div>
      <h1> {`Edit Workout ${id}`}</h1>
      <form>
        <Link to={{ pathname: "/newExcercise", state: { workoutId: id } }}>
          Add New Excercise
        </Link>
        <button>Add Existing Excercise</button>
      </form>
      <ul>
        {exercises.map((exercise, index) => {
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
      <Link to="/createEditWorkouts">Back</Link>
    </div>
  );
}
//what do I want to do? When I create an excerise what should happen DONE
// I want to do 2 things, first add it to the excercise table but I then also want to associate it with
// the workout I created
// then I will display it within this EditWorkout Component
