import { Button } from '@blank/component/ui/button';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { appIconMap, appNames } from '@blank/core/utils/channel';
import {
  getBlankDownloadUrl,
  isBlankBuild,
} from '@blank/core/utils/blank-links';
import { BlankAppLogo, isBlankBranding } from '@blank/core/utils/blank-branding';
import { Trans, useI18n } from '@blank/i18n';
import { LocalWorkspaceIcon, Logo1Icon } from '@blocksuite/icons/rc';
import { useServiceOptional } from '@toeverything/infra';
import type { MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';

import { getOpenUrlInDesktopAppLink } from '../utils';
import * as styles from './open-in-app-page.css';

let lastOpened = '';

interface OpenAppProps {
  urlToOpen?: string | null;
  openHereClicked?: (e: MouseEvent) => void;
  mode?: 'auth' | 'open-doc'; // default to 'auth'
}
const channel = BUILD_CONFIG.appBuildType;
const url = isBlankBuild()
  ? getBlankDownloadUrl()
  : 'https://blank.pro/download' + (channel !== 'stable' ? '/beta-canary' : '');

export const OpenInAppPage = ({
  urlToOpen,
  openHereClicked,
  mode = 'auth',
}: OpenAppProps) => {
  // default to open the current page in desktop app
  urlToOpen ??= getOpenUrlInDesktopAppLink(window.location.href, true);
  const workspaceDialogService = useServiceOptional(WorkspaceDialogService);
  const t = useI18n();

  const openDownloadLink = useCallback(() => {
    open(url, '_blank');
  }, []);

  const appIcon = appIconMap[channel];
  const appName = appNames[channel];

  const navLinks = useMemo(
    () =>
      isBlankBuild()
        ? []
        : [
            {
              href: 'https://blank.pro',
              label: t['com.blank.other-page.nav.official-website'](),
            },
            {
              href: 'https://blank.pro/blog',
              label: t['com.blank.other-page.nav.blog'](),
            },
            {
              href: 'https://blank.pro/about-us',
              label: t['com.blank.other-page.nav.contact-us'](),
            },
          ],
    [t]
  );

  const goToAppearanceSetting = useCallback(
    (e: MouseEvent) => {
      openHereClicked?.(e);
      workspaceDialogService?.open('setting', {
        activeTab: 'appearance',
      });
    },
    [workspaceDialogService, openHereClicked]
  );

  if (urlToOpen && lastOpened !== urlToOpen) {
    lastOpened = urlToOpen;
    location.href = urlToOpen;
  }

  if (!urlToOpen) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.topNav}>
        <a href="/" rel="noreferrer" className={styles.blankLogo}>
          {isBlankBranding() ? (
            <BlankAppLogo size={24} />
          ) : (
            <Logo1Icon width={24} height={24} />
          )}
        </a>

        {navLinks.length > 0 ? (
          <div className={styles.topNavLinks}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={styles.topNavLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        <Button onClick={openDownloadLink}>
          {t['com.blank.auth.open.blank.download-app']()}
        </Button>
      </div>

      <div className={styles.centerContent}>
        <img src={appIcon} alt={appName} width={120} height={120} />

        <div className={styles.prompt}>
          {mode === 'open-doc' ? (
            <Trans i18nKey="com.blank.auth.open.blank.open-doc-prompt">
              This doc is now opened in {appName}
            </Trans>
          ) : (
            <Trans i18nKey="com.blank.auth.open.blank.prompt">
              Open {appName} app now
            </Trans>
          )}
        </div>

        <div className={styles.promptLinks}>
          {openHereClicked && (
            <a
              className={styles.promptLink}
              onClick={openHereClicked}
              target="_blank"
              rel="noreferrer"
            >
              {t['com.blank.auth.open.blank.doc.open-here']()}
            </a>
          )}
          <a
            className={styles.promptLink}
            href={urlToOpen}
            target="_blank"
            rel="noreferrer"
          >
            {t['com.blank.auth.open.blank.try-again']()}
          </a>
        </div>
      </div>

      {mode === 'open-doc' ? (
        <div className={styles.docFooter}>
          <button
            className={styles.editSettingsLink}
            onClick={goToAppearanceSetting}
          >
            {t['com.blank.auth.open.blank.doc.edit-settings']()}
          </button>

          <div className={styles.docFooterText}>
            <LocalWorkspaceIcon width={16} height={16} />
            {t['com.blank.auth.open.blank.doc.footer-text']()}
          </div>
        </div>
      ) : null}
    </div>
  );
};
