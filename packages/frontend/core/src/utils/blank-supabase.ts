/** Supabase config + client for Blank sync. No Blank GraphQL. */

import {
  createClient,
  type Session,
  type SupabaseClient,
} from '@supabase/supabase-js';

export const BLANK_SUPABASE_URL_KEY = 'blank:supabase-url';
export const BLANK_SUPABASE_ANON_KEY = 'blank:supabase-anon-key';
/** Synced to localStorage so nbstore worker can read fresh JWT. */
export const BLANK_ACCESS_TOKEN_KEY = 'blank:access-token';
export const BLANK_NATIVE_SYNC_PROTOCOL = 'blank-sync-v1';

function normalizeUrl(url: string) {
  return url.trim().replace(/\/+$/, '');
}

export function getBlankSupabaseUrl(): string | undefined {
  const fromBuild = BUILD_CONFIG.blankSupabaseUrl?.trim();
  if (fromBuild) {
    return normalizeUrl(fromBuild);
  }
  try {
    const v = globalThis.localStorage?.getItem(BLANK_SUPABASE_URL_KEY)?.trim();
    return v ? normalizeUrl(v) : undefined;
  } catch {
    return undefined;
  }
}

export function getBlankSupabaseAnonKey(): string | undefined {
  const fromBuild = BUILD_CONFIG.blankSupabaseAnonKey?.trim();
  if (fromBuild) {
    return fromBuild;
  }
  try {
    return globalThis.localStorage?.getItem(BLANK_SUPABASE_ANON_KEY)?.trim();
  } catch {
    return undefined;
  }
}

export function isBlankSupabaseConfigured() {
  return Boolean(getBlankSupabaseUrl() && getBlankSupabaseAnonKey());
}

export function setBlankSupabaseConfig(url: string | null, anonKey: string | null) {
  if (!url?.trim() || !anonKey?.trim()) {
    try {
      globalThis.localStorage?.removeItem(BLANK_SUPABASE_URL_KEY);
      globalThis.localStorage?.removeItem(BLANK_SUPABASE_ANON_KEY);
    } catch {
      // ignore
    }
    return;
  }
  try {
    globalThis.localStorage?.setItem(BLANK_SUPABASE_URL_KEY, normalizeUrl(url));
    globalThis.localStorage?.setItem(BLANK_SUPABASE_ANON_KEY, anonKey.trim());
  } catch {
    // ignore
  }
}

let client: SupabaseClient | null = null;
let cachedAccessToken: string | null = null;

export function getBlankAccessToken(): string | undefined {
  if (cachedAccessToken) {
    return cachedAccessToken;
  }
  try {
    return globalThis.localStorage?.getItem(BLANK_ACCESS_TOKEN_KEY)?.trim();
  } catch {
    return undefined;
  }
}

function setCachedSession(session: Session | null) {
  cachedAccessToken = session?.access_token ?? null;
  try {
    if (cachedAccessToken) {
      globalThis.localStorage?.setItem(
        BLANK_ACCESS_TOKEN_KEY,
        cachedAccessToken
      );
    } else {
      globalThis.localStorage?.removeItem(BLANK_ACCESS_TOKEN_KEY);
    }
  } catch {
    // worker may read from opts fallback
  }
}

export type BlankWorkspaceRow = {
  id: string;
  name: string;
};

export async function hasBlankWorkspaceDocUpdates(
  workspaceId: string
): Promise<boolean> {
  const supabase = getBlankSupabaseClient();
  if (!supabase) {
    return false;
  }
  const { count, error } = await supabase
    .from('blank_doc_updates')
    .select('doc_id', { count: 'exact', head: true })
    .eq('workspace_id', workspaceId);
  if (error) {
    return false;
  }
  return (count ?? 0) > 0;
}

export async function fetchBlankWorkspaces(): Promise<BlankWorkspaceRow[]> {
  const supabase = getBlankSupabaseClient();
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from('blank_workspaces')
    .select('id, name')
    .order('created_at', { ascending: true });
  if (error) {
    throw error;
  }
  return data ?? [];
}

export function getBlankSupabaseClient(): SupabaseClient | null {
  const url = getBlankSupabaseUrl();
  const key = getBlankSupabaseAnonKey();
  if (!url || !key) {
    return null;
  }
  if (!client) {
    client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}

export function resetBlankSupabaseClient() {
  client = null;
}

/** Fetch public sync config from optional Docker proxy. */
export async function loadBlankSyncConfigFromProxy(baseUrl: string) {
  const res = await fetch(`${normalizeUrl(baseUrl)}/v1/config`);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    protocol?: string;
    auth?: { supabaseUrl?: string | null; supabaseAnonKey?: string | null };
  };
  if (data.protocol !== BLANK_NATIVE_SYNC_PROTOCOL) return null;
  if (data.auth?.supabaseUrl && data.auth?.supabaseAnonKey) {
    setBlankSupabaseConfig(data.auth.supabaseUrl, data.auth.supabaseAnonKey);
    resetBlankSupabaseClient();
  }
  return data;
}

/** Resolve Supabase keys at startup (build env → localStorage → config proxy). */
export async function ensureBlankSupabaseConfig() {
  if (isBlankSupabaseConfigured()) {
    return true;
  }

  const proxy = BUILD_CONFIG.blankConfigProxyUrl?.trim();
  if (!proxy) {
    return false;
  }

  try {
    await loadBlankSyncConfigFromProxy(proxy);
  } catch {
    return false;
  }

  return isBlankSupabaseConfigured();
}

export async function blankSignInWithPassword(email: string, password: string) {
  const supabase = getBlankSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) {
    throw error;
  }
  setCachedSession(data.session);
  return data.session;
}

export async function blankSignOut() {
  const supabase = getBlankSupabaseClient();
  if (!supabase) {
    return;
  }
  await supabase.auth.signOut();
  setCachedSession(null);
}

export async function blankGetSession(): Promise<Session | null> {
  const supabase = getBlankSupabaseClient();
  if (!supabase) {
    return null;
  }
  const { data } = await supabase.auth.getSession();
  setCachedSession(data.session);
  return data.session;
}

export function blankOnAuthStateChange(
  callback: (session: Session | null) => void
) {
  const supabase = getBlankSupabaseClient();
  if (!supabase) {
    return () => {};
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    setCachedSession(session);
    callback(session);
  });
  return () => data.subscription.unsubscribe();
}
