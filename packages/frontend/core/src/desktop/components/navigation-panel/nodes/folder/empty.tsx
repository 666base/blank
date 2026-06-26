import {
  type DropTargetDropEvent,
  type DropTargetOptions,
  useDropTarget,
} from '@blank/component';
import type { BlankDNDData } from '@blank/core/types/dnd';
import { useI18n } from '@blank/i18n';

import { EmptyNodeChildren } from '../../layouts/empty-node-children';
import { draggedOverHighlight } from './empty.css';

export const FolderEmpty = ({
  canDrop,
  onDrop,
}: {
  onDrop?: (data: DropTargetDropEvent<BlankDNDData>) => void;
  canDrop?: DropTargetOptions<BlankDNDData>['canDrop'];
}) => {
  const { dropTargetRef } = useDropTarget(
    () => ({
      onDrop,
      canDrop,
    }),
    [onDrop, canDrop]
  );

  const t = useI18n();
  return (
    <EmptyNodeChildren ref={dropTargetRef} className={draggedOverHighlight}>
      {t['com.blank.rootAppSidebar.organize.empty-folder']()}
    </EmptyNodeChildren>
  );
};
