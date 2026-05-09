import { createClient } from "@supabase/supabase-js";

// Fallback for build time if env vars are missing
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = rawUrl && rawUrl.length > 10 ? rawUrl : "https://placeholder.supabase.co";
const supabaseAnonKey = rawKey && rawKey.length > 10 ? rawKey : "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


