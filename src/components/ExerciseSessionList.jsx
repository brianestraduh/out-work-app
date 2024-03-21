import clsx from "clsx";
export default function ExerciseSessionList(props) {
  const { className, exercises, children, isDarkTheme } = props;
  const classes = clsx({}, className);
  const { setsData, name, id } = exercises[0];
  return (
    <div className={classes}>
      <ul className="details-grid">
        {exercises.map((exercise) => {
          const { id, name, setsData } = exercise;
          return (
            <li key={id} className="ul-border">
              <div className="exercise-flex">
                <p
                  className={
                    isDarkTheme ? "list-title-dark-text" : "list-title-text"
                  }
                >
                  {name}
                </p>
                <ul>
                  {setsData.map((set) => {
                    const { set_index, reps, weight, complete_status, set_id } =
                      set;
                    return (
                      <li
                        key={set_id}
                        className={
                          isDarkTheme ? "descr-dark-text" : "descr-text"
                        }
                      >
                        <p>{`Set ${set_index} | Reps: ${reps} | Weight: ${weight} | Completed: ${complete_status}`}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
}
