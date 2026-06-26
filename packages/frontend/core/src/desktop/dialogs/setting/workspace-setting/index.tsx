import type { SettingTab } from '@blank/core/modules/dialogs/constant';
import { EmbeddingSettings } from '@blank/core/modules/workspace-indexer-embedding';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { isAiDisabled } from '@blank/core/utils/local-only';
import { useI18n } from '@blank/i18n';
import {
  AiEmbeddingIcon,
  CollaborationIcon,
  PropertyIcon,
  SaveIcon,
  SettingsIcon,
} from '@blocksuite/icons/rc';
import { useMemo } from 'react';

import type { SettingSidebarItem, SettingState } from '../types';
import { MembersPanel } from './members';
import { WorkspaceSettingDetail } from './preference';
import { WorkspaceSettingProperties } from './properties';
import { WorkspaceSettingStorage } from './storage';

export const WorkspaceSetting = ({
  activeTab,
  onCloseSetting,
  onChangeSettingState,
}: {
  activeTab: SettingTab;
  onCloseSetting: () => void;
  onChangeSettingState: (settingState: SettingState) => void;
}) => {
  switch (activeTab) {
    case 'workspace:preference':
      return <WorkspaceSettingDetail onCloseSetting={onCloseSetting} />;
    case 'workspace:properties':
      return <WorkspaceSettingProperties />;
    case 'workspace:members':
      return (
        <MembersPanel
          onCloseSetting={onCloseSetting}
          onChangeSettingState={onChangeSettingState}
        />
      );
    case 'workspace:storage':
      return <WorkspaceSettingStorage onCloseSetting={onCloseSetting} />;
    case 'workspace:embedding':
      return <EmbeddingSettings />;
    default:
      return null;
  }
};

export const useWorkspaceSettingList = (): SettingSidebarItem[] => {
  const t = useI18n();

  const items = useMemo<SettingSidebarItem[]>(() => {
    return [
      {
        key: 'workspace:preference',
        title: t['com.blank.settings.workspace.preferences'](),
        icon: <SettingsIcon />,
        testId: 'workspace-setting:preference',
      },
      {
        key: 'workspace:properties',
        title: t['com.blank.settings.workspace.properties'](),
        icon: <PropertyIcon />,
        testId: 'workspace-setting:properties',
      },
      {
        key: 'workspace:members',
        title: t['Members'](),
        icon: <CollaborationIcon />,
        testId: 'workspace-setting:members',
      },
      {
        key: 'workspace:storage',
        title: t['Storage'](),
        icon: <SaveIcon />,
        testId: 'workspace-setting:storage',
      },
      {
        key: 'workspace:embedding',
        title:
          t[
            'com.blank.settings.workspace.indexer-embedding.embedding.title'
          ](),
        icon: <AiEmbeddingIcon />,
        testId: 'workspace-setting:embedding',
      },
    ].filter(item => {
      if (isBlankBuild()) {
        return (
          item.key !== 'workspace:embedding' &&
          item.key !== 'workspace:members' &&
          item.key !== 'workspace:properties'
        );
      }
      if (item.key === 'workspace:embedding' && isAiDisabled()) {
        return false;
      }
      return true;
    });
  }, [t]);

  return items;
};
