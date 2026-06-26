import { BlankErrorBoundary } from '@blank/core/components/blank/blank-error-boundary';
import { BlankErrorComponent } from '@blank/core/components/blank/blank-error-boundary/blank-error-fallback';
import { PageNotFound } from '@blank/core/desktop/pages/404';
import { workbenchRoutes } from '@blank/core/mobile/workbench-router';
import { ServersService } from '@blank/core/modules/cloud';
import { getOptimisticWorkspaceMeta } from '@blank/core/utils/blank-fast-boot';
import { WorkspacesService } from '@blank/core/modules/workspace';
import { FrameworkScope, useLiveData, useServices } from '@toeverything/infra';
import {
  lazy as reactLazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  matchPath,
  type RouteObject,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { WorkspaceLayout } from './layout';
import { MobileWorkbenchRoot } from './workbench-root';
import { MobileBootPlaceholder } from '../../components/boot-placeholder';

const SharePage = reactLazy(() =>
  import('@blank/core/desktop/pages/workspace/share/share-page').then(m => ({
    default: m.SharePage,
  }))
);

type Route = { Component: React.ComponentType };

const MobileRouteFallback = () => <MobileBootPlaceholder />;

/**
 * Source: core/src/modules/workbench/view/route-container.tsx
 **/
const MobileRouteContainer = ({ route }: { route: Route }) => {
  return (
    <BlankErrorBoundary>
      <Suspense fallback={<MobileRouteFallback />}>
        <route.Component />
      </Suspense>
    </BlankErrorBoundary>
  );
};

const warpedRoutes = workbenchRoutes.map((originalRoute: RouteObject) => {
  if (originalRoute.Component || !originalRoute.lazy) {
    return originalRoute;
  }

  const { path, lazy } = originalRoute;

  const Component = reactLazy(() =>
    lazy().then(m => ({
      default: m.Component as React.ComponentType,
    }))
  );
  const route = {
    Component,
  };

  return {
    path,
    Component: () => {
      return <MobileRouteContainer route={route} />;
    },
    errorElement: <BlankErrorComponent />,
  };
});

export const Component = () => {
  const { workspacesService, serversService } = useServices({
    WorkspacesService,
    ServersService,
  });

  const params = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // todo(pengx17): dedupe the code with core
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
    retryTimesRef.current = 3; // reset retry times
    workspacesService.list.revalidate();
  }, [params.workspaceId, workspacesService.list]);
  useEffect(() => {
    if (listLoading === false && effectiveMeta === undefined) {
      const timer = setInterval(() => {
        if (retryTimesRef.current > 0) {
          workspacesService.list.revalidate();
          retryTimesRef.current--;
        }
      }, 5000);
      return () => clearInterval(timer);
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

  if (workspaceNotFound) {
    if (
      BUILD_CONFIG.isMobileWeb /* only browser has share page */ &&
      detailDocRoute
    ) {
      return (
        <FrameworkScope scope={server?.scope}>
          <Suspense fallback={null}>
            <SharePage
              docId={detailDocRoute.docId}
              workspaceId={detailDocRoute.workspaceId}
            />
          </Suspense>
        </FrameworkScope>
      );
    }
    return <PageNotFound noPermission />;
  }
  if (!effectiveMeta) {
    return <MobileBootPlaceholder />;
  }
  return (
    <WorkspaceLayout meta={effectiveMeta}>
      <MobileWorkbenchRoot routes={warpedRoutes} />
    </WorkspaceLayout>
  );
};
