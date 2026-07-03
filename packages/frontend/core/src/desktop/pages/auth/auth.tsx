import { notify } from '@blank/component';
import {
  ChangeEmailPage,
  ChangePasswordPage,
  OnboardingPage,
  SetPasswordPage,
  SignInSuccessPage,
  SignUpPage,
} from '@blank/component/auth-components';
import {
  changePasswordMutation,
  sendVerifyChangeEmailMutation,
} from '@blank/graphql';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import type { LoaderFunction } from 'react-router-dom';
import { redirect, useParams, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { useMutation } from '../../../components/hooks/use-mutation';
import {
  RouteLogic,
  useNavigateHelper,
} from '../../../components/hooks/use-navigate-helper';
import { AuthService, ServerService } from '../../../modules/cloud';
import { AppContainer } from '../../components/app-container';
import { ConfirmChangeEmail } from './confirm-change-email';
import { ConfirmVerifiedEmail } from './email-verified-email';

const authTypeSchema = z.enum([
  'onboarding',
  'setPassword',
  'signIn',
  'changePassword',
  'signUp',
  'changeEmail',
  'confirm-change-email',
  'subscription-redirect',
  'verify-email',
]);

export const Component = () => {
  const authService = useService(AuthService);
  const account = useLiveData(authService.session.account$);
  const t = useI18n();
  const serverService = useService(ServerService);
  const passwordLimits = useLiveData(
    serverService.server.credentialsRequirement$.map(r => r?.password)
  );

  const { authType } = useParams();
  const [searchParams] = useSearchParams();

  const { trigger: changePassword } = useMutation({
    mutation: changePasswordMutation,
  });

  const { trigger: sendVerifyChangeEmail } = useMutation({
    mutation: sendVerifyChangeEmailMutation,
  });

  const { jumpToIndex } = useNavigateHelper();

  const onSendVerifyChangeEmail = useCallback(
    async (email: string) => {
      const res = await sendVerifyChangeEmail({
        token: searchParams.get('token') || '',
        email,
        callbackUrl: `/auth/confirm-change-email`,
      }).catch(console.error);

      if (res?.sendVerifyChangeEmail) {
        notify.success({
          title: t['com.blank.auth.sent.verify.email.hint'](),
        });
      } else {
        notify.error({
          title: t['com.blank.auth.sent.change.email.fail'](),
        });
      }

      return !!res?.sendVerifyChangeEmail;
    },
    [searchParams, sendVerifyChangeEmail, t]
  );

  const onSetPassword = useCallback(
    async (password: string) => {
      await changePassword({
        token: searchParams.get('token') || '',
        userId: searchParams.get('userId') || '',
        newPassword: password,
      });
    },
    [changePassword, searchParams]
  );
  const onOpenBlank = useCallback(() => {
    jumpToIndex(RouteLogic.REPLACE);
  }, [jumpToIndex]);

  if (!passwordLimits) {
    return <AppContainer fallback />;
  }

  switch (authType) {
    case 'onboarding':
      return (
        account && <OnboardingPage user={account} onOpenBlank={onOpenBlank} />
      );
    case 'signUp': {
      return (
        account && (
          <SignUpPage
            user={account}
            passwordLimits={passwordLimits}
            onSetPassword={onSetPassword}
            onOpenBlank={onOpenBlank}
          />
        )
      );
    }
    case 'signIn': {
      return <SignInSuccessPage onOpenBlank={onOpenBlank} />;
    }
    case 'changePassword': {
      return (
        <ChangePasswordPage
          passwordLimits={passwordLimits}
          onSetPassword={onSetPassword}
          onOpenBlank={onOpenBlank}
        />
      );
    }
    case 'setPassword': {
      return (
        <SetPasswordPage
          passwordLimits={passwordLimits}
          onSetPassword={onSetPassword}
          onOpenBlank={onOpenBlank}
        />
      );
    }
    case 'changeEmail': {
      return (
        <ChangeEmailPage
          onChangeEmail={onSendVerifyChangeEmail}
          onOpenBlank={onOpenBlank}
        />
      );
    }
    case 'confirm-change-email': {
      return <ConfirmChangeEmail onOpenBlank={onOpenBlank} />;
    }
    case 'verify-email': {
      return <ConfirmVerifiedEmail onOpenBlank={onOpenBlank} />;
    }
  }
  return null;
};

export const loader: LoaderFunction = async args => {
  if (!args.params.authType) {
    return redirect('/404');
  }
  if (!authTypeSchema.safeParse(args.params.authType).success) {
    return redirect('/404');
  }

  return null;
};
