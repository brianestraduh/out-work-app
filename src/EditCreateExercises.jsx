import { useEffect, useState } from "react";
import supabase from "../supaBase.js";
import { useSelector, useDispatch } from "react-redux";
import ErrorDialog from "./ErrorDialog.jsx";
import { Link, useNavigate } from "react-router-dom";
import { addExerciseId } from "./redux/exercises/exerciseIdSlice.js";
export default function EditCreateExercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Inital load of exercises from supabase table
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select();
      setExercises(data);
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();
  }, []);
  //HANDLES FILTER using search in combination with muscleGroup filter
  useEffect(() => {
    let filtered = exercises;

    // Filter by muscle group if selected
    if (muscleGroup !== "") {
      filtered = filtered.filter(
        (exercise) => exercise.muscle_group === muscleGroup
      );
    }

    // Filter by search term if entered
    if (searchTerm !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((exercise) =>
        exercise.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Set the filtered exercises
    setFilteredExercises(filtered);
  }, [muscleGroup, searchTerm, exercises]);

  function editExercise(exercise) {
    console.log(exercise);
    dispatch(addExerciseId(exercise));
    navigate("/editExcercise");
  }
  return (
    <div>
      <h2>Edit and Create Exercises</h2>
      <div>
        <Link to="/newExcercise">Add New Exercise</Link>
      </div>
      {/* REFACTOR AND MAKE THIS A COMPONENT AS IT IS ALSO USED IN ADDEXERCISEFORM JSX*/}
      <label htmlFor="muscle-group-filter">Search by Muscle:</label>
      <select
        name="muscle-group-filter"
        id="muscle-group-filter"
        onChange={(e) => setMuscleGroup(e.target.value)}
        value={muscleGroup}
      >
        <option value="">Select</option>
        <option value="chest-muscle">Chest</option>
        <option value="back-muscle">Back</option>
        <option value="shoulder-muscle">Shoulder</option>
        <option value="arm-muscle">Arm</option>
        <option value="abdominal-muscle">Abdominal</option>
        <option value="leg-muscle">Leg</option>
        <option value="hip-muscle">Hip</option>
        <option value="core-muscle">Core</option>
        <option value="forearm-muscle">Forearm</option>
        <option value="neck-muscle">Neck</option>
      </select>
      <div>
        <label htmlFor="search">Search Exercises:</label>
        <input
          id="search"
          type="text"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <li key={exercise.id} className="drag">
              <p>{exercise.name}</p>
              <p>{exercise.description}</p>
              <p>{exercise.muscle_group}</p>
              <p>Sets {exercise.default_sets}</p>
              <p>Reps {exercise.default_reps}</p>
              {/*
              EditExerciseForm component will reusue the AddExerciseForm and autofill the values in a useEffect
              then I will need to upsert into the 
              supabase table. Once thats all done I should be done with this feature
              
              After done I should make sure I didn't break anything. 
              I KNOW add New Exercise from EditCreateExercise DOES NOT work it is violating a workout_id contraint
              I need to clear the exerciseId slice after I add an exercise as well so the store is clear.*/}
              <button onClick={() => editExercise(exercise)}>Edit</button>
            </li>
          ))
        ) : (
          <p>No exercises match your search.</p>
        )}
      </ul>
    </div>
  );
}
