import { notify } from '@blank/component';
import { updateReadyAtom } from '@blank/core/components/hooks/use-app-updater';
import type { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { ResetIcon } from '@blocksuite/icons/rc';
import type { createStore } from 'jotai';

import { registerBlankCommand } from './registry';

export function registerBlankUpdatesCommands({
  t,
  store,
  quitAndInstall,
}: {
  t: ReturnType<typeof useI18n>;
  store: ReturnType<typeof createStore>;
  quitAndInstall: () => Promise<void>;
}) {
  const unsubs: Array<() => void> = [];

  unsubs.push(
    registerBlankCommand({
      id: 'blank:restart-to-upgrade',
      category: 'blank:updates',
      icon: <ResetIcon />,
      label: t['com.blank.cmdk.blank.restart-to-upgrade'](),
      preconditionStrategy: () => !!store.get(updateReadyAtom),
      run() {
        track.$.cmdk.updates.quitAndInstall();

        quitAndInstall().catch(err => {
          notify.error({
            title: 'Failed to restart to upgrade',
            message: 'Please restart the app manually to upgrade.',
          });
          console.error(err);
        });
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}
