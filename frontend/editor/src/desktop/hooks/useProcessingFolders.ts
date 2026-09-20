import { useProcessingFolders as useCoreProcessingFolders } from "@core/hooks/useProcessingFolders";
import type { ProcessingFoldersApi } from "@proprietary/hooks/useProcessingFolders";

export type {
  MountedFileState,
  ProcessingFolderState,
  ProcessingFoldersApi,
  ProcessingRecordSummary,
  ProcessingRunInfo,
} from "@proprietary/hooks/useProcessingFolders";
export { refreshProcessingFolders } from "@core/hooks/useProcessingFolders";

/**
 * Desktop offline override: the bundled backend has no
 * `/api/v1/processing-folders` routes, so the proprietary implementation
 * would fetch on mount and surface its 404 as a visible error. Return the
 * inert core implementation instead: no requests, no errors, and every
 * consumer (folder menus, files page) treats folders as ordinary.
 */
export function useProcessingFolders(): ProcessingFoldersApi {
  return useCoreProcessingFolders();
}
