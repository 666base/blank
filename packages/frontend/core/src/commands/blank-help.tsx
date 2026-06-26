import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { ContactWithUsIcon, NewIcon } from '@blocksuite/icons/rc';

import type { WorkspaceDialogService } from '../modules/dialogs';
import type { UrlService } from '../modules/url';
import { registerBlankCommand } from './registry';

export function registerBlankHelpCommands({
  t,
  urlService,
  workspaceDialogService,
}: {
  t: ReturnType<typeof useI18n>;
  urlService: UrlService;
  workspaceDialogService: WorkspaceDialogService;
}) {
  const unsubs: Array<() => void> = [];
  unsubs.push(
    registerBlankCommand({
      id: 'blank:help-whats-new',
      category: 'blank:help',
      icon: <NewIcon />,
      label: t['com.blank.cmdk.blank.whats-new'](),
      run() {
        track.$.cmdk.help.openChangelog();
        urlService.openPopupWindow(BUILD_CONFIG.changelogUrl);
      },
    })
  );
  unsubs.push(
    registerBlankCommand({
      id: 'blank:help-contact-us',
      category: 'blank:help',
      icon: <ContactWithUsIcon />,
      label: t['com.blank.cmdk.blank.contact-us'](),
      run() {
        track.$.cmdk.help.contactUs();
        workspaceDialogService.open('setting', {
          activeTab: 'about',
        });
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
