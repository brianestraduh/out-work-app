import { useState } from "react";
export default function Sets({ defaultReps, setIndex, exerciseIndex }) {
  const [isChecked, setIsChecked] = useState(false);
  const repId = `repetitions-${exerciseIndex}-${setIndex}`;
  const weightId = `repetitions-${exerciseIndex}-${setIndex}`;
  const completeId = `complete-${exerciseIndex}-${setIndex}`;

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`set ${isChecked ? "complete" : ""}`}>
      <p>{`Set ${setIndex}`}</p>
      <label htmlFor={repId}>Reps:</label>
      <input type="number" id={weightId} defaultValue={defaultReps} />
      <label htmlFor={weightId}>Weight:</label>
      <input type="number" id={weightId} defaultValue={0} />
      <label htmlFor={completeId}>Complete:</label>
      <input type="checkbox" id={completeId} onChange={handleCheck} />
    </div>
  );
}
