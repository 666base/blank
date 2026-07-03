import { DefaultServerService } from '@blank/core/modules/cloud';
import { DesktopApiService } from '@blank/core/modules/desktop-api';
import { WorkspacesService } from '@blank/core/modules/workspace';
import {
  buildShowcaseWorkspace,
  createFirstAppData,
} from '@blank/core/utils/first-app-data';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { BLANK_INSTANT_WORKSPACE_ID } from '@blank/core/utils/blank-fast-boot';
import { isLocalOnlyMode } from '@blank/core/utils/local-only';
import { isBlankSyncEnabled } from '@blank/core/utils/sync-config';
import { getDefaultWorkspaceName } from '@blank/core/utils/blank-links';
import { ServerFeature } from '@blank/graphql';
import {
  useLiveData,
  useService,
  useServiceOptional,
} from '@toeverything/infra';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  RouteLogic,
  useNavigateHelper,
} from '../../../components/hooks/use-navigate-helper';
import { WorkspaceNavigator } from '../../../components/workspace-selector';
import { AuthService } from '../../../modules/cloud';
import { AppContainer } from '../../components/app-container';

/**
 * index page
 *
 * query string:
 * - initCloud: boolean, if true, when user is logged in, create a cloud workspace
 */
export const Component = ({
  defaultIndexRoute = 'all',
  children,
  fallback,
}: {
  defaultIndexRoute?: string;
  children?: ReactNode;
  fallback?: ReactNode;
}) => {
  // navigating and creating may be slow, to avoid flickering, we show workspace fallback
  const [navigating, setNavigating] = useState(() => !isBlankBuild());
  const [creating, setCreating] = useState(false);
  const authService = useService(AuthService);
  const defaultServerService = useService(DefaultServerService);

  const loggedIn = useLiveData(
    authService.session.status$.map(s => s === 'authenticated')
  );
  const enableLocalWorkspace =
    useLiveData(
      defaultServerService.server.config$.selector(c => {
        if (isLocalOnlyMode()) {
          return true;
        }
        if (isBlankSyncEnabled()) {
          return c.features.includes(ServerFeature.LocalWorkspace);
        }
        return (
          c.features.includes(ServerFeature.LocalWorkspace) ||
          BUILD_CONFIG.isNative ||
          BUILD_CONFIG.isMobileEdition
        );
      })
    ) ?? true;

  const workspacesService = useService(WorkspacesService);
  const list = useLiveData(workspacesService.list.workspaces$);
  const listIsLoading = useLiveData(workspacesService.list.isRevalidating$);

  const { openPage, jumpToPage, jumpToSignIn } = useNavigateHelper();
  const [searchParams] = useSearchParams();

  const createOnceRef = useRef(false);
  const ensureLocalWorkspaceRef = useRef(false);

  const createCloudWorkspace = useCallback(() => {
    if (createOnceRef.current) return;
    createOnceRef.current = true;
    // TODO: support selfhosted
    buildShowcaseWorkspace(workspacesService, 'blank-cloud', 'Blank Cloud')
      .then(({ meta, defaultDocId }) => {
        if (defaultDocId) {
          jumpToPage(meta.id, defaultDocId);
        } else {
          openPage(meta.id, defaultIndexRoute);
        }
      })
      .catch(err => console.error('Failed to create cloud workspace', err));
  }, [defaultIndexRoute, jumpToPage, openPage, workspacesService]);

  useLayoutEffect(() => {
    if (isBlankBuild()) {
      openPage(BLANK_INSTANT_WORKSPACE_ID, defaultIndexRoute, RouteLogic.REPLACE);
      setNavigating(false);
      return;
    }

    if (!navigating) {
      return;
    }

    if (listIsLoading) {
      return;
    }

    if (!isLocalOnlyMode() && !enableLocalWorkspace && !loggedIn) {
      localStorage.removeItem('last_workspace_id');
      jumpToSignIn();
      return;
    }

    if (
      isBlankSyncEnabled() &&
      !loggedIn &&
      list.length === 0 &&
      !enableLocalWorkspace
    ) {
      jumpToSignIn();
      return;
    }

    // check is user logged in && has cloud workspace
    if (!isLocalOnlyMode() && searchParams.get('initCloud') === 'true') {
      if (loggedIn) {
        if (list.every(w => w.flavour !== 'blank-cloud')) {
          createCloudWorkspace();
          return;
        }

        // open first cloud workspace
        const openWorkspace =
          list.find(w => w.flavour === 'blank-cloud') ?? list[0];
        openPage(openWorkspace.id, defaultIndexRoute);
      } else {
        return;
      }
    } else {
      if (list.length === 0) {
        return;
      }
      // open last workspace
      const lastId = localStorage.getItem('last_workspace_id');

      const openWorkspace = list.find(w => w.id === lastId) ?? list[0];
      openPage(openWorkspace.id, defaultIndexRoute, RouteLogic.REPLACE);
      setNavigating(false);
    }
  }, [
    enableLocalWorkspace,
    createCloudWorkspace,
    list,
    openPage,
    searchParams,
    jumpToSignIn,
    listIsLoading,
    loggedIn,
    navigating,
    defaultIndexRoute,
  ]);

  const desktopApi = useServiceOptional(DesktopApiService);

  useEffect(() => {
    desktopApi?.handler.ui.pingAppLayoutReady().catch(console.error);
  }, [desktopApi]);

  useEffect(() => {
    if (isBlankBuild()) {
      return;
    }
    if (listIsLoading || list.length > 0 || !enableLocalWorkspace) {
      if (
        isBlankSyncEnabled() &&
        !loggedIn &&
        list.length === 0 &&
        !listIsLoading
      ) {
        jumpToSignIn();
      }
      return;
    }
    if (ensureLocalWorkspaceRef.current) {
      return;
    }
    ensureLocalWorkspaceRef.current = true;
    setCreating(true);

    (async () => {
      try {
        let createdWorkspace = await createFirstAppData(workspacesService);
        if (!createdWorkspace && isLocalOnlyMode()) {
          const { meta, defaultDocId } = await buildShowcaseWorkspace(
            workspacesService,
            'local',
            getDefaultWorkspaceName()
          );
          createdWorkspace = {
            meta,
            defaultPageId: defaultDocId,
          };
        }

        if (createdWorkspace) {
          if (createdWorkspace.defaultPageId) {
            jumpToPage(
              createdWorkspace.meta.id,
              createdWorkspace.defaultPageId
            );
          } else {
            openPage(createdWorkspace.meta.id, defaultIndexRoute);
          }
          setNavigating(false);
          return;
        }

        setNavigating(false);
      } catch (err) {
        console.error('Failed to create first app data', err);
        setNavigating(false);
      } finally {
        setCreating(false);
      }
    })().catch(console.error);
  }, [
    jumpToPage,
    openPage,
    jumpToSignIn,
    workspacesService,
    listIsLoading,
    list,
    loggedIn,
    enableLocalWorkspace,
    defaultIndexRoute,
  ]);

  if (navigating || creating) {
    return fallback ?? <AppContainer fallback />;
  }

  if (isLocalOnlyMode() && list.length === 0) {
    return fallback ?? <AppContainer fallback />;
  }

  // TODO(@eyhn): We need a no workspace page
  return (
    children ?? (
      <div
        style={{
          position: 'fixed',
          left: 'calc(50% - 150px)',
          top: '50%',
        }}
      >
        <WorkspaceNavigator
          open={true}
          menuContentOptions={{
            forceMount: true,
          }}
        />
      </div>
    )
  );
};
