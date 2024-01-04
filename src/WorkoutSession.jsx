import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { useEffect, useState } from "react";
import Exercise from "./Exercise";
export default function WorkoutSession() {
  const workoutId = useSelector((state) => state.workoutId);
  const [exercises, setExercises] = useState([]);
  const [startTime, setStartTime] = useState();

  useEffect(() => {
    // to be used to calculate workout duration
    setStartTime(new Date());
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
  }, []);
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
        <button disabled>Complete workout</button>
      </div>
      <Link to="/startWorkout">Back</Link>
    </div>
  );
}
