import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSessions } from "./helpers/previousWorkouts";
import SessionStats from "./SessionStats";

function Progression() {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    //Here is what I need to do!
    // I want to make these fetches in a helper file to keep this compact
    // I need to fetch sessions and exercises from the database
    // I need to default the sessions retrieved to 1 month
    //Sessions will be easy not a complex call exercises ill need to join exercise_sets and exercises
    // As an input these functions will take in a date range parameter but it will default to the last month
    // if this parameter is updated (useEffect Dependency) I will need to make another call to the database
    // Once I have thee data in objects I can pass them to the SessionStats component and ExerciesStats components
    //Where I can implement more helper functions to calculate the data I need to aggergate and display
    // Also formate data such that it can be used in the chart.js library
  }, []);
  return (
    <div>
      <h1>Progression</h1>
      <Link to="/">Back</Link>
      <SessionStats />
    </div>
  );
}
export default Progression;
