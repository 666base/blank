import { Switch } from '@blank/component';
import {
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useAppSettingHelper } from '@blank/core/components/hooks/blank/use-app-setting-helper';
import type { AppSetting } from '@toeverything/infra';
import { useI18n } from '@blank/i18n';

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

export function useSidebarSectionVisibility() {
  const { appSettings } = useAppSettingHelper();

  return {
    favorites: appSettings.sidebarShowFavorites !== false,
    organize: appSettings.sidebarShowOrganize !== false,
    tags: appSettings.sidebarShowTags !== false,
    collections: appSettings.sidebarShowCollections !== false,
    others: appSettings.sidebarShowOthers !== false,
  };
}

export const SidebarSectionVisibilitySettings = () => {
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
    <SettingWrapper title={t['com.blank.settings.sidebar.sections.title']()}>
      {SECTION_KEYS.map(key => (
        <SettingRow
          key={key}
          name={labels[key]}
          desc={t['com.blank.settings.sidebar.sections.item.description']()}
        >
          <Switch
            checked={appSettings[key] !== false}
            onChange={checked =>
              updateSettings(key, checked as AppSetting[typeof key])
            }
          />
        </SettingRow>
      ))}
      <SettingRow
        name={t['com.blank.appearanceSettings.showLinkedDocInSidebar.title']()}
        desc={t[
          'com.blank.appearanceSettings.showLinkedDocInSidebar.description'
        ]()}
      >
        <Switch
          checked={!!appSettings.showLinkedDocInSidebar}
          onChange={checked => updateSettings('showLinkedDocInSidebar', checked)}
        />
      </SettingRow>
    </SettingWrapper>
  );
};
