import { createSlice } from "@reduxjs/toolkit";

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: { workouts: [] },
  reducers: {
    setWorkoutsInfo: (state, action) => {
      return { ...state, workouts: action.payload };
    },
  },
});
const workoutsReducer = workoutsSlice.reducer;
export const { setWorkoutsInfo } = workoutsSlice.actions;
export default workoutsReducer;
