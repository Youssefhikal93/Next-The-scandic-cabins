import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Dedicated throwaway client for auth operations (login verification,
// signup). NEVER use the shared client above for these: signInWithPassword
// would attach the guest's session to it, and every later data query would
// then run with that guest's token instead of the server key.
export function createAuthClient() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
