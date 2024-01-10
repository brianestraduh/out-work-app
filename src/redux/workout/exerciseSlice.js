import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: [],
  reducers: {
    upsertExercise: (state, action) => {
      const index = state.findIndex(
        (exercise) => exercise.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    clearExercises: () => {
      return [];
    },
  },
});

const exerciseReducer = exerciseSlice.reducer;
export const { upsertExercise, clearExercises } = exerciseSlice.actions;

export default exerciseReducer;
