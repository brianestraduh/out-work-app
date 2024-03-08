import clsx from "clsx";

export default function Button(props) {
  const {
    onClick,
    children,
    className,
    type,
    disabled,
    ariaLabel,
    id,
    ...rest
  } = props;
  const classes = clsx(
    {
      btn: true,
    },
    className
  );

  return (
    <>
      <button
        id={id}
        className={classes}
        aria-label={ariaLabel}
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
