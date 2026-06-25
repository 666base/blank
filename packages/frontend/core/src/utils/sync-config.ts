export const BLANK_SYNC_SERVER_STORAGE_KEY = 'blank:sync-server-url';

function normalizeServerUrl(url: string) {
  return url.trim().replace(/\/+$/, '');
}

/** Sync server URL from build env or user settings (settings require app reload). */
export function getBlankSyncServerUrl(): string | undefined {
  const fromBuild = BUILD_CONFIG.blankSyncServerUrl?.trim();
  if (fromBuild) {
    return normalizeServerUrl(fromBuild);
  }

  try {
    const fromStorage = globalThis.localStorage
      ?.getItem(BLANK_SYNC_SERVER_STORAGE_KEY)
      ?.trim();
    if (fromStorage) {
      return normalizeServerUrl(fromStorage);
    }
  } catch {
    // no localStorage (worker / SSR)
  }

  return undefined;
}

export function isBlankSyncEnabled() {
  return Boolean(getBlankSyncServerUrl());
}

export function isBlankSyncServerLocked() {
  return Boolean(BUILD_CONFIG.blankSyncServerUrl?.trim());
}

export function setBlankSyncServerUrl(url: string | null) {
  if (isBlankSyncServerLocked()) {
    throw new Error('Sync server URL is fixed at build time.');
  }

  if (!url?.trim()) {
    globalThis.localStorage?.removeItem(BLANK_SYNC_SERVER_STORAGE_KEY);
    return;
  }

  globalThis.localStorage?.setItem(
    BLANK_SYNC_SERVER_STORAGE_KEY,
    normalizeServerUrl(url)
  );
}
