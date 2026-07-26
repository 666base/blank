import { createClient } from '@supabase/supabase-js';

import {
  BLANK_SYNC_WORKSPACE_ID,
  type BlankSupabaseSession,
  getBlankSupabaseAnonKey,
  getBlankSupabaseUrl,
  loadBlankSupabaseSession,
  saveBlankSupabaseSession,
  setBlankStorageMode,
} from './config';

function requireConfig() {
  const url = getBlankSupabaseUrl();
  const anon = getBlankSupabaseAnonKey();
  if (!url || !anon) {
    throw new Error(
      'Blank Sync is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart the app.'
    );
  }
  return { url, anon };
}

function friendlyAuthError(error: unknown, fallback: string): Error {
  const msg =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : fallback;
  const lower = msg.toLowerCase();
  if (
    lower.includes('failed to fetch') ||
    lower.includes('networkerror') ||
    lower.includes('fetch failed') ||
    lower.includes('network request failed')
  ) {
    return new Error(
      'Could not reach Blank Sync (network). Check your connection, or use This device / Folder backup instead.'
    );
  }
  if (lower.includes('email not confirmed')) {
    return new Error(
      'Email not confirmed yet. Check your inbox, or use Folder backup (no account needed).'
    );
  }
  if (lower.includes('invalid login')) {
    return new Error('Wrong email or password.');
  }
  return new Error(msg || fallback);
}

async function ensureBlankWorkspaceRow(
  client: ReturnType<typeof createClient>,
  ownerId: string
) {
  try {
    await client.from('workspaces').upsert({
      id: BLANK_SYNC_WORKSPACE_ID,
      owner_id: ownerId,
      name: 'Blank',
    });
  } catch {
    // Non-fatal — sync remotes still work without the registry row.
  }
}

function persistSession(
  session: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  },
  userId?: string
): BlankSupabaseSession {
  const blankSession: BlankSupabaseSession = {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    user_id: userId,
  };
  saveBlankSupabaseSession(blankSession);
  setBlankStorageMode('account');
  return blankSession;
}

export async function blankSignInWithPassword(
  email: string,
  password: string
): Promise<BlankSupabaseSession> {
  const { url, anon } = requireConfig();
  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  let data;
  try {
    const result = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (result.error || !result.data.session) {
      throw friendlyAuthError(
        result.error ?? new Error('sign-in failed'),
        'sign-in failed'
      );
    }
    data = result.data;
  } catch (e) {
    throw friendlyAuthError(e, 'sign-in failed');
  }

  const blankSession = persistSession(data.session, data.user?.id);

  if (data.user) {
    await client.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    await ensureBlankWorkspaceRow(client, data.user.id);
  }

  return blankSession;
}

export async function blankSignUpWithPassword(
  email: string,
  password: string
): Promise<BlankSupabaseSession> {
  const { url, anon } = requireConfig();
  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let data;
  try {
    const result = await client.auth.signUp({
      email: email.trim(),
      password,
    });
    if (result.error) {
      throw friendlyAuthError(result.error, 'sign-up failed');
    }
    data = result.data;
  } catch (e) {
    throw friendlyAuthError(e, 'sign-up failed');
  }

  if (data.session) {
    const blankSession = persistSession(data.session, data.user?.id);
    if (data.user) {
      await client.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      await ensureBlankWorkspaceRow(client, data.user.id);
    }
    return blankSession;
  }

  // Email confirmation may still be required on some projects — try sign-in once.
  try {
    return await blankSignInWithPassword(email, password);
  } catch {
    throw new Error(
      'Account created, but sign-in needs email confirmation. Confirm the email, or use Folder backup (no account).'
    );
  }
}

export function blankSignOut(): void {
  saveBlankSupabaseSession(null);
  setBlankStorageMode('local');
}

export function blankGetSession(): BlankSupabaseSession | null {
  return loadBlankSupabaseSession();
}
