import type { RadioItem } from '@blank/component';
import type { useI18n } from '@blank/i18n';

export const getThemeOptions = (
  t: ReturnType<typeof useI18n>
): RadioItem[] => [
  {
    value: 'dark',
    label: t['com.blank.themeSettings.dark'](),
    testId: 'dark-theme-trigger',
  },
  {
    value: 'light',
    label: t['com.blank.themeSettings.light'](),
    testId: 'light-theme-trigger',
  },
  {
    value: 'gray',
    label: t['com.blank.themeSettings.gray'](),
    testId: 'gray-theme-trigger',
  },
  {
    value: 'paper',
    label: t['com.blank.themeSettings.paper'](),
    testId: 'paper-theme-trigger',
  },
];
