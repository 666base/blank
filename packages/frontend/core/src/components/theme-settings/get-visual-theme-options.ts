import type { RadioItem } from '@blank/component';
import type { useI18n } from '@blank/i18n';

export const getVisualThemeOptions = (
  t: ReturnType<typeof useI18n>
): RadioItem[] => [
  {
    value: 'default',
    label: t['com.blank.appearanceSettings.visualTheme.default'](),
    testId: 'default-visual-theme-trigger',
  },
  {
    value: 'codex',
    label: t['com.blank.appearanceSettings.visualTheme.codex'](),
    testId: 'codex-visual-theme-trigger',
  },
];
