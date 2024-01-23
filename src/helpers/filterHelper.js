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

export { filterExercises };
