function filterExercises(exercises, muscleGroup, searchTerm) {
  let filtered = exercises;

  // Filter by muscle group if selected
  if (muscleGroup !== "") {
    filtered = filtered.filter(
      (exercise) => exercise.muscle_group === muscleGroup
    );
  }

  // Filter by search term if entered
  if (searchTerm !== "") {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    filtered = filtered.filter((exercise) =>
      exercise.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  return filtered;
}

//filter sessions
function filterSessions(sessions, dateCutOff, searchTerm) {
  let filtered = sessions;
  console.log("date cutoff", dateCutOff);
  const timeObj = {
    "this week": 6.048e8,
    "this month": 2.628e9,
    "within 3 months": 7.884e9,
    "within a year": 3.154e10,
  };

  let now = new Date();

  filtered = filtered.filter((session) => {
    if (dateCutOff !== "" && timeObj[dateCutOff]) {
      let cutOffDate = new Date(now.getTime() - timeObj[dateCutOff]);
      let sessionDate = new Date(session.sessiondate);
      console.log("sessionDate", session.sessiondate);
      return sessionDate >= cutOffDate;
    }
    return true;
  });

  if (searchTerm !== "") {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    filtered = filtered.filter((session) =>
      session.workouts.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  return filtered;
}

export { filterExercises, filterSessions };
