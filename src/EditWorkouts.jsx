import supabase from "../supaBase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function EditWorkouts() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const session = useSelector((state) => state.session);

  useEffect(() => {
    let ignore = false;
    async function getWorkouts() {
      setLoading(true);
      const { user } = session;
      const { data, error } = await supabase
        .from("workouts")
        .select(`id, name, description`);

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setWorkouts(data);
        }
      }
      setLoading(false);
    }
    getWorkouts();
  }, []);

  return (
    <div>
      <h2>Edit Workouts</h2>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <h3>{workout.name}</h3>
          <p>{workout.description}</p>
          <button type="button">Edit</button>
          <button type="button">Delete</button>
        </div>
      ))}
    </div>
  );
}
