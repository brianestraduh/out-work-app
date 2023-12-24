import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: null,
  reducers: {
    setSession: (state, action) => {
      return action.payload;
    },
  },
});
const sessionReducer = sessionSlice.reducer;
export const { setSession } = sessionSlice.actions;
export default sessionReducer;
