import { DNDContext } from '@blank/component';
import { BlankOtherPageLayout } from '@blank/component/blank-other-page-layout';
import { workbenchRoutes } from '@blank/core/desktop/workbench-router';
import {
  DefaultServerService,
  ServersService,
} from '@blank/core/modules/cloud';
import { GlobalDialogService } from '@blank/core/modules/dialogs';
import { DndService } from '@blank/core/modules/dnd/services';
import { GlobalContextService } from '@blank/core/modules/global-context';
import { OpenInAppGuard } from '@blank/core/modules/open-in-app';
import {
  type Workspace,
  type WorkspaceMetadata,
  WorkspacesService,
} from '@blank/core/modules/workspace';
import { ensureBlankWorkspaceSchema } from '@blank/core/modules/workspace/global-schema';
import {
  BLANK_INSTANT_WORKSPACE_ID,
  getOptimisticWorkspaceMeta,
  isInstantBootEnabled,
  persistFastBootRoute,
} from '@blank/core/utils/blank-fast-boot';
import { ensureInstantWorkspace } from '@blank/core/utils/blank-instant-workspace';
import { useOpenedWorkspace } from '@blank/core/utils/use-opened-workspace';
import {
  FrameworkScope,
  LiveData,
  useLiveData,
  useService,
  useServices,
} from '@toeverything/infra';
import type { PropsWithChildren, ReactElement } from 'react';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  matchPath,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { map } from 'rxjs';
import * as _Y from 'yjs';

import { BlankErrorBoundary } from '../../../components/blank/blank-error-boundary';
import { WorkbenchRoot } from '../../../modules/workbench';
import { AppContainer } from '../../components/app-container';
import { PageNotFound } from '../404';
import { WorkspaceLayout } from './layouts/workspace-layout';

const SharePage = lazy(() =>
  import('./share/share-page').then(m => ({ default: m.SharePage }))
);

declare global {
  /**
   * @internal debug only
   */
  // oxlint-disable-next-line no-var
  var currentWorkspace: Workspace | undefined;
  // oxlint-disable-next-line no-var
  var exportWorkspaceSnapshot: (docs?: string[]) => Promise<void>;
  // oxlint-disable-next-line no-var
  var importWorkspaceSnapshot: () => Promise<void>;
  // oxlint-disable-next-line no-var
  var Y: typeof _Y;
  interface WindowEventMap {
    'blank:workspace:change': CustomEvent<{ id: string }>;
  }
}

globalThis.Y = _Y;

