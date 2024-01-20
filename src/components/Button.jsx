import clsx from "clsx";

export default function Button(props) {
  const { children, className, type, disabled, ...rest } = props;
  const classes = clsx(
    {
      btn: true,
    },
    className
  );

  return (
    <>
      <button className={classes} type={type} disabled={disabled} {...rest}>
        {children}
      </button>
    </>
  );
}
