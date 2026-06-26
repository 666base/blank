import { Button } from '@blank/component/ui/button';
import { useAppUpdater } from '@blank/core/components/hooks/use-app-updater';
import { isDesktopApp } from '@blank/core/utils/local-only';
import { useI18n } from '@blank/i18n';
import { CloseIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';

import * as styles from './styles.css';

export const AppUpdateBanner = () => {
  const t = useI18n();
  const [dismissed, setDismissed] = useState(false);
  const {
    updateAvailable,
    updateReady,
    downloadProgress,
    downloadUpdate,
    quitAndInstall,
    appQuitting,
  } = useAppUpdater();

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (!isDesktopApp() || dismissed) {
    return null;
  }

  const isDownloading =
    downloadProgress !== null && downloadProgress >= 0 && !updateReady;
  const showBanner = updateReady || isDownloading || updateAvailable;

  if (!showBanner) {
    return null;
  }

  const percent =
    downloadProgress !== null ? Math.min(100, Math.max(0, downloadProgress)) : 0;

  let title = '';
  let actionLabel = '';
  let onAction: (() => void) | undefined;
  let showProgress = false;

  if (updateReady) {
    title = t['com.blank.appUpdater.updateAvailable']();
    actionLabel = t['com.blank.appUpdater.installUpdate']();
    onAction = () => quitAndInstall();
  } else if (isDownloading) {
    title = t['com.blank.appUpdater.downloading']();
    actionLabel = `${Math.round(percent)}%`;
    showProgress = true;
  } else if (updateAvailable) {
    title = t['com.blank.aboutBlank.checkUpdate.subtitle.update-available']({
      version: updateAvailable.version,
    });
    actionLabel = t['com.blank.appUpdater.downloadUpdate']();
    onAction = () => downloadUpdate();
  }

  return (
    <div
      className={styles.root}
      data-ready={updateReady}
      data-downloading={isDownloading}
      role="status"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        {showProgress ? (
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.actions}>
        {onAction ? (
          <Button
            size="small"
            onClick={onAction}
            disabled={appQuitting || isDownloading}
          >
            {appQuitting ? t['Loading']() : actionLabel}
          </Button>
        ) : (
          <span className={styles.percentLabel}>{actionLabel}</span>
        )}
        {!updateReady ? (
          <button
            type="button"
            className={styles.dismiss}
            onClick={handleDismiss}
            aria-label={t['Cancel']()}
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
};
