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
// this will make it such that those rows always exist and are null if there is no record.
//getRecords will always match up
//Now I will need to modify createRecordsArray to make sure it supports comparing against null values
// Then I should be good to go

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
        let currentOneRepMax = Math.round(
          current.weight * (1 + 0.0333 * current.reps)
        );
        return currentOneRepMax > max ? currentOneRepMax : max;
      }, -Infinity);

      maxVolume = completedSets.reduce((max, current) => {
        let currentMaxVol = current.weight * current.reps;
        return currentMaxVol > max ? currentMaxVol : max;
      }, -Infinity);
    }
    // Find the corresponding record in currentRecords
    let currentRecord = currentRecords;

    // Initialize record status
    let prBroken = false,
      oneRepMaxBroken = false,
      maxVolumeBroken = false;
    console.log("current record obj", currentRecord);
    // If a corresponding record was found, compare the values
    if (currentRecord) {
      if (pr > currentRecord.pr) {
        prBroken = true;
        console.log("pr broken");
      }
      if (oneRepMax > currentRecord.one_rep_max) {
        oneRepMaxBroken = true;
      }
      if (maxVolume > currentRecord.max_volume) {
        maxVolumeBroken = true;
      }
    }

    return {
      [exercise.exercise_id]: {
        oneRepMax,
        pr,
        maxVolume,
        prBroken,
        oneRepMaxBroken,
        maxVolumeBroken,
      },
    };
  });
  console.log(recordsArr);
  return recordsArr;
}
// if user clicks Yes
async function postRecords(recordsArr, userId) {
  for (let record of recordsArr) {
    for (let exercise_id in record) {
      let exerciseRecord = record[exercise_id];

      // Check if any record has been broken
      if (
        exerciseRecord.prBroken ||
        exerciseRecord.oneRepMaxBroken ||
        exerciseRecord.maxVolumeBroken
      ) {
        console.log("new record");
        // Prepare the data to be upserted
        let data = {
          user_id: userId, // include the userId
          exercise_id: exercise_id,
          pr: exerciseRecord.pr,
          one_rep_max: exerciseRecord.oneRepMax,
          max_volume: exerciseRecord.maxVolume,
        };

        // If a record has been broken, upsert the corresponding timestamp
        if (exerciseRecord.prBroken) {
          data.pr_date = new Date();
        }
        if (exerciseRecord.oneRepMaxBroken) {
          data.one_rep_max_date = new Date();
        }
        if (exerciseRecord.maxVolumeBroken) {
          data.max_vol_date = new Date();
        }
        console.log("data record to be posted", data);
        // Upsert the data
        const { error } = await supabase
          .from("exercise_records")
          .upsert(data, { returning: "minimal", onConflict: "exercise_id" });

        if (error) {
          console.error("Error: ", error);
        }
        console.log("new record inserted");
      }
      // If no record has been broken, the loop will simply move on to the next exercise
    }
  }
}
async function getRecords(exercises) {
  const exerciseIDs = exercises.map((exercise) => exercise.exercise_id);

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
