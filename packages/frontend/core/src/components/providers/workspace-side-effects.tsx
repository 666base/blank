import { toast } from '@blank/component';
import {
  pushGlobalLoadingEventAtom,
  resolveGlobalLoadingEventAtom,
} from '@blank/component/global-loading';
import { useRegisterFindInPageCommands } from '@blank/core/components/hooks/blank/use-register-find-in-page-commands';
import { useRegisterWorkspaceCommands } from '@blank/core/components/hooks/use-register-workspace-commands';
import { OverCapacityNotification } from '@blank/core/components/over-capacity';
import { DocsService } from '@blank/core/modules/doc';
import { EditorSettingService } from '@blank/core/modules/editor-setting';
import { useRegisterNavigationCommands } from '@blank/core/modules/navigation/view/use-register-navigation-commands';
import { QuickSearchContainer } from '@blank/core/modules/quicksearch';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { useI18n } from '@blank/i18n';
import type { DocMode } from '@blocksuite/blank/model';
import {
  effect,
  fromPromise,
  onStart,
  throwIfAborted,
  useService,
  useServices,
} from '@toeverything/infra';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { catchError, EMPTY, finalize, switchMap, tap, timeout } from 'rxjs';

/**
 * @deprecated just for legacy code, will be removed in the future
 */
export const WorkspaceSideEffects = () => {
  const t = useI18n();
  const pushGlobalLoadingEvent = useSetAtom(pushGlobalLoadingEventAtom);
  const resolveGlobalLoadingEvent = useSetAtom(resolveGlobalLoadingEventAtom);
  const { workspaceService, docsService } = useServices({
    WorkspaceService,
    DocsService,
    EditorSettingService,
  });
  const currentWorkspace = workspaceService.workspace;
  const docsList = docsService.list;

  const workbench = useService(WorkbenchService).workbench;
  useEffect(() => {
    const insertTemplate = effect(
      switchMap(({ template, mode }: { template: string; mode: string }) => {
        return fromPromise(async abort => {
          const [{ ZipTransformer }, { ensureBlankWorkspaceSchema }] =
            await Promise.all([
              import('@blocksuite/blank/widgets/linked-doc'),
              import('@blank/core/modules/workspace/global-schema'),
            ]);
          const templateZip = await fetch(template, { signal: abort });
          const templateBlob = await templateZip.blob();
          throwIfAborted(abort);
          const schema = await ensureBlankWorkspaceSchema();
          const [doc] = await ZipTransformer.importDocs(
            currentWorkspace.docCollection,
            schema,
            templateBlob
          );
          if (doc) {
            doc.resetHistory();
          }

          return { doc, mode };
        }).pipe(
          timeout(10000 /* 10s */),
          tap(({ mode, doc }) => {
            if (doc) {
              docsList.setPrimaryMode(doc.id, mode as DocMode);
              workbench.openDoc(doc.id);
            }
          }),
          onStart(() => {
            pushGlobalLoadingEvent({
              key: 'insert-template',
            });
          }),
          catchError(err => {
            console.error(err);
            toast(t['com.blank.ai.template-insert.failed']());
            return EMPTY;
          }),
          finalize(() => {
            resolveGlobalLoadingEvent('insert-template');
          })
        );
      })
    );

    return () => {
      insertTemplate.unsubscribe();
    };
  }, [
    currentWorkspace.docCollection,
    docsList,
    pushGlobalLoadingEvent,
    resolveGlobalLoadingEvent,
    t,
    workbench,
  ]);

  useRegisterWorkspaceCommands();
  useRegisterNavigationCommands();
  useRegisterFindInPageCommands();

  return (
    <>
      <QuickSearchContainer />
      <OverCapacityNotification />
    </>
  );
};
