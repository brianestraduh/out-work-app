import { createSlice } from "@reduxjs/toolkit";

const workoutIdSlice = createSlice({
  name: "workoutId",
  initialState: { id: null, name: "" },
  reducers: {
    setWorkoutId: (state, action) => {
      state.id = action.payload;
    },
    setWorkoutName: (state, action) => {
      state.name = action.payload;
    },
    clearWorkoutInfo: (state) => {
      state.id = null;
      state.name = "";
    },
  },
});
const workoutIdReducer = workoutIdSlice.reducer;
export const { setWorkoutId, setWorkoutName, clearWorkoutInfo } =
  workoutIdSlice.actions;
export default workoutIdReducer;
