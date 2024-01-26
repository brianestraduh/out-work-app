import { createSlice } from "@reduxjs/toolkit";

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: null,
  reducers: {
    setWorkoutsInfo: (state, action) => {
      state.workouts = action.payload;
    },
  },
});
const workoutsReducer = workoutsSlice.reducer;
export const { setWorkoutsInfo } = workoutsSlice.actions;
export default workoutsReducer;
