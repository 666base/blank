import { useCallback, useEffect, useState } from 'react';

import type { Session } from '@supabase/supabase-js';

import {
  blankGetSession,
  blankHandleOAuthCallback,
  blankOnAuthStateChange,
  blankSignInWithOAuth,
  blankSignInWithPassword,
  blankSignOut,
  ensureBlankSupabaseConfig,
  isBlankSupabaseConfigured,
} from '../../utils/blank-supabase';
import { revalidateBlankCloudWorkspaces } from '../../modules/workspace-engine';

export function useBlankAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};

    void (async () => {
      await ensureBlankSupabaseConfig();
      const ready = isBlankSupabaseConfigured();
      setConfigured(ready);

      if (!ready) {
        setLoading(false);
        return;
      }

      const current = await blankGetSession();
      if (!current && typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash.includes('access_token=')) {
          await blankHandleOAuthCallback();
        }
      }
      const session = await blankGetSession();
      setSession(session);
      if (session) {
        revalidateBlankCloudWorkspaces();
      }
      setLoading(false);
      unsubscribe = blankOnAuthStateChange(s => {
        setSession(s);
        if (s) {
          revalidateBlankCloudWorkspaces();
        }
      });
    })();

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const next = await blankSignInWithPassword(email, password);
      setSession(next);
      revalidateBlankCloudWorkspaces();
      return next;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await blankSignOut();
    setSession(null);
    revalidateBlankCloudWorkspaces();
  }, []);

  const signInWithOAuth = useCallback(async (provider: 'google' | 'github') => {
    setError(null);
    try {
      await blankSignInWithOAuth(provider);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    }
  }, []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    configured,
    error,
    signIn,
    signInWithOAuth,
    signOut,
    isSignedIn: Boolean(session?.user),
  };
}
