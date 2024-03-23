import { Link } from "react-router-dom";
import SessionStats from "./SessionStats";
import { ExerciseStats } from "./ExerciseStats";
import ExercisePR from "./ExercisePR";
import { useSelector } from "react-redux";

function Progression() {
  const isDarkTheme = useSelector((state) => state.darkMode);
  return (
    <div className="previous-wo-container">
      <Link to="/" className="secondary-dark-btn">
        Back
      </Link>
      <div className="stats-grid">
        <SessionStats />
        <ExerciseStats />
        <ExercisePR />
      </div>
    </div>
  );
}
export default Progression;
