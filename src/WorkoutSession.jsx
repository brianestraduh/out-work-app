import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../supaBase";
import { useEffect, useState, useRef } from "react";
import Exercise from "./Exercise";
import { clearExercises } from "./redux/workout/exerciseSlice";
import { postWorkoutSession } from "./helpers/workoutSession";
import { clearWorkoutInfo } from "./redux/navigation/workoutIdSlice";
import ConfirmationModal from "./ConfirmationModal";
import Button from "./components/Button";
export default function WorkoutSession() {
  const workoutId = useSelector((state) => state.workoutId.id);
  const workoutName = useSelector((state) => state.workoutId.name);
  const session = useSelector((state) => state.session);
  const { user } = session;
  const exerciseStore = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const startTimeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // to be used to calculate workout duration
    startTimeRef.current = new Date();
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from("workout_exercises")
        .select(
          `
              exercises (
                *
              )
            `
        )
        .eq("workout_id", workoutId);
      const exercisesList = data.map((item) => item.exercises);
      setExercises(exercisesList);
      if (error) console.log("Error: ", error);
    };

    fetchExercises();
    // clear the ExerciseStore when Session dismounts (ends)
    return () => {
      dispatch(clearExercises());
    };
  }, []);

  function handleBack() {
    dispatch(clearWorkoutInfo());
  }

  const handleComplete = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    // handle cancel action
    setShowModal(false);
  };

  const handleConfirm = async () => {
    try {
      await postWorkoutSession(
        startTimeRef.current,
        workoutId,
        user.id,
        exerciseStore
      );
      dispatch(clearWorkoutInfo());
      navigate("/");
    } catch (error) {
      console.error("Error posting workout session:", error);
    }
  };
  return (
    <div>
      <h2>{workoutName}</h2>
      <ul>
        {exercises
          .sort((a, b) => a.index - b.index)
          .map((exercise, index) => {
            return (
              <Exercise
                key={exercise.id}
                exerciseDetails={exercise}
                index={index + 1}
              />
            );
          })}
      </ul>
      <Button onClick={handleComplete}>Complete workout</Button>
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      <Link to="/startWorkout" onClick={handleBack}>
        Back
      </Link>
    </div>
  );
}
