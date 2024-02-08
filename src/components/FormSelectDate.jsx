import clsx from "clsx";

export default function FormSelectDate(props) {
  const { className, onChange } = props;
  const classes = clsx(
    {
      input: true,
    },
    className
  );
  return (
    <div className={classes}>
      <label htmlFor="session-date-filter">Filter by Date:</label>
      <select
        name="session-date-filter"
        id="session-date-filter"
        onChange={onChange}
      >
        <option value="">Select</option>
        <option value="this week">this week</option>
        <option value="this month">this month</option>
        <option value="within 3 months">within 3 months</option>
        <option value="within a year">within a year</option>
      </select>
    </div>
  );
}
