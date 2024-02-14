import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchSessionStats } from "./helpers/fetchStats";
import SessionStats from "./SessionStats";
import { ExerciseStats } from "./ExerciseStats";

function Progression() {
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseCutOffDate, setExerciseCutOffDate] = useState("this month");

  // useEffect(() => {
  //   fetchExerciseStats(exerciseCutOffDate).then((data) => {
  //     setExerciseData(data);
  //   });
  // }, [exerciseCutOffDate]);

  return (
    <div>
      <h1>Progression</h1>
      <Link to="/">Back</Link>
      <SessionStats />
      <ExerciseStats />
    </div>
  );
}
export default Progression;
