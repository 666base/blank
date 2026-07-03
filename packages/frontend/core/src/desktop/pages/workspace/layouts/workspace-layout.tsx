import { uniReactRoot } from '@blank/component';
import { useResponsiveSidebar } from '@blank/core/components/hooks/use-responsive-siedebar';
import { SWRConfigProvider } from '@blank/core/components/providers/swr-config-provider';
import { WorkspaceSideEffects } from '@blank/core/components/providers/workspace-side-effects';
import { AppContainer } from '@blank/core/desktop/components/app-container';
import { DocumentTitle } from '@blank/core/desktop/components/document-title';
import { WorkspaceDialogs } from '@blank/core/desktop/dialogs';
import { QuotaCheck } from '@blank/core/modules/quota';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { lazy, Suspense, type PropsWithChildren, useEffect } from 'react';

import { preloadBlockSuiteEditor } from '@blank/core/blocksuite/preload-block-suite-editor';

const PeekViewManagerModal = lazy(() =>
  import('@blank/core/modules/peek-view').then(m => ({
    default: m.PeekViewManagerModal,
  }))
);

export const WorkspaceLayout = function WorkspaceLayout({
  children,
}: PropsWithChildren) {
  const currentWorkspace = useService(WorkspaceService).workspace;
  useEffect(() => {
    const run = () => { preloadBlockSuiteEditor().catch(console.error); };
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(run, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const timer = window.setTimeout(run, 0);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <SWRConfigProvider>
      <WorkspaceDialogs />

      {/* ---- some side-effect components ---- */}
      {currentWorkspace?.flavour !== 'local' ? (
        <QuotaCheck workspaceMeta={currentWorkspace.meta} />
      ) : null}
      <WorkspaceSideEffects />
      <Suspense fallback={null}>
        <PeekViewManagerModal />
      </Suspense>
      <DocumentTitle />

      <WorkspaceLayoutInner>{children}</WorkspaceLayoutInner>
      <uniReactRoot.Root />
    </SWRConfigProvider>
  );
};

/**
 * Wraps the workspace layout main router view
 */
const WorkspaceLayoutUIContainer = ({ children }: PropsWithChildren) => {
  const workbench = useService(WorkbenchService).workbench;
  const currentPath = useLiveData(
    LiveData.computed(get => {
      return get(workbench.basename$) + get(workbench.location$).pathname;
    })
  );
  useResponsiveSidebar();

  return (
    <AppContainer data-current-path={currentPath}>{children}</AppContainer>
  );
};
const WorkspaceLayoutInner = ({ children }: PropsWithChildren) => {
  return <WorkspaceLayoutUIContainer>{children}</WorkspaceLayoutUIContainer>;
};
