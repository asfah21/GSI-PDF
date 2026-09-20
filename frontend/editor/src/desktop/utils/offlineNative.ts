/**
 * True in offline native (Tauri) builds: no account, no server, no outbound
 * calls. Set via VITE_OFFLINE_NATIVE in the committed editor/.env.desktop,
 * so every desktop build carries it. Use this to hide internet-bound UI
 * (sign-in, shared signing, notifications, update checks) instead of
 * showing disabled controls that can never work.
 */
export function isOfflineNative(): boolean {
  return import.meta.env.VITE_OFFLINE_NATIVE === "true";
}
