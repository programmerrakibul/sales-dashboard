import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY: string | undefined = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error("SUPABASE_URL is required in the .env file!");
}

if (!SUPABASE_KEY) {
  throw new Error("SUPABASE_KEY is required in the .env file!");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
