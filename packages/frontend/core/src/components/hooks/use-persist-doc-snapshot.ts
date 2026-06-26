import { getPagePreviewText } from '@blank/core/components/page-list/use-block-suite-page-preview';
import type { Doc } from '@blank/core/modules/doc';
import { persistDocSnapshot } from '@blank/core/utils/blank-doc-snapshot';
import { useLiveData } from '@toeverything/infra';
import { useEffect } from 'react';

export function usePersistDocSnapshot(
  workspaceId: string,
  doc: Doc | null | undefined
) {
  const title = useLiveData(doc?.title$);

  useEffect(() => {
    if (!doc) {
      return;
    }
    const page = doc.blockSuiteDoc;
    const persist = () => {
      persistDocSnapshot(workspaceId, doc.id, {
        title: doc.title$.value,
        preview: getPagePreviewText(page),
      });
    };
    persist();
    const disposable = page.slots.blockUpdated.subscribe(persist);
    return () => disposable.unsubscribe();
  }, [doc, workspaceId, title]);
}
