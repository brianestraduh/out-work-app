import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/darkMode/darkModeSlice.js";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    if (isDarkTheme) {
      dispatch(toggleDarkMode());
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <nav className="">
      <p>NavBar</p>
      <button onClick={() => dispatch(toggleDarkMode())}>DarkMode</button>
    </nav>
  );
}

export default Navbar;
