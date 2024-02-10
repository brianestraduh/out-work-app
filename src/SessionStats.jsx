import { useRef, useEffect, useState } from "react";
import { fetchSessionStats } from "./helpers/fetchStats";
import FormSelectDate from "./components/FormSelectDate.jsx";
import { durationArr } from "./helpers/sessionStatsHelper.js";
import { generateLabels } from "./helpers/chartsHelper.js";
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

function SessionStats() {
  const [sessions, setSessions] = useState([]);
  const [sessionCutOffDate, setSessionCutOffDate] = useState("this month");
  const [durationData, setDurationData] = useState([]);
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // Add this line

  useEffect(() => {
    fetchSessionStats(sessionCutOffDate).then((data) => {
      setSessions(data);
    });
  }, [sessionCutOffDate]);

  useEffect(() => {
    setDurationData(durationArr(sessions, sessionCutOffDate));
    console.log(durationData);
  }, [sessions]);

  useEffect(() => {
    const data = durationData;

    // Destroy the previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: generateLabels(sessionCutOffDate),
        datasets: [
          {
            label: "Duration (minutes)",
            data: data.map((row) => row.duration),
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear",
            beginAtZero: true,
          },
          x: {
            type: "category",
          },
        },
      },
    });
  }, [durationData]); // Add durationData as a dependency

  function handleDateChange(event) {
    setSessionCutOffDate(event.target.value);
  }
  return (
    <>
      <FormSelectDate onChange={handleDateChange} />
      <canvas ref={canvasRef} />
    </>
  );
}

export default SessionStats;

//I need to aggregate the data such that it sums the works outs for each day and month using a reduce
// funciton probably
//this should be done in the sessionStatsHelper.js file
//such that I return an aray of objects with the date and the duration of the workouts for period of time
// as a sum of the workouts for that day or month
//{duration: 30, date: January} which could be the some of 2 or more workouts for that month
