import { useCallback, useEffect, useState } from 'react';

import type { Session } from '@supabase/supabase-js';

import {
  blankGetSession,
  blankOnAuthStateChange,
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
      setSession(current);
      if (current) {
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

  return {
    session,
    user: session?.user ?? null,
    loading,
    configured,
    error,
    signIn,
    signOut,
    isSignedIn: Boolean(session?.user),
  };
}
