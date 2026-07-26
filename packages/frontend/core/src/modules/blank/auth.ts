import { createClient } from '@supabase/supabase-js';

import {
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

  // Ensure workspace registry row exists for sync metadata
  if (data.user) {
    await client.from('workspaces').upsert({
      id: 'blank-default',
      owner_id: data.user.id,
      name: 'Blank',
    });
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
