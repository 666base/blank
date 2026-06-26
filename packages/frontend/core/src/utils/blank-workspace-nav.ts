import {
  BLANK_INSTANT_WORKSPACE_FLAVOUR,
  BLANK_INSTANT_WORKSPACE_ID,
  inferBlankWorkspaceFlavour,
  persistFastBootRoute,
} from './blank-fast-boot';
import { isBlankBuild } from './blank-links';

/** Persist workspace route before navigation so instant boot can open the engine. */
export function prepareBlankWorkspaceRoute(
  workspaceId: string,
  pageId?: string | null,
  flavour?: string | null
) {
  if (!isBlankBuild()) {
    return;
  }
  const resolvedFlavour = flavour ?? inferBlankWorkspaceFlavour(workspaceId);
  const resolvedPageId =
    pageId && pageId !== 'all' && pageId !== 'home' ? pageId : null;
  persistFastBootRoute(workspaceId, resolvedPageId, resolvedFlavour);
}

export function dispatchBlankWorkspaceReload(workspaceId: string) {
  window.dispatchEvent(
    new CustomEvent('blank:workspace:reload', { detail: { id: workspaceId } })
  );
}
