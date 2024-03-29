import { useState, useEffect } from "react";
import ExerciseForm from "./components/ExerciseForm";

export default function Sets({
  defaultReps,
  defaultWeight,
  completeStatus,
  setIndex,
  exerciseIndex,
  onSetDataChange,
}) {
  const storageKey = `set-${exerciseIndex}-${setIndex}`;

  const getInitialState = (key, defaultValue) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue) {
      if (savedValue === "true") return true;
      if (savedValue === "false") return false;
      return JSON.parse(savedValue);
    }
    return defaultValue;
  };

  const [isChecked, setIsChecked] = useState(
    getInitialState(`${storageKey}-checked`, completeStatus)
  );
  const [reps, setReps] = useState(
    getInitialState(`${storageKey}-reps`, defaultReps.toString())
  );
  const [weight, setWeight] = useState(
    getInitialState(`${storageKey}-weight`, defaultWeight.toString())
  );

  const repId = `repetitions-${exerciseIndex}-${setIndex}`;
  const weightId = `repetitions-${exerciseIndex}-${setIndex}`;
  const completeId = `complete-${exerciseIndex}-${setIndex}`;

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  useEffect(() => {
    onSetDataChange({
      setIndex,
      reps: Number(reps),
      weight: Number(weight),
      completeStatus: isChecked,
    });
  }, [reps, weight, isChecked]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}-checked`, JSON.stringify(isChecked));
    sessionStorage.setItem(`${storageKey}-reps`, reps);
    sessionStorage.setItem(`${storageKey}-weight`, weight);
  }, [isChecked, reps, weight]);

  return (
    <div className={`Set ${isChecked ? "complete set-card" : "set-card"}`}>
      <p>{`Set ${setIndex}`}</p>
      <div className="exercise-set-grid">
        <ExerciseForm
          label="Reps"
          htmlFor={repId}
          type="number"
          id={repId}
          value={reps}
          onChange={handleRepsChange}
        />
        <ExerciseForm
          label="Weight (lbs)"
          htmlFor={weightId}
          type="number"
          id={weightId}
          value={weight}
          onChange={handleWeightChange}
        />
        <ExerciseForm
          label="Complete"
          htmlFor={completeId}
          type="checkbox"
          id={completeId}
          checked={isChecked}
          onChange={handleCheck}
        />
      </div>
    </div>
  );
}
