import { DocSummaryService } from '@blank/core/modules/doc-summary';
import { DocsService } from '@blank/core/modules/doc';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { readDocSnapshotSync } from '@blank/core/utils/blank-doc-snapshot';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { LiveData, useLiveData, useServiceOptional } from '@toeverything/infra';
import { useMemo } from 'react';
import { EMPTY } from 'rxjs';

import * as styles from './cached-detail-page-loading.css';

const EMPTY_TITLE$ = LiveData.from(EMPTY, '');

const DocLoadingSkeleton = () => (
  <div className={styles.cachedContainer} data-cached-doc-snapshot="skeleton">
    <div className={styles.skeletonTitle} />
    <div className={styles.skeletonLine} />
    <div className={styles.skeletonLine} />
    <div className={styles.skeletonLineShort} />
  </div>
);

export const CachedDetailPageLoading = ({ pageId }: { pageId: string }) => {
  const workspaceService = useServiceOptional(WorkspaceService);
  const workspaceId = workspaceService?.workspace.id;
  const docsService = useServiceOptional(DocsService);
  const docRecord = useLiveData(docsService?.list.doc$(pageId));
  const titleFromRecord = useLiveData(docRecord?.title$ ?? EMPTY_TITLE$);
  const docSummary = useServiceOptional(DocSummaryService);
  const summaryFromIndexer = useLiveData(
    useMemo(
      () => docSummary ? LiveData.from(docSummary.watchDocSummary(pageId), null) : undefined,
      [docSummary, pageId]
    )
  );

  const cached = useMemo(
    () => workspaceId ? readDocSnapshotSync(workspaceId, pageId) : null,
    [workspaceId, pageId]
  );

  const title = titleFromRecord || cached?.title || '';
  const preview =
    (typeof summaryFromIndexer === 'string' && summaryFromIndexer) ||
    cached?.preview ||
    '';

  if (!title && !preview) {
    if (isBlankBuild() && BUILD_CONFIG.isMobileEdition) {
      return null;
    }
    return <DocLoadingSkeleton />;
  }

  return (
    <div className={styles.cachedContainer} data-cached-doc-snapshot="true">
      {title ? <h1 className={styles.cachedTitle}>{title}</h1> : null}
      {preview ? <p className={styles.cachedPreview}>{preview}</p> : null}
    </div>
  );
};
