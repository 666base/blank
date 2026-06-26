import { Switch } from '@blank/component';
import {
  SettingHeader,
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { LanguageMenu } from '@blank/core/components/blank/language-menu';
import {
  getThemeOptions,
  ThemePicker,
} from '@blank/core/components/theme-settings';
import { TraySettingService } from '@blank/core/modules/editor-setting/services/tray-settings';
import { FeatureFlagService } from '@blank/core/modules/feature-flag';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';

import { SidebarSectionVisibilitySettings } from '../../../../../components/sidebar-section-visibility-settings';
import { useAppSettingHelper } from '../../../../../components/hooks/blank/use-app-setting-helper';
import { OpenInAppLinksMenu } from './links';
import { settingWrapper } from './style.css';
import { ThemeEditorSetting } from './theme-editor-setting';

export { getThemeOptions };

export const ThemeSettings = () => {
  return <ThemePicker />;
};

const MenubarSetting = ({ simplified = false }: { simplified?: boolean }) => {
  const t = useI18n();
  const traySettingService = useService(TraySettingService);
  const traySetting = useLiveData(traySettingService.settings$);

  return (
    <>
      <SettingWrapper
        id="menubar"
        title={t['com.blank.appearanceSettings.menubar.title']()}
      >
        <SettingRow
          name={t['com.blank.appearanceSettings.menubar.toggle']()}
          desc={t['com.blank.appearanceSettings.menubar.description']()}
        >
          <Switch
            checked={traySetting.enabled}
            onChange={checked => traySettingService.setEnabled(checked)}
          />
        </SettingRow>
      </SettingWrapper>
      {!simplified && traySetting.enabled && !environment.isMacOs ? (
        <SettingWrapper
          id="windowBehavior"
          title={t[
            'com.blank.appearanceSettings.menubar.windowBehavior.title'
          ]()}
        >
          <SettingRow
            name={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.openOnLeftClick.toggle'
            ]()}
            desc={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.openOnLeftClick.description'
            ]()}
          >
            <Switch
              checked={traySetting.openOnLeftClick}
              onChange={checked =>
                traySettingService.setOpenOnLeftClick(checked)
              }
            />
          </SettingRow>
          <SettingRow
            name={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.minimizeToTray.toggle'
            ]()}
            desc={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.minimizeToTray.description'
            ]()}
          >
            <Switch
              checked={traySetting.minimizeToTray}
              onChange={checked =>
                traySettingService.setMinimizeToTray(checked)
              }
            />
          </SettingRow>
          <SettingRow
            name={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.closeToTray.toggle'
            ]()}
            desc={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.closeToTray.description'
            ]()}
          >
            <Switch
              checked={traySetting.closeToTray}
              onChange={checked => traySettingService.setCloseToTray(checked)}
            />
          </SettingRow>
          <SettingRow
            name={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.startMinimized.toggle'
            ]()}
            desc={t[
              'com.blank.appearanceSettings.menubar.windowBehavior.startMinimized.description'
            ]()}
          >
            <Switch
              checked={traySetting.startMinimized}
              onChange={checked =>
                traySettingService.setStartMinimized(checked)
              }
            />
          </SettingRow>
        </SettingWrapper>
      ) : null}
    </>
  );
};

export const AppearanceSettings = () => {
  const t = useI18n();
  const simplified = isBlankBuild();

  const featureFlagService = useService(FeatureFlagService);
  const enableThemeEditor = useLiveData(
    featureFlagService.flags.enable_theme_editor.$
  );
  const { appSettings, updateSettings } = useAppSettingHelper();

  return (
    <>
      <SettingHeader
        title={t['com.blank.appearanceSettings.title']()}
        subtitle={t['com.blank.appearanceSettings.subtitle']()}
      />

      <SettingWrapper title={t['com.blank.appearanceSettings.theme.title']()}>
        <SettingRow
          name={t['com.blank.appearanceSettings.color.title']()}
          desc={t['com.blank.appearanceSettings.color.description']()}
        >
          <ThemeSettings />
        </SettingRow>
        <SettingRow
          name={t['com.blank.appearanceSettings.language.title']()}
          desc={t['com.blank.appearanceSettings.language.description']()}
        >
          <div className={settingWrapper}>
            <LanguageMenu />
          </div>
        </SettingRow>
        {BUILD_CONFIG.isElectron ? (
          <SettingRow
            name={t['com.blank.appearanceSettings.clientBorder.title']()}
            desc={t['com.blank.appearanceSettings.clientBorder.description']()}
            data-testid="client-border-style-trigger"
          >
            <Switch
              checked={appSettings.clientBorder}
              onChange={checked => updateSettings('clientBorder', checked)}
            />
          </SettingRow>
        ) : null}
        {!simplified && enableThemeEditor ? <ThemeEditorSetting /> : null}
      </SettingWrapper>

      {!simplified ? (
        <SettingWrapper title={t['com.blank.appearanceSettings.images.title']()}>
          <SettingRow
            name={t['com.blank.appearanceSettings.images.antialiasing.title']()}
            desc={t[
              'com.blank.appearanceSettings.images.antialiasing.description'
            ]()}
            data-testid="image-antialiasing-trigger"
          >
            <Switch
              checked={!appSettings.disableImageAntialiasing}
              onChange={checked =>
                updateSettings('disableImageAntialiasing', !checked)
              }
            />
          </SettingRow>
        </SettingWrapper>
      ) : null}

      {!simplified && BUILD_CONFIG.isWeb && !environment.isMobile ? (
        <SettingWrapper title={t['com.blank.setting.appearance.links']()}>
          <SettingRow
            name={t['com.blank.setting.appearance.open-in-app']()}
            desc={t['com.blank.setting.appearance.open-in-app.hint']()}
            data-testid="open-in-app-links-trigger"
          >
            <OpenInAppLinksMenu />
          </SettingRow>
        </SettingWrapper>
      ) : null}

      {!simplified && BUILD_CONFIG.isElectron ? (
        <SettingWrapper
          title={t['com.blank.appearanceSettings.sidebar.title']()}
        >
          <SettingRow
            name={t['com.blank.appearanceSettings.noisyBackground.title']()}
            desc={t[
              'com.blank.appearanceSettings.noisyBackground.description'
            ]()}
          >
            <Switch
              checked={appSettings.enableNoisyBackground}
              onChange={checked =>
                updateSettings('enableNoisyBackground', checked)
              }
            />
          </SettingRow>
          {environment.isMacOs ? (
            <SettingRow
              name={t['com.blank.appearanceSettings.translucentUI.title']()}
              desc={t[
                'com.blank.appearanceSettings.translucentUI.description'
              ]()}
            >
              <Switch
                checked={appSettings.enableBlurBackground}
                onChange={checked =>
                  updateSettings('enableBlurBackground', checked)
                }
              />
            </SettingRow>
          ) : null}
        </SettingWrapper>
      ) : null}

      {!simplified ? <SidebarSectionVisibilitySettings /> : null}

      {BUILD_CONFIG.isElectron ? <MenubarSetting simplified={simplified} /> : null}
    </>
  );
};
