function generateLabels(cutOffDate) {
  switch (cutOffDate) {
    case "this week":
      return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    case "this month": {
      const date = new Date();
      const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
    case "within 3 months":
    case "within a year":
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    default:
      return [];
  }
}
export { generateLabels };
