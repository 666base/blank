/**
 * Blank product config — Supabase sync, no AFFiNE Cloud.
 * Env injected at build via rspack DefinePlugin (see tools/cli).
 */

declare const process: {
  env: Record<string, string | undefined>;
};

const SESSION_KEY = 'blank.supabase.session';

/**
 * Stable Supabase workspace id for all devices of one Blank account.
 * Local IndexedDB may use per-device nanoids; remotes always use this so
 * PC ↔ phone CRDT updates land in the same Postgres namespace.
 */
export const BLANK_SYNC_WORKSPACE_ID = 'blank-default';

export type BlankSupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user_id?: string;
};

export function getBlankSupabaseUrl(): string | undefined {
  return process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || undefined;
}

export function getBlankSupabaseAnonKey(): string | undefined {
  return (
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    undefined
  );
}

export function isBlankSupabaseConfigured(): boolean {
  return Boolean(getBlankSupabaseUrl() && getBlankSupabaseAnonKey());
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
