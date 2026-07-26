/**
 * Blank product config — Supabase sync, no AFFiNE Cloud.
 * Env injected at build via rspack DefinePlugin (see tools/cli).
 */

declare const process: {
  env: Record<string, string | undefined>;
};

/** Explicit globals — more reliable than process.env.* under some bundlers. */
declare const __BLANK_SUPABASE_URL__: string | undefined;
declare const __BLANK_SUPABASE_ANON_KEY__: string | undefined;

const SESSION_KEY = 'blank.supabase.session';
const STORAGE_MODE_KEY = 'blank.storage.mode';

/**
 * Stable Supabase workspace id for all devices of one Blank account.
 * Local IndexedDB may use per-device nanoids; remotes always use this so
 * PC ↔ phone CRDT updates land in the same Postgres namespace.
 */
export const BLANK_SYNC_WORKSPACE_ID = 'blank-default';

export type BlankStorageMode = 'local' | 'folder' | 'account';

export type BlankSupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user_id?: string;
};

function readDefine(
  globalName: 'url' | 'anon',
  ...envKeys: string[]
): string | undefined {
  try {
    if (globalName === 'url' && typeof __BLANK_SUPABASE_URL__ === 'string') {
      const v = __BLANK_SUPABASE_URL__.trim();
      if (v) return v;
    }
    if (
      globalName === 'anon' &&
      typeof __BLANK_SUPABASE_ANON_KEY__ === 'string'
    ) {
      const v = __BLANK_SUPABASE_ANON_KEY__.trim();
      if (v) return v;
    }
  } catch {
    // globals may be undeclared outside the web bundle
  }
  for (const key of envKeys) {
    const v = process.env[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return undefined;
}

export function getBlankSupabaseUrl(): string | undefined {
  return readDefine('url', 'VITE_SUPABASE_URL', 'SUPABASE_URL');
}

export function getBlankSupabaseAnonKey(): string | undefined {
  return readDefine(
    'anon',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    'SUPABASE_ANON_KEY'
  );
}

export function isBlankSupabaseConfigured(): boolean {
  return Boolean(getBlankSupabaseUrl() && getBlankSupabaseAnonKey());
}

export function getBlankStorageMode(): BlankStorageMode {
  if (typeof localStorage === 'undefined') return 'local';
  const raw = localStorage.getItem(STORAGE_MODE_KEY);
  if (raw === 'folder' || raw === 'account' || raw === 'local') return raw;
  // Legacy: signed-in session implies account mode
  if (loadBlankSupabaseSession()?.access_token) return 'account';
  return 'local';
}

export function setBlankStorageMode(mode: BlankStorageMode): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_MODE_KEY, mode);
  if (mode !== 'account') {
    saveBlankSupabaseSession(null);
  }
}

/** Product flags: no AFFiNE Cloud UX, no AI. */
export const BLANK_PRODUCT = {
  name: 'Blank',
  /** Hide Enable Cloud / AFFiNE Cloud auth / billing / members. */
  disableAffineCloud: true,
  /** Hide Copilot / Ask AI. */
  disableAi: true,
} as const;

export function loadBlankSupabaseSession(): BlankSupabaseSession | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BlankSupabaseSession;
  } catch {
    return null;
  }
}

export function saveBlankSupabaseSession(
  session: BlankSupabaseSession | null
): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getBlankSupabaseRemoteOpts(_localWorkspaceId: string):
  | {
      id: string;
      supabaseUrl: string;
      supabaseAnonKey: string;
      accessToken: string;
      refreshToken?: string;
      clientId: string;
    }
  | undefined {
  if (getBlankStorageMode() !== 'account') {
    return undefined;
  }
  const url = getBlankSupabaseUrl();
  const anon = getBlankSupabaseAnonKey();
  const session = loadBlankSupabaseSession();
  if (!url || !anon || !session?.access_token) {
    return undefined;
  }
  return {
    // Always the shared Blank space — not the local nanoid.
    id: BLANK_SYNC_WORKSPACE_ID,
    supabaseUrl: url,
    supabaseAnonKey: anon,
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    clientId:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `blank-${Date.now()}`,
  };
}

/** True when the AFFiNE Cloud stub baseUrl is in use (no Nest). */
export function isBlankStubCloudBaseUrl(baseUrl: string): boolean {
  return (
    baseUrl.includes('127.0.0.1:9') ||
    baseUrl.includes('localhost:9') ||
    BLANK_PRODUCT.disableAffineCloud
  );
}
