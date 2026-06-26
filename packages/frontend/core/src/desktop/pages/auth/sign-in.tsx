import { notify } from '@blank/component';
import { BlankOtherPageLayout } from '@blank/component/blank-other-page-layout';
import { SignInPageContainer } from '@blank/component/auth-components';
import { SignInPanel } from '@blank/core/components/sign-in';
import { SignInBackgroundArts } from '@blank/core/components/sign-in/background-arts';
import type { AuthSessionStatus } from '@blank/core/modules/cloud/entities/session';
import { isLocalOnlyMode } from '@blank/core/utils/local-only';
import { useI18n } from '@blank/i18n';
import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import {
  RouteLogic,
  useNavigateHelper,
} from '../../../components/hooks/use-navigate-helper';

export const SignIn = ({
  redirectUrl: redirectUrlFromProps,
}: {
  redirectUrl?: string;
}) => {
  const t = useI18n();
  const navigate = useNavigate();
  const { jumpToIndex } = useNavigateHelper();
  const [searchParams] = useSearchParams();
  const redirectUrl = redirectUrlFromProps ?? searchParams.get('redirect_uri');

  const server = searchParams.get('server') ?? undefined;
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      notify.error({
        title: t['com.blank.auth.toast.title.failed'](),
        message: error,
      });
    }
  }, [error, t]);

  const handleClose = useCallback(() => {
    jumpToIndex(RouteLogic.REPLACE, {
      search: searchParams.toString(),
    });
  }, [jumpToIndex, searchParams]);

  const handleAuthenticated = useCallback(
    (status: AuthSessionStatus) => {
      if (status === 'authenticated') {
        if (redirectUrl) {
          if (redirectUrl.toUpperCase() === 'CLOSE_POPUP') {
            window.close();
          }
          navigate(redirectUrl, {
            replace: true,
          });
        } else {
          handleClose();
        }
      }
    },
    [handleClose, navigate, redirectUrl]
  );

  const initStep = server ? 'addSelfhosted' : 'signIn';

  return (
    <SignInPageContainer>
      <div style={{ maxWidth: '400px', width: '100%', zIndex: 1 }}>
        <SignInPanel
          onSkip={handleClose}
          onAuthenticated={handleAuthenticated}
          initStep={initStep}
          server={server}
        />
      </div>
    </SignInPageContainer>
  );
};

export const Component = () => {
  if (isLocalOnlyMode()) {
    return <Navigate to="/" replace />;
  }

  return (
    <BlankOtherPageLayout>
      <SignInBackgroundArts />
      <SignIn />
    </BlankOtherPageLayout>
  );
};
