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
  const isDarkTheme = useSelector((state) => state.darkMode);
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
    <div className="previous-wo-container">
      <Link to="/" className="secondary-dark-btn">
        Back
      </Link>
      <h1
        className={isDarkTheme ? "header-title-dark-text" : "header-title-text"}
      >
        Select a Workout
      </h1>
      <div className="exercise-workout-flex">
        {workouts.map((workout, index) => {
          return (
            <WorkoutButton
              key={workout.id}
              className={
                activeIndex === index
                  ? "selected-workout workout-select-card"
                  : "workout-select-card"
              }
              onClick={() => handleClick(index, workout)}
              workout={workout}
              index={index}
            >{`${workout.name} : ${workout.description}`}</WorkoutButton>
          );
        })}
      </div>
      {activeIndex !== null ? (
        <Link
          to={"/workoutSession"}
          className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
        >
          Start Workout
        </Link>
      ) : (
        <span className="disabled-btn">Start Workout</span>
      )}
    </div>
  );
}
export default Workout;
