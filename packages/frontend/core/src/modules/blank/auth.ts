import { createClient } from '@supabase/supabase-js';

import {
  BLANK_SYNC_WORKSPACE_ID,
  type BlankSupabaseSession,
  getBlankSupabaseAnonKey,
  getBlankSupabaseUrl,
  loadBlankSupabaseSession,
  saveBlankSupabaseSession,
} from './config';

function requireConfig() {
  const url = getBlankSupabaseUrl();
  const anon = getBlankSupabaseAnonKey();
  if (!url || !anon) {
    throw new Error('Blank Supabase URL/anon key not configured');
  }
  return { url, anon };
}

async function ensureBlankWorkspaceRow(
  client: ReturnType<typeof createClient>,
  ownerId: string
) {
  await client.from('workspaces').upsert({
    id: BLANK_SYNC_WORKSPACE_ID,
    owner_id: ownerId,
    name: 'Blank',
  });
}

export async function blankSignInWithPassword(
  email: string,
  password: string
): Promise<BlankSupabaseSession> {
  const { url, anon } = requireConfig();
  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data.session) {
    throw new Error(error?.message ?? 'sign-in failed');
  }
  const session: BlankSupabaseSession = {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_at: data.session.expires_at,
    user_id: data.user?.id,
  };
  saveBlankSupabaseSession(session);

  if (data.user) {
    await ensureBlankWorkspaceRow(client, data.user.id);
  }

  return session;
}

export async function blankSignUpWithPassword(
  email: string,
  password: string
): Promise<BlankSupabaseSession> {
  const { url, anon } = requireConfig();
  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  if (data.session) {
    const session: BlankSupabaseSession = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user_id: data.user?.id,
    };
    saveBlankSupabaseSession(session);
    if (data.user) {
      await ensureBlankWorkspaceRow(client, data.user.id);
    }
    return session;
  }
  // Email confirmation may be required
  throw new Error(
    'Check your email to confirm the account, then sign in again.'
  );
}

export function blankSignOut(): void {
  saveBlankSupabaseSession(null);
}

export function blankGetSession(): BlankSupabaseSession | null {
  return loadBlankSupabaseSession();
}
