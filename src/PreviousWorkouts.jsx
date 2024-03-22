import { useEffect, useState } from "react";
import { fetchSessions } from "./helpers/previousWorkouts";
import ExerciseSessionList from "./components/ExerciseSessionList";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal.jsx";
import supabase from "../supaBase.js";
import FormSelectDate from "./components/FormSelectDate.jsx";
import FormInput from "./components/FormInput.jsx";
import { filterSessions } from "./helpers/filterHelper.js";
import { useSelector } from "react-redux";
function PreviousWorkouts() {
  const [sessions, setSessions] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [sessionsUpdated, setSessionsUpdated] = useState(false);
  const [dateCutOff, setDateCutOff] = useState("this week");
  const [searchTerm, setSearchTerm] = useState("");
  const isDarkTheme = useSelector((state) => state.darkMode);

  useEffect(() => {
    fetchSessions(dateCutOff)
      .then((sessionData) => {
        console.log(sessionData);
        const filtered = filterSessions(sessionData, searchTerm);
        setSessions(filtered);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sessionsUpdated, dateCutOff, searchTerm]);
  useEffect(() => {
    console.log(dateCutOff);
  }, [dateCutOff]);

  const handleDetails = (index) => {
    setVisibleDetails((prevVisibleDetails) => {
      if (prevVisibleDetails.includes(index)) {
        // If the session details are currently visible, hide them
        return prevVisibleDetails.filter((i) => i !== index);
      } else {
        // If the session details are currently hidden, show them
        return [...prevVisibleDetails, index];
      }
    });
  };

  const handleDelete = (id) => {
    setSessionToDelete(id);
    console.log(sessionToDelete);
    setShowModal(true);
  };

  const handleCancel = () => {
    // handle cancel action
    setShowModal(false);
  };

  const handleConfirm = async () => {
    // handle confirm action
    try {
      let { error } = await supabase
        .from("workout_session")
        .delete()
        .eq("session_id", sessionToDelete);

      if (error) {
        throw error;
      }

      console.log("Row deleted successfully");
      setShowModal(false);
      setSessionsUpdated(!sessionsUpdated);
    } catch (error) {
      alert(error.message);
    }
  };

  function handleDateChange(event) {
    setDateCutOff(event.target.value);
  }
  return (
    <div className="previous-wo-container">
      <h2
        className={isDarkTheme ? "header-title-dark-text" : "header-title-text"}
      >
        Previous Workouts
      </h2>
      <Link to="/" className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}>
        Back
      </Link>
      <FormSelectDate onChange={handleDateChange} className="width-50" />
      <FormInput
        label="Search by Workout Name:"
        htmlFor="search-workout"
        id="search-workout"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="width-50"
      />
      <ul>
        {sessions.map((session, index) => {
          const { name, description } = session.workouts;
          const { duration, exercises, session_id } = session;
          const date = new Date(session.sessiondate);
          const friendlyDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;

          return (
            <li key={session_id} className="list-grid ul-border">
              <p
                className={
                  isDarkTheme ? "list-title-dark-text" : "list-title-text"
                }
              >
                {name}
              </p>
              <p className={isDarkTheme ? "descr-dark-text" : "descr-text"}>
                {description}
              </p>
              <p
                className={isDarkTheme ? "set-rep-dark-text" : "set-rep-text"}
              >{`Duration: ${duration} mins`}</p>
              <p className={isDarkTheme ? "set-rep-dark-text" : "set-rep-text"}>
                {friendlyDate}
              </p>

              <Button
                onClick={() => handleDelete(session_id)}
                className={isDarkTheme ? "primary-btn" : "primary-dark-btn"}
              >
                Delete
              </Button>
              {visibleDetails.includes(index) ? (
                <>
                  {" "}
                  <Button
                    onClick={() => handleDetails(index)}
                    className={
                      isDarkTheme ? "secondary-btn" : "secondary-dark-btn"
                    }
                  >
                    Hide Details
                  </Button>
                  <div className="grid-expand-details">
                    <ExerciseSessionList
                      className={"place-holder"}
                      exercises={exercises}
                      handleClick={() => handleDetails(index)}
                      isDarkTheme={isDarkTheme}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleDetails(index)}
                    className={
                      isDarkTheme ? "secondary-btn" : "secondary-dark-btn"
                    }
                  >
                    Exercise Details
                  </Button>
                </>
              )}
            </li>
          );
        })}
        {showModal && (
          <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel}>
            Are you sure?
          </ConfirmationModal>
        )}
      </ul>
    </div>
  );
}

export default PreviousWorkouts;
