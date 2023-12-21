import { useEffect } from "react";
import { setSession } from "../redux/session/sessionSlice";
import { useDispatch } from "react-redux";

function useLocalStorage(key, initialValue) {
  const dispatch = useDispatch();
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(value));
    // Save to redux
    dispatch(setSession(value));
  };

  useEffect(() => {
    const storedValue = readValue();
    dispatch(setSession(storedValue));
  }, [key]);

  return [readValue(), setValue];
}
