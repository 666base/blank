import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import type { DocMode } from '@blocksuite/blank/model';
import { ImportIcon, PlusIcon } from '@blocksuite/icons/rc';

import type { usePageHelper } from '../blocksuite/block-suite-page-list/utils';
import type { GlobalDialogService } from '../modules/dialogs';
import { registerBlankCommand } from './registry';

export function registerBlankCreationCommands({
  pageHelper,
  t,
  globalDialogService,
}: {
  t: ReturnType<typeof useI18n>;
  pageHelper: ReturnType<typeof usePageHelper>;
  globalDialogService: GlobalDialogService;
}) {
  const unsubs: Array<() => void> = [];
  unsubs.push(
    registerBlankCommand({
      id: 'blank:new-page',
      category: 'blank:creation',
      label: t['com.blank.cmdk.blank.new-page'](),
      icon: <PlusIcon />,
      keyBinding: BUILD_CONFIG.isElectron
        ? {
            binding: '$mod+N',
            skipRegister: true,
          }
        : undefined,
      run() {
        track.$.cmdk.creation.createDoc({ mode: 'page' });

        pageHelper.createPage('page' as DocMode);
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:new-edgeless-page',
      category: 'blank:creation',
      icon: <PlusIcon />,
      label: t['com.blank.cmdk.blank.new-edgeless-page'](),
      run() {
        track.$.cmdk.creation.createDoc({
          mode: 'edgeless',
        });

        pageHelper.createEdgeless();
      },
    })
  );

  unsubs.push(
    registerBlankCommand({
      id: 'blank:new-workspace',
      category: 'blank:creation',
      icon: <PlusIcon />,
      label: t['com.blank.cmdk.blank.new-workspace'](),
      run() {
        track.$.cmdk.workspace.createWorkspace();

        globalDialogService.open('create-workspace', {});
      },
    })
  );
  unsubs.push(
    registerBlankCommand({
      id: 'blank:import-workspace',
      category: 'blank:creation',
      icon: <ImportIcon />,
      label: t['com.blank.cmdk.blank.import-workspace'](),
      preconditionStrategy: () => {
        return BUILD_CONFIG.isElectron;
      },
      run() {
        track.$.cmdk.workspace.createWorkspace({
          control: 'import',
        });

        globalDialogService.open('import-workspace', undefined);
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
