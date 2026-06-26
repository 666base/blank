import type { SettingTab } from '@blank/core/modules/dialogs/constant';
import { FeatureFlagService } from '@blank/core/modules/feature-flag';
import { MeetingSettingsService } from '@blank/core/modules/media/services/meeting-settings';
import { useI18n } from '@blank/i18n';
import {
  AppearanceIcon,
  CloudWorkspaceIcon,
  ExperimentIcon,
  FolderIcon,
  InformationIcon,
  KeyboardIcon,
  MeetingIcon,
  NotificationIcon,
  PenIcon,
} from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useMemo } from 'react';

import { isBlankBuild } from '@blank/core/utils/blank-links';
import type { SettingSidebarItem } from '../types';
import { AboutBlank } from './about';
import { AppearanceSettings } from './appearance';
import { BackupSettingPanel } from './backup';
import { EditorSettings } from './editor';
import { ExperimentalFeatures } from './experimental-features';
import { MeetingsSettings } from './meetings';
import { NotificationSettings } from './notifications';
import { Shortcuts } from './shortcuts';
import { BlankAccountSettings } from './blank-account';
import { BlankSyncSettings } from './sync';

export type GeneralSettingList = SettingSidebarItem[];

export const useGeneralSettingList = (): GeneralSettingList => {
  const t = useI18n();
  const { featureFlagService, meetingSettingsService } = useServices({
    FeatureFlagService,
    MeetingSettingsService,
  });
  const enableEditorSettings = useLiveData(
    featureFlagService.flags.enable_editor_settings.$
  );

  const meetingSettings = useLiveData(meetingSettingsService.settings$);

  return useMemo(() => {
    const settings: GeneralSettingList = [
      {
        key: 'appearance',
        title: t['com.blank.settings.appearance'](),
        icon: <AppearanceIcon />,
        testId: 'appearance-panel-trigger',
      },
      {
        key: 'shortcuts',
        title: t['com.blank.keyboardShortcuts.title'](),
        icon: <KeyboardIcon />,
        testId: 'shortcuts-panel-trigger',
      },
    ];
    settings.push({
      key: 'notifications',
      title: t['com.blank.setting.notifications'](),
      icon: <NotificationIcon />,
      testId: 'notifications-panel-trigger',
    });
    if (enableEditorSettings) {
      // add editor settings to second position
      settings.splice(1, 0, {
        key: 'editor',
        title: t['com.blank.settings.editorSettings'](),
        icon: <PenIcon />,
        testId: 'editor-panel-trigger',
      });
    }

    if (
      (environment.isMacOs || environment.isWindows) &&
      BUILD_CONFIG.isElectron
    ) {
      settings.push({
        key: 'meetings',
        title: t['com.blank.settings.meetings'](),
        icon: <MeetingIcon />,
        testId: 'meetings-panel-trigger',
        beta: !meetingSettings?.enabled,
      });
    }

    if (BUILD_CONFIG.isElectron) {
      settings.push({
        key: 'backup',
        title: t['com.blank.settings.workspace.backup'](),
        icon: <FolderIcon />,
        testId: 'backup-panel-trigger',
      });
    }

    if (isBlankBuild()) {
      settings.push({
        key: 'sync',
        title: t['com.blank.auth.title'](),
        icon: <CloudWorkspaceIcon />,
        testId: 'blank-account-panel-trigger',
      });
    } else {
      settings.push({
        key: 'sync',
        title: t['com.blank.sync.title'](),
        icon: <CloudWorkspaceIcon />,
        testId: 'sync-panel-trigger',
      });
    }

    settings.push(
      {
        key: 'experimental-features',
        title: t['com.blank.settings.workspace.experimental-features'](),
        icon: <ExperimentIcon />,
        testId: 'experimental-features-trigger',
      },
      {
        key: 'about',
        title: t['com.blank.aboutBlank.title'](),
        icon: <InformationIcon />,
        testId: 'about-panel-trigger',
      }
    );
    return settings;
  }, [t, enableEditorSettings, meetingSettings?.enabled]);
};

interface GeneralSettingProps {
  activeTab: SettingTab;
}

export const GeneralSetting = ({ activeTab }: GeneralSettingProps) => {
  switch (activeTab) {
    case 'shortcuts':
      return <Shortcuts />;
    case 'notifications':
      return <NotificationSettings />;
    case 'editor':
      return <EditorSettings />;
    case 'appearance':
      return <AppearanceSettings />;
    case 'meetings':
      return <MeetingsSettings />;
    case 'about':
      return <AboutBlank />;
    case 'experimental-features':
      return <ExperimentalFeatures />;
    case 'backup':
      return <BackupSettingPanel />;
    case 'sync':
      return isBlankBuild() ? <BlankAccountSettings /> : <BlankSyncSettings />;
    default:
      return null;
  }
};
