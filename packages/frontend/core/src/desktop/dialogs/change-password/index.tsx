import { Button, Modal, notify } from '@blank/component';
import {
  AuthContent,
  AuthHeader,
  AuthInput,
} from '@blank/component/auth-components';
import { useAsyncCallback } from '@blank/core/components/hooks/blank-async-hooks';
import {
  AuthService,
  DefaultServerService,
  ServersService,
} from '@blank/core/modules/cloud';
import type {
  DialogComponentProps,
  GLOBAL_DIALOG_SCHEMA,
} from '@blank/core/modules/dialogs';
import { Unreachable } from '@blank/env/constant';
import {
  sendChangePasswordEmailMutation,
  sendSetPasswordEmailMutation,
} from '@blank/graphql';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';

export const ChangePasswordDialog = ({
  close,
  hasPassword: hasPasswordProp,
  server: serverBaseUrl,
}: DialogComponentProps<GLOBAL_DIALOG_SCHEMA['change-password']>) => {
  const t = useI18n();
  const defaultServerService = useService(DefaultServerService);
  const serversService = useService(ServersService);
  let server;

  if (serverBaseUrl) {
    server = serversService.getServerByBaseUrl(serverBaseUrl);
    if (!server) {
      throw new Unreachable('Server not found');
    }
  } else {
    server = defaultServerService.server;
  }

  const authService = server.scope.get(AuthService);
  const account = useLiveData(authService.session.account$);
  const email = account?.email;
  const hasPassword =
    hasPasswordProp ?? account?.info?.authMethods?.password.bound ?? false;
  const [hasSentEmail, setHasSentEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordLimits = useLiveData(
    server.credentialsRequirement$.map(r => r?.password)
  );
  const serverName = useLiveData(server.config$.selector(c => c.serverName));

  useEffect(() => {
    if (!account) {
      // we are logged out, close the dialog
      close();
    }
  }, [account, close]);

  const onSendEmail = useAsyncCallback(async () => {
    setLoading(true);
    try {
      if (hasPassword) {
        await server.gql({
          query: sendChangePasswordEmailMutation,
          variables: {
            callbackUrl: `/auth/changePassword`,
          },
        });
      } else {
        await server.gql({
          query: sendSetPasswordEmailMutation,
          variables: {
            callbackUrl: `/auth/setPassword`,
          },
        });
      }

      notify.success({
        title: hasPassword
          ? t['com.blank.auth.sent.change.password.hint']()
          : t['com.blank.auth.sent.set.password.hint'](),
      });
      setHasSentEmail(true);
    } catch (err) {
      console.error(err);
      notify.error({
        title: t['com.blank.auth.sent.change.email.fail'](),
      });
    } finally {
      setLoading(false);
    }
  }, [hasPassword, server, t]);

  if (!passwordLimits) {
    // TODO(@eyhn): loading & error UI
    return null;
  }

  return (
    <Modal
      open
      onOpenChange={() => close()}
      width={400}
      minHeight={500}
      contentOptions={{
        ['data-testid' as string]: 'change-password-modal',
        style: { padding: '44px 40px 20px' },
      }}
    >
      <AuthHeader
        title={serverName}
        subTitle={
          hasPassword
            ? t['com.blank.auth.reset.password']()
            : t['com.blank.auth.set.password']()
        }
      />
      <AuthContent>
        <p>
          {hasPassword
            ? t['com.blank.auth.reset.password.message']()
            : t['com.blank.auth.set.password.message']({
                min: String(passwordLimits.minLength),
                max: String(passwordLimits.maxLength),
              })}
        </p>
        <AuthInput
          label={t['com.blank.settings.email']()}
          disabled={true}
          value={email}
        />
        <Button
          variant="primary"
          size="extraLarge"
          style={{ width: '100%' }}
          disabled={hasSentEmail}
          loading={loading}
          onClick={onSendEmail}
        >
          {hasSentEmail
            ? t['com.blank.auth.sent']()
            : hasPassword
              ? t['com.blank.auth.send.reset.password.link']()
              : t['com.blank.auth.send.set.password.link']()}
        </Button>
      </AuthContent>
    </Modal>
  );
};
