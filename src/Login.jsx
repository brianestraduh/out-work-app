import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supaBase.js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./App.css";

function Login() {
  return (
    <div>
      <h1>OutWork</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["discord"]}
        theme="dark"
      />
    </div>
  );
}

export default Login;
