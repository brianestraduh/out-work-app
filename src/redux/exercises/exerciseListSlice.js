import { createSlice } from "@reduxjs/toolkit";
const exerciseListSlice = createSlice({
  name: "exerciseList",
  initialState: { exerciseList: [] },
  reducers: {
    setExerciseList: (state, action) => {
      return { ...state, exerciseList: action.payload };
    },
  },
});
const exerciseListReducer = exerciseListSlice.reducer;
export const { setExerciseList } = exerciseListSlice.actions;
export default exerciseListReducer;
