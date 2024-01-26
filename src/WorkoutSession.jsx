import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../supaBase";
import { useEffect, useState, useRef } from "react";
import Exercise from "./Exercise";
import { clearExercises } from "./redux/workout/exerciseSlice";
import { postWorkoutSession } from "./helpers/workoutSession";
export default function WorkoutSession() {
  const workoutId = useSelector((state) => state.workoutId);
  const session = useSelector((state) => state.session);
  const { user } = session;
  const exerciseStore = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState([]);
  const startTimeRef = useRef(null);
  const navigate = useNavigate();

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

  async function handlePostWorkout() {
    try {
      await postWorkoutSession(
        startTimeRef.current,
        workoutId,
        user.id,
        exerciseStore
      );
      navigate("/");
    } catch (error) {
      console.error("Error posting workout session:", error);
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
        {/* NEED TO ADD LOGIC TO MAKE SURE USER UNDERSTANDS WORKOUT will be saved*/}
        <button onClick={handlePostWorkout}>Complete workout</button>
      </div>
      <Link to="/startWorkout">Back</Link>
    </div>
  );
}
