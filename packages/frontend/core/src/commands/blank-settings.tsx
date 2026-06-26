import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { SettingsIcon } from '@blocksuite/icons/rc';
import { appSettingAtom } from '@toeverything/infra';
import type { createStore } from 'jotai';
import type { useTheme } from 'next-themes';

import type { EditorSettingService } from '../modules/editor-setting';
import { registerBlankCommand } from './registry';

export function registerBlankSettingsCommands({
  t,
  store,
  theme,
  editorSettingService,
}: {
  t: ReturnType<typeof useI18n>;
  store: ReturnType<typeof createStore>;
  theme: ReturnType<typeof useTheme>;
  editorSettingService: EditorSettingService;
}) {
  const unsubs: Array<() => void> = [];
  const updateSettings = editorSettingService.editorSetting.set.bind(
    editorSettingService.editorSetting
  );
  const settings$ = editorSettingService.editorSetting.settings$;

  // color modes
  unsubs.push(
    registerBlankCommand({
      id: 'blank:change-color-mode-to-auto',
      label: `${t['com.blank.cmdk.blank.color-mode.to']()} ${t[
        'com.blank.themeSettings.system'
      ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => theme.theme !== 'system',
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'theme',
          value: 'system',
        });
        theme.setTheme('system');
      },
    })
  );
  unsubs.push(
    registerBlankCommand({
      id: 'blank:change-color-mode-to-dark',
      label: `${t['com.blank.cmdk.blank.color-mode.to']()} ${t[
        'com.blank.themeSettings.dark'
      ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => theme.theme !== 'dark',
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'theme',
          value: 'dark',
        });
        theme.setTheme('dark');
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:change-color-mode-to-light',
      label: `${t['com.blank.cmdk.blank.color-mode.to']()} ${t[
        'com.blank.themeSettings.light'
      ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => theme.theme !== 'light',
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'theme',
          value: 'light',
        });

        theme.setTheme('light');
      },
    })
  );

  // Font styles
  unsubs.push(
    registerBlankCommand({
      id: 'blank:change-font-style-to-sans',
      label: `${t['com.blank.cmdk.blank.font-style.to']()} ${t[
        'com.blank.appearanceSettings.fontStyle.sans'
      ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => settings$.value.fontFamily !== 'Sans',
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'fontStyle',
          value: 'Sans',
        });

        updateSettings('fontFamily', 'Sans');
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:change-font-style-to-serif',
      label: `${t['com.blank.cmdk.blank.font-style.to']()} ${t[
        'com.blank.appearanceSettings.fontStyle.serif'
      ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => settings$.value.fontFamily !== 'Serif',
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'fontStyle',
          value: 'Serif',
        });

        updateSettings('fontFamily', 'Serif');
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:change-font-style-to-mono',
      label: `${t['com.blank.cmdk.blank.font-style.to']()} ${t[
        'com.blank.appearanceSettings.fontStyle.mono'
      ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => settings$.value.fontFamily !== 'Mono',
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'fontStyle',
          value: 'Mono',
        });

        updateSettings('fontFamily', 'Mono');
      },
    })
  );

  // Layout Style
  unsubs.push(
    registerBlankCommand({
      id: `blank:change-client-border-style`,
      label: () => `${t['com.blank.cmdk.blank.client-border-style.to']()} ${t[
        store.get(appSettingAtom).clientBorder
          ? 'com.blank.cmdk.blank.switch-state.off'
          : 'com.blank.cmdk.blank.switch-state.on'
      ]()}
        `,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => BUILD_CONFIG.isElectron,
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'clientBorder',
          value: store.get(appSettingAtom).clientBorder ? 'off' : 'on',
        });
        store.set(appSettingAtom, prev => ({
          ...prev,
          clientBorder: !prev.clientBorder,
        }));
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: `blank:change-full-width-layout`,
      label: () =>
        `${t[
          settings$.value.fullWidthLayout
            ? 'com.blank.cmdk.blank.default-page-width-layout.standard'
            : 'com.blank.cmdk.blank.default-page-width-layout.full-width'
        ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'fullWidthLayout',
          value: settings$.value.fullWidthLayout ? 'off' : 'on',
        });
        updateSettings('fullWidthLayout', !settings$.value.fullWidthLayout);
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: `blank:change-noise-background-on-the-sidebar`,
      label: () =>
        `${t[
          'com.blank.cmdk.blank.noise-background-on-the-sidebar.to'
        ]()} ${t[
          store.get(appSettingAtom).enableNoisyBackground
            ? 'com.blank.cmdk.blank.switch-state.off'
            : 'com.blank.cmdk.blank.switch-state.on'
        ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () => BUILD_CONFIG.isElectron,
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'enableNoisyBackground',
          value: store.get(appSettingAtom).enableNoisyBackground ? 'off' : 'on',
        });

        store.set(appSettingAtom, prev => ({
          ...prev,
          enableNoisyBackground: !prev.enableNoisyBackground,
        }));
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: `blank:change-translucent-ui-on-the-sidebar`,
      label: () =>
        `${t['com.blank.cmdk.blank.translucent-ui-on-the-sidebar.to']()} ${t[
          store.get(appSettingAtom).enableBlurBackground
            ? 'com.blank.cmdk.blank.switch-state.off'
            : 'com.blank.cmdk.blank.switch-state.on'
        ]()}`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () =>
        BUILD_CONFIG.isElectron && environment.isMacOs,
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'enableBlurBackground',
          value: store.get(appSettingAtom).enableBlurBackground ? 'off' : 'on',
        });
        store.set(appSettingAtom, prev => ({
          ...prev,
          enableBlurBackground: !prev.enableBlurBackground,
        }));
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
