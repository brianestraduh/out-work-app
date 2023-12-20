import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./App.css";

const supabase = createClient(
  "https://hckijckjbwwzoxkjzafs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhja2lqY2tqYnd3em94a2p6YWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3ODk4NDYsImV4cCI6MjAxODM2NTg0Nn0.Kl_-VoDio5WlNZsD4G5O4Em0OwcjgPo1_zUf2_qwPsE"
);

function Login() {
  const [session, setSession] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (event === "SIGNED_IN") {
        navigate("/home");
      } else if (event === "SIGNED_OUT") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
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
  } else {
    navigate("/home");
  }
}

export default Login;
