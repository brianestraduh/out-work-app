import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../supaBase";
import { addWorkout, deleteWorkout } from "./helpers/workout.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import ErrorDialog from "./ErrorDialog.jsx";
import FormInput from "./components/FormInput.jsx";
import Button from "./components/Button.jsx";
import { setWorkoutsInfo } from "./redux/workoutSession/workoutsSlice.js";
function CreateEditWorkouts() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const workouts = useSelector((state) => state.workouts.workouts);
  const [workoutsUpdated, setWorkoutUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const session = useSelector((state) => state.session);
  const isDarkTheme = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(workouts) && workouts.length !== 0) {
      return;
    }
    const fetchExercises = async () => {
      const { data, error } = await supabase.from("workouts").select();
      dispatch(setWorkoutsInfo(data));
      console.log(data);
      if (error) console.log("Error: ", error);
    };
    fetchExercises();

    fetchExercises();
  }, [dispatch, workouts]);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      await addWorkout(
        supabase,
        session,
        name,
        description,
        dispatch,
        setWorkoutsInfo
      );
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
      await deleteWorkout(supabase, workoutToDelete, dispatch, setWorkoutsInfo);
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
    <div className="previous-wo-container">
      <Link to="/" className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}>
        Back
      </Link>
      <h2
        className={isDarkTheme ? "header-title-dark-text" : "header-title-text"}
      >
        Create and Edit Workouts
      </h2>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Create Workout</h2>
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
        <div className="btn-container">
          <Button
            type="submit"
            disabled={loading}
            className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
          >
            {"Create Workout"}
          </Button>
        </div>
      </form>
      <div>
        <ul>
          {workouts.map((workout) => (
            <li
              key={workout.id}
              draggable
              className="workout-list-grid ul-border"
            >
              <p
                className={
                  isDarkTheme ? "list-title-dark-text" : "list-title-text"
                }
              >
                {workout.name}
              </p>
              <p className={isDarkTheme ? "descr-dark-text" : "descr-text"}>
                {workout.description}
              </p>
              <div className="btn-container">
                <Link
                  to={`/workout/${workout.id}`}
                  className={
                    isDarkTheme ? "secondary-btn" : "secondary-dark-btn"
                  }
                >
                  Edit
                </Link>
                <Button
                  type="button"
                  onClick={() => handleDelete(workout.id)}
                  className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      {showDialog && <ErrorDialog onOk={handleOk} />}
    </div>
  );
}
export default CreateEditWorkouts;
