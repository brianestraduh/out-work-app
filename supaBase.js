import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hckijckjbwwzoxkjzafs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhja2lqY2tqYnd3em94a2p6YWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3ODk4NDYsImV4cCI6MjAxODM2NTg0Nn0.Kl_-VoDio5WlNZsD4G5O4Em0OwcjgPo1_zUf2_qwPsE";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
