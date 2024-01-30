import supabase from "../../supaBase";

async function fetchSessions() {
  try {
    const { data: sessionData, error: sessionError } = await supabase
      .from("workout_session")
      .select("workout_session.*, workouts(name, description)")
      .eq("workout_session.workout_id", "workouts.id");
    console.log("sessionDate", sessionData);
    if (sessionError) throw sessionError;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export { fetchSessions };
