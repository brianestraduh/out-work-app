import { useState, useEffect } from "react";
import FormInput from "./components/FormInput";
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

      <FormInput
        label="Reps:"
        htmlFor={repId}
        type="number"
        id={repId}
        defaultValue={defaultReps}
        onChange={handleRepsChange}
      />
      <FormInput
        label="Weight:"
        htmlFor={weightId}
        type="number"
        id={weightId}
        defaultValue={0}
        onChange={handleWeightChange}
      />
      <FormInput
        label="Complete:"
        htmlFor={completeId}
        type="checkbox"
        id={completeId}
        onChange={handleCheck}
      />
    </div>
  );
}
