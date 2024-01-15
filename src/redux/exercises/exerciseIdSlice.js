import { createSlice } from "@reduxjs/toolkit";

const exerciseIdSlice = createSlice({
  name: "exerciseId",
  initialState: [],
  reducers: {
    addExerciseId: (state, action) => {
      state.push(action.payload);
    },
    clearExerciseId: () => {
      return [];
    },
  },
});

const exerciseIdReducer = exerciseIdSlice.reducer;
export const { addExerciseId, clearExerciseId } = exerciseIdSlice.actions;

export default exerciseIdReducer;
