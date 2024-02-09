import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSessionStats } from "./helpers/fetchStats";
import SessionStats from "./SessionStats";

function Progression() {
  const [sessions, setSessions] = useState([]);
  const [cutOffDate, setCutOffDate] = useState("this month");
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
    fetchSessionStats(cutOffDate).then((data) => {
      setSessions(data);
    });
  }, [cutOffDate]);

  function handleDateChange(event) {
    setCutOffDate(event.target.value);
  }
  useEffect(() => {
    console.log(sessions);
  }, [sessions]);
  return (
    <div>
      <h1>Progression</h1>
      <Link to="/">Back</Link>
      <SessionStats onDateChange={handleDateChange} sessionData={sessions} />
    </div>
  );
}
export default Progression;
