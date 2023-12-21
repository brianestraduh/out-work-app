import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./redux/darkMode/darkModeSlice.js";
import sessionReducer from "./redux/session/sessionSlice.js";

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
    if (serializedState === null) return { darkMode: false };
    return { darkMode: JSON.parse(serializedState) };
  } catch (e) {
    console.warn(e);
    return { darkMode: false };
  }
};

const store = configureStore({
  preloadedState: loadFromLocalStorage(),
  reducer: {
    darkMode: darkModeReducer,
    session: sessionReducer,
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
