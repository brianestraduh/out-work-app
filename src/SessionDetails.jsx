import { useEffect } from "react";
import Sets from "./Sets";
export default function SessionDetails({ exerciseDetails, index }) {
  const { name, description, default_sets, default_reps } = exerciseDetails;
  useEffect(() => {
    console.log(exerciseDetails);
  }, []);
  return (
    <div className="card">
      <h2>{`Exercise ${index}`} </h2>
      <p>{name}</p>
      <p>{description}</p>
      {Array.from({ length: default_sets }).map((_, i) => {
        return (
          <Sets
            key={i}
            defaultReps={default_reps}
            exerciseIndex={index}
            setIndex={i + 1}
          />
        );
      })}
    </div>
  );
}
