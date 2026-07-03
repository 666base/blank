// @ts-nocheck
import { ThemePicker } from '@blank/core/components/theme-settings';
import { useI18n } from '@blank/i18n';

import { SettingGroup } from '../group';
import * as styles from './styles.css';

export const ThemeSetting = () => {
  const t = useI18n();

  return (
    <div className={styles.themeBlock} data-testid="mobile-theme-setting">
      <div className={styles.themeLabel}>
        {t['com.blank.mobile.setting.appearance.theme']()}
      </div>
      <ThemePicker className={styles.themePicker} width="100%" />
    </div>
  );
};

