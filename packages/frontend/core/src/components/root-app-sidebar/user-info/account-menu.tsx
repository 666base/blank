import { MenuItem } from '@blank/component';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { AccountIcon, SignOutIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';

import { useSignOut } from '../../hooks/blank/use-sign-out';

export const AccountMenu = () => {
  const workspaceDialogService = useService(WorkspaceDialogService);
  const openSignOutModal = useSignOut();

  const onOpenAccountSetting = useCallback(() => {
    track.$.navigationPanel.profileAndBadge.openSettings({ to: 'account' });
    workspaceDialogService.open('setting', {
      activeTab: 'account',
    });
  }, [workspaceDialogService]);

  const t = useI18n();

  return (
    <>
      <MenuItem
        prefixIcon={<AccountIcon />}
        data-testid="workspace-modal-account-settings-option"
        onClick={onOpenAccountSetting}
      >
        {t['com.blank.workspace.cloud.account.settings']()}
      </MenuItem>
      <MenuItem
        prefixIcon={<SignOutIcon />}
        data-testid="workspace-modal-sign-out-option"
        onClick={openSignOutModal}
      >
        {t['com.blank.workspace.cloud.account.logout']()}
      </MenuItem>
    </>
  );
};
