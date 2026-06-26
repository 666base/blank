import { NotificationCenter } from '@blank/component';
import { DefaultServerService } from '@blank/core/modules/cloud';
import { BlankAuthWorkspaceSync } from '@blank/core/modules/blank-auth/blank-auth-workspace-sync';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { isLocalOnlyMode } from '@blank/core/utils/local-only';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AdaptiveStatusBar } from '../../components/adaptive-status-bar';
import { AppFallback } from '../../components/app-fallback';
import { MobileBootPlaceholder } from '../../components/boot-placeholder';
import { GlobalDialogs } from '../../dialogs';
import { VisualThemeModifier } from '../../../components/visual-theme/visual-theme-modifier';

export const RootWrapper = () => {
  const defaultServerService = useService(DefaultServerService);
  const [isServerReady, setIsServerReady] = useState(
    () => isLocalOnlyMode() || isBlankBuild()
  );

  useEffect(() => {
    if (isServerReady) {
      return;
    }
    if (isLocalOnlyMode()) {
      setIsServerReady(true);
      return;
    }
    const abortController = new AbortController();
    defaultServerService.server
      .waitForConfigRevalidation(abortController.signal)
      .then(() => setIsServerReady(true))
      .catch(console.error);
    return () => abortController.abort();
  }, [defaultServerService, isServerReady]);

  if (!isServerReady) {
    return isBlankBuild() ? <MobileBootPlaceholder /> : <AppFallback />;
  }

  return (
    <FrameworkScope scope={defaultServerService.server.scope}>
      <AdaptiveStatusBar />
      <GlobalDialogs />
      <NotificationCenter />
      <VisualThemeModifier />
      {isBlankBuild() ? <BlankAuthWorkspaceSync /> : null}
      <Outlet />
    </FrameworkScope>
  );
};
