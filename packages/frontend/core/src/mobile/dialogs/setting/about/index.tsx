import { Button } from '@blank/component';
import { useMobileAppUpdater } from '@blank/core/components/hooks/use-mobile-app-updater';
import { useI18n } from '@blank/i18n';
import { useCallback } from 'react';

import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';

export const AboutGroup = () => {
  const t = useI18n();
  const {
    status,
    latestVersion,
    checkForUpdates,
    downloadUpdate,
    error,
  } = useMobileAppUpdater();

  const handleUpdateAction = useCallback(() => {
    if (status === 'available') {
      downloadUpdate();
      return;
    }
    void checkForUpdates();
  }, [checkForUpdates, downloadUpdate, status]);

  const updateHint = (() => {
    if (status === 'checking') {
      return t['com.blank.aboutBlank.checkUpdate.subtitle.checking']();
    }
    if (status === 'error') {
      return (
        error ?? t['com.blank.aboutBlank.checkUpdate.subtitle.error']()
      );
    }
    if (status === 'available' && latestVersion) {
      return t['com.blank.aboutBlank.checkUpdate.subtitle.update-available']({
        version: latestVersion,
      });
    }
    if (status === 'latest') {
      return t['com.blank.aboutBlank.checkUpdate.subtitle.latest']();
    }
    return t['com.blank.aboutBlank.checkUpdate.subtitle.check']();
  })();

  const updateButtonLabel = (() => {
    if (status === 'available') {
      return t['com.blank.aboutBlank.checkUpdate.button.download']();
    }
    if (status === 'latest' || status === 'error') {
      return t['com.blank.aboutBlank.checkUpdate.button.retry']();
    }
    return t['com.blank.aboutBlank.checkUpdate.button.check']();
  })();

  return (
    <SettingGroup title={t['com.blank.mobile.setting.about.title']()}>
      <RowLayout label={t['com.blank.mobile.setting.about.appVersion']()}>
        {BUILD_CONFIG.isIOS
          ? hiddenVersionVariant(BUILD_CONFIG.appVersion)
          : BUILD_CONFIG.appVersion}
      </RowLayout>

      <RowLayout label={t['com.blank.mobile.setting.about.editorVersion']()}>
        {BUILD_CONFIG.isIOS
          ? hiddenVersionVariant(BUILD_CONFIG.editorVersion)
          : BUILD_CONFIG.editorVersion}
      </RowLayout>

      {BUILD_CONFIG.isMobileEdition && !BUILD_CONFIG.isIOS ? (
        <RowLayout label={t['com.blank.aboutBlank.checkUpdate.title']()}>
          <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
            <span style={{ fontSize: 12, opacity: 0.72 }}>{updateHint}</span>
            <Button
              size="small"
              onClick={handleUpdateAction}
              disabled={status === 'checking'}
            >
              {updateButtonLabel}
            </Button>
          </div>
        </RowLayout>
      ) : null}
    </SettingGroup>
  );
};

// 0.23.0-beta.1 -> 0.23.0
function hiddenVersionVariant(version: string) {
  return version.replace(/(\d+\.\d+\.\d+)(.*)/, '$1');
}
