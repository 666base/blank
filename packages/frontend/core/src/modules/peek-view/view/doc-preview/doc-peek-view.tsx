import { Scrollable } from '@blank/component';
import { CachedDetailPageLoading } from '@blank/core/components/cached-detail-page-loading';
import { preloadBlockSuiteEditor } from '@blank/core/blocksuite/preload-block-suite-editor';
import type { BlankEditorContainer } from '@blank/core/blocksuite/block-suite-editor';
import { EditorOutlineViewer } from '@blank/core/blocksuite/outline-viewer';
import { BlankErrorBoundary } from '@blank/core/components/blank/blank-error-boundary';
import { useGuard } from '@blank/core/components/guard';
import { PageNotFound } from '@blank/core/desktop/pages/404';
import { isDocEditBlocked } from '@blank/core/modules/permissions';
import { DebugLogger } from '@blank/debug';
import { DisposableGroup } from '@blocksuite/blank/global/disposable';
import { Bound } from '@blocksuite/blank/global/gfx';
import { RefNodeSlotsProvider } from '@blocksuite/blank/inlines/reference';
import { GfxControllerIdentifier } from '@blocksuite/blank/std/gfx';
import {
  FrameworkScope,
  useLiveData,
  useService,
  useServices,
} from '@toeverything/infra';
import clsx from 'clsx';
import { lazy, Suspense, useCallback, useEffect } from 'react';

import { WorkbenchService } from '../../../workbench/services/workbench';
import type { DocReferenceInfo } from '../../entities/peek-view';
import { PeekViewService } from '../../services/peek-view';
import { useEditor } from '../utils';
import * as styles from './doc-peek-view.css';

const logger = new DebugLogger('doc-peek-view');

// Lazy load BlockSuiteEditor to break circular dependency
const BlockSuiteEditor = lazy(() =>
  preloadBlockSuiteEditor().then(module => ({
    default: module.BlockSuiteEditor,
  }))
);

function fitViewport(
  editor: BlankEditorContainer,
  xywh?: `[${number},${number},${number},${number}]`
) {
  try {
    if (!editor.host) {
      throw new Error('editor host is not ready');
    }

    const gfx = editor.host.std.get(GfxControllerIdentifier);
    const viewport = gfx.viewport;
    viewport.onResize();

    if (xywh) {
      const newViewport = {
        xywh: xywh,
        padding: [60, 20, 20, 20] as [number, number, number, number],
      };
      viewport.setViewportByBound(
        Bound.deserialize(newViewport.xywh),
        newViewport.padding,
        false
      );
    } else {
      gfx.fitToScreen({
        smooth: false,
      });
    }
  } catch (e) {
    logger.warn('failed to fitViewPort', e);
  }
}

function DocPeekPreviewEditor({
  xywh,
}: {
  xywh?: `[${number},${number},${number},${number}]`;
}) {
  const { editorService } = useServices({
    EditorService,
  });
  const editor = editorService.editor;
  const doc = editor.doc;
  const workspace = editor.doc.workspace;
  const mode = useLiveData(editor.mode$);
  const defaultOpenProperty = useLiveData(editor.defaultOpenProperty$);
  const workbench = useService(WorkbenchService).workbench;
  const peekView = useService(PeekViewService).peekView;
  const editorElement = useLiveData(editor.editorContainer$);

  const isInTrash = useLiveData(doc.record.trash$);

  const handleOnEditorReady = useCallback(
    (editorContainer: BlankEditorContainer) => {
      const disposableGroup = new DisposableGroup();
      const refNodeSlots =
        editorContainer.std.getOptional(RefNodeSlotsProvider);
      if (!refNodeSlots) return;
      // doc change event inside peek view should be handled by peek view
      disposableGroup.add(
        // todo(@pengx17): seems not working
        refNodeSlots.docLinkClicked.subscribe(options => {
          if (options.host !== editorContainer.host) {
            return;
          }
          peekView
            .open({
              docRef: { docId: options.pageId },
              ...options.params,
            })
            .catch(console.error);
        })
      );

      const unbind = editor.bindEditorContainer(editorContainer);

      if (mode === 'edgeless') {
        fitViewport(editorContainer, xywh);
      }

      return () => {
        unbind();
        disposableGroup.dispose();
      };
    },
    [editor, mode, peekView, xywh]
  );

  const openOutlinePanel = useCallback(() => {
    workbench.openDoc(doc.id);
    workbench.openSidebar();
    workbench.activeView$.value.activeSidebarTab('outline');
    peekView.close();
  }, [doc, peekView, workbench]);

  const canEdit = useGuard('Doc_Update', doc.id);

  const readonly = isDocEditBlocked(canEdit) || isInTrash;

  useEffect(() => {
    preloadBlockSuiteEditor();
  }, []);

  return (
    <BlankErrorBoundary>
      <Scrollable.Root>
        <Scrollable.Viewport
          className={clsx('blank-page-viewport', styles.blankDocViewport)}
        >
          <Suspense fallback={<CachedDetailPageLoading pageId={doc.id} />}>
            <BlockSuiteEditor
              className={styles.editor}
              mode={mode}
              page={doc.blockSuiteDoc}
              readonly={readonly}
              onEditorReady={handleOnEditorReady}
              defaultOpenProperty={defaultOpenProperty}
            />
          </Suspense>
        </Scrollable.Viewport>
        <Scrollable.Scrollbar />
      </Scrollable.Root>
      {!BUILD_CONFIG.isMobileEdition && !BUILD_CONFIG.isMobileWeb ? (
        <EditorOutlineViewer
          editor={editorElement?.host ?? null}
          show={mode === 'page'}
          openOutlinePanel={openOutlinePanel}
        />
      ) : null}
    </BlankErrorBoundary>
  );
}

export function DocPeekPreview({
  docRef,
  animating,
}: {
  docRef: DocReferenceInfo;
  animating?: boolean;
}) {
  const {
    docId,
    blockIds,
    elementIds,
    mode,
    xywh,
    databaseId,
    databaseDocId,
    databaseRowId,
  } = docRef;
  const { doc, editor, loading } = useEditor(
    docId,
    mode,
    {
      blockIds,
      elementIds,
    },
    databaseId && databaseRowId && databaseDocId
      ? {
          docId: databaseDocId,
          databaseId,
          databaseRowId,
          type: 'database',
        }
      : undefined,
    !animating
  );

  const canAccess = useGuard('Doc_Read', docId);

  // if sync engine has been synced and the page is null, show 404 page.
  if (!doc || !editor || !canAccess) {
    return loading || canAccess === undefined ? (
      <CachedDetailPageLoading key="current-page-is-null" pageId={docId} />
    ) : (
      <PageNotFound noPermission />
    );
  }

  return (
    <FrameworkScope scope={doc.scope}>
      <FrameworkScope scope={editor.scope}>
        <DocPeekPreviewEditor xywh={xywh} />
      </FrameworkScope>
    </FrameworkScope>
  );
}
