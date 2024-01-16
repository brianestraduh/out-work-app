import { createSlice } from "@reduxjs/toolkit";

const exerciseIdSlice = createSlice({
  name: "exerciseId",
  initialState: null,
  reducers: {
    addExerciseId: (state, action) => {
      return action.payload;
    },
    clearExerciseId: () => {
      return [];
    },
  },
});

const exerciseIdReducer = exerciseIdSlice.reducer;
export const { addExerciseId, clearExerciseId } = exerciseIdSlice.actions;

export default exerciseIdReducer;
