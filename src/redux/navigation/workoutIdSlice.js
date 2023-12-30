import { createSlice } from "@reduxjs/toolkit";

const workoutIdSlice = createSlice({
  name: "workoutId",
  initialState: null,
  reducers: {
    setWorkoutId: (state, action) => {
      return action.payload;
    },
  },
});
const workoutIdReducer = workoutIdSlice.reducer;
export const { setWorkoutId } = workoutIdSlice.actions;
export default workoutIdReducer;
