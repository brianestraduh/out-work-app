import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSessionStats, fetchExerciseStats } from "./helpers/fetchStats";
import SessionStats from "./SessionStats";

function Progression() {
  const [sessions, setSessions] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [sessionCutOffDate, setSessionCutOffDate] = useState("this month");
  const [exerciseCutOffDate, setExerciseCutOffDate] = useState("this month");
  useEffect(() => {
    fetchSessionStats(sessionCutOffDate).then((data) => {
      setSessions(data);
    });
  }, [sessionCutOffDate]);
  useEffect(() => {
    fetchExerciseStats(exerciseCutOffDate).then((data) => {
      setExerciseData(data);
    });
  }, [exerciseCutOffDate]);

  function handleDateChange(event) {
    setSessionCutOffDate(event.target.value);
  }

  return (
    <div>
      <h1>Progression</h1>
      <Link to="/">Back</Link>
      <SessionStats onDateChange={handleDateChange} sessionData={sessions} />
    </div>
  );
}
export default Progression;
