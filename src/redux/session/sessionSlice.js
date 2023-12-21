import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setSession } = sessionSlice.actions;
const sessionReducer = sessionSlice.reducer;
export default sessionReducer;
