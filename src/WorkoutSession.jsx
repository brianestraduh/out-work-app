import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { useEffect, useState } from "react";
import SessionDetails from "./sessionDetails";
export default function WorkoutSession() {
  const workoutId = useSelector((state) => state.workoutId);
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
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
      console.log(exercises);
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
              <SessionDetails
                key={exercise.id}
                exerciseDetails={exercise}
                index={index + 1}
              />
            );
          })}
      </ul>
      <Link to="/startWorkout">Back</Link>
    </div>
  );
}

//i'll do this tomorrow
// I want to create a Reps and Sets Component maybe even 1 nested in the other which
// will me responsible for rendering the sets/reps UI portion
// ideally making it so that it's easy 2 render the amount of sets/reps.
// user will need to complete a exercise and
