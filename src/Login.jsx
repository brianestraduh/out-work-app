import supabase from "../supaBase.js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function Login() {
  return (
    <div>
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
