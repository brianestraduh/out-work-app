import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/darkMode/darkModeSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supaBase.js";
import Button from "./components/Button.jsx";
import darkIcon from "./assets/dark.svg";
import logo from "./assets/outwork-logo.svg";
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
      <nav>
        <Button
          onClick={() => dispatch(toggleDarkMode())}
          ariaLabel={"Toggle dark mode"}
          className="dark-mode-icon"
          id="dark-mode-toggle"
        >
          <img src={darkIcon} alt="Dark mode toggle" className="darkmode-img" />
        </Button>
        <div
          className={
            isDarkTheme ? "nav-container dark-nav-container" : "nav-container"
          }
        >
          <div className="nav-flex">
            <div className="nav-flex-logo">
              <img src={logo} alt="Outwork logo" className="outwork-logo" />
              {session && <p className="logo-text">OutWork</p>}
            </div>
            {session ? (
              <Button onClick={signOutUser} className="primary-btn">
                Sign Out
              </Button>
            ) : (
              <span className="primary-btn">Learn More</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
