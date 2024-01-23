import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../supaBase";
import { addWorkout, deleteWorkout } from "./helpers/workout.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import ErrorDialog from "./ErrorDialog.jsx";
import FormInput from "./components/FormInput.jsx";
import Button from "./components/Button.jsx";
function CreateEditWorkouts() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [workoutsUpdated, setWorkoutUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const session = useSelector((state) => state.session);

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
      setName("");
      setDescription("");
    } catch (error) {
      if (error.code === "23505") {
        setShowDialog(true);
        setLoading(false);
        throw error;
      }
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

  function handleOk() {
    setShowDialog(false);
  }

  return (
    <div>
      <div>
        <h2>Create Workouts</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            htmlFor="name"
            id="name"
            required={true}
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            label="Description"
            htmlFor="description"
            id="description"
            type="text"
            required={true}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <Button type="submit" disabled={loading}>
              {"Create Workout"}
            </Button>
          </div>
        </form>
      </div>
      <div>
        <h2>Edit Workouts</h2>
        {workouts.map((workout) => (
          <div key={workout.id} draggable className="drag">
            <h3>{workout.name}</h3>
            <p>{workout.description}</p>
            <Link to={`/workout/${workout.id}`}>Edit</Link>
            <Button type="button" onClick={() => handleDelete(workout.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      {showDialog && <ErrorDialog onOk={handleOk} />}
      <Link to="/">Back</Link>
    </div>
  );
}
export default CreateEditWorkouts;
