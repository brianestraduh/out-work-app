import clsx from "clsx";
export default function FormInput({
  label,
  htmlFor,
  id,
  type,
  required,
  step,
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
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
