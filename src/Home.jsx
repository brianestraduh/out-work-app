import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./App.css";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const supabase = createClient(
  "https://hckijckjbwwzoxkjzafs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhja2lqY2tqYnd3em94a2p6YWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3ODk4NDYsImV4cCI6MjAxODM2NTg0Nn0.Kl_-VoDio5WlNZsD4G5O4Em0OwcjgPo1_zUf2_qwPsE"
);

function Home() {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user: ", error);
      } else if (data) {
        setLoading(false);
        console.log(data);
        setUser(data);
      }
    }

    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      navigate("/"); // navigate to login page after signing out
    }
  }

  return loading ? (
    <Loader /> // Show the Loader component while loading
  ) : user && Object.keys(user).length > 0 ? (
    <div>
      <ul>
        <li>
          <Link to="/workout">Start Workout</Link>
        </li>
        <li>
          <Link to="/createWorkouts">Create or Edit Workouts</Link>
        </li>
        <li>
          <Link to="/previousWorkouts">Previous WorkOuts</Link>
        </li>
        <li>
          <Link to="/progression">Progression</Link>
        </li>
      </ul>
      <button onClick={() => signOutUser()}>Sign Out</button>
    </div>
  ) : (
    <>
      <h1>User is not Logged In</h1>
      <Link to={"/"}>Sign in</Link>
    </>
  );
}
export default Home;
