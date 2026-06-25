import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { WorkspaceShareSettingService } from '@affine/core/modules/share-setting';
import type { Workspace } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import type { Store } from '@blocksuite/affine/store';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';

import { ShareMenu } from './share-menu';
export { CloudSvg } from './cloud-svg';
export { ShareMenuContent } from './share-menu';

type SharePageModalProps = {
  workspace: Workspace;
  page: Store;
};

export const SharePageButton = ({ workspace, page }: SharePageModalProps) => {
  const shareSetting = useService(WorkspaceShareSettingService).sharePreview;

  if (workspace.meta.flavour === 'local' || !shareSetting) {
    return null;
  }

  return (
    <SharePageButtonInner
      workspace={workspace}
      page={page}
      shareSetting={shareSetting}
    />
  );
};

const SharePageButtonInner = ({
  workspace,
  page,
  shareSetting,
}: SharePageModalProps & {
  shareSetting: NonNullable<
    ReturnType<WorkspaceShareSettingService['sharePreview']>
  >;
}) => {
  const t = useI18n();
  const enableSharing = useLiveData(shareSetting.enableSharing$);

  const confirmEnableCloud = useEnableCloud();
  const handleOpenShareModal = useCallback((open: boolean) => {
    if (open) {
      track.$.sharePanel.$.open();
    }
  }, []);

  useEffect(() => {
    shareSetting.revalidate();
  }, [shareSetting]);

  const sharingDisabled = enableSharing === false;
  const disabledReason = sharingDisabled
    ? t['com.affine.share-menu.workspace-sharing.disabled.tooltip']()
    : undefined;

  return (
    <ShareMenu
      workspaceMetadata={workspace.meta}
      currentPage={page}
      onEnableAffineCloud={() =>
        confirmEnableCloud(workspace, {
          openPageId: page.id,
        })
      }
      onOpenShareModal={handleOpenShareModal}
      disabled={sharingDisabled}
      disabledReason={disabledReason}
    />
  );
};
