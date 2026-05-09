import { createClient } from "@supabase/supabase-js";

export function createServerSupabase() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabaseUrl = rawUrl && rawUrl.length > 10 ? rawUrl : "https://placeholder.supabase.co";
  const supabaseAnonKey = rawKey && rawKey.length > 10 ? rawKey : "placeholder";
  
  return createClient(supabaseUrl, supabaseAnonKey);
}


