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
        <p>{exercise.description}</p>
        <p>{`Sets ${exercise?.default_sets ?? exercise?.defaultSets}`}</p>
        <p>{`Reps ${exercise?.default_reps ?? exercise?.defaultReps}`}</p>
      </div>
      {children}
    </li>
  );
}
