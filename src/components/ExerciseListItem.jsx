export default function ExerciseListItem(props) {
  const {
    exercise,
    children,
    className,
    draggable,
    onDragStart,
    onDragEnter,
    onDragEnd,
    onDragOver,
    isDarkTheme,
  } = props;
  return (
    <li
      className="list-container ul-border"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div>
        <p className="list-title-text">
          {`${exercise.name} | ${exercise.muscle_group}`}{" "}
        </p>
        <p className={isDarkTheme ? "descr-dark-text" : "descr-text"}>
          {exercise.description}
        </p>
        <p className={isDarkTheme ? "set-rep-dark-text" : "set-rep-text"}>
          {`Sets ${exercise?.default_sets ?? exercise?.defaultSets} | `}
          {`Reps ${exercise?.default_reps ?? exercise?.defaultReps}`}
        </p>
        <p></p>
      </div>
      {children}
    </li>
  );
}
