import { useRef, useEffect, useState } from "react";
import FormSelectDate from "./components/FormSelectDate.jsx";
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

Chart.register(BarController, LinearScale, CategoryScale, BarElement);

function SessionStats({ onDateChange }) {
  const canvasRef = useRef(null);
  // duration will be data and is an array where each entry is an object with the duration
  // in minutes and the date of the session
  const [duration, setDuration] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [weightMoved, setWeightMoved] = useState([]);
  const [totalWeightMoved, setTotalWeightMoved] = useState(0);
  const [daysWorkedOut, setDaysWorkedOut] = useState([]);
  const [totalDaysWorkedOut, setTotalDaysWorkedOut] = useState(0);
  const [stat, setStat] = useState(totalWeightMoved);

  useEffect(() => {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
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
  }, []);

  return (
    <>
      <FormSelectDate onChange={onDateChange} />
      <canvas ref={canvasRef} />
    </>
  );
}

export default SessionStats;
