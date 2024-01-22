import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("darkMode");
    if (serializedState === null) {
      return false;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return false;
  }
};

const persistedState = loadState;

const initialState = {
  darkMode: persistedState || { darkMode: true },
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      if (!state.darkMode) {
        state.darkMode = true;
      } else {
        state.darkMode = false;
      }
    },
  },
});

const DarkModeReducer = darkModeSlice.reducer;

export const { toggleDarkMode } = darkModeSlice.actions;

export default DarkModeReducer;
