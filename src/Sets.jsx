import { useState, useEffect } from "react";
export default function Sets({
  defaultReps,
  setIndex,
  exerciseIndex,
  onSetDataChange,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [reps, setReps] = useState(defaultReps);
  const [weight, setWeight] = useState(0);

  const repId = `repetitions-${exerciseIndex}-${setIndex}`;
  const weightId = `repetitions-${exerciseIndex}-${setIndex}`;
  const completeId = `complete-${exerciseIndex}-${setIndex}`;

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const handleRepsChange = (event) => {
    setReps(Number(event.target.value));
  };

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value));
  };
  useEffect(() => {
    onSetDataChange({ setIndex, reps, weight, completeStatus: isChecked });
  }, [reps, weight, isChecked]);
  return (
    <div className={`set ${isChecked ? "complete" : ""}`}>
      <p>{`Set ${setIndex}`}</p>
      <label htmlFor={repId}>Reps:</label>
      <input
        type="number"
        id={repId}
        defaultValue={defaultReps}
        onChange={handleRepsChange}
      />
      <label htmlFor={weightId}>Weight:</label>
      <input
        type="number"
        id={weightId}
        defaultValue={0}
        onChange={handleWeightChange}
      />
      <label htmlFor={completeId}>Complete:</label>
      <input type="checkbox" id={completeId} onChange={handleCheck} />
    </div>
  );
}
