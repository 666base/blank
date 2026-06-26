import { SettingHeader } from '@blank/component/setting-components';
import { useI18n } from '@blank/i18n';

import { Edgeless } from './edgeless';
import { General } from './general';
import { Page } from './page';

export const EditorSettings = () => {
  const t = useI18n();

  return (
    <>
      <SettingHeader
        title={t['com.blank.settings.editorSettings.title']()}
        subtitle={t['com.blank.settings.editorSettings.subtitle']()}
      />
      <General />
      <Page />
      <Edgeless />

      {/* // TODO(@EYHN): implement export and import
       <Preferences /> */}
    </>
  );
};
