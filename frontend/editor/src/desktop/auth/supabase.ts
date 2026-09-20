import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { STIRLING_SAAS_URL, SUPABASE_KEY } from "@app/constants/connection";

/**
 * Supabase client for desktop application
 * Used to call Supabase edge functions for billing and other SaaS features
 *
 * Note: Desktop uses authService for authentication (JWT stored in Tauri secure store),
 * but this client is needed for calling Supabase edge functions like get-usage-billing
 */

/** False in offline native builds (no SaaS URL configured): billing/SaaS calls stay disabled. */
export const isSupabaseConfigured = Boolean(STIRLING_SAAS_URL && SUPABASE_KEY);

if (!isSupabaseConfigured) {
  console.warn(
    "[Desktop Supabase] SaaS not configured - SaaS features will not work",
  );
}

let cachedClient: SupabaseClient | null = null;

/**
 * Null when unconfigured so merely importing this module never throws.
 * supabase-js rejects an empty URL at construction, which used to kill the
 * whole bundle at import time and strand the app on the boot splash.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(STIRLING_SAAS_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false, // Desktop manages auth via authService + Tauri secure store
        autoRefreshToken: false, // Desktop manually refreshes tokens via authService
        detectSessionInUrl: false, // Desktop uses deep links, not URL hash fragments
      },
    });
  }
  return cachedClient;
}

/** SaaS call sites use this: throws a friendly error only when actually invoked. */
export function requireSupabase(): SupabaseClient {
  const client = getSupabase();
  if (!client) {
    throw new Error("SaaS features are not configured in this build");
  }
  return client;
}
