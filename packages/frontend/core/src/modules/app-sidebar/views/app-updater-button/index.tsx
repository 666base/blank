import { Tooltip } from '@blank/component';
import { useCatchEventCallback } from '@blank/core/components/hooks/use-catch-event-hook';
import { UrlService } from '@blank/core/modules/url';
import { getBlankGithubUrl } from '@blank/core/utils/blank-links';
import { isBlankBranding } from '@blank/core/utils/blank-branding';
import { Unreachable } from '@blank/env/constant';
import { useI18n } from '@blank/i18n';
import {
  CloseIcon,
  DownloadIcon,
  NewIcon,
  ResetIcon,
} from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';

import * as styles from './index.css';

export interface AddPageButtonProps {
  onQuitAndInstall: () => void;
  onDownloadUpdate: () => void;
  onDismissChangelog: () => void;
  onOpenChangelog: () => void;
  changelogUnread: boolean;
  updateReady: boolean;
  updateAvailable: {
    version: string;
    allowAutoUpdate: boolean;
  } | null;
  autoDownload: boolean;
  downloadProgress: number | null;
  appQuitting: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface ButtonContentProps {
  updateReady: boolean;
  updateAvailable: {
    version: string;
    allowAutoUpdate: boolean;
  } | null;
  autoDownload: boolean;
  downloadProgress: number | null;
  appQuitting: boolean;
  changelogUnread: boolean;
  onDismissChangelog: () => void;
}

function DownloadUpdate({ updateAvailable }: ButtonContentProps) {
  const t = useI18n();
  return (
    <div className={styles.updateAvailableWrapper}>
      <div className={styles.installLabelNormal}>
        <DownloadIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.downloadUpdate']()}
        </span>
        <span className={styles.versionLabel}>{updateAvailable?.version}</span>
      </div>

      <div className={styles.installLabelHover}>
        <DownloadIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.downloadUpdate']()}
        </span>
      </div>
    </div>
  );
}

function UpdateReady({ updateAvailable, appQuitting }: ButtonContentProps) {
  const t = useI18n();
  return (
    <div className={styles.updateAvailableWrapper}>
      <div className={styles.installLabelNormal}>
        <ResetIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.updateAvailable']()}
        </span>
        <span className={styles.versionLabel}>{updateAvailable?.version}</span>
      </div>

      <div className={styles.installLabelHover}>
        <ResetIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t[appQuitting ? 'Loading' : 'com.blank.appUpdater.installUpdate']()}
        </span>
      </div>
    </div>
  );
}

function DownloadingUpdate({
  updateAvailable,
  downloadProgress,
}: ButtonContentProps) {
  const t = useI18n();
  return (
    <div className={clsx([styles.updateAvailableWrapper])}>
      <div className={clsx([styles.installLabelNormal])}>
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.downloading']()}
          {downloadProgress !== null
            ? ` · ${Math.round(downloadProgress)}%`
            : ''}
        </span>
        <span className={styles.versionLabel}>{updateAvailable?.version}</span>
      </div>

      <div className={styles.progress}>
        <div
          className={styles.progressInner}
          style={{ width: `${downloadProgress}%` }}
        />
      </div>
    </div>
  );
}

function OpenDownloadPage({ updateAvailable }: ButtonContentProps) {
  const t = useI18n();
  return (
    <>
      <div className={styles.installLabelNormal}>
        <DownloadIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.updateAvailable']()}
        </span>
        <span className={styles.versionLabel}>{updateAvailable?.version}</span>
      </div>

      <div className={styles.installLabelHover}>
        <DownloadIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.openDownloadPage']()}
        </span>
      </div>
    </>
  );
}

function WhatsNew({ onDismissChangelog }: ButtonContentProps) {
  const t = useI18n();
  const onClickClose = useCatchEventCallback(() => {
    onDismissChangelog();
  }, [onDismissChangelog]);
  return (
    <>
      <div className={clsx([styles.whatsNewLabel])}>
        <NewIcon className={styles.icon} />
        <span className={styles.ellipsisTextOverflow}>
          {t['com.blank.appUpdater.whatsNew']()}
        </span>
      </div>
      <div className={styles.closeIcon} onClick={onClickClose}>
        <CloseIcon />
      </div>
    </>
  );
}

const getButtonContentRenderer = (props: ButtonContentProps) => {
  if (props.updateReady) {
    return UpdateReady;
  }
  if (
    props.downloadProgress !== null &&
    props.updateAvailable?.allowAutoUpdate
  ) {
    return DownloadingUpdate;
  }
  if (props.updateAvailable?.allowAutoUpdate) {
    return DownloadUpdate;
  } else if (props.updateAvailable && !props.updateAvailable?.allowAutoUpdate) {
    return OpenDownloadPage;
  } else if (props.changelogUnread) {
    return WhatsNew;
  }
  return null;
};

export function AppUpdaterButton({
  updateReady,
  changelogUnread,
  onDismissChangelog,
  onDownloadUpdate,
  onQuitAndInstall,
  onOpenChangelog,
  updateAvailable,
  autoDownload,
  downloadProgress,
  appQuitting,
  className,
  style,
}: AddPageButtonProps) {
  const urlService = useService(UrlService);
  const handleClick = useCallback(() => {
    if (updateReady) {
      onQuitAndInstall();
    } else if (updateAvailable) {
      if (updateAvailable.allowAutoUpdate) {
        if (autoDownload) {
          // wait for download to finish
        } else {
          onDownloadUpdate();
        }
      } else {
        urlService.openPopupWindow(
          isBlankBranding()
            ? `${getBlankGithubUrl()}/releases/tag/v${updateAvailable.version}`
            : `https://github.com/666base/blank/releases/tag/v${updateAvailable.version}`
        );
      }
    } else if (changelogUnread) {
      onOpenChangelog();
    } else {
      throw new Unreachable();
    }
  }, [
    updateReady,
    updateAvailable,
    changelogUnread,
    onQuitAndInstall,
    autoDownload,
    onDownloadUpdate,
    urlService,
    onOpenChangelog,
  ]);

  const contentProps = useMemo(
    () => ({
      updateReady,
      updateAvailable,
      changelogUnread,
      autoDownload,
      downloadProgress,
      appQuitting,
      onDismissChangelog,
    }),
    [
      updateReady,
      updateAvailable,
      changelogUnread,
      autoDownload,
      downloadProgress,
      appQuitting,
      onDismissChangelog,
    ]
  );

  const ContentComponent = getButtonContentRenderer(contentProps);

  const wrapWithTooltip = (
    node: React.ReactElement,
    tooltip?: React.ReactElement | string
  ) => {
    if (!tooltip) {
      return node;
    }

    return (
      <Tooltip content={tooltip} side="top">
        {node}
      </Tooltip>
    );
  };

  const disabled = useMemo(() => {
    if (appQuitting) {
      return true;
    }

    if (updateAvailable?.allowAutoUpdate) {
      return !updateReady && autoDownload;
    }

    return false;
  }, [
    appQuitting,
    autoDownload,
    updateAvailable?.allowAutoUpdate,
    updateReady,
  ]);

  if (!updateAvailable && !changelogUnread) {
    return null;
  }

  return wrapWithTooltip(
    <button
      style={style}
      className={clsx([styles.root, className])}
      data-has-update={!!updateAvailable}
      data-updating={appQuitting}
      data-disabled={disabled}
      onClick={handleClick}
    >
      {ContentComponent ? <ContentComponent {...contentProps} /> : null}
      <div className={styles.particles} aria-hidden="true"></div>
      <span className={styles.halo} aria-hidden="true"></span>
    </button>,
    updateAvailable?.version
  );
}
