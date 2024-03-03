function muscleGroupArr(exerciseData) {
  let muscleGroupObj = {};

  exerciseData.forEach((exercise) => {
    const muscleGroup = exercise.exercises.muscle_group;
    const volume = exercise.weight * exercise.reps;

    if (muscleGroupObj[muscleGroup]) {
      // If the muscle group already exists in the object, add the reps, weight, and volume
      muscleGroupObj[muscleGroup].reps += exercise.reps;
      muscleGroupObj[muscleGroup].volume += volume;
    } else {
      // If the muscle group does not exist in the object, add it
      muscleGroupObj[muscleGroup] = {
        muscleGroup: muscleGroup,
        reps: exercise.reps,
        volume: volume,
      };
    }
  });

  // Convert the object to an array
  let muscleGroupArr = Object.values(muscleGroupObj);

  return muscleGroupArr;
}

function exerciseStatsArr(exerciseData) {
  let muscleGroupObj = {};

  exerciseData.forEach((exercise) => {
    const muscleGroup = exercise.exercises.muscle_group;
    const volume = exercise.weight * exercise.reps;

    if (muscleGroupObj[muscleGroup]) {
      // If the muscle group already exists in the object, add the reps, weight, and volume
      muscleGroupObj[muscleGroup].reps += exercise.reps;
      muscleGroupObj[muscleGroup].volume += volume;
    } else {
      // If the muscle group does not exist in the object, add it
      muscleGroupObj[muscleGroup] = {
        muscleGroup: muscleGroup,
        reps: exercise.reps,
        volume: volume,
      };
    }
  });
  // Convert the object to an array
  let muscleGroupArr = Object.values(muscleGroupObj);

  return muscleGroupArr;
}

export { muscleGroupArr, exerciseStatsArr };
