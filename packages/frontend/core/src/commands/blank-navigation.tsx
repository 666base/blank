import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import type { Workspace } from '@blocksuite/blank/store';
import { ArrowRightBigIcon } from '@blocksuite/icons/rc';

import type { useNavigateHelper } from '../components/hooks/use-navigate-helper';
import type { WorkspaceDialogService } from '../modules/dialogs';
import type { WorkbenchService } from '../modules/workbench';
import { registerBlankCommand } from './registry';

export function registerBlankNavigationCommands({
  t,
  docCollection,
  navigationHelper,
  workspaceDialogService,
  workbenchService,
}: {
  t: ReturnType<typeof useI18n>;
  navigationHelper: ReturnType<typeof useNavigateHelper>;
  docCollection: Workspace;
  workspaceDialogService: WorkspaceDialogService;
  workbenchService?: WorkbenchService;
}) {
  const unsubs: Array<() => void> = [];
  unsubs.push(
    registerBlankCommand({
      id: 'blank:goto-all-pages',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: t['com.blank.cmdk.blank.navigation.goto-all-pages'](),
      run() {
        track.$.cmdk.navigation.navigate({
          to: 'allDocs',
        });

        navigationHelper.jumpToPage(docCollection.id, 'all');
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:goto-collection-list',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: 'Go to Collection List',
      run() {
        track.$.cmdk.navigation.navigate({
          to: 'collectionList',
        });

        navigationHelper.jumpToCollections(docCollection.id);
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:goto-tag-list',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: 'Go to Tag List',
      run() {
        track.$.cmdk.navigation.navigate({
          to: 'tagList',
        });

        navigationHelper.jumpToTags(docCollection.id);
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:goto-workspace',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: t['com.blank.cmdk.blank.navigation.goto-workspace'](),
      run() {
        track.$.cmdk.navigation.navigate({
          to: 'workspace',
        });

        workbenchService?.workbench.openWorkspaceSelector();
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:open-settings',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: t['com.blank.cmdk.blank.navigation.open-settings'](),
      keyBinding: '$mod+,',
      run() {
        track.$.cmdk.settings.openSettings();
        workspaceDialogService.open('setting', {
          activeTab: 'appearance',
        });
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:open-account',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: t['com.blank.cmdk.blank.navigation.open-account-settings'](),
      run() {
        track.$.cmdk.settings.openSettings({ to: 'account' });
        workspaceDialogService.open('setting', {
          activeTab: 'account',
        });
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:goto-trash',
      category: 'blank:navigation',
      icon: <ArrowRightBigIcon />,
      label: t['com.blank.cmdk.blank.navigation.goto-trash'](),
      run() {
        track.$.cmdk.navigation.navigate({
          to: 'trash',
        });

        navigationHelper.jumpToPage(docCollection.id, 'trash');
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
