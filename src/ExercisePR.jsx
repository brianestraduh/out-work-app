import { useState, useEffect } from "react";
import supabase from "../supaBase";
import { filterExerciseRecords } from "./helpers/filterHelper";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";

export default function ExercisePR() {
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
  useEffect(() => {
    const filtered = filterExerciseRecords(
      exerciseRecords,
      muscleGroup,
      searchTerm
    );
    console.log("filtered", filtered);
    // Set the filtered exercises
    setFilteredExercises(filtered);
  }, [muscleGroup, searchTerm, exerciseRecords]);

  return (
    <div>
      <h2>Exercise Records</h2>
      <FormSelect
        label="Search by Muscle:"
        htmlFor="muscle-group-filter"
        name="muscle-group-filter"
        id="muscle-group-filter"
        onChange={(e) => setMuscleGroup(e.target.value)}
        value={muscleGroup}
      />
      <FormInput
        label="Search Exercises:"
        htmlFor="search"
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredExercises.map((record) => (
          <li key={record.id} className="card">
            <p>{record.exercises.name}</p>
            <p>{`1RM: ${record.one_rep_max ? record.one_rep_max : "-"} lbs`}</p>
            <p>{`Max Volume: ${
              record.max_volume ? record.max_volume : "-"
            } lbs`}</p>
            <p>{`PR: ${record.pr ? record.pr : "-"} lbs`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
