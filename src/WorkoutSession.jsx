import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../supaBase";
import { useEffect, useState, useRef } from "react";
import Exercise from "./Exercise";
import { clearExercises } from "./redux/workout/exerciseSlice";
export default function WorkoutSession() {
  const workoutId = useSelector((state) => state.workoutId);
  const session = useSelector((state) => state.session);
  const { user } = session;
  const exerciseStore = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // to be used to calculate workout duration
    startTimeRef.current = new Date();
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
        .eq("workout_id", workoutId);
      const exercisesList = data.map((item) => item.exercises);
      setExercises(exercisesList);
      if (error) console.log("Error: ", error);
    };

    fetchExercises();
    // clear the ExerciseStore when Session dismounts (ends)
    return () => {
      dispatch(clearExercises());
      console.log(exerciseStore, "dismount");
    };
  }, []);

  useEffect(() => {
    console.log(exerciseStore, "exerciseStore");
  }, [exerciseStore]);

  function workoutDuration(startTime) {
    const endTime = new Date();
    const durationMs = endTime - startTime;

    const minutes = Math.floor(durationMs / 60000); // convert to minutes

    return minutes;
  }

  async function postWorkoutSession() {
    const duration = workoutDuration(startTimeRef.current);
    try {
      const { data, error } = await supabase.from("workout_session").insert([
        {
          duration: duration,
          workout_id: workoutId,
          user_id: user.id,
        },
      ]);

      if (error) {
        console.error("Error inserting workout session:", error);
        // Handle the error (e.g., update the state to show an error message)
      } else {
        console.log("Workout session inserted successfully:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Handle the unexpected error (e.g., update the state to show an error message)
    }
  }

  return (
    <div>
      <h2>{`Workout ${workoutId}`}</h2>
      {/* NEED TO PASS THE WORKOUTNAME NOT THE ID, MAY NEED ANOTHER api CALL*/}
      {/* NEED LOGIC TO MAKE SURE USER UNDERSTANDS PRESSING BACK WILL DELETE THE WORKOUT*/}

      <ul>
        {exercises
          .sort((a, b) => a.index - b.index)
          .map((exercise, index) => {
            return (
              <Exercise
                key={exercise.id}
                exerciseDetails={exercise}
                index={index + 1}
              />
            );
          })}
      </ul>
      <div>
        <button onClick={postWorkoutSession}>Complete workout</button>
      </div>
      <Link to="/startWorkout">Back</Link>
    </div>
  );
}
