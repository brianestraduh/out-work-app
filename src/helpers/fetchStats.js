import supabase from "../../supaBase";

async function fetchSessionStats(dateCutoff) {
  const cutOffDate = getCutOffDate(dateCutoff);

  const timestampCutOff = cutOffDate.toISOString();
  const { data, error } = await supabase
    .from("workout_session")
    .select("*")
    .gte("sessiondate", timestampCutOff);

  if (error) {
    console.error(error);
  } else {
    console.log("session", data);
    return data;
  }
}

async function fetchExerciseStats(dateCutoff, exerciseId = null) {
  const cutOffDate = getCutOffDate(dateCutoff);

  const timestampCutOff = cutOffDate.toISOString();
  if (exerciseId === null) {
    const { data, error } = await supabase
      .from("exercise_sets")
      .select("*, exercises (name) ")
      .gte("timestamp", timestampCutOff);

    if (error) {
      console.error(error);
    } else {
      console.log("exercise_sets", data);
      return data;
    }
  }
  const { data, error } = await supabase
    .from("exercise_sets")
    .select("*, exercises (name) ")
    .gte("timestamp", timestampCutOff)
    .eq("exercises_id", exerciseId);

  if (error) {
    console.error(error);
  } else {
    console.log("exercise_sets", data);
    return data;
  }
}
function getCutOffDate(dateCutoff) {
  const now = new Date();
  let cutOffDate;

  switch (dateCutoff) {
    case "this week":
      cutOffDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      );
      break;
    case "this month":
      cutOffDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "within 3 months":
      cutOffDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      break;
    case "within a year":
      cutOffDate = new Date(now.getFullYear(), 0, 1);
      break;
  }

  return cutOffDate;
}

export { fetchSessionStats, fetchExerciseStats };
