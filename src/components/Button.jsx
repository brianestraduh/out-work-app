import clsx from "clsx";

export default function Button(props) {
  const { onClick, children, className, type, disabled, ...rest } = props;
  const classes = clsx(
    {
      btn: true,
    },
    className
  );

  return (
    <>
      <button
        className={classes}
        type={type}
        disabled={disabled}
        {...rest}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