export const Component = (): ReactElement => {
  const {
    workspacesService,
    globalDialogService,
    serversService,
    defaultServerService,
    globalContextService,
  } = useServices({
    WorkspacesService,
    GlobalDialogService,
    ServersService,
    DefaultServerService,
    GlobalContextService,
  });

  const params = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // check if we are in detail doc route, if so, maybe render share page
  const detailDocRoute = useMemo(() => {
    const match = matchPath(
      '/workspace/:workspaceId/:docId',
      location.pathname
    );
    if (
      match &&
      match.params.docId &&
      match.params.workspaceId &&
      // TODO(eyhn): need a better way to check if it's a docId
      workbenchRoutes.find(route =>
        matchPath(route.path, '/' + match.params.docId)
      )?.path === '/:pageId'
    ) {
      return {
        docId: match.params.docId,
        workspaceId: match.params.workspaceId,
      };
    } else {
      return null;
    }
  }, [location.pathname]);

  const [workspaceNotFound, setWorkspaceNotFound] = useState(false);
  const listLoading = useLiveData(workspacesService.list.isRevalidating$);
  const workspaces = useLiveData(workspacesService.list.workspaces$);
  const meta = useMemo(() => {
    return workspaces.find(({ id }) => id === params.workspaceId);
  }, [workspaces, params.workspaceId]);

  const effectiveMeta = useMemo(() => {
    if (meta) {
      return meta;
    }
    return getOptimisticWorkspaceMeta(params.workspaceId) ?? undefined;
  }, [meta, params.workspaceId]);

  // if listLoading is false, we can show 404 page, otherwise we should show loading page.
  useEffect(() => {
    if (listLoading === false && effectiveMeta === undefined) {
      setWorkspaceNotFound(true);
    }
    if (effectiveMeta) {
      setWorkspaceNotFound(false);
    }
  }, [listLoading, effectiveMeta, workspacesService]);

  // if workspace is not found, we should retry
  const retryTimesRef = useRef(3);
  useEffect(() => {
    if (params.workspaceId) {
      retryTimesRef.current = 3; // reset retry times
      workspacesService.list.revalidate();
    }
  }, [params.workspaceId, workspacesService]);
  useEffect(() => {
    if (listLoading === false && effectiveMeta === undefined) {
      const timer = setTimeout(() => {
        if (retryTimesRef.current > 0) {
          workspacesService.list.revalidate();
          retryTimesRef.current--;
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
    return;
  }, [listLoading, effectiveMeta, workspaceNotFound, workspacesService]);

  // server search params
  const serverFromSearchParams = useLiveData(
    searchParams.has('server')
      ? serversService.serverByBaseUrl$(searchParams.get('server') as string)
      : undefined
  );
  // server from workspace
  const serverFromWorkspace = useLiveData(
    effectiveMeta?.flavour && effectiveMeta.flavour !== 'local'
      ? serversService.server$(effectiveMeta?.flavour)
      : undefined
  );
  const server = serverFromWorkspace ?? serverFromSearchParams;

  useEffect(() => {
    if (server) {
      globalContextService.globalContext.serverId.set(server.id);
      return () => {
        globalContextService.globalContext.serverId.set(
          defaultServerService.server.id
        );
      };
    }
    return;
  }, [
    defaultServerService.server.id,
    globalContextService.globalContext.serverId,
    server,
  ]);

  // if server is not found, and we have server in search params, we should show add selfhosted dialog
  const needAddSelfhosted = server === undefined && searchParams.has('server');
  // use ref to avoid useEffect trigger twice
  const addSelfhostedDialogOpened = useRef<boolean>(false);

  useEffect(() => {
    if (addSelfhostedDialogOpened.current) {
      return;
    }
    addSelfhostedDialogOpened.current = true;
    if (BUILD_CONFIG.isElectron && needAddSelfhosted) {
      globalDialogService.open('sign-in', {
        server: searchParams.get('server') as string,
      });
    }
    return;
  }, [
    globalDialogService,
    needAddSelfhosted,
    searchParams,
    serverFromSearchParams,
  ]);

  if (workspaceNotFound) {
    if (detailDocRoute) {
      return (
        <FrameworkScope scope={server?.scope}>
          <Suspense fallback={<AppContainer fallback />}>
            <SharePage
              docId={detailDocRoute.docId}
              workspaceId={detailDocRoute.workspaceId}
            />
          </Suspense>
        </FrameworkScope>
      );
    }
    return (
      <FrameworkScope scope={server?.scope}>
        <BlankOtherPageLayout>
          <PageNotFound noPermission />
        </BlankOtherPageLayout>
      </FrameworkScope>
    );
  }
  if (!effectiveMeta) {
    if (
      isInstantBootEnabled() &&
      params.workspaceId === BLANK_INSTANT_WORKSPACE_ID
    ) {
      return <AppContainer />;
    }
    return <AppContainer fallback />;
  }

  return (
    <FrameworkScope scope={server?.scope}>
      <WorkspacePage meta={effectiveMeta} />
    </FrameworkScope>
  );
};

const DNDContextProvider = ({ children }: PropsWithChildren) => {
  const dndService = useService(DndService);
  const contextValue = useMemo(() => {
    return {
      fromExternalData: dndService.fromExternalData,
      toExternalData: dndService.toExternalData,
    };
  }, [dndService.fromExternalData, dndService.toExternalData]);
  return (
    <DNDContext.Provider value={contextValue}>{children}</DNDContext.Provider>
  );
};

const WorkspacePage = ({ meta }: { meta: WorkspaceMetadata }) => {
  const { workspacesService, globalContextService } = useServices({
    WorkspacesService,
    GlobalContextService,
  });

  const workspace = useOpenedWorkspace(workspacesService, meta);

  useEffect(() => {
      // for debug purpose
      window.currentWorkspace = workspace ?? undefined;
      window.dispatchEvent(
        new CustomEvent('blank:workspace:change', {
          detail: {
            id: workspace.id,
          },
        })
      );
      window.exportWorkspaceSnapshot = async (docs?: string[]) => {
        const { ZipTransformer } = await import(
          '@blocksuite/blank/widgets/linked-doc'
        );
        const schema = await ensureBlankWorkspaceSchema();
        await ZipTransformer.exportDocs(
          workspace.docCollection,
          schema,
          Array.from(workspace.docCollection.docs.values())
            .filter(doc => (docs ? docs.includes(doc.id) : true))
            .map(doc => doc.getStore())
        );
      };
      window.importWorkspaceSnapshot = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.zip';
        input.onchange = async () => {
          if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const blob = new Blob([file], { type: 'application/zip' });
            const { ZipTransformer } = await import(
              '@blocksuite/blank/widgets/linked-doc'
            );
            const schema = await ensureBlankWorkspaceSchema();
            const newDocs = await ZipTransformer.importDocs(
              workspace.docCollection,
              schema,
              blob
            );
            console.log(
              'imported docs',
              newDocs
                .filter(doc => !!doc)
                .map(doc => ({
                  id: doc.id,
                  title: doc.meta?.title,
                }))
            );
          }
        };
        input.click();
      };
      persistFastBootRoute(workspace.id, undefined, workspace.flavour);
      void ensureInstantWorkspace(workspacesService, workspace);
      globalContextService.globalContext.workspaceId.set(workspace.id);
      globalContextService.globalContext.workspaceFlavour.set(
        workspace.flavour
      );
      return () => {
        window.currentWorkspace = undefined;
        globalContextService.globalContext.workspaceId.set(null);
        globalContextService.globalContext.workspaceFlavour.set(null);
      };
  }, [globalContextService, workspace, workspacesService]);

  return (
    <FrameworkScope scope={workspace.scope}>
      <DNDContextProvider>
        <OpenInAppGuard>
          <BlankErrorBoundary height="100vh">
            <WorkspaceLayout>
              <WorkbenchRoot />
            </WorkspaceLayout>
          </BlankErrorBoundary>
        </OpenInAppGuard>
      </DNDContextProvider>
    </FrameworkScope>
  );
};
