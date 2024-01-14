import { useEffect, useState } from "react";
import supabase from "../supaBase.js";
import { useSelector } from "react-redux";
import ErrorDialog from "./ErrorDialog.jsx";
import { Link } from "react-router-dom";
export default function EditCreateExercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
              {/*I need to create a function that will
              onClick save the pertient information to the store look at onclick I think
              I can just pass exercise to the function
              in this function that I will create I need to useDispatch to pass an array to store
              I will need to modify exerciseIdSlice to an upsert as currently it is just for a string
              then once I have done that I will need to add navigate to the new....
              component will reusue the AddExerciseForm and autofill the values but the user can override
              the values the important pieces is the exercise id which I will need to upsert the 
              supabase table. Once thats all done I should be done with this feature */}
              <button onClick={(exercise) => EditExercise(exercise)}>
                Edit
              </button>
            </li>
          ))
        ) : (
          <p>No exercises match your search.</p>
        )}
      </ul>
    </div>
  );
}
