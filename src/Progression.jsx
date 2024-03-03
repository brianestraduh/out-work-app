import { Link } from "react-router-dom";
import SessionStats from "./SessionStats";
import { ExerciseStats } from "./ExerciseStats";
import ExercisePR from "./ExercisePR";

function Progression() {
  return (
    <div>
      <h1>Progression</h1>
      <Link to="/">Back</Link>
      <SessionStats />
      <ExerciseStats />
      <ExercisePR />
    </div>
  );
}
export default Progression;
