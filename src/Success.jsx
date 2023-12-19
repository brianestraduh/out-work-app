import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./App.css";
import { Link } from "react-router-dom";
import Login from "./Login";

const supabase = createClient(
  "https://hckijckjbwwzoxkjzafs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhja2lqY2tqYnd3em94a2p6YWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3ODk4NDYsImV4cCI6MjAxODM2NTg0Nn0.Kl_-VoDio5WlNZsD4G5O4Em0OwcjgPo1_zUf2_qwPsE"
);

function Success() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user: ", error);
      } else if (data) {
        console.log(data);
        setUser(data);
      }
    }

    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div>
      {user && Object.keys(user).length > 0 ? (
        <>
          <div>
            <h1>Success</h1>
            <button onClick={signOutUser}>Sign Out</button>
          </div>
        </>
      ) : (
        <>
          <h1>User is not Logged In</h1>
          <Link to={"/"}>Sign in</Link>
        </>
      )}
    </div>
  );
}

export default Success;
