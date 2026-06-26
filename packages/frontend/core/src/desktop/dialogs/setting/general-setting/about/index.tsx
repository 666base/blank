import { Switch } from '@blank/component';
import {
  SettingHeader,
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useAppUpdater } from '@blank/core/components/hooks/use-app-updater';
import { UrlService } from '@blank/core/modules/url';
import { appIconMap, appNames } from '@blank/core/utils/channel';
import { useI18n } from '@blank/i18n';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { useServices } from '@toeverything/infra';
import { useCallback } from 'react';

import { useAppSettingHelper } from '../../../../../components/hooks/blank/use-app-setting-helper';
import { isLocalOnlyMode } from '../../../../../utils/local-only';
import * as styles from './style.css';
import { UpdateCheckSection } from './update-check-section';

export const AboutBlank = () => {
  const t = useI18n();
  const localOnly = isLocalOnlyMode();
  const { appSettings, updateSettings } = useAppSettingHelper();
  const { toggleAutoCheck, toggleAutoDownload } = useAppUpdater();
  const channel = BUILD_CONFIG.appBuildType;
  const appIcon = appIconMap[channel];
  const appName = appNames[channel];
  const { urlService } = useServices({
    UrlService,
  });

  const onSwitchAutoCheck = useCallback(
    (checked: boolean) => {
      toggleAutoCheck(checked);
      updateSettings('autoCheckUpdate', checked);
    },
    [toggleAutoCheck, updateSettings]
  );

  const onSwitchAutoDownload = useCallback(
    (checked: boolean) => {
      toggleAutoDownload(checked);
      updateSettings('autoDownloadUpdate', checked);
    },
    [toggleAutoDownload, updateSettings]
  );

  const onSwitchTelemetry = useCallback(
    (checked: boolean) => {
      updateSettings('enableTelemetry', checked);
    },
    [updateSettings]
  );

  return (
    <>
      <SettingHeader
        title={t['com.blank.aboutBlank.title']()}
        subtitle={t['com.blank.aboutBlank.subtitle']()}
        data-testid="about-title"
      />
      <SettingWrapper title={t['com.blank.aboutBlank.version.title']()}>
        <SettingRow
          name={appName}
          desc={BUILD_CONFIG.appVersion}
          className={styles.appImageRow}
        >
          <img src={appIcon} alt={appName} width={56} height={56} />
        </SettingRow>
        <SettingRow
          name={t['com.blank.aboutBlank.version.editor.title']()}
          desc={BUILD_CONFIG.editorVersion}
        />
        {BUILD_CONFIG.isElectron ? (
          <>
            <UpdateCheckSection />
            <SettingRow
              name={t['com.blank.aboutBlank.autoCheckUpdate.title']()}
              desc={t['com.blank.aboutBlank.autoCheckUpdate.description']()}
            >
              <Switch
                checked={appSettings.autoCheckUpdate}
                onChange={onSwitchAutoCheck}
              />
            </SettingRow>
            <SettingRow
              name={t['com.blank.aboutBlank.autoDownloadUpdate.title']()}
              desc={t[
                'com.blank.aboutBlank.autoDownloadUpdate.description'
              ]()}
            >
              <Switch
                checked={appSettings.autoDownloadUpdate}
                onChange={onSwitchAutoDownload}
              />
            </SettingRow>
            <SettingRow
              name={t['com.blank.aboutBlank.changelog.title']()}
              desc={t['com.blank.aboutBlank.changelog.description']()}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                urlService.openPopupWindow(BUILD_CONFIG.changelogUrl);
              }}
            >
              <ArrowRightSmallIcon />
            </SettingRow>
          </>
        ) : null}
        {!localOnly ? (
          <SettingRow
            name={t['com.blank.telemetry.enable']()}
            desc={t['com.blank.telemetry.enable.desc']()}
          >
            <Switch
              checked={appSettings.enableTelemetry !== false}
              onChange={onSwitchTelemetry}
            />
          </SettingRow>
        ) : null}
      </SettingWrapper>
    </>
  );
};
