import { type DropTargetDropEvent, useDropTarget } from '@blank/component';
import type { BlankDNDData } from '@blank/core/types/dnd';
import { useI18n } from '@blank/i18n';

import { EmptyNodeChildren } from '../../layouts/empty-node-children';

export const Empty = ({
  onDrop,
}: {
  onDrop: (data: DropTargetDropEvent<BlankDNDData>) => void;
}) => {
  const { dropTargetRef } = useDropTarget(
    () => ({
      onDrop,
    }),
    [onDrop]
  );
  const t = useI18n();
  return (
    <EmptyNodeChildren ref={dropTargetRef}>
      {t['com.blank.rootAppSidebar.tags.no-doc']()}
    </EmptyNodeChildren>
  );
};
