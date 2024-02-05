import { useEffect, useState } from "react";
import { fetchSessions } from "./helpers/previousWorkouts";
import ExerciseSessionList from "./components/ExerciseSessionList";
import Button from "./components/Button";

function PreviousWorkouts() {
  const [sessions, setSessions] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState([]);

  useEffect(() => {
    fetchSessions()
      .then((sessionData) => {
        console.log(sessionData);
        setSessions(sessionData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
  return (
    <div>
      <h2>Previous Workouts</h2>
      {sessions.map((session, index) => {
        const { name, description } = session.workouts;
        const { duration, exercises } = session;
        const date = new Date(session.sessiondate);
        const friendlyDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

        return (
          <>
            <li key={index} className="drag">
              <p>{name}</p>
              <p>{description}</p>
              <p>{`Duration: ${duration} mins`}</p>
              <p>{friendlyDate}</p>
              {visibleDetails.includes(index) ? (
                <>
                  <ExerciseSessionList
                    className="drag"
                    exercises={exercises}
                    key={index}
                    handleClick={() => handleDetails(index)}
                  />
                </>
              ) : (
                <Button onClick={() => handleDetails(index)}>
                  Exercise Details
                </Button>
              )}
              ;
            </li>
            ;
          </>
        );
      })}
    </div>
  );
}

export default PreviousWorkouts;
