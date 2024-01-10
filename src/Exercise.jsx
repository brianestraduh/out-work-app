import { useEffect, useState } from "react";
import Sets from "./Sets";
import { useDispatch, useSelector } from "react-redux";
import { upsertExercise } from "./redux/workout/exerciseSlice";
export default function Exercise({ exerciseDetails, index }) {
  const { name, description, default_sets, default_reps, id } = exerciseDetails;
  const [sets, SetSets] = useState(default_sets);
  const [setsData, setSetsData] = useState([]);
  const dispatch = useDispatch();
  const exerciseStore = useSelector((state) => state.exercise);
  useEffect(() => {
    let exerciseData = { id, setsData };
    console.log(exerciseData, "exerciseData");
    dispatch(upsertExercise(exerciseData));
  }, [setsData]);
  function handleAddSets() {
    SetSets(sets + 1);
  }

  function handleSetDataChange(index, setData) {
    setSetsData((prevSetsData) => {
      const newSetsData = [...prevSetsData];
      newSetsData[index] = setData;
      return newSetsData;
    });
  }

  return (
    <div className="card">
      <h2>{`Exercise ${index}`} </h2>
      <p>{name}</p>
      <p>{description}</p>
      {Array.from({ length: sets }).map((_, i) => {
        return (
          <Sets
            key={i}
            defaultReps={default_reps}
            exerciseIndex={index}
            setIndex={i + 1}
            onSetDataChange={(setData) => handleSetDataChange(i, setData)}
          />
        );
      })}
      <button onClick={handleAddSets}>Add Set</button>
    </div>
  );
}

// I need to find a way to get the set info to WorkOut Session
// Maybe what I need to do is append the exercise ID to the set Data THEN
// I can use Redux to save that state and useSeletor to pass that to WorkoutSession

// from there we can on Submit make the POST call to get it to supabase in 3 tables

//NEED TO CREATE 3 Tables

/*Workouts table: Holds information about each workout. 
Columns could include workout_id, date, start_time, end_time.

Exercises table: Holds information about each exercise. 
Columns could include exercise_id, workout_id (as a foreign key linking to the Workouts table), name, description.

Sets table: Holds information about each set performed in each exercise. 
Columns could include set_id, exercise_id (as a foreign key linking to the Exercises table), reps, weight, complete_status.*/
