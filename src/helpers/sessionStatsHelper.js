function durationArr(sessionData, cutOffDate) {
  const durationArr = sessionData.map((session) => {
    // then SessionStats can take care of ensuring that the graph changes accordingly
    // such as making sure the axis changes to the correct units
    return {
      duration: session.duration,
      date: dateConversion(session.sessiondate, cutOffDate),
    };
  });
  console.log("testing dur ", durationArr);
  const result = sumDurationsByDate(durationArr);

  return result;
}

function sessCountArr(sessionData, cutOffDate) {
  const durationArr = sessionData.map((session) => {
    // then SessionStats can take care of ensuring that the graph changes accordingly
    // such as making sure the axis changes to the correct units
    return {
      count: 0,
      date: dateConversion(session.sessiondate, cutOffDate),
    };
  });
  const result = sumCountByDate(durationArr);
  console.log("result", result);
  return result;
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
  } else if (
    cutOffDate === "within 3 months" ||
    cutOffDate === "within a year"
  ) {
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

function sumDurationsByDate(data) {
  return data.reduce((acc, curr) => {
    const existingIndex = acc.findIndex((item) => item.date === curr.date);

    if (existingIndex > -1) {
      // If the date already exists in the accumulator, add the current duration to the existing duration
      acc[existingIndex].duration += curr.duration;
    } else {
      // If the date does not exist in the accumulator, add the current item to the accumulator
      acc.push({ ...curr });
    }

    return acc;
  }, []);
}

function sumCountByDate(data) {
  return data.reduce((acc, curr) => {
    const existingIndex = acc.findIndex((item) => item.date === curr.date);

    if (existingIndex > -1) {
      // If the date already exists in the accumulator, increment the count by 1
      acc[existingIndex].count += 1;
    } else {
      // If the date does not exist in the accumulator, add the current item to the accumulator with a count of 1
      acc.push({ ...curr, count: 1 });
    }

    return acc;
  }, []);
}

export { durationArr, sessCountArr };
