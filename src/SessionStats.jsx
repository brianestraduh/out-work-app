import { useRef, useEffect } from "react";
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

function SessionStats({ onDateChange, sessionData, sessionCutOffDate }) {
  const cutOffDate = sessionCutOffDate;
  const durationData = durationArr(sessionData, cutOffDate);
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // Add this line

  useEffect(() => {
    console.log("duration arr", durationData), [durationData];
  });

  useEffect(() => {
    const data = durationData;

    // Destroy the previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: generateLabels(cutOffDate),
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

  return (
    <>
      <FormSelectDate onChange={onDateChange} />
      <canvas ref={canvasRef} />
    </>
  );
}

export default SessionStats;
