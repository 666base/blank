import { Button, Input } from '@affine/component';
import {
  blankExportWorkspaceBackup,
  blankGetSession,
  blankImportWorkspaceBackup,
  blankPickBackupFolderHint,
  blankSignInWithPassword,
  blankSignOut,
  blankSignUpWithPassword,
  type BlankStorageMode,
  getBlankBackupFolderHint,
  getBlankStorageMode,
  isBlankSupabaseConfigured,
  setBlankStorageMode,
} from '@affine/core/modules/blank';
import { useCallback, useState } from 'react';

const modeButtonStyle = (active: boolean): Record<string, string | number> => ({
  flex: 1,
  opacity: active ? 1 : 0.65,
  outline: active ? '2px solid currentColor' : 'none',
});

/**
 * Blank data location: this device, folder backup (Drive/etc), or account sync.
 */
export function BlankSyncSettings() {
  const [mode, setMode] = useState<BlankStorageMode>(() =>
    getBlankStorageMode()
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState(() => blankGetSession());
  const [folderHint, setFolderHint] = useState(() =>
    getBlankBackupFolderHint()
  );

  const refresh = useCallback(() => {
    setSession(blankGetSession());
    setMode(getBlankStorageMode());
    setFolderHint(getBlankBackupFolderHint());
  }, []);

  const selectMode = useCallback(
    (next: BlankStorageMode) => {
      setError(null);
      setInfo(null);
      setBlankStorageMode(next);
      setMode(next);
      if (next !== 'account') {
        setSession(null);
      }
      refresh();
    },
    [refresh]
  );

  const onSignIn = useCallback(async () => {
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      await blankSignInWithPassword(email, password);
      refresh();
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
    setInfo(null);
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

  const onExport = useCallback(async () => {
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      await blankExportWorkspaceBackup();
      setInfo(
        'Backup downloaded. Put the zip in your Google Drive / Dropbox / OneDrive folder to sync across devices — no API keys.'
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, []);

  const onImport = useCallback(async () => {
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      await blankImportWorkspaceBackup();
      setInfo('Import started. Check the workspace for restored docs.');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, []);

  const onPickFolder = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const hint = await blankPickBackupFolderHint();
      if (hint) {
        setFolderHint(hint);
        setInfo(
          `Remembered “${hint}”. Export still downloads a zip — save it into that folder (e.g. Google Drive).`
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <div
      style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 520,
      }}
    >
      <h3 style={{ margin: 0 }}>Where Blank saves</h3>
      <p style={{ margin: 0, opacity: 0.8, fontSize: 13 }}>
        Choose how this device keeps your notes. You can stay local forever —
        account sync is optional.
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          style={modeButtonStyle(mode === 'local')}
          onClick={() => selectMode('local')}
        >
          This device
        </Button>
        <Button
          style={modeButtonStyle(mode === 'folder')}
          onClick={() => selectMode('folder')}
        >
          Folder / Drive
        </Button>
        <Button
          style={modeButtonStyle(mode === 'account')}
          onClick={() => selectMode('account')}
        >
          Account sync
        </Button>
      </div>

      {error ? <p style={{ color: 'crimson', margin: 0 }}>{error}</p> : null}
      {info ? <p style={{ color: 'seagreen', margin: 0 }}>{info}</p> : null}

      {mode === 'local' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0 }}>
            Notes stay in this app only (on-device storage). No sign-in, no API
            keys.
          </p>
          <p style={{ margin: 0, opacity: 0.7, fontSize: 12 }}>
            Tip: use <strong>Folder / Drive</strong> if you want a zip backup
            inside Google Drive without connecting Google’s API.
          </p>
        </div>
      ) : null}

      {mode === 'folder' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0 }}>
            Export a backup zip, then place it in any synced folder (Google
            Drive, Dropbox, OneDrive, USB…). No API keys — the Drive desktop app
            syncs the file for you.
          </p>
          {folderHint ? (
            <p style={{ margin: 0, opacity: 0.7, fontSize: 12 }}>
              Backup folder hint: <code>{folderHint}</code>
            </p>
          ) : null}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Button
              variant="primary"
              disabled={busy}
              onClick={() => {
                onExport().catch(() => undefined);
              }}
            >
              Export backup
            </Button>
            <Button
              disabled={busy}
              onClick={() => {
                onImport().catch(() => undefined);
              }}
            >
              Import backup
            </Button>
            <Button
              disabled={busy}
              onClick={() => {
                onPickFolder().catch(() => undefined);
              }}
            >
              Remember folder
            </Button>
          </div>
        </div>
      ) : null}

      {mode === 'account' ? (
        <AccountPanel
          busy={busy}
          email={email}
          password={password}
          session={session}
          configured={isBlankSupabaseConfigured()}
          onEmail={setEmail}
          onPassword={setPassword}
          onSignIn={() => {
            onSignIn().catch(() => undefined);
          }}
          onSignUp={() => {
            onSignUp().catch(() => undefined);
          }}
          onSignOut={onSignOut}
        />
      ) : null}
    </div>
  );
}

function AccountPanel({
  busy,
  email,
  password,
  session,
  configured,
  onEmail,
  onPassword,
  onSignIn,
  onSignUp,
  onSignOut,
}: {
  busy: boolean;
  email: string;
  password: string;
  session: ReturnType<typeof blankGetSession>;
  configured: boolean;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
}) {
  if (!configured) {
    return (
      <p style={{ margin: 0 }}>
        Account sync needs <code>VITE_SUPABASE_URL</code> and{' '}
        <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code>, then restart.
        Prefer <strong>Folder / Drive</strong> if you want backups without an
        account.
      </p>
    );
  }

  if (session?.access_token) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0 }}>
          Signed in. Documents sync online across your devices.
        </p>
        <p style={{ margin: 0, opacity: 0.7, fontSize: 12 }}>
          User: {session.user_id ?? 'session'}
        </p>
        <Button onClick={onSignOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0 }}>
        Optional online sync via Blank account (email + password). Prefer Folder
        / Drive if you do not want an account.
      </p>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmail}
      />
      <Input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={onPassword}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" disabled={busy} onClick={onSignIn}>
          Sign in
        </Button>
        <Button disabled={busy} onClick={onSignUp}>
          Create account
        </Button>
      </div>
    </div>
  );
}
