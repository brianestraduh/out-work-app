import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../supaBase";
import { useEffect, useState, useRef } from "react";
import Exercise from "./Exercise";
import { clearExercises } from "./redux/workoutSession/exerciseSlice";
import { postWorkoutSession } from "./helpers/workoutSession";
import { clearWorkoutInfo } from "./redux/workoutSession/workoutIdSlice";
import ConfirmationModal from "./ConfirmationModal";
import Button from "./components/Button";
import {
  getRecords,
  createRecordsArr,
  postRecords,
} from "./helpers/workoutSession";
export default function WorkoutSession() {
  const workoutId = useSelector((state) => state.workoutId.id);
  const workoutName = useSelector((state) => state.workoutId.name);
  const session = useSelector((state) => state.session);
  const { user } = session;
  const exerciseStore = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState([]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);
  const startTimeRef = useRef(null);
  const records = useRef(null);
  const newRecordsArr = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // to be used to calculate workout duration
    startTimeRef.current = new Date();
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from("workout_exercises")
        .select(
          "*, exercises!workout_exercises_exercise_id_fkey(name, description, default_sets, default_reps)"
        )
        .eq("workout_id", workoutId);

      // Restructure the objects in the data array
      const exercises = data.map((item) => ({
        ...item,
        name: item.exercises.name,
        description: item.exercises.description,
        defaultSets: item.exercises.default_sets,
        defaultReps: item.exercises.default_reps,
      }));
      setExercises(exercises);
      records.current = await getRecords(exercises);
      if (error) console.log("Error: ", error);
    };

    fetchExercises();

    // clear the ExerciseStore when Session dismounts (ends)
    return () => {
      dispatch(clearExercises());
    };
  }, []);

  function handleBack() {
    setShowBackModal(true);
  }

  const handleComplete = () => {
    setShowCompleteModal(true);
    console.log("records in workoutSession", records.current);
    newRecordsArr.current = createRecordsArr(exerciseStore, ...records.current);
    console.log("newRecordsArr", newRecordsArr.current);
  };
  const handleCancel = () => {
    // handle cancel action
    setShowCompleteModal(false);
  };
  const handleBackCancel = () => {
    // handle cancel action
    setShowBackModal(false);
    console.log("store", exerciseStore);
  };

  const handleConfirm = async () => {
    try {
      await postWorkoutSession(
        startTimeRef.current,
        workoutId,
        user.id,
        exerciseStore
      );
      await postRecords(newRecordsArr.current, user.id);
      clearWorkoutData();
      dispatch(clearWorkoutInfo());
      navigate("/");
    } catch (error) {
      console.error("Error posting workout session:", error);
    }
  };

  function handleBackConfirm() {
    clearWorkoutData();
    dispatch(clearWorkoutInfo());
    navigate("/startWorkout");
  }

  function clearWorkoutData() {
    const keysToRemove = [];

    // Gather keys
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.includes("set-")) {
        keysToRemove.push(key);
      }
    }

    // Remove keys
    for (let key of keysToRemove) {
      sessionStorage.removeItem(key);
    }
  }
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
      {showCompleteModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
          Are you sure?
        </ConfirmationModal>
      )}
      {showBackModal && (
        <ConfirmationModal
          onConfirm={handleBackConfirm}
          onCancel={handleBackCancel}
        >
          Are you sure? Workout has NOT been completed.{" "}
        </ConfirmationModal>
      )}
      <Button onClick={handleBack}> Back </Button>
    </div>
  );
}
