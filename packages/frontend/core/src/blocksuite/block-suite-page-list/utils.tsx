import { toast } from '@blank/component';
import { AppSidebarService } from '@blank/core/modules/app-sidebar';
import { DocsService } from '@blank/core/modules/doc';
import {
  EditorSettingService,
  resolveNewDocTitle,
} from '@blank/core/modules/editor-setting';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { type DocMode } from '@blocksuite/blank/model';
import type { Workspace } from '@blocksuite/blank/store';
import { LiveData, useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';

async function getStoreExtensions() {
  const { getStoreManager } = await import('@blank/core/blocksuite/manager/store');
  return getStoreManager().config.init().value.get('store');
}

export const usePageHelper = (docCollection: Workspace) => {
  const {
    docsService,
    workbenchService,
    appSidebarService,
    editorSettingService,
  } = useServices({
    DocsService,
    WorkbenchService,
    AppSidebarService,
    EditorSettingService,
  });
  const workbench = workbenchService.workbench;
  const docRecordList = docsService.list;
  const appSidebar = appSidebarService.sidebar;
  const settings = useLiveData(editorSettingService.editorSetting.settings$);
  const allDocTitles = useLiveData(
    useMemo(() => LiveData.from(docsService.allDocTitle$(), []), [docsService])
  );

  const autoTitleNewDocWithCurrentDate =
    settings?.autoTitleNewDocWithCurrentDate ?? false;
  const newDocDateTitleFormat = settings?.newDocDateTitleFormat ?? 'DD-MM-YYYY';

  const createBlankDoc = useCallback(() => {
    const title = resolveNewDocTitle({
      autoTitleEnabled: autoTitleNewDocWithCurrentDate,
      existingTitles: allDocTitles.map(doc => doc.title).filter(Boolean),
      format: newDocDateTitleFormat,
    });

    return docsService.createDoc(title ? { title } : undefined);
  }, [
    allDocTitles,
    autoTitleNewDocWithCurrentDate,
    docsService,
    newDocDateTitleFormat,
  ]);

  const createPageAndOpen = useCallback(
    (
      mode?: DocMode,
      options: {
        at?: 'new-tab' | 'tail' | 'active';
        show?: boolean;
      } = {
        at: 'active',
        show: true,
      }
    ) => {
      appSidebar.setHovering(false);
      const page = createBlankDoc();

      if (mode) {
        docRecordList.doc$(page.id).value?.setPrimaryMode(mode);
      }

      if (options.show !== false) {
        workbench.openDoc(page.id, {
          at: options.at,
          show: options.show,
        });
      }
      return page;
    },
    [appSidebar, createBlankDoc, docRecordList, workbench]
  );

  const createEdgelessAndOpen = useCallback(
    (
      options: { at?: 'new-tab' | 'tail' | 'active'; show?: boolean } = {
        at: 'active',
        show: true,
      }
    ) => {
      return createPageAndOpen('edgeless', options);
    },
    [createPageAndOpen]
  );

  const importFileAndOpen = useMemo(
    () => async () => {
      const { showImportModal } =
        await import('@blocksuite/blank/widgets/linked-doc');
      const { promise, resolve, reject } =
        Promise.withResolvers<
          Parameters<
            NonNullable<Parameters<typeof showImportModal>[0]['onSuccess']>
          >[1]
        >();
      const onSuccess = (
        pageIds: string[],
        options: { isWorkspaceFile: boolean; importedCount: number }
      ) => {
        resolve(options);
        toast(
          `Successfully imported ${options.importedCount} Page${
            options.importedCount > 1 ? 's' : ''
          }.`
        );
        if (options.isWorkspaceFile) {
          workbench.openAll();
          return;
        }

        if (pageIds.length === 0) {
          return;
        }
        const pageId = pageIds[0];
        workbench.openDoc(pageId);
      };
      const { ensureBlankWorkspaceSchema } = await import(
        '@blank/core/modules/workspace/global-schema'
      );
      showImportModal({
        collection: docCollection,
        schema: await ensureBlankWorkspaceSchema(),
        extensions: await getStoreExtensions(),
        onSuccess,
        onFail: message => {
          reject(new Error(message));
        },
      });
      return await promise;
    },
    [docCollection, workbench]
  );

  return useMemo(() => {
    return {
      createPage: (
        mode?: DocMode,
        options?: {
          at?: 'new-tab' | 'tail' | 'active';
          show?: boolean;
        }
      ) => createPageAndOpen(mode, options),
      createEdgeless: createEdgelessAndOpen,
      importFile: importFileAndOpen,
    };
  }, [createEdgelessAndOpen, createPageAndOpen, importFileAndOpen]);
};
