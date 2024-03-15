import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkoutId } from "./redux/workoutSession/workoutIdSlice.js";
import { clearExerciseId } from "./redux/exercises/exerciseIdSlice.js";
import Card from "./components/Card.jsx";
import dumbell from "./assets/dumbell.svg";
import progress from "./assets/progression.svg";
import calender from "./assets/calendar.svg";
import pencil from "./assets/pencil.svg";
import smile from "./assets/smile.svg";
import stopWatch from "./assets/stopwatch.svg";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    // used to ensure that these 2 slices are cleared when the user leaves the home page
    // this to ensure navigation works as intended
    return () => {
      dispatch(setWorkoutId(null));
      dispatch(clearExerciseId());
    };
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-grid">
        <Card
          section="Account"
          img={smile}
          imgDescription="smiley face"
          description="View and Edit Account Information"
        >
          Account
        </Card>
        <Card
          section="startWorkout"
          img={stopWatch}
          imgDescription="stopwatch"
          description="Let's get to it! Start your workout session!"
        >
          Start Workout
        </Card>
        <Card
          section="createEditWorkouts"
          img={pencil}
          imgDescription="pencil on pad"
          description="Create or Edit existing workouts."
        >
          Create or Edit Workouts
        </Card>
        <Card
          section="editCreateExercises"
          img={dumbell}
          imgDescription="dumbell"
          description="Create or Edit existing exercises."
        >
          Edit or Create Exercises
        </Card>
        <Card
          section="progression"
          img={progress}
          imgDescription="upward trending arrow"
          description="View and track your Gains!"
        >
          Progression
        </Card>
        <Card
          section="previousWorkouts"
          img={calender}
          imgDescription="calender"
          description="View Previously completed workouts."
        >
          Previous Workouts
        </Card>
      </div>
    </div>
  );
}
export default Home;

//figure out container issues. Go look at a previous project and figure it out to avoid the issu
