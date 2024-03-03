import { useState, useEffect } from "react";
import supabase from "../supaBase";

export default function ExercisePR() {
  const [exerciseRecords, setExerciseRecords] = useState([]);
  useEffect(() => {
    const fetchExerciseRecords = async () => {
      const { data, error } = await supabase
        .from("exercise_records")
        .select("*, exercises (name, muscle_group) ");
      if (error) console.log("error", error);
      else {
        console.log("data", data);
        setExerciseRecords(data);
      }
    };
    fetchExerciseRecords();
  }, []);

  return (
    <div>
      <h2>Exercise Records</h2>
      <ul>
        {exerciseRecords.map((record) => (
          <li key={record.id} className="card">
            <p>{record.exercises.name}</p>
            <p>{`1RM: ${record.one_rep_max ? record.one_rep_max : "-"}`}</p>
            <p>{`Max Volume: ${
              record.max_volume ? record.max_volume : "-"
            }`}</p>
            <p>{`PR: ${record.pr ? record.pr : "-"}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
