import { useState, useEffect } from "react";
import supabase from "../supaBase.js";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./components/Button.jsx";
import FormInput from "./components/FormInput.jsx";
export default function Account() {
  const session = useSelector((state) => state.session);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [weight, setWeight] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, weight, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWeight(data.weight);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      weight,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }
  function handleAvatarUpload(event, url) {
    setAvatarUrl(url);
    handleSubmit(event);
  }
  return (
    <form onSubmit={handleSubmit} className="form-widget">
      <Avatar url={avatar_url} size={150} onUpload={handleAvatarUpload} />
      <FormInput
        label="Email"
        htmlFor="email"
        id="email"
        type="text"
        value={session.user.email}
        disabled
      />
      <FormInput
        label="Name"
        htmlFor="username"
        id="username"
        type="text"
        required={true}
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        label="Weight"
        htmlFor="weight"
        id="weight"
        type="number"
        value={weight || ""}
        onChange={(e) => setWeight(e.target.value)}
      />

      <Button className="button block primary" type="submit" disabled={loading}>
        {loading ? "Loading ..." : "Update"}
      </Button>

      <Link to="/">Back</Link>
    </form>
  );
}
