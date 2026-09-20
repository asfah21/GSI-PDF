import { isOfflineNative } from "@app/utils/offlineNative";

/**
 * Desktop override: the bundled offline backend has no notification routes,
 * so the bell must not mount at all — an unconditional mount would poll a
 * nonexistent endpoint, leaving a permanent timer and 404s for nothing it
 * could ever show. Online desktop modes keep the proprietary answer (true).
 */
export function useNotificationsAvailable(): boolean {
  return !isOfflineNative();
}
