import { Avatar } from '@blank/component';
import { AuthService } from '@blank/core/modules/cloud';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { useBlankAuth } from '@blank/core/modules/blank-auth/use-blank-auth';
import { BlankAppLogo, isBlankBranding } from '@blank/core/utils/blank-branding';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { useI18n } from '@blank/i18n';
import { AccountIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback } from 'react';

import * as styles from './styles.css';

const ACCOUNT_SCROLL_ANCHOR = 'mobile-setting-account';

export const MobileProfileButton = ({
  className,
}: {
  className?: string;
}) => {
  if (isBlankBuild()) {
    return <BlankProfileButton className={className} />;
  }
  return <CloudProfileButton className={className} />;
};

const BlankProfileButton = ({ className }: { className?: string }) => {
  const t = useI18n();
  const workspaceDialogService = useService(WorkspaceDialogService);
  const { user, isSignedIn } = useBlankAuth();

  const openAccount = useCallback(() => {
    workspaceDialogService.open('setting', {
      activeTab: 'sync',
      scrollAnchor: ACCOUNT_SCROLL_ANCHOR,
    });
  }, [workspaceDialogService]);

  const label =
    user?.user_metadata?.display_name ??
    user?.email?.split('@')[0] ??
    t['com.blank.auth.account']();

  return (
    <button
      type="button"
      className={clsx(styles.root, className)}
      onClick={openAccount}
      aria-label={t['com.blank.auth.account']()}
      data-testid="mobile-profile-button"
    >
      {isSignedIn && user ? (
        <Avatar
          size={28}
          rounded={999}
          name={label}
          className={styles.avatar}
        />
      ) : (
        <span className={styles.guestIcon}>
          {isBlankBranding() ? (
            <BlankAppLogo size={20} />
          ) : (
            <AccountIcon width={20} height={20} />
          )}
        </span>
      )}
    </button>
  );
};

const CloudProfileButton = ({ className }: { className?: string }) => {
  const t = useI18n();
  const workspaceDialogService = useService(WorkspaceDialogService);
  const session = useService(AuthService).session;
  const account = useLiveData(session.account$);
  const loginStatus = useLiveData(session.status$);

  const openAccount = useCallback(() => {
    workspaceDialogService.open('setting', {
      activeTab: 'account',
      scrollAnchor: ACCOUNT_SCROLL_ANCHOR,
    });
  }, [workspaceDialogService]);

  const label = account?.label ?? t['com.blank.auth.account']();

  return (
    <button
      type="button"
      className={clsx(styles.root, className)}
      onClick={openAccount}
      aria-label={label}
      data-testid="mobile-profile-button"
    >
      {loginStatus === 'authenticated' && account ? (
        <Avatar
          size={28}
          rounded={999}
          url={account.avatar}
          name={account.label}
          className={styles.avatar}
        />
      ) : (
        <span className={styles.guestIcon}>
          <AccountIcon width={20} height={20} />
        </span>
      )}
    </button>
  );
};
