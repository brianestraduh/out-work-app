import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { addWorkout, deleteWorkout } from "./helpers/workout.js";
import Modal from "./Modal.jsx";
function CreateEditWorkouts() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsUpdated, setWorkoutUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function getWorkouts() {
      const { data, error } = await supabase
        .from("workouts")
        .select(`id, name, description`);

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setWorkouts(data);
          console.log(data);
        }
      }
    }
    getWorkouts();

    return () => {
      ignore = true;
    };
  }, [workoutsUpdated]);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      await addWorkout(supabase, session, name, description);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
    setWorkoutUpdated(!workoutsUpdated);
  }

  const handleDelete = (id) => {
    setWorkoutToDelete(id);
    setShowModal(true);
  };

  const handleCancel = () => {
    // handle cancel action
    setShowModal(false);
  };

  const handleConfirm = async () => {
    // handle confirm action
    try {
      await deleteWorkout(supabase, workoutToDelete);
    } catch (error) {
      alert(error.message);
    }
    setShowModal(false);
    setWorkoutUpdated(!workoutsUpdated);
  };

  const handleEdit = (id) => {
    navigate(`/workout/${id}`);
  };

  return (
    <div>
      <div>
        <h2>Create Workouts</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              required
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              Create
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2>Edit Workouts</h2>
        {workouts.map((workout) => (
          <div key={workout.id}>
            <h3>{workout.name}</h3>
            <p>{workout.description}</p>
            <button type="button" onClick={() => handleEdit(workout.id)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(workout.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      {showModal && <Modal onConfirm={handleConfirm} onCancel={handleCancel} />}
      <Link to="/">Back</Link>
    </div>
  );
}
export default CreateEditWorkouts;
