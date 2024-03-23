import { useEffect, useState } from "react";
import { fetchSessionStats } from "./helpers/fetchStats";
import FormSelectDate from "./components/FormSelectDate.jsx";
import { useSelector } from "react-redux";
import { durationArr, sessCountArr } from "./helpers/sessionStatsHelper.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SessionStats() {
  const [sessions, setSessions] = useState([]);
  const [sessionCutOffDate, setSessionCutOffDate] = useState("this week");
  const [durationData, setDurationData] = useState([]);
  const [sessCountData, setSessCountData] = useState([]);
  const [toggleDataTypes, setToggleDataTypes] = useState(false);
  const isDarkTheme = useSelector((state) => state.darkMode);

  useEffect(() => {
    fetchSessionStats(sessionCutOffDate).then((data) => {
      setSessions(data);
    });
  }, [sessionCutOffDate]);

  useEffect(() => {
    setDurationData(durationArr(sessions, sessionCutOffDate));
    setSessCountData(sessCountArr(sessions, sessionCutOffDate));
  }, [sessions]);

  const durationLabel = {
    label: `Duration`,
    data: durationData.map((sess) => sess.duration),
    backgroundColor: "rgba(57, 255, 20, 0.5)",
  };
  const countLabel = {
    label: `Count`,
    data: sessCountData.map((sess) => sess.count),
    backgroundColor: "rgba(0, 0, 128, 0.5)",
  };

  function handleDateChange(event) {
    setSessionCutOffDate(event.target.value);
  }
  //data and options objects for chart.js
  const data = {
    labels: sessCountData.map((sess) => sess.date),
    datasets: [toggleDataTypes ? countLabel : durationLabel],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: `${toggleDataTypes ? "Count" : "Minutes"}`,
        },
      },
    },
  };

  function handleToggle() {
    setToggleDataTypes(!toggleDataTypes);
  }
  return (
    <div className="stats-card session-stats-area">
      <h3 className="header-title-text">Session Stats</h3>
      <FormSelectDate onChange={handleDateChange} className="width-50" />
      <button
        onClick={handleToggle}
        className={isDarkTheme ? "primary-dark-btn" : "primary-btn"}
      >
        {toggleDataTypes ? "Session Duration" : "Session Count"}
      </button>

      <Bar data={data} options={options} />
    </div>
  );
}

export default SessionStats;
