import clsx from "clsx";

export default function Hero({ className, ...rest }) {
  const classes = clsx(
    {
      "hero-container": true,
    },
    className
  );
  return (
    <div className={classes} {...rest}>
      <div className="hero-text-container">
        <h1 className="white-header-text">Get your workout in today</h1>
        <p className="white-p-text">
          Dominate your fitness goals with precise progress tracking,
          customizable metrics, and effortless logging.{" "}
        </p>
      </div>
    </div>
  );
}
