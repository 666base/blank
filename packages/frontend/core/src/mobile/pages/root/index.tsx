import { NotificationCenter } from '@affine/component';
import { DefaultServerService } from '@affine/core/modules/cloud';
import { isLocalOnlyMode } from '@affine/core/utils/local-only';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AppFallback } from '../../components/app-fallback';
import { GlobalDialogs } from '../../dialogs';

export const RootWrapper = () => {
  const defaultServerService = useService(DefaultServerService);
  const [isServerReady, setIsServerReady] = useState(() => isLocalOnlyMode());

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
    return <AppFallback />;
  }

  return (
    <FrameworkScope scope={defaultServerService.server.scope}>
      <GlobalDialogs />
      <NotificationCenter />
      <Outlet />
    </FrameworkScope>
  );
};
