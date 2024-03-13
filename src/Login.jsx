import supabase from "../supaBase.js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Hero from "./components/Hero.jsx";
import { useSelector } from "react-redux";

function Login() {
  const isDarkTheme = useSelector((state) => state.darkMode);
  return (
    <>
      <Hero
        className={isDarkTheme ? "hero-dark container" : "hero-light container"}
      ></Hero>
      <div className="login-container">
        <div className=" login-form">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["discord"]}
            theme={isDarkTheme ? "dark" : "light"}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
