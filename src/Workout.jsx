import { Link } from "react-router-dom";
import supabase from "../supaBase";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWorkoutId } from "./redux/navigation/workoutIdSlice";
function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  const workoutID = useSelector((state) => state.workoutID);
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("workouts").select();
      setWorkouts(data);
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();
  }, []);
  return (
    <div>
      <h1>Select a Workout</h1>

      {workouts.map((workout, index) => {
        return (
          <button
            key={workout.id}
            className={`drag ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              if (activeIndex === index) {
                setActiveIndex(null);
              } else {
                console.log(workoutID, "pre");
                setActiveIndex(index);
                dispatch(setWorkoutId(workout.id));
                console.log(workoutID, "post");
              }
            }}
          >
            {workout.name}: {workout.description}
          </button>
        );
      })}
      <div>
        {activeIndex !== null ? (
          <Link to="/workoutSession" className="enabled-link">
            <Link to={"/workoutSession"} className="enabled-link"></Link>
            Go to Workout Session
          </Link>
        ) : (
          <span className="disabled-link">Go to Workout Session</span>
        )}
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}
export default Workout;
