import type { SettingTab } from '@affine/core/modules/dialogs/constant';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { useI18n } from '@affine/i18n';
import {
  AppearanceIcon,
  FolderIcon,
  InformationIcon,
  KeyboardIcon,
  PenIcon,
} from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';

import type { SettingSidebarItem, SettingState } from '../types';
import { AboutAffine } from './about';
import { AppearanceSettings } from './appearance';
import { BlankSyncSettings } from './blank-sync';
import { EditorSettings } from './editor';
import { Shortcuts } from './shortcuts';

export type GeneralSettingList = SettingSidebarItem[];

/** Finished Blank product settings — no cloud billing, AI, meetings, or experimental junk. */
export const useGeneralSettingList = (): GeneralSettingList => {
  const t = useI18n();
  const featureFlagService = useService(FeatureFlagService);
  const enableEditorSettings = useLiveData(
    featureFlagService.flags.enable_editor_settings.$
  );

  return useMemo(() => {
    const settings: GeneralSettingList = [
      {
        key: 'blank-sync',
        title: 'Data & sync',
        icon: <FolderIcon />,
        testId: 'blank-sync-panel-trigger',
      },
      {
        key: 'appearance',
        title: t['com.affine.settings.appearance'](),
        icon: <AppearanceIcon />,
        testId: 'appearance-panel-trigger',
      },
    ];
    if (enableEditorSettings) {
      settings.push({
        key: 'editor',
        title: t['com.affine.settings.editorSettings'](),
        icon: <PenIcon />,
        testId: 'editor-panel-trigger',
      });
    }
    settings.push(
      {
        key: 'shortcuts',
        title: t['com.affine.keyboardShortcuts.title'](),
        icon: <KeyboardIcon />,
        testId: 'shortcuts-panel-trigger',
      },
      {
        key: 'about',
        title: 'About Blank',
        icon: <InformationIcon />,
        testId: 'about-panel-trigger',
      }
    );
    return settings;
  }, [t, enableEditorSettings]);
};

interface GeneralSettingProps {
  activeTab: SettingTab;
  onChangeSettingState: (settingState: SettingState) => void;
}

export const GeneralSetting = ({ activeTab }: GeneralSettingProps) => {
  switch (activeTab) {
    case 'blank-sync':
      return <BlankSyncSettings />;
    case 'shortcuts':
      return <Shortcuts />;
    case 'editor':
      return <EditorSettings />;
    case 'appearance':
      return <AppearanceSettings />;
    case 'about':
      return <AboutAffine />;
    default:
      return null;
  }
};
