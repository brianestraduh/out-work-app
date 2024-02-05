import clsx from "clsx";
export default function ExerciseSessionList(props) {
  const { className, exercises, children, handleClick } = props;
  const classes = clsx({}, className);
  const { setsData, name } = exercises[0];
  return (
    <li className={classes} onClick={handleClick}>
      {exercises.map((exercise) => {
        return (
          <>
            <li>
              <p>{name}</p>
              {setsData.map((set) => {
                const { set_index, reps, weight, complete_status } = set;
                return (
                  <>
                    <li>
                      <p>{`Set ${set_index} Reps: ${reps} Weight: ${weight} Completed: ${complete_status}`}</p>
                    </li>
                  </>
                );
              })}
            </li>
          </>
        );
      })}
      {children}
    </li>
  );
}
