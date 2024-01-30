import { useEffect, useState } from "react";
import { fetchSessions } from "./helpers/previousWorkouts";

function PreviousWorkouts() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <h2>Test</h2>
    </div>
  );
}

export default PreviousWorkouts;
