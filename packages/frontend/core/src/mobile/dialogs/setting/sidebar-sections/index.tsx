import { Switch } from '@blank/component';
import { useAppSettingHelper } from '@blank/core/components/hooks/blank/use-app-setting-helper';
import type { AppSetting } from '@toeverything/infra';
import { useI18n } from '@blank/i18n';

import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';

type SidebarSectionKey =
  | 'sidebarShowFavorites'
  | 'sidebarShowOrganize'
  | 'sidebarShowTags'
  | 'sidebarShowCollections'
  | 'sidebarShowOthers';

const SECTION_KEYS: SidebarSectionKey[] = [
  'sidebarShowFavorites',
  'sidebarShowOrganize',
  'sidebarShowTags',
  'sidebarShowCollections',
  'sidebarShowOthers',
];

export const SidebarSectionsGroup = () => {
  const t = useI18n();
  const { appSettings, updateSettings } = useAppSettingHelper();

  const labels: Record<SidebarSectionKey, string> = {
    sidebarShowFavorites: t['com.blank.settings.sidebar.sections.favorites'](),
    sidebarShowOrganize: t['com.blank.settings.sidebar.sections.organize'](),
    sidebarShowTags: t['com.blank.settings.sidebar.sections.tags'](),
    sidebarShowCollections: t['com.blank.settings.sidebar.sections.collections'](),
    sidebarShowOthers: t['com.blank.settings.sidebar.sections.others'](),
  };

  return (
    <SettingGroup title={t['com.blank.settings.sidebar.sections.title']()}>
      {SECTION_KEYS.map(key => (
        <RowLayout key={key} label={labels[key]}>
          <Switch
            checked={appSettings[key] !== false}
            onChange={checked =>
              updateSettings(key, checked as AppSetting[typeof key])
            }
          />
        </RowLayout>
      ))}
      <RowLayout
        label={t['com.blank.appearanceSettings.showLinkedDocInSidebar.title']()}
      >
        <Switch
          checked={!!appSettings.showLinkedDocInSidebar}
          onChange={checked => updateSettings('showLinkedDocInSidebar', checked)}
        />
      </RowLayout>
    </SettingGroup>
  );
};
