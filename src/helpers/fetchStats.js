import supabase from "../../supaBase";

async function fetchSessionStats(dateCutoff) {
  const timeIntervals = {
    "this week": 6.048e8,
    "this month": 2.628e9,
    "within 3 months": 7.884e9,
    "within a year": 3.154e10,
  };

  //I need to get to a timestamp
  const timeAtCutOff = new Date().getTime() - timeIntervals[dateCutoff];
  const timestampCutOff = new Date(timeAtCutOff).toISOString();
  const { data, error } = await supabase
    .from("workout_session")
    .select("*")
    .gte("sessiondate", timestampCutOff);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
}

export { fetchSessionStats };
