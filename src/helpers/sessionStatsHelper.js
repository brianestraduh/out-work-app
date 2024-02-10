function durationArr(sessionData, cutOffDate) {
  const durationArr = sessionData.map((session) => {
    // then SessionStats can take care of ensuring that the graph changes accordingly
    // such as making sure the axis changes to the correct units
    return {
      duration: session.duration,
      date: dateConversion(session.sessiondate, cutOffDate),
    };
  });
  return durationArr;
}

function dateConversion(isoDate, cutOffDate) {
  if (cutOffDate === "this week") {
    const date = new Date(isoDate);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  } else if (cutOffDate === "this month") {
    const date = new Date(isoDate);
    const dayOfMonth = date.getDate();
    return dayOfMonth;
  } else if ((cutOffDate === "within 3 months") | "within a year") {
    const date = new Date(isoDate);
    const monthsOfYear = [
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
    const monthName = monthsOfYear[date.getMonth()];
    return monthName;
  }
}

export { durationArr };
