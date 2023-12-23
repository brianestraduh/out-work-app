import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./redux/darkMode/darkModeSlice.js";

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
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
