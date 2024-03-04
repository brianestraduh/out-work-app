import clsx from "clsx";
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
  const classes = clsx({}, className);
  return (
    <li
      className={classes}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <p>{exercise.name}</p>
      <p>{exercise.description}</p>
      <p>{exercise.muscle_group}</p>
      <p>{`Sets ${exercise?.default_sets ?? exercise?.defaultSets}`}</p>
      <p>{`Reps ${exercise?.default_reps ?? exercise?.defaultReps}`}</p>
      {children}
    </li>
  );
}
