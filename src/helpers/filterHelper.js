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
//for exercise records, has to be different since objects are different
function filterExerciseRecords(exercises, muscleGroup, searchTerm) {
  let filtered = exercises;

  // Filter by muscle group if selected
  if (muscleGroup !== "") {
    filtered = filtered.filter(
      (exercise) => exercise.exercises.muscle_group === muscleGroup
    );
  }

  // Filter by search term if entered
  if (searchTerm !== "") {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    filtered = filtered.filter((exercise) =>
      exercise.exercises.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  return filtered;
}

//filter sessions
function filterSessions(sessions, searchTerm) {
  let filtered = sessions;

  if (searchTerm !== "") {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    filtered = filtered.filter((session) =>
      session.workouts.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  return filtered;
}

export { filterExercises, filterExerciseRecords, filterSessions };
