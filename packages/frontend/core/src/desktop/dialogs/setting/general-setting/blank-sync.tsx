import { Button, Input } from '@affine/component';
import {
  blankGetSession,
  blankSignInWithPassword,
  blankSignOut,
  blankSignUpWithPassword,
  isBlankSupabaseConfigured,
} from '@affine/core/modules/blank';
import { useCallback, useState } from 'react';

/**
 * Minimal Blank Supabase account panel (one user, two devices).
 * Not AFFiNE Cloud — signs into Supabase Auth and enables CRDT remotes.
 */
export function BlankSyncSettings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState(() => blankGetSession());

  const refresh = useCallback(() => {
    setSession(blankGetSession());
  }, []);

  const onSignIn = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await blankSignInWithPassword(email, password);
      refresh();
      // Remotes attach on next workspace engine open — reload to apply.
      location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [email, password, refresh]);

  const onSignUp = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await blankSignUpWithPassword(email, password);
      refresh();
      location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [email, password, refresh]);

  const onSignOut = useCallback(() => {
    blankSignOut();
    refresh();
    location.reload();
  }, [refresh]);

  if (!isBlankSupabaseConfigured()) {
    return (
      <div style={{ padding: 16 }}>
        <h3>Blank Sync</h3>
        <p>
          Set <code>VITE_SUPABASE_URL</code> and{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code>, then
          rebuild.
        </p>
      </div>
    );
  }

  if (session?.access_token) {
    return (
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <h3>Blank Sync</h3>
        <p>
          Signed in. Documents sync via Supabase when online (shared space{' '}
          <code>blank-default</code> on every device).
        </p>
        <p style={{ opacity: 0.7, fontSize: 12 }}>
          User: {session.user_id ?? 'session'}
        </p>
        <Button onClick={onSignOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <h3>Blank Sync</h3>
      <p>
        Sign in once per device. All local workspaces sync into the same Blank
        space so PC and phone converge.
      </p>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          variant="primary"
          disabled={busy}
          onClick={() => {
            onSignIn().catch(() => {
              // error surfaced via state
            });
          }}
        >
          Sign in
        </Button>
        <Button
          disabled={busy}
          onClick={() => {
            onSignUp().catch(() => {
              // error surfaced via state
            });
          }}
        >
          Create account
        </Button>
      </div>
    </div>
  );
}
