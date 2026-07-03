import { useNavigateHelper } from '@blank/core/components/hooks/use-navigate-helper';
import {
  dispatchBlankWorkspaceReload,
  prepareBlankWorkspaceRoute,
} from '@blank/core/utils/blank-workspace-nav';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { fetchBlankWorkspaces } from '@blank/core/utils/blank-supabase';
import { GlobalContextService } from '@blank/core/modules/global-context';
import { WorkspacesService } from '@blank/core/modules/workspace';
import { revalidateBlankCloudWorkspaces, BLANK_CLOUD_FLAVOUR } from '@blank/core/modules/workspace-engine';
import {
  BLANK_INSTANT_WORKSPACE_ID,
} from '@blank/core/utils/blank-fast-boot';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect, useRef } from 'react';

import { useBlankAuth } from './use-blank-auth';

/** Keeps blank-cloud workspaces writable after sign-in / token refresh. */
export function BlankAuthWorkspaceSync() {
  const { isSignedIn, session, loading } = useBlankAuth();
  const workspacesService = useService(WorkspacesService);
  const globalContextService = useService(GlobalContextService);
  const { openPage } = useNavigateHelper();
  const workspaceId = useLiveData(
    globalContextService.globalContext.workspaceId.$
  );
  const workspaceFlavour = useLiveData(
    globalContextService.globalContext.workspaceFlavour.$
  );
  const accessToken = session?.access_token;
  const prevTokenRef = useRef<string | undefined>(undefined);
  const autoOpenedRef = useRef(false);

  useEffect(() => {
    if (!isBlankBuild() || loading || !isSignedIn || !accessToken) {
      return;
    }

    const prevToken = prevTokenRef.current;
    if (
      workspaceFlavour === BLANK_CLOUD_FLAVOUR &&
      workspaceId &&
      accessToken &&
      prevToken !== accessToken
    ) {
      workspacesService.evictWorkspace(workspaceId);
      dispatchBlankWorkspaceReload(workspaceId);
    }
    prevTokenRef.current = accessToken;
  }, [
    accessToken,
    isSignedIn,
    loading,
    workspaceFlavour,
    workspaceId,
    workspacesService,
  ]);

  useEffect(() => {
    if (!isBlankBuild() || loading || !isSignedIn) {
      autoOpenedRef.current = false;
      return;
    }
    if (autoOpenedRef.current) {
      return;
    }
    if (workspaceId && workspaceId !== BLANK_INSTANT_WORKSPACE_ID) {
      return;
    }

    autoOpenedRef.current = true;
    void (async () => {
      revalidateBlankCloudWorkspaces();
      const rows = await fetchBlankWorkspaces();
      const cloudWorkspaceId = rows[0]?.id;
      if (!cloudWorkspaceId) {
        autoOpenedRef.current = false;
        return;
      }
      prepareBlankWorkspaceRoute(
        cloudWorkspaceId,
        'all',
        BLANK_CLOUD_FLAVOUR
      );
      openPage(cloudWorkspaceId, 'all');
    })().catch(console.error);
  }, [isSignedIn, loading, openPage, workspaceId]);

  return null;
}
