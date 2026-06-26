import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
import { revalidateBlankCloudWorkspaces } from '../workspace-engine';

const AUTH_INIT_TIMEOUT_MS = 8_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error('Auth init timed out'));
    }, ms);
    promise.then(
      value => {
        window.clearTimeout(timer);
        resolve(value);
      },
      error => {
        window.clearTimeout(timer);
        reject(error);
      }
    );
  });
}

type BlankAuthContextValue = {
  session: Session | null;
  user: Session['user'] | null;
  loading: boolean;
  configured: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<Session | null>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
  isSignedIn: boolean;
};

const BlankAuthContext = createContext<BlankAuthContextValue | null>(null);

export const BlankAuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;

    void (async () => {
      try {
        await withTimeout(ensureBlankSupabaseConfig(), AUTH_INIT_TIMEOUT_MS);
        const ready = isBlankSupabaseConfigured();
        if (cancelled) {
          return;
        }
        setConfigured(ready);

        if (!ready) {
          setLoading(false);
          return;
        }

        let current = await withTimeout(blankGetSession(), AUTH_INIT_TIMEOUT_MS);
        if (
          !current &&
          typeof window !== 'undefined' &&
          window.location.hash.includes('access_token=')
        ) {
          await blankHandleOAuthCallback();
          current = await blankGetSession();
        }

        if (cancelled) {
          return;
        }

        setSession(current);
        if (current) {
          revalidateBlankCloudWorkspaces();
        }
        setLoading(false);
        unsubscribe = blankOnAuthStateChange(next => {
          setSession(next);
          if (next) {
            revalidateBlankCloudWorkspaces();
          }
        });
      } catch (err) {
        if (cancelled) {
          return;
        }
        console.warn('[blank-auth] init failed', err);
        setConfigured(isBlankSupabaseConfigured());
        setError(err instanceof Error ? err.message : 'Auth init failed');
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const next = await blankSignInWithPassword(email, password);
      setSession(next);
      revalidateBlankCloudWorkspaces();
      return next;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
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

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      configured,
      error,
      signIn,
      signInWithOAuth,
      signOut,
      isSignedIn: Boolean(session?.user),
    }),
    [
      configured,
      error,
      loading,
      session,
      signIn,
      signInWithOAuth,
      signOut,
    ]
  );

  return (
    <BlankAuthContext.Provider value={value}>
      {children}
    </BlankAuthContext.Provider>
  );
};

export function useBlankAuth(): BlankAuthContextValue {
  const context = useContext(BlankAuthContext);
  if (!context) {
    return {
      session: null,
      user: null,
      loading: false,
      configured: isBlankSupabaseConfigured(),
      error: null,
      signIn: async () => {
        throw new Error('Supabase is not configured');
      },
      signInWithOAuth: async () => {
        throw new Error('Supabase is not configured');
      },
      signOut: async () => {},
      isSignedIn: false,
    };
  }
  return context;
}
