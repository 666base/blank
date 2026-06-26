import { NotificationCenter } from '@blank/component';
import { DefaultServerService } from '@blank/core/modules/cloud';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { isLocalOnlyMode } from '@blank/core/utils/local-only';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AppFallback } from '../../components/app-fallback';
import { GlobalDialogs } from '../../dialogs';

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
    return isBlankBuild() ? null : <AppFallback />;
  }

  return (
    <FrameworkScope scope={defaultServerService.server.scope}>
      <GlobalDialogs />
      <NotificationCenter />
      <Outlet />
    </FrameworkScope>
  );
};
