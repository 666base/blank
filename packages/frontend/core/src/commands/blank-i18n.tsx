import type { I18n } from '@blank/core/modules/i18n';
import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { SettingsIcon } from '@blocksuite/icons/rc';

import { registerBlankCommand } from './registry';

export function registerBlankLanguageCommands({
  i18n,
  t,
}: {
  i18n: I18n;
  t: ReturnType<typeof useI18n>;
}) {
  // Display Language
  const disposables = i18n.languageList.map(language => {
    return registerBlankCommand({
      id: `blank:change-display-language-to-${language.name}`,
      label: `${t['com.blank.cmdk.blank.display-language.to']()} ${
        language.originalName
      }`,
      category: 'blank:settings',
      icon: <SettingsIcon />,
      preconditionStrategy: () =>
        i18n.currentLanguage$.value.key !== language.key,
      run() {
        track.$.cmdk.settings.changeAppSetting({
          key: 'language',
          value: language.name,
        });

        i18n.changeLanguage(language.key);
      },
    });
  });

  return () => {
    disposables.forEach(dispose => dispose());
  };
}
