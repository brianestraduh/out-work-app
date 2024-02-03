import supabase from "../../supaBase";

async function postWorkoutSession(startTime, workoutId, userId, exerciseStore) {
  let duration = workoutDuration(startTime);
  try {
    const { data, error } = await supabase
      .from("workout_session")
      .insert([
        {
          duration: duration,
          workout_id: workoutId,
          user_id: userId,
        },
      ])
      .select();
    if (error) {
      console.error("Error inserting workout session:", error);
    } else {
      console.log("Workout session inserted successfully:", data);
      const sessionId = data[0].session_id;
      console.log(sessionId, "this is from the row in table");

      // Iterate over each exercise and its sets data
      for (const exercise of exerciseStore) {
        const { exercise_id, setsData } = exercise;
        if (!Array.isArray(setsData)) {
          console.error(
            `setsData for exercise ${exercise_id} is not an array:`,
            setsData
          );
          continue; // Skip to the next exercise
        }

        // Iterate over each set data for the current exercise
        for (const setData of setsData) {
          try {
            const { setIndex, reps, weight, completeStatus } = setData;

            // Send the set data to the Supabase table
            const { data, error } = await supabase
              .from("exercise_sets")
              .insert([
                {
                  exercise_id: exercise_id,
                  set_index: setIndex,
                  reps: reps,
                  weight: weight,
                  complete_status: completeStatus,
                  session_id: sessionId,
                  user_id: userId,
                },
              ]);

            if (error) {
              console.error("Error inserting exercise set:", error);
            } else {
              console.log("Exercise set inserted successfully:", data);
              // Handle the successful insertion (e.g., update the state)
            }
          } catch (error) {
            console.error("Unexpected error:", error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

function workoutDuration(startTime) {
  const endTime = new Date();
  const durationMs = endTime - startTime;

  const minutes = Math.floor(durationMs / 60000); // convert to minutes

  return minutes;
}
export { postWorkoutSession };
