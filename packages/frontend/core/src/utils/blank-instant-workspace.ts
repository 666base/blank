import { DocsService } from '../modules/doc';
import type { Workspace, WorkspacesService } from '../modules/workspace';
import {
  getLocalWorkspaceIds,
  setLocalWorkspaceIds,
} from '../modules/workspace-engine/impls/local';
import { getDefaultWorkspaceName } from './blank-links';
import {
  BLANK_INSTANT_WORKSPACE_FLAVOUR,
  BLANK_INSTANT_WORKSPACE_ID,
  isInstantBootEnabled,
  persistFastBootRoute,
} from './blank-fast-boot';

let bootstrapPromise: Promise<void> | null = null;

/** Create the default local workspace + welcome doc on first open (background). */
export function ensureInstantWorkspace(
  workspacesService: WorkspacesService,
  workspace: Workspace
): Promise<void> {
  if (!isInstantBootEnabled()) {
    return Promise.resolve();
  }
  if (workspace.id !== BLANK_INSTANT_WORKSPACE_ID) {
    return Promise.resolve();
  }
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    const ids = getLocalWorkspaceIds();
    if (!ids.includes(workspace.id)) {
      setLocalWorkspaceIds(current => [...current, workspace.id]);
      workspacesService.list.revalidate();
    }

    const docsService = workspace.scope.get(DocsService);
    await docsService.list.isReady$.waitFor(ready => ready);

    const existingIds = docsService.list.nonTrashDocsIds$.value;
    if (existingIds.length > 0) {
      persistFastBootRoute(
        workspace.id,
        existingIds[0],
        workspace.flavour ?? BLANK_INSTANT_WORKSPACE_FLAVOUR
      );
      return;
    }

    const doc = docsService.createDoc({ title: getDefaultWorkspaceName() });
    persistFastBootRoute(
      workspace.id,
      doc.id,
      workspace.flavour ?? BLANK_INSTANT_WORKSPACE_FLAVOUR
    );
  })().catch(err => {
    bootstrapPromise = null;
    console.error('Failed to bootstrap instant workspace', err);
  });

  return bootstrapPromise;
}
