import { configureStore, combineReducers } from "@reduxjs/toolkit";
import darkModeReducer from "./redux/darkMode/darkModeSlice.js";
import sessionReducer from "./redux/session/sessionSlice.js";
import workoutIdReducer from "./redux/workoutSession/workoutIdSlice.js";
import exerciseReducer from "./redux/workoutSession/exerciseSlice.js";
import exerciseIdReducer from "./redux/exercises/exerciseIdSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  session: sessionReducer,
  workoutId: workoutIdReducer,
  exercise: exerciseReducer,
  exerciseId: exerciseIdReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
