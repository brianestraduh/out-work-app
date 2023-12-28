// workoutHelpers.js
async function addWorkout(supabase, session, name, description) {
  const { user } = session;

  const newWorkout = {
    name,
    description,
    created_by: user.id,
  };

  const { error } = await supabase.from("workouts").upsert(newWorkout);

  if (error) throw error;
}
export { addWorkout };
