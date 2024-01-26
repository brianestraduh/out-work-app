import { Link } from "react-router-dom";
import supabase from "../supaBase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWorkoutId,
  setWorkoutName,
} from "./redux/workoutSession/workoutIdSlice";
import WorkoutButton from "./components/WorkoutButton";
import { setWorkoutsInfo } from "./redux/workoutSession/workoutsSlice";
function Workout() {
  const workouts = useSelector((state) => state.workouts.workouts);
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  // Loading Workouts from table on component mount
  useEffect(() => {
    if (Array.isArray(workouts) && workouts.length !== 0) {
      return;
    }
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("workouts").select();
      dispatch(setWorkoutsInfo(data));
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();
  }, [dispatch, workouts]);

  //set Selected Workout
  function handleClick(i, workout) {
    if (activeIndex === i) {
      setActiveIndex(null);
    } else {
      setActiveIndex(i);
      dispatch(setWorkoutId(workout.id));
      dispatch(setWorkoutName(`${workout.name}: ${workout.description}`));
    }
  }
  return (
    <div>
      <h1>Select a Workout</h1>

      {workouts.map((workout, index) => {
        return (
          <WorkoutButton
            key={workout.id}
            className={activeIndex === index ? "active" : ""}
            onClick={() => handleClick(index, workout)}
            workout={workout}
            index={index}
          >{`${workout.name} : ${workout.description}`}</WorkoutButton>
        );
      })}
      <div>
        {activeIndex !== null ? (
          <Link to={"/workoutSession"} className="enabled-link">
            Start Workout
          </Link>
        ) : (
          <span className="disabled-link">Start Workout</span>
        )}
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}
export default Workout;
