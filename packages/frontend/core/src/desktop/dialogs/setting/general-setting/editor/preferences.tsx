import { Button } from '@blank/component';
import {
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useI18n } from '@blank/i18n';

export const Preferences = () => {
  const t = useI18n();
  return (
    <SettingWrapper
      title={t['com.blank.settings.editorSettings.preferences']()}
    >
      <SettingRow
        name={t[
          'com.blank.settings.editorSettings.preferences.export.title'
        ]()}
        desc={t[
          'com.blank.settings.editorSettings.preferences.export.description'
        ]()}
      >
        <Button>Export</Button>
      </SettingRow>
      <SettingRow
        name={t[
          'com.blank.settings.editorSettings.preferences.import.title'
        ]()}
        desc={t[
          'com.blank.settings.editorSettings.preferences.import.description'
        ]()}
      >
        <Button>Import</Button>
      </SettingRow>
    </SettingWrapper>
  );
};
