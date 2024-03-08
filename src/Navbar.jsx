import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/darkMode/darkModeSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supaBase.js";
import Button from "./components/Button.jsx";
import darkIcon from "./assets/dark.svg";

function Navbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const isDarkTheme = useSelector((state) => state.darkMode);

  //handle signout and remove token from local storage
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/");
        window.localStorage.removeItem("oauth_provider_token");
      }
    });
  }, []);

  function signOutUser() {
    supabase.auth.signOut();
  }

  //check if dark mode is enabled on page load
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
    <header>
      <Button
        onClick={() => dispatch(toggleDarkMode())}
        ariaLabel={"Toggle dark mode"}
        className="ax-button"
        id="dark-mode-toggle"
      >
        <img src={darkIcon} alt="Dark mode toggle" className="dark-mode-icon" />
      </Button>
      <nav>
        <div className="container">
          {session && <button onClick={signOutUser}>Sign Out</button>}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
