import clsx from "clsx";
export default function ExerciseForm({
  label,
  htmlFor,
  id,
  type,
  required,
  step,
  defaultValue,
  value,
  onChange,
  className,
  isDarkTheme,
  checkBoxClass,
  ...rest
}) {
  return (
    <div className="set-flex">
      <label htmlFor={htmlFor} className="input-wo-title">
        {label}
      </label>
      <input
        id={id}
        step={step}
        type={type}
        required={required}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...rest}
        className={type === "checkbox" ? "checkbox" : "workout-input-area"}
      />
    </div>
  );
}
