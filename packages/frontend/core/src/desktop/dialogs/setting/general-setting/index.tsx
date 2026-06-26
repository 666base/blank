import type { SettingTab } from '@blank/core/modules/dialogs/constant';
import { FeatureFlagService } from '@blank/core/modules/feature-flag';
import { MeetingSettingsService } from '@blank/core/modules/media/services/meeting-settings';
import { WorkspaceDetailSkeleton } from '@blank/component/setting-components';
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
import { lazy, Suspense, useMemo, type ReactNode } from 'react';

import { isBlankBuild } from '@blank/core/utils/blank-links';
import type { SettingSidebarItem } from '../types';
import { AppearanceSettings } from './appearance';
import { Shortcuts } from './shortcuts';

const EditorSettings = lazy(() =>
  import('./editor').then(m => ({ default: m.EditorSettings }))
);
const NotificationSettings = lazy(() =>
  import('./notifications').then(m => ({ default: m.NotificationSettings }))
);
const MeetingsSettings = lazy(() =>
  import('./meetings').then(m => ({ default: m.MeetingsSettings }))
);
const AboutBlank = lazy(() =>
  import('./about').then(m => ({ default: m.AboutBlank }))
);
const ExperimentalFeatures = lazy(() =>
  import('./experimental-features').then(m => ({
    default: m.ExperimentalFeatures,
  }))
);
const BackupSettingPanel = lazy(() =>
  import('./backup').then(m => ({ default: m.BackupSettingPanel }))
);
const BlankAccountSettings = lazy(() =>
  import('./blank-account').then(m => ({ default: m.BlankAccountSettings }))
);
const BlankSyncSettings = lazy(() =>
  import('./sync').then(m => ({ default: m.BlankSyncSettings }))
);

const LazyPanel = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<WorkspaceDetailSkeleton />}>{children}</Suspense>
);

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
    if (isBlankBuild()) {
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

      if (BUILD_CONFIG.isElectron) {
        settings.push({
          key: 'backup',
          title: t['com.blank.settings.workspace.backup'](),
          icon: <FolderIcon />,
          testId: 'backup-panel-trigger',
        });
      }

      settings.push(
        {
          key: 'sync',
          title: t['com.blank.auth.title'](),
          icon: <CloudWorkspaceIcon />,
          testId: 'blank-account-panel-trigger',
        },
        {
          key: 'about',
          title: t['com.blank.aboutBlank.title'](),
          icon: <InformationIcon />,
          testId: 'about-panel-trigger',
        }
      );

      return settings;
    }

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
      return (
        <LazyPanel>
          <NotificationSettings />
        </LazyPanel>
      );
    case 'editor':
      return (
        <LazyPanel>
          <EditorSettings />
        </LazyPanel>
      );
    case 'appearance':
      return <AppearanceSettings />;
    case 'meetings':
      return (
        <LazyPanel>
          <MeetingsSettings />
        </LazyPanel>
      );
    case 'about':
      return (
        <LazyPanel>
          <AboutBlank />
        </LazyPanel>
      );
    case 'experimental-features':
      return (
        <LazyPanel>
          <ExperimentalFeatures />
        </LazyPanel>
      );
    case 'backup':
      return (
        <LazyPanel>
          <BackupSettingPanel />
        </LazyPanel>
      );
    case 'sync':
      return (
        <LazyPanel>
          {isBlankBuild() ? <BlankAccountSettings /> : <BlankSyncSettings />}
        </LazyPanel>
      );
    default:
      return null;
  }
};
