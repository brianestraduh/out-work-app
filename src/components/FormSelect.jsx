import clsx from "clsx";

export default function FormSelect(props) {
  const { className, muscleGroup, label, htmlFor, name, id, onChange, value } =
    props;
  const classes = clsx(
    {
      input: true,
    },
    className
  );
  return (
    <div className={classes}>
      <label htmlFor="muscle-group-filter" className="input-title">
        Search by Muscle:
      </label>
      <select
        name="muscle-group-filter"
        id="muscle-group-filter"
        onChange={onChange}
        value={muscleGroup}
        className="select-dd"
      >
        <option value="">Select</option>
        <option value="chest-muscle">Chest</option>
        <option value="back-muscle">Back</option>
        <option value="shoulder-muscle">Shoulder</option>
        <option value="arm-muscle">Arm</option>
        <option value="abdominal-muscle">Abdominal</option>
        <option value="leg-muscle">Leg</option>
        <option value="hip-muscle">Hip</option>
        <option value="core-muscle">Core</option>
        <option value="forearm-muscle">Forearm</option>
        <option value="neck-muscle">Neck</option>
      </select>
    </div>
  );
}
