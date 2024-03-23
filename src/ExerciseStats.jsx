import { useEffect, useState } from "react";
import { fetchExerciseStats } from "./helpers/fetchStats";
import { useSelector } from "react-redux";
import { muscleGroupArr } from "./helpers/exerciseStatsHelper.js";
import FormSelectDate from "./components/FormSelectDate.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ExerciseStats() {
  const [exercises, setExercises] = useState([]);
  const [exerciseCutOffDate, setExerciseCutOffDate] = useState("this month");
  const [muscleGroupData, setMuscleGroupData] = useState([]);
  const [displayedStat, setDisplayedStat] = useState("volume");
  const isDarkTheme = useSelector((state) => state.darkMode);
  useEffect(() => {
    fetchExerciseStats(exerciseCutOffDate).then((data) => {
      setExercises(data);
    });
  }, [exerciseCutOffDate]);

  useEffect(() => {
    const muscleGroupData = muscleGroupArr(exercises);
    setMuscleGroupData(muscleGroupData);
    console.log("muscleGroupData", muscleGroupData);
  }, [exercises]);

  function handleDateChange(event) {
    setExerciseCutOffDate(event.target.value);
  }

  function handleToggle(stat) {
    setDisplayedStat(stat);
  }

  const data = {
    labels: muscleGroupData.map((muscleGroup) => muscleGroup.muscleGroup),
    datasets: [
      {
        label: `${
          displayedStat.charAt(0).toUpperCase() + displayedStat.slice(1)
        } ${displayedStat === "volume" ? "(lbs)" : ""}`,
        data: muscleGroupData.map((muscleGroup) => muscleGroup[displayedStat]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="stats-card exercise-stats-area">
      <h3 className="header-title-text">Exercise Stats</h3>
      <button
        onClick={() => handleToggle("volume")}
        className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
      >
        Volume
      </button>
      <button
        onClick={() => handleToggle("reps")}
        className="secondary-dark-btn"
      >
        Reps
      </button>
      <FormSelectDate onChange={handleDateChange} />
      <Doughnut data={data} />
    </div>
  );
}
