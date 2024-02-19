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

//I want to create a function that will ingest exercise set data
// and can then return an array of objects such that each index is the exerciseName
// and its value is an object containing 1 Rep Max(Weight lifted / (1.0278 - (0.0278 * Repetitions)))
// that is calculated from all the sessions
// it will also have a key:value for PR(highest weight lifted for all reps)
//Make sure to create smaller functions when neccesary to calculate these values

//I then want to create a seperate function that will similarly will have the exerciseName
//be the index and the value will be an object containing volume and date, or Maxweight per
// session and date, and average weight lifted per date
// this data will later be used to show a line graph to all time progression for each exercise
// This will be a seperate page I think.

//for stats I want to support ALL time Stats probably. Think about this and how it could be displayed.
//It would have to be by year.
export { muscleGroupArr, exerciseStatsArr };
