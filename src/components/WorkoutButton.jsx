import clsx from "clsx";
export default function WorkoutButton(props) {
  const { workout, index, className, onClick } = props;
  const classes = clsx(
    {
      drag: true,
    },
    className
  );

  return (
    <button className={classes} onClick={onClick}>
      {workout.name} : {workout.description}
    </button>
  );
}
