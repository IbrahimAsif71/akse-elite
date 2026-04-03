import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function useSupabase(): SupabaseClient {
  if (_client) return _client;

  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl as string;
  const key = config.public.supabaseKey as string;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: SUPABASE_URL and SUPABASE_KEY must be set.",
    );
  }

  _client = createClient(url, key);
  return _client;
}
