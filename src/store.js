import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./redux/darkMode/darkModeSlice.js";

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.darkMode);
    localStorage.setItem("darkMode", serializedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("darkMode");
    if (serializedState === null) return undefined;
    return { darkMode: JSON.parse(serializedState) };
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = configureStore({
  preloadedState: loadFromLocalStorage(),
  reducer: {
    darkMode: darkModeReducer,
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
