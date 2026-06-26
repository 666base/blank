import { type DropTargetDropEvent, useDropTarget } from '@blank/component';
import type { BlankDNDData } from '@blank/core/types/dnd';
import { useI18n } from '@blank/i18n';

import { EmptyNodeChildren } from '../../layouts/empty-node-children';

export const Empty = ({
  onDrop,
  noAccessible = false,
}: {
  onDrop: (data: DropTargetDropEvent<BlankDNDData>) => void;
  noAccessible?: boolean;
}) => {
  const { dropTargetRef } = useDropTarget<BlankDNDData>(
    () => ({
      onDrop,
    }),
    [onDrop]
  );
  const t = useI18n();

  return (
    <EmptyNodeChildren ref={dropTargetRef}>
      {noAccessible
        ? t['com.blank.share-menu.option.permission.no-access']()
        : t['com.blank.rootAppSidebar.docs.no-subdoc']()}
    </EmptyNodeChildren>
  );
};
