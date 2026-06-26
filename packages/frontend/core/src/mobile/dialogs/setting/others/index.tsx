import { getBlankGithubUrl, isBlankBuild } from '@blank/core/utils/blank-links';
import { useI18n } from '@blank/i18n';

import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';
import { DeleteAccount } from './delete-account';
import { hotTag } from './index.css';

export const OthersGroup = () => {
  const t = useI18n();

  return (
    <SettingGroup title={t['com.blank.mobile.setting.others.title']()}>
      {!isBlankBuild() ? (
        <RowLayout
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {t['com.blank.mobile.setting.others.discord']()}
              <div className={hotTag}>Hot</div>
            </div>
          }
          href="https://discord.com/invite/whd5mjYqVw"
        />
      ) : null}
      <RowLayout
        label={t['com.blank.mobile.setting.others.github']()}
        href={getBlankGithubUrl()}
      />

      <RowLayout
        label={t['com.blank.mobile.setting.others.website']()}
        href={getBlankGithubUrl()}
      />

      <RowLayout
        label={t['com.blank.mobile.setting.others.privacy']()}
        href={`${getBlankGithubUrl()}#privacy`}
      />

      <RowLayout
        label={t['com.blank.mobile.setting.others.terms']()}
        href={`${getBlankGithubUrl()}#terms`}
      />
      <DeleteAccount />
    </SettingGroup>
  );
};
