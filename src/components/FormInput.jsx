import clsx from "clsx";
export default function FormInput({
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
  ...rest
}) {
  const classes = clsx(
    {
      input: true,
    },
    className
  );

  return (
    <div className={classes}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={id}
        step={step}
        type={type}
        required={required}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
