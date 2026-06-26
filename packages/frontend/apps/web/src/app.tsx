import { BlankContext } from '@blank/core/components/context';
import { AppContainer } from '@blank/core/desktop/components/app-container';
import { router } from '@blank/core/desktop/router';
import { configureCommonModules } from '@blank/core/modules';
import { configureElectronShellModules } from '@blank/core/desktop/configure-electron-shell';
import { I18nProvider } from '@blank/core/modules/i18n';
import { LifecycleService } from '@blank/core/modules/lifecycle';
import {
  configureLocalStorageStateStorageImpls,
  NbstoreProvider,
} from '@blank/core/modules/storage';
import { PopupWindowProvider } from '@blank/core/modules/url';
import { configureBrowserWorkbenchModule } from '@blank/core/modules/workbench';
import { configureBrowserWorkspaceFlavours } from '@blank/core/modules/workspace-engine';
import createEmotionCache from '@blank/core/utils/create-emotion-cache';
import { scheduleRemoveBootSplash } from '@blank/core/utils/blank-fast-boot';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { isElectronShell, isLocalOnlyMode } from '@blank/core/utils/local-only';
import { getWorkerUrl } from '@blank/env/worker';
import { StoreManagerClient } from '@blank/nbstore/worker/client';
import { setTelemetryTransport } from '@blank/track';
import { CacheProvider } from '@emotion/react';
import { Framework, FrameworkRoot, getCurrentStore } from '@toeverything/infra';
import { OpClient } from '@toeverything/infra/op';
import { Suspense, useLayoutEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

const cache = createEmotionCache();
const blankFallback = isBlankBuild() ? null : <AppContainer fallback />;

let storeManagerClient: StoreManagerClient;

const workerUrl = getWorkerUrl('nbstore');

if (
  window.SharedWorker &&
  localStorage.getItem('disableSharedWorker') !== 'true' &&
  !isElectronShell()
) {
  const worker = new SharedWorker(workerUrl, {
    name: 'blank-shared-worker',
  });
  storeManagerClient = new StoreManagerClient(new OpClient(worker.port));
} else {
  const worker = new Worker(workerUrl);
  storeManagerClient = new StoreManagerClient(new OpClient(worker));
}
setTelemetryTransport(isLocalOnlyMode() ? null : storeManagerClient.telemetry);
window.addEventListener('beforeunload', () => {
  storeManagerClient.dispose();
});
window.addEventListener('focus', () => {
  storeManagerClient.resume();
});
window.addEventListener('click', () => {
  storeManagerClient.resume();
});
window.addEventListener('blur', () => {
  storeManagerClient.pause();
});

const future = {
  v7_startTransition: true,
} as const;

const framework = new Framework();
configureCommonModules(framework);
if (isElectronShell()) {
  configureElectronShellModules(framework);
} else {
  configureBrowserWorkbenchModule(framework);
  configureLocalStorageStateStorageImpls(framework);
}
configureBrowserWorkspaceFlavours(framework);
framework.impl(NbstoreProvider, {
  realtime: storeManagerClient.realtime,
  openStore(
    key: Parameters<StoreManagerClient['open']>[0],
    options: Parameters<StoreManagerClient['open']>[1]
  ) {
    return storeManagerClient.open(key, options);
  },
});
framework.impl(PopupWindowProvider, {
  open: (target: string) => {
    const targetUrl = new URL(target);

    let url: string;
    // safe to open directly if in the same origin
    if (targetUrl.origin === location.origin) {
      url = target;
    } else {
      const redirectProxy = location.origin + '/redirect-proxy';
      const search = new URLSearchParams({
        redirect_uri: target,
      });

      url = `${redirectProxy}?${search.toString()}`;
    }
    window.open(url, '_blank', 'popup noreferrer noopener');
  },
});
const frameworkProvider = framework.provider();

// setup application lifecycle events, and emit application start event
window.addEventListener('focus', () => {
  frameworkProvider.get(LifecycleService).applicationFocus();
});
frameworkProvider.get(LifecycleService).applicationStart();

export function App() {
  useLayoutEffect(() => {
    scheduleRemoveBootSplash();
  }, []);

  return (
    <Suspense fallback={blankFallback}>
      <FrameworkRoot framework={frameworkProvider}>
        <CacheProvider value={cache}>
          <I18nProvider>
            <BlankContext store={getCurrentStore()}>
              <RouterProvider
                fallbackElement={blankFallback}
                router={router}
                future={future}
              />
            </BlankContext>
          </I18nProvider>
        </CacheProvider>
      </FrameworkRoot>
    </Suspense>
  );
}
