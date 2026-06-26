import { Button, type ButtonProps } from '@blank/component';
import { GlobalDialogService } from '@blank/core/modules/dialogs';
import { useI18n } from '@blank/i18n';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';

export const AILogin = (btnProps: ButtonProps) => {
  const t = useI18n();
  const globalDialogService = useService(GlobalDialogService);

  const onClickSignIn = useCallback(() => {
    globalDialogService.open('sign-in', {});
  }, [globalDialogService]);

  return (
    <Button onClick={onClickSignIn} variant="primary" {...btnProps}>
      {t['com.blank.payment.ai.action.login.button-label']()}
    </Button>
  );
};
