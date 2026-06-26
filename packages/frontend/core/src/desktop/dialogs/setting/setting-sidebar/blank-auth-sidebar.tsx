import { Avatar } from '@blank/component/ui/avatar';
import { GlobalDialogService } from '@blank/core/modules/dialogs';
import { BlankAppLogo, isBlankBranding } from '@blank/core/utils/blank-branding';
import { useI18n } from '@blank/i18n';
import { Logo1Icon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback } from 'react';

import { useBlankAuth } from '@blank/core/modules/blank-auth/use-blank-auth';
import * as style from './style.css';

export const BlankSignInButton = () => {
  const t = useI18n();
  const globalDialogService = useService(GlobalDialogService);

  const openAccount = useCallback(() => {
    globalDialogService.open('setting', { activeTab: 'sync' });
  }, [globalDialogService]);

  return (
    <div className={style.accountButton} onClick={openAccount}>
      <div className="avatar not-sign">
        {isBlankBranding() ? <BlankAppLogo size={20} /> : <Logo1Icon />}
      </div>
      <div className="content">
        <div className="name" title={t['com.blank.auth.signIn']()}>
          {t['com.blank.auth.signIn']()}
        </div>
        <div className="email" title={t['com.blank.auth.subtitle']()}>
          {t['com.blank.auth.subtitle']()}
        </div>
      </div>
    </div>
  );
};

export const BlankUserInfo = ({ active }: { active?: boolean }) => {
  const t = useI18n();
  const globalDialogService = useService(GlobalDialogService);
  const { user } = useBlankAuth();

  const openAccount = useCallback(() => {
    globalDialogService.open('setting', { activeTab: 'sync' });
  }, [globalDialogService]);

  if (!user) {
    return null;
  }

  const label =
    user.user_metadata?.display_name ??
    user.email?.split('@')[0] ??
    t['com.blank.auth.account']();

  return (
    <div
      className={clsx(style.accountButton, { active })}
      onClick={openAccount}
      data-testid="blank-user-info-card"
    >
      <Avatar
        size={28}
        rounded={2}
        name={label}
        className="avatar"
      />
      <div className="content">
        <div className="name-container">
          <div className="name" title={label}>
            {label}
          </div>
        </div>
        <div className="email" title={user.email ?? ''}>
          {user.email}
        </div>
      </div>
    </div>
  );
};
