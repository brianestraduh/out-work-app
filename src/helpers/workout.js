// workoutHelpers.js
async function addWorkout(
  supabase,
  session,
  name,
  description,
  dispatch,
  setWorkoutsInfo
) {
  const { user } = session;

  const newWorkout = {
    name,
    description,
    created_by: user.id,
  };

  const { error } = await supabase.from("workouts").upsert(newWorkout);

  if (error) throw error;

  // Fetch updated list of workouts
  let { data, error: fetchError } = await supabase.from("workouts").select();
  if (fetchError) throw fetchError;

  // Dispatch setWorkoutsInfo with updated list
  dispatch(setWorkoutsInfo(data));
}
//delete  Workout
async function deleteWorkout(supabase, id, dispatch, setWorkoutsInfo) {
  // Delete from workout_exercises table
  let { error: workoutExercisesError } = await supabase
    .from("workout_exercises")
    .delete()
    .eq("workout_id", id);
  if (workoutExercisesError) throw workoutExercisesError;

  // Delete from workouts table
  let { error } = await supabase.from("workouts").delete().eq("id", id);
  if (error) throw error;

  // Fetch updated list of workouts
  let { data, error: fetchError } = await supabase.from("workouts").select();
  if (fetchError) throw fetchError;

  // Dispatch setWorkoutsInfo with updated list
  dispatch(setWorkoutsInfo(data));
}
export { addWorkout, deleteWorkout };
