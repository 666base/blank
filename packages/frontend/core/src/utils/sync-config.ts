import { isBlankBuild } from './blank-links';

/** Legacy Blank-compatible sync URL — never used on Blank builds. */
export const BLANK_SYNC_SERVER_STORAGE_KEY = 'blank:sync-server-url';

/** Blank native server (REST /v1/*, protocol blank-sync-v1). Wired in phase 5d. */
export const BLANK_NATIVE_SERVER_STORAGE_KEY = 'blank:native-server-url';

export const BLANK_NATIVE_SYNC_PROTOCOL = 'blank-sync-v1';

function normalizeServerUrl(url: string) {
  return url.trim().replace(/\/+$/, '');
}

/** Sync server URL from build env or user settings (settings require app reload). */
export function getBlankSyncServerUrl(): string | undefined {
  if (isBlankBuild()) {
    return undefined;
  }

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
  if (isBlankBuild()) {
    return false;
  }
  return Boolean(getBlankSyncServerUrl());
}

export function isBlankSyncServerLocked() {
  if (isBlankBuild()) {
    return true;
  }
  return Boolean(BUILD_CONFIG.blankSyncServerUrl?.trim());
}

/** Remove any legacy sync URL from storage (Blank is local-only). */
export function clearBlankSyncServerUrl() {
  try {
    globalThis.localStorage?.removeItem(BLANK_SYNC_SERVER_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getBlankNativeServerUrl(): string | undefined {
  try {
    const fromStorage = globalThis.localStorage
      ?.getItem(BLANK_NATIVE_SERVER_STORAGE_KEY)
      ?.trim();
    if (fromStorage) {
      return normalizeServerUrl(fromStorage);
    }
  } catch {
    // no localStorage
  }
  return undefined;
}

/** True when a Blank native server URL is saved (sync still gated until adapter ships). */
export function isBlankNativeServerConfigured() {
  return Boolean(getBlankNativeServerUrl());
}

export async function probeBlankNativeServer(
  baseUrl: string
): Promise<{ ok: boolean; protocol?: string; version?: string }> {
  try {
    const res = await fetch(`${normalizeServerUrl(baseUrl)}/v1/config`);
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as {
      protocol?: string;
      version?: string;
    };
    return {
      ok: data.protocol === BLANK_NATIVE_SYNC_PROTOCOL,
      protocol: data.protocol,
      version: data.version,
    };
  } catch {
    return { ok: false };
  }
}

export function setBlankNativeServerUrl(url: string | null) {
  if (!url?.trim()) {
    globalThis.localStorage?.removeItem(BLANK_NATIVE_SERVER_STORAGE_KEY);
    return;
  }
  globalThis.localStorage?.setItem(
    BLANK_NATIVE_SERVER_STORAGE_KEY,
    normalizeServerUrl(url)
  );
}

export function setBlankSyncServerUrl(url: string | null) {
  if (isBlankBuild()) {
    throw new Error('Blank does not use Blank sync servers.');
  }

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
