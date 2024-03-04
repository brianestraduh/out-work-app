import supabase from "../../supaBase";
import { getCutOffDate } from "./fetchStats";

async function fetchSessions(dateCutOff) {
  const cutOffDate = getCutOffDate(dateCutOff);
  const timestampCutOff = cutOffDate.toISOString();
  try {
    // Fetch workout sessions along with workout details
    const { data: sessionData, error: sessionError } = await supabase
      .from("workout_session")
      .select("*, workouts:workout_id(name, description)")
      .gte("sessiondate", timestampCutOff);

    if (sessionError) throw sessionError;

    // Fetch exercises and their corresponding sets for each workout session
    for (let session of sessionData) {
      const { data: exerciseData, error: exerciseError } = await supabase
        .from("exercise_sets")
        .select("*, exercises:exercise_id(name, id)")
        .eq("session_id", session.session_id);
      if (exerciseError) throw exerciseError;

      // Group exercise sets by exercise
      const exercises = exerciseData.reduce((acc, set) => {
        const { exercises, ...setWithoutExercise } = set;
        const { id, name } = exercises;
        acc[id] = acc[id] || { id, name, setsData: [] };
        acc[id].setsData.push(setWithoutExercise);
        return acc;
      }, {});

      // Add exercises to session
      session.exercises = Object.values(exercises);
    }
    return sessionData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export { fetchSessions };
