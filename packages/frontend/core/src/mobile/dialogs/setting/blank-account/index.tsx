import { Button, Input } from '@blank/component';
import { useNavigateHelper, RouteLogic } from '@blank/core/components/hooks/use-navigate-helper';
import { BLANK_CLOUD_FLAVOUR } from '@blank/core/modules/workspace-engine';
import { prepareBlankWorkspaceRoute } from '@blank/core/utils/blank-workspace-nav';
import { useBlankAuth } from '@blank/core/modules/blank-auth/use-blank-auth';
import { fetchBlankWorkspaces } from '@blank/core/utils/blank-supabase';
import { useI18n } from '@blank/i18n';
import { useCallback, useEffect, useState } from 'react';
import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';

export const BlankAccountGroup = () => {
  const t = useI18n();
  const { user, loading, configured, signIn, signOut, isSignedIn } =
    useBlankAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignIn = useCallback(async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError(t['com.blank.auth.error.missing']());
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email, password);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }, [email, password, signIn, t]);

  const onSignOut = useCallback(async () => {
    setSubmitting(true);
    try {
      await signOut();
    } finally {
      setSubmitting(false);
    }
  }, [signOut]);

  const { openPage } = useNavigateHelper();
  const [syncWorkspaceId, setSyncWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      setSyncWorkspaceId(null);
      return;
    }
    fetchBlankWorkspaces()
      .then(rows => {
        setSyncWorkspaceId(rows[0]?.id ?? null);
      })
      .catch(console.error);
  }, [isSignedIn]);

  const onOpenSyncWorkspace = useCallback(() => {
    if (!syncWorkspaceId) {
      return;
    }
    prepareBlankWorkspaceRoute(syncWorkspaceId, 'all', BLANK_CLOUD_FLAVOUR);
    openPage(syncWorkspaceId, 'all', RouteLogic.PUSH, BLANK_CLOUD_FLAVOUR);
  }, [openPage, syncWorkspaceId]);

  return (
    <SettingGroup title={t['com.blank.auth.title']()} id="mobile-setting-account">
      {!configured ? (
        <RowLayout label={t['com.blank.auth.notConfigured']()}>
          {t['com.blank.auth.notConfigured.desc']()}
        </RowLayout>
      ) : loading ? (
        <RowLayout label={t['com.blank.auth.loading']()}>{null}</RowLayout>
      ) : isSignedIn && user ? (
        <>
          <RowLayout label={t['com.blank.auth.email']()}>
            {user.email}
          </RowLayout>
          <RowLayout label={t['com.blank.auth.status']()}>
            {t['com.blank.auth.status.signedIn']()}
          </RowLayout>
          {syncWorkspaceId ? (
            <RowLayout label="">
              <Button onClick={onOpenSyncWorkspace}>
                {t['com.blank.auth.openSyncWorkspace']()}
              </Button>
            </RowLayout>
          ) : null}
          <RowLayout label="">
            <Button variant="error" onClick={() => { onSignOut().catch(console.error); }} disabled={submitting}>
              {t['com.blank.auth.signOut']()}
            </Button>
          </RowLayout>
        </>
      ) : (
        <>
          <RowLayout label={t['com.blank.auth.email']()}>
            <Input
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />
          </RowLayout>
          <RowLayout label={t['com.blank.auth.password']()}>
            <Input
              value={password}
              onChange={setPassword}
              type="password"
              autoComplete="current-password"
            />
          </RowLayout>
          {error ? <RowLayout label={error}>{null}</RowLayout> : null}
          <RowLayout label="">
            <Button onClick={() => { onSignIn().catch(console.error); }} disabled={submitting}>
              {t['com.blank.auth.signIn']()}
            </Button>
          </RowLayout>
        </>
      )}
    </SettingGroup>
  );
};
