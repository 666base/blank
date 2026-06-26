import type { BlankTextAttributes } from '@blocksuite/blank/shared/types';
import {
  type DeltaInsert,
  Text,
  type Workspace,
} from '@blocksuite/blank/store';
import { useCallback } from 'react';

export function useReferenceLinkHelper(docCollection: Workspace) {
  const addReferenceLink = useCallback(
    (pageId: string, referenceId: string) => {
      const page = docCollection?.getDoc(pageId)?.getStore();
      if (!page) {
        return;
      }
      const text = new Text([
        {
          insert: ' ',
          attributes: {
            reference: {
              type: 'Subpage',
              pageId: referenceId,
            },
          },
        },
      ] as DeltaInsert<BlankTextAttributes>[]);
      const [frame] = page.getModelsByFlavour('blank:note');

      frame && page.addBlock('blank:paragraph', { text }, frame.id);
    },
    [docCollection]
  );

  return {
    addReferenceLink,
  };
}
