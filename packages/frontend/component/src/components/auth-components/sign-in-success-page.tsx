import { useI18n } from '@blank/i18n';
import type { FC } from 'react';

import { Button } from '../../ui/button';
import { AuthPageContainer } from './auth-page-container';

export const SignInSuccessPage: FC<{
  onOpenBlank: () => void;
}> = ({ onOpenBlank }) => {
  const t = useI18n();
  return (
    <AuthPageContainer
      title={t['com.blank.auth.signed.success.title']()}
      subtitle={t['com.blank.auth.signed.success.subtitle']()}
    >
      <Button variant="primary" size="large" onClick={onOpenBlank}>
        {t['com.blank.auth.open.blank']()}
      </Button>
    </AuthPageContainer>
  );
};
