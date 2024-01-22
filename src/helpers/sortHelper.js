function reorderExercises(dragIndex, dropIndex, exercises) {
  const newExercises = [...exercises];
  const draggedExercise = newExercises[dragIndex];

  newExercises.splice(dragIndex, 1); // Remove the dragged item
  newExercises.splice(dropIndex, 0, draggedExercise); // Insert the dragged item at the new position

  // Update the index property of each exercise
  newExercises.forEach((exercise, index) => {
    exercise.index = index;
  });

  //create an array of objects where
  const newOrder = newExercises.map((exercise, index) => ({
    index,
    name: exercise.id,
  }));

  console.log(newOrder); // Use newIndex instead of indexes
  return { newExercises, newOrder };
}

export { reorderExercises };
