import type { ProcessingFolderCreation } from "@core/hooks/useProcessingFolderCreation";

export type { ProcessingFolderCreation };
export { useProcessingFolderCreation } from "@core/hooks/useProcessingFolderCreation";

/**
 * Desktop offline override: folder processing runs on a server pipeline the
 * bundled backend does not have, so the setup entry must not exist. False
 * hides the rail entry, the home-page creation flow, and the setup dialog.
 */
export const canCreateProcessingFolders = false;
