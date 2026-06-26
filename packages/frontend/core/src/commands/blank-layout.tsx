import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { SidebarIcon } from '@blocksuite/icons/rc';

import type { AppSidebarService } from '../modules/app-sidebar';
import { registerBlankCommand } from './registry';

export function registerBlankLayoutCommands({
  t,
  appSidebarService,
}: {
  t: ReturnType<typeof useI18n>;
  appSidebarService: AppSidebarService;
}) {
  const unsubs: Array<() => void> = [];
  unsubs.push(
    registerBlankCommand({
      id: 'blank:toggle-left-sidebar',
      category: 'blank:layout',
      icon: <SidebarIcon />,
      label: () =>
        appSidebarService.sidebar.open$.value
          ? t['com.blank.cmdk.blank.left-sidebar.collapse']()
          : t['com.blank.cmdk.blank.left-sidebar.expand'](),

      keyBinding: {
        binding: '$mod+/',
      },
      run() {
        track.$.navigationPanel.$.toggle({
          type: appSidebarService.sidebar.open$.value ? 'collapse' : 'expand',
        });
        appSidebarService.sidebar.toggleSidebar();
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
