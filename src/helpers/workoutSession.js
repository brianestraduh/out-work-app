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
//user has pressed Complete workout "Are you sure?" Modal appears
function createRecordsArr(exerciseStore, currentRecords) {
  const recordsArr = exerciseStore.map((exercise) => {
    //pr
    let completedSets = exercise.setsData.filter((set) => set.completeStatus);

    let pr = null;
    let oneRepMax = null;
    let maxVolume = null;

    if (completedSets.length > 0) {
      pr = completedSets.reduce((max, current) => {
        return current.weight > max ? current.weight : max;
      }, -Infinity);

      oneRepMax = completedSets.reduce((max, current) => {
        let currentOneRepMax = current.weight / (1.0278 - 0.278 * current.reps);
        return currentOneRepMax > max ? currentOneRepMax : max;
      }, -Infinity);

      maxVolume = completedSets.reduce((max, current) => {
        let currentMaxVol = current.weight * current.reps;
        return currentMaxVol > max ? currentMaxVol : max;
      }, -Infinity);
    }

    // Find the corresponding record in currentRecords
    let currentRecord = currentRecords.find(
      (record) => record.exercise_id === exercise.exercise_id
    );

    // Initialize record status
    let prBroken = false,
      oneRepMaxBroken = false,
      maxVolumeBroken = false,
      firstRecord = false;

    // If a corresponding record was found, compare the values
    if (currentRecord) {
      if (pr > currentRecord.pr) {
        prBroken = true;
      }
      if (oneRepMax > currentRecord.oneRepMax) {
        oneRepMaxBroken = true;
      }
      if (maxVolume > currentRecord.maxVolume) {
        maxVolumeBroken = true;
      }
    } else {
      // If no corresponding record was found, it's the first record
      firstRecord = true;
    }

    return {
      [exercise.exercise_id]: {
        oneRepMax,
        pr,
        maxVolume,
        prBroken,
        oneRepMaxBroken,
        maxVolumeBroken,
        firstRecord,
      },
    };
  });

  return recordsArr;
}
// if user clicks Yes
async function postRecords(recordsArr, userId) {
  for (let record of recordsArr) {
    for (let exercise_id in record) {
      let exerciseRecord = record[exercise_id];

      // Prepare the data to be upserted
      let data = {
        user_id: userId, // include the userId
        exercise_id: exercise_id,
        pr: exerciseRecord.pr,
        oneRepMax: exerciseRecord.oneRepMax,
        maxVolume: exerciseRecord.maxVolume,
      };

      // If a record has been broken, upsert the corresponding timestamp
      if (exerciseRecord.prBroken) {
        data.prTimestamp = new Date();
      }
      if (exerciseRecord.oneRepMaxBroken) {
        data.oneRepMaxTimestamp = new Date();
      }
      if (exerciseRecord.maxVolumeBroken) {
        data.maxVolumeTimestamp = new Date();
      }

      // Upsert the data
      const { error } = await supabase
        .from("exercise_records")
        .upsert(data, { returning: "minimal", onConflict: "exercise_id" });

      if (error) {
        console.error("Error: ", error);
      }
    }
  }
}
async function getRecords(exerciseStore) {
  const exerciseIDs = exerciseStore.map((exercise) => exercise.exercise_id);

  const { data, error } = await supabase
    .from("exercise_records")
    .select("*")
    .in("exercise_id", exerciseIDs);

  if (error) {
    console.error("Error: ", error);
  } else {
    console.log("current records: ", data);
  }
  return data;
}

//
export { postWorkoutSession, createRecordsArr, getRecords, postRecords };
