import { createSlice } from "@reduxjs/toolkit";

const exerciseIdSlice = createSlice({
  name: "exerciseId",
  initialState: null,
  reducers: {
    addExerciseId: (state, action) => {
      return action.payload;
    },
    clearExerciseId: () => {
      return null;
    },
  },
});

const exerciseIdReducer = exerciseIdSlice.reducer;
export const { AddtExerciseId, clearExerciseId } = exerciseIdSlice.actions;

export default exerciseIdReducer;
