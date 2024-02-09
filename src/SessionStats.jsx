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

function SessionStats({ onDateChange, sessionData }) {
  const canvasRef = useRef(null);
  // duration will be data and is an array where each entry is an object with the duration
  // in minutes and the date of the session
  //write a helper function that takes in the sessionData and returns the data with objects containing
  // duration and date
  //repeat for daysWorkedOut
  // const durationData
  // const daysWorkedOutData
  // const durationTotal
  // const daysWorkedOutTotal

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
