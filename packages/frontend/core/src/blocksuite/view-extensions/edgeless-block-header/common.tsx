import { IconButton } from '@blank/component';
import { useSharingUrl } from '@blank/core/components/hooks/blank/use-share-url';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { useI18n } from '@blank/i18n';
import { type DocMode } from '@blocksuite/blank/model';
import { InformationIcon, LinkIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';

import * as styles from './edgeless-block-header.css';

export const DocInfoButton = ({
  docId,
  trackFn,
  'data-testid': dataTestId,
}: {
  docId: string;
  trackFn?: () => void;
  'data-testid'?: string;
}) => {
  const t = useI18n();
  const workspaceDialogService = useService(WorkspaceDialogService);

  const onClick = useCallback(() => {
    trackFn?.();
    workspaceDialogService.open('doc-info', { docId });
  }, [docId, trackFn, workspaceDialogService]);

  return (
    <IconButton
      className={styles.button}
      size={styles.iconSize}
      tooltip={t['com.blank.page-properties.page-info.view']()}
      data-testid={dataTestId}
      onClick={onClick}
    >
      <InformationIcon />
    </IconButton>
  );
};

export const CopyLinkButton = ({
  pageId,
  blockId,
  mode,
  trackFn,
  'data-testid': dataTestId,
}: {
  pageId: string;
  blockId?: string;
  mode?: DocMode;
  trackFn?: () => void;
  'data-testid'?: string;
}) => {
  const t = useI18n();
  const workspace = useService(WorkspaceService).workspace;

  const { onClickCopyLink } = useSharingUrl({
    workspaceId: workspace.id,
    pageId,
  });

  const copyLink = useCallback(() => {
    trackFn?.();
    onClickCopyLink(mode, blockId ? [blockId] : undefined);
  }, [blockId, mode, onClickCopyLink, trackFn]);

  return (
    <IconButton
      className={styles.button}
      size={styles.iconSize}
      tooltip={t['com.blank.share-menu.copy']()}
      data-testid={dataTestId}
      onClick={copyLink}
    >
      <LinkIcon />
    </IconButton>
  );
};
