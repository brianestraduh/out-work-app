import { useEffect, useState } from "react";
import { fetchExerciseStats } from "./helpers/fetchStats";
import FormSelectDate from "./components/FormSelectDate.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ExerciseStats() {
  const [exercises, setExercises] = useState([]);
  const [exerciseCutOffDate, setExerciseCutOffDate] = useState("this month");
  const [muscleGroupData, setMuscleGroupData] = useState([]);

  useEffect(() => {
    fetchExerciseStats(exerciseCutOffDate).then((data) => {
      setExercises(data);
    });
  }, [exerciseCutOffDate]);

  useEffect(() => {
    setMuscleGroupData(durationArr(exercises, exerciseCutOffDate));
    console.log("countData", sessCountData);
  }, [exercises]);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
    <div>
      <h2>Exercise Stats</h2>
      <Doughnut data={data} />
    </div>
  );
}
