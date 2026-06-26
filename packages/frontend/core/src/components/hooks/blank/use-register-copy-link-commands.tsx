import {
  PreconditionStrategy,
  registerBlankCommand,
} from '@blank/core/commands';
import { useSharingUrl } from '@blank/core/components/hooks/blank/use-share-url';
import { getDefaultShareMode } from '@blank/core/components/hooks/blank/use-share-url.utils';
import { EditorService } from '@blank/core/modules/editor';
import { useIsActiveView } from '@blank/core/modules/workbench';
import type { WorkspaceMetadata } from '@blank/core/modules/workspace';
import { track } from '@blank/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect } from 'react';

export function useRegisterCopyLinkCommands({
  workspaceMeta,
  docId,
}: {
  workspaceMeta: WorkspaceMetadata;
  docId: string;
}) {
  const isActiveView = useIsActiveView();
  const workspaceId = workspaceMeta.id;
  const isCloud = workspaceMeta.flavour !== 'local';
  const currentMode = useLiveData(useService(EditorService).editor.mode$);

  const { onClickCopyLink } = useSharingUrl({
    workspaceId,
    pageId: docId,
  });

  useEffect(() => {
    if (!isActiveView) {
      return;
    }
    const unsubs: Array<() => void> = [];

    unsubs.push(
      registerBlankCommand({
        id: `blank:share-private-link:${docId}`,
        category: 'blank:general',
        preconditionStrategy: PreconditionStrategy.Never,
        keyBinding: {
          binding: '$mod+Shift+c',
        },
        label: '',
        icon: null,
        run() {
          track.$.cmdk.general.copyShareLink();
          isActiveView &&
            isCloud &&
            onClickCopyLink(getDefaultShareMode(currentMode));
        },
      })
    );
    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, [currentMode, docId, isActiveView, isCloud, onClickCopyLink]);
}
