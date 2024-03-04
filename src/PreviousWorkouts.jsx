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
function PreviousWorkouts() {
  const [sessions, setSessions] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [sessionsUpdated, setSessionsUpdated] = useState(false);
  const [dateCutOff, setDateCutOff] = useState("this week");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div>
      <h2>Previous Workouts</h2>
      <Link to="/">Back</Link>
      <FormSelectDate onChange={handleDateChange} />
      <FormInput
        label="Search by Workout Name:"
        htmlFor="search-workout"
        id="search-workout"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
            <li key={session_id} className="drag">
              <p>{name}</p>
              <p>{description}</p>
              <p>{`Duration: ${duration} mins`}</p>
              <p>{friendlyDate}</p>
              {visibleDetails.includes(index) ? (
                <>
                  <ExerciseSessionList
                    className={"place-holder"}
                    exercises={exercises}
                    handleClick={() => handleDetails(index)}
                  />
                </>
              ) : (
                <>
                  <Button onClick={() => handleDetails(index)}>
                    Exercise Details
                  </Button>
                </>
              )}
              <div>
                <Button onClick={() => handleDelete(session_id)}>Delete</Button>
              </div>
              ;
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
