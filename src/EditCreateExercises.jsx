import { useEffect, useState } from "react";
import supabase from "../supaBase.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addExerciseId } from "./redux/exercises/exerciseIdSlice.js";
import ExerciseListItem from "./components/ExerciseListItem.jsx";
import { filterExercises } from "./helpers/filterHelper.js";
import FormSelect from "./components/FormSelect.jsx";
import FormInput from "./components/FormInput.jsx";
export default function EditCreateExercises() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
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
    const filtered = filterExercises(exercises, muscleGroup, searchTerm);

    // Set the filtered exercises
    setFilteredExercises(filtered);
  }, [muscleGroup, searchTerm, exercises]);

  function editExercise(exercise) {
    dispatch(addExerciseId(exercise));
  }
  return (
    <div>
      <h2>Edit and Create Exercises</h2>
      <div>
        <Link to="/newExcercise">Add New Exercise</Link>
      </div>
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
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <ExerciseListItem
              key={exercise.id}
              className="drag"
              exercise={exercise}
            >
              <Link
                to={"/editExcercise"}
                onClick={() => editExercise(exercise)}
              >
                Edit
              </Link>
            </ExerciseListItem>
          ))
        ) : (
          <p>No exercises match your search.</p>
        )}
      </ul>
      <Link to="/">Back</Link>
    </div>
  );
}
