import { Button } from '@blank/component';
import { AuthPageContainer } from '@blank/component/auth-components';
import { useNavigateHelper } from '@blank/core/components/hooks/use-navigate-helper';
import { GraphQLService } from '@blank/core/modules/cloud';
import { UserFriendlyError } from '@blank/error';
import { verifyEmailMutation } from '@blank/graphql';
import { useI18n } from '@blank/i18n';
import { useService } from '@toeverything/infra';
import { type FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AppContainer } from '../../components/app-container';

export const ConfirmVerifiedEmail: FC<{
  onOpenBlank: () => void;
}> = ({ onOpenBlank }) => {
  const t = useI18n();
  const graphqlService = useService(GraphQLService);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigateHelper = useNavigateHelper();

  useEffect(() => {
    (async () => {
      const token = searchParams.get('token') ?? '';
      setIsLoading(true);
      await graphqlService
        .gql({
          query: verifyEmailMutation,
          variables: {
            token: token,
          },
        })
        .catch(error => {
          const userFriendlyError = UserFriendlyError.fromAny(error);
          if (userFriendlyError.is('INVALID_EMAIL_TOKEN')) {
            return navigateHelper.jumpToExpired();
          }
          throw error;
        });
    })().catch(err => {
      // TODO(@eyhn): Add error handling
      console.error(err);
    });
  }, [graphqlService, navigateHelper, searchParams]);

  if (isLoading) {
    return <AppContainer fallback />;
  }

  return (
    <AuthPageContainer
      title={t['com.blank.auth.change.email.page.success.title']()}
      subtitle={t['com.blank.auth.change.email.page.success.subtitle']()}
    >
      <Button variant="primary" size="large" onClick={onOpenBlank}>
        {t['com.blank.auth.open.blank']()}
      </Button>
    </AuthPageContainer>
  );
};
