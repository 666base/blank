import { Button, Input } from '@blank/component';
import {
  SettingHeader,
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useNavigateHelper, RouteLogic } from '@blank/core/components/hooks/use-navigate-helper';
import { GlobalDialogService } from '@blank/core/modules/dialogs';
import { useBlankAuth } from '@blank/core/modules/blank-auth/use-blank-auth';
import { BLANK_CLOUD_FLAVOUR } from '@blank/core/modules/workspace-engine';
import { fetchBlankWorkspaces } from '@blank/core/utils/blank-supabase';
import { prepareBlankWorkspaceRoute } from '@blank/core/utils/blank-workspace-nav';
import { useI18n } from '@blank/i18n';
import { useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';

export const BlankAccountSettings = () => {
  const t = useI18n();
  const { user, loading, configured, error, signIn, signInWithOAuth, signOut, isSignedIn } =
    useBlankAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const onSignIn = useCallback(async () => {
    setLocalError(null);
    if (!email.trim() || !password) {
      setLocalError(t['com.blank.auth.error.missing']());
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email, password);
      setPassword('');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }, [email, password, signIn, t]);

  const onOAuth = useCallback(
    async (provider: 'google' | 'github') => {
      setLocalError(null);
      setSubmitting(true);
      try {
        await signInWithOAuth(provider);
      } catch (err) {
        setLocalError(err instanceof Error ? err.message : String(err));
      } finally {
        setSubmitting(false);
      }
    },
    [signInWithOAuth]
  );

  const onSignOut = useCallback(async () => {
    setSubmitting(true);
    try {
      await signOut();
    } finally {
      setSubmitting(false);
    }
  }, [signOut]);

  const { openPage } = useNavigateHelper();
  const globalDialogService = useService(GlobalDialogService);
  const [syncWorkspaceId, setSyncWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      setSyncWorkspaceId(null);
      return;
    }
    void fetchBlankWorkspaces().then(rows => {
      setSyncWorkspaceId(rows[0]?.id ?? null);
    });
  }, [isSignedIn]);

  const onOpenSyncWorkspace = useCallback(() => {
    if (!syncWorkspaceId) {
      return;
    }
    prepareBlankWorkspaceRoute(syncWorkspaceId, 'all', BLANK_CLOUD_FLAVOUR);
    globalDialogService.close('setting');
    openPage(syncWorkspaceId, 'all', RouteLogic.PUSH, BLANK_CLOUD_FLAVOUR);
  }, [globalDialogService, openPage, syncWorkspaceId]);

  const displayError = localError ?? error;

  return (
    <>
      <SettingHeader
        title={t['com.blank.auth.title']()}
        subtitle={t['com.blank.auth.subtitle']()}
      />
      <SettingWrapper title={t['com.blank.auth.account']()}>
        {!configured ? (
          <SettingRow
            name={t['com.blank.auth.notConfigured']()}
            desc={t['com.blank.auth.notConfigured.desc']()}
          />
        ) : loading ? (
          <SettingRow name={t['com.blank.auth.loading']()} desc="" />
        ) : isSignedIn && user ? (
          <>
            <SettingRow name={t['com.blank.auth.email']()} desc={user.email ?? ''} />
            <SettingRow
              name={t['com.blank.auth.status']()}
              desc={t['com.blank.auth.status.signedIn']()}
            />
            {syncWorkspaceId ? (
              <SettingRow name="" desc="">
                <Button onClick={onOpenSyncWorkspace}>
                  {t['com.blank.auth.openSyncWorkspace']()}
                </Button>
              </SettingRow>
            ) : null}
            <SettingRow name="" desc="">
              <Button variant="error" onClick={onSignOut} disabled={submitting}>
                {t['com.blank.auth.signOut']()}
              </Button>
            </SettingRow>
          </>
        ) : (
          <>
            <SettingRow name={t['com.blank.auth.email']()} desc="">
              <Input
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                style={{ minWidth: 240 }}
              />
            </SettingRow>
            <SettingRow name={t['com.blank.auth.password']()} desc="">
              <Input
                value={password}
                onChange={setPassword}
                type="password"
                autoComplete="current-password"
                style={{ minWidth: 240 }}
              />
            </SettingRow>
            {displayError ? (
              <SettingRow name={displayError} desc="">
                <span />
              </SettingRow>
            ) : null}
            <SettingRow name="" desc="">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Button onClick={onSignIn} disabled={submitting}>
                  {t['com.blank.auth.signIn']()}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onOAuth('google')}
                  disabled={submitting}
                >
                  Google
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onOAuth('github')}
                  disabled={submitting}
                >
                  GitHub
                </Button>
              </div>
            </SettingRow>
          </>
        )}
      </SettingWrapper>
    </>
  );
};
