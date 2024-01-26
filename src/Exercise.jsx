import { useEffect, useState } from "react";
import Sets from "./Sets";
import { useDispatch, useSelector } from "react-redux";
import { upsertExercise } from "./redux/workout/exerciseSlice";
export default function Exercise({ exerciseDetails, index }) {
  const { name, description, default_sets, default_reps, id } = exerciseDetails;
  const [sets, SetSets] = useState(default_sets);
  const [setsData, setSetsData] = useState([]);
  const dispatch = useDispatch();

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
