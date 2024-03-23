import { useEffect, useState } from "react";
import Sets from "./Sets";
import { useDispatch } from "react-redux";
import { upsertExercise } from "./redux/workoutSession/exerciseSlice";
import Button from "./components/Button";
export default function Exercise({ exerciseDetails, index, isDarkTheme }) {
  const { name, description, defaultSets, defaultReps, exercise_id } =
    exerciseDetails;
  const [sets, setSets] = useState(defaultSets);
  const [setsData, setSetsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let exerciseData = { exercise_id, setsData };
    console.log(exerciseData, "exerciseData");
    dispatch(upsertExercise(exerciseData));
  }, [setsData]);
  function handleAddSets() {
    setSets(sets + 1);
  }

  function handleRemoveSets() {
    setSets(sets - 1);
  }

  function handleSetDataChange(index, setData) {
    setSetsData((prevSetsData) => {
      const newSetsData = [...prevSetsData];
      newSetsData[index] = setData;
      console.log(newSetsData, "newSetsData");
      return newSetsData;
    });
  }

  return (
    <div className="workout-sess-card">
      <h2>{`Exercise ${index}`} </h2>
      <p>{name}</p>
      <p>{description}</p>
      {Array.from({ length: sets }).map((_, i) => {
        return (
          <Sets
            key={`${exercise_id}-${i}`}
            id={`${exercise_id}-${i}`}
            defaultReps={defaultReps}
            defaultWeight={0}
            completeStatus={false}
            exerciseIndex={index}
            setIndex={i + 1}
            onSetDataChange={(setData) => handleSetDataChange(i, setData)}
          />
        );
      })}
      <div className="btn-center-container">
        <Button
          onClick={handleAddSets}
          className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
        >
          Add Set
        </Button>
        <Button
          onClick={handleRemoveSets}
          className={isDarkTheme ? "secondary-dark-btn" : "secondary-btn"}
        >
          Remove Set
        </Button>
      </div>
    </div>
  );
}
