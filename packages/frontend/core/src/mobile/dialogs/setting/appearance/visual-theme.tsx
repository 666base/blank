// @ts-nocheck
import { VisualThemePicker } from '@blank/core/components/theme-settings';
import { useI18n } from '@blank/i18n';

import { SettingGroup } from '../group';
import * as styles from './styles.css';

export const VisualThemeSetting = () => {
  const t = useI18n();

  return (
    <div className={styles.themeBlock} data-testid="mobile-visual-theme-setting">
      <div className={styles.themeLabel}>
        {t['com.blank.appearanceSettings.visualTheme.title']()}
      </div>
      <VisualThemePicker className={styles.themePicker} width="100%" />
    </div>
  );
};

