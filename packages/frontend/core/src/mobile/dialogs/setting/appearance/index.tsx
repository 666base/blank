import { useI18n } from '@blank/i18n';

import { SettingGroup } from '../group';
import { FontStyleSetting } from './font';
import { LanguageSetting } from './language';
import { ThemeSetting } from './theme';

export const AppearanceGroup = () => {
  const t = useI18n();
  return (
    <SettingGroup title={t['com.blank.mobile.setting.appearance.title']()}>
      <ThemeSetting />
      <FontStyleSetting />
      <LanguageSetting />
    </SettingGroup>
  );
};
