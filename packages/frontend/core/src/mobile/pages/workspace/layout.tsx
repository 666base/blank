import { uniReactRoot } from '@blank/component';
import { BlankErrorBoundary } from '@blank/core/components/blank/blank-error-boundary';
import { AiLoginRequiredModal } from '@blank/core/components/blank/auth/ai-login-required';
import { SWRConfigProvider } from '@blank/core/components/providers/swr-config-provider';
import { WorkspaceSideEffects } from '@blank/core/components/providers/workspace-side-effects';
import {
  DefaultServerService,
  WorkspaceServerService,
} from '@blank/core/modules/cloud';
import { GlobalContextService } from '@blank/core/modules/global-context';
import { PeekViewManagerModal } from '@blank/core/modules/peek-view';
import type {
  Workspace,
  WorkspaceMetadata,
} from '@blank/core/modules/workspace';
import { WorkspacesService } from '@blank/core/modules/workspace';
import {
  FrameworkScope,
  useServices,
} from '@toeverything/infra';
import {
  type PropsWithChildren,
  useEffect,
} from 'react';

import { WorkspaceDialogs } from '../../dialogs';
import {
  persistFastBootRoute,
} from '@blank/core/utils/blank-fast-boot';
import { ensureInstantWorkspace } from '@blank/core/utils/blank-instant-workspace';
import { useOpenedWorkspace } from '@blank/core/utils/use-opened-workspace';

// TODO(@forehalo): reuse the global context with [core/electron]
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
  interface WindowEventMap {
    'blank:workspace:change': CustomEvent<{ id: string }>;
  }
}

export const WorkspaceLayout = ({
  meta,
  children,
}: PropsWithChildren<{ meta: WorkspaceMetadata }>) => {
  // todo: reduce code duplication with packages\frontend\core\src\pages\workspace\index.tsx
  const { workspacesService, globalContextService, defaultServerService } =
    useServices({
      WorkspacesService,
      GlobalContextService,
      DefaultServerService,
    });

  const workspace = useOpenedWorkspace(workspacesService, meta);
  const workspaceServer = workspace.scope.get(WorkspaceServerService)?.server;

  useEffect(() => {
    void ensureInstantWorkspace(workspacesService, workspace);
  }, [workspace, workspacesService]);

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
      persistFastBootRoute(workspace.id, undefined, workspace.flavour);
      globalContextService.globalContext.workspaceId.set(workspace.id);
      if (workspaceServer) {
        globalContextService.globalContext.serverId.set(workspaceServer.id);
      }
      globalContextService.globalContext.workspaceFlavour.set(
        workspace.flavour
      );
      return () => {
        window.currentWorkspace = undefined;
        globalContextService.globalContext.workspaceId.set(null);
        if (workspaceServer) {
          globalContextService.globalContext.serverId.set(
            defaultServerService.server.id
          );
        }
        globalContextService.globalContext.workspaceFlavour.set(null);
      };
  }, [
    defaultServerService.server.id,
    globalContextService,
    workspace,
    workspaceServer,
  ]);

  return (
    <FrameworkScope scope={workspaceServer?.scope}>
      <FrameworkScope scope={workspace.scope}>
        <BlankErrorBoundary height="100dvh">
          <SWRConfigProvider>
            <WorkspaceDialogs />

            {/* ---- some side-effect components ---- */}
            <PeekViewManagerModal />
            <AiLoginRequiredModal />
            <uniReactRoot.Root />
            <WorkspaceSideEffects />
            {children}
          </SWRConfigProvider>
        </BlankErrorBoundary>
      </FrameworkScope>
    </FrameworkScope>
  );
};
