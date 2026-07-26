import type { SettingTab } from '@affine/core/modules/dialogs/constant';
import { useI18n } from '@affine/i18n';
import { PropertyIcon, SettingsIcon } from '@blocksuite/icons/rc';
import { useMemo } from 'react';

import type { SettingSidebarItem, SettingState } from '../types';
import { WorkspaceSettingDetail } from './preference';
import { WorkspaceSettingProperties } from './properties';

export const WorkspaceSetting = ({
  activeTab,
  onCloseSetting,
}: {
  activeTab: SettingTab;
  scrollAnchor?: string;
  onCloseSetting: () => void;
  onChangeSettingState: (settingState: SettingState) => void;
}) => {
  switch (activeTab) {
    case 'workspace:preference':
      return <WorkspaceSettingDetail onCloseSetting={onCloseSetting} />;
    case 'workspace:properties':
      return <WorkspaceSettingProperties />;
    default:
      return null;
  }
};

export const useWorkspaceSettingList = (): SettingSidebarItem[] => {
  const t = useI18n();

  return useMemo<SettingSidebarItem[]>(
    () => [
      {
        key: 'workspace:preference',
        title: t['com.affine.settings.workspace.preferences'](),
        icon: <SettingsIcon />,
        testId: 'workspace-setting:preference',
      },
      {
        key: 'workspace:properties',
        title: t['com.affine.settings.workspace.properties'](),
        icon: <PropertyIcon />,
        testId: 'workspace-setting:properties',
      },
    ],
    [t]
  );
};
