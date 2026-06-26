import type {
  Workspace,
  WorkspaceMetadata,
  WorkspacesService,
} from '../modules/workspace';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type WorkspaceOpenRef = ReturnType<WorkspacesService['open']>;

/** Open workspace during render so the first paint is real UI, not a placeholder. */
export function useOpenedWorkspace(
  workspacesService: WorkspacesService,
  meta: WorkspaceMetadata
): Workspace {
  const [reloadRevision, setReloadRevision] = useState(0);
  const cacheRef = useRef<{
    metaId: string;
    reloadRevision: number;
    openRef: WorkspaceOpenRef;
  } | null>(null);
  const pendingDisposeRef = useRef<WorkspaceOpenRef | null>(null);

  useEffect(() => {
    const onReload = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      if (detail?.id === meta.id) {
        setReloadRevision(revision => revision + 1);
      }
    };
    window.addEventListener('blank:workspace:reload', onReload);
    return () => window.removeEventListener('blank:workspace:reload', onReload);
  }, [meta.id]);

  if (
    !cacheRef.current ||
    cacheRef.current.metaId !== meta.id ||
    cacheRef.current.reloadRevision !== reloadRevision
  ) {
    if (reloadRevision > 0) {
      workspacesService.evictWorkspace(meta.id);
    }
    pendingDisposeRef.current = cacheRef.current?.openRef ?? null;
    cacheRef.current = {
      metaId: meta.id,
      reloadRevision,
      openRef: workspacesService.open({ metadata: meta }),
    };
  }

  useLayoutEffect(() => {
    pendingDisposeRef.current?.dispose();
    pendingDisposeRef.current = null;
  });

  useEffect(() => {
    return () => {
      pendingDisposeRef.current?.dispose();
      pendingDisposeRef.current = null;
      cacheRef.current?.openRef.dispose();
      cacheRef.current = null;
    };
  }, []);

  return cacheRef.current.openRef.workspace;
}
