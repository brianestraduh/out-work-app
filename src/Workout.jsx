import { Link } from "react-router-dom";
import supabase from "../supaBase";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setWorkoutId,
  setWorkoutName,
} from "./redux/navigation/workoutIdSlice";
import WorkoutButton from "./components/WorkoutButton";
function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  // Loading Workouts from table on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("workouts").select();
      setWorkouts(data);
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();
  }, []);

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
