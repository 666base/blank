import { BlankContext } from '@blank/core/components/context';
import { AppFallback } from '@blank/core/mobile/components/app-fallback';
import { MobileBootPlaceholder } from '@blank/core/mobile/components/boot-placeholder';
import { configureMobileModules } from '@blank/core/mobile/modules';
import { HapticProvider } from '@blank/core/mobile/modules/haptics';
import { VirtualKeyboardProvider } from '@blank/core/mobile/modules/virtual-keyboard';
import { router } from '@blank/core/mobile/router';
import { configureCommonModules } from '@blank/core/modules';
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
import { isBlankBuild } from '@blank/core/utils/blank-links';
import {
  isCapacitorNative,
  isElectronShell,
  isLocalOnlyMode,
} from '@blank/core/utils/local-only';
import { getWorkerUrl } from '@blank/env/worker';
import { StoreManagerClient } from '@blank/nbstore/worker/client';
import { setTelemetryTransport } from '@blank/track';
import { CacheProvider } from '@emotion/react';
import {
  Framework,
  FrameworkRoot,
  getCurrentStore,
  type FrameworkProvider,
} from '@toeverything/infra';
import { OpClient } from '@toeverything/infra/op';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

const cache = createEmotionCache();
const blankFallback = isBlankBuild() ? <MobileBootPlaceholder /> : <AppFallback />;

const future = {
  v7_startTransition: true,
} as const;

let storeManagerClient: StoreManagerClient | null = null;
let lifecycleStarted = false;

function createStoreManagerClient() {
  const workerUrl = getWorkerUrl('nbstore');
  const preferDedicatedWorker =
    isElectronShell() || isCapacitorNative() || BUILD_CONFIG.isMobileEdition;

  if (
    window.SharedWorker &&
    localStorage.getItem('disableSharedWorker') !== 'true' &&
    !preferDedicatedWorker
  ) {
    const worker = new SharedWorker(workerUrl, { name: 'blank-shared-worker' });
    return new StoreManagerClient(new OpClient(worker.port));
  }

  const worker = new Worker(workerUrl);
  return new StoreManagerClient(new OpClient(worker));
}

function createFrameworkProvider() {
  storeManagerClient = createStoreManagerClient();
  setTelemetryTransport(isLocalOnlyMode() ? null : storeManagerClient.telemetry);

  const framework = new Framework();
  configureCommonModules(framework);
  configureBrowserWorkbenchModule(framework);
  configureLocalStorageStateStorageImpls(framework);
  configureBrowserWorkspaceFlavours(framework);
  configureMobileModules(framework);
  framework.impl(NbstoreProvider, {
    realtime: storeManagerClient.realtime,
    openStore(
      key: Parameters<StoreManagerClient['open']>[0],
      options: Parameters<StoreManagerClient['open']>[1]
    ) {
      const { store, dispose } = storeManagerClient!.open(key, options);
      return {
        store,
        dispose: () => {
          dispose();
        },
      };
    },
  });
  framework.impl(PopupWindowProvider, {
    open: (target: string) => {
      const targetUrl = new URL(target);

      let url: string;
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
  framework.impl(HapticProvider, {
    impact: options => {
      return new Promise(resolve => {
        const style = options?.style ?? 'LIGHT';
        const pattern = {
          LIGHT: [10],
          MEDIUM: [20],
          HEAVY: [30],
        }[style];
        navigator.vibrate?.(pattern);
        resolve();
      });
    },
    notification: () => Promise.reject('Not supported'),
    vibrate: () => Promise.reject('Not supported'),
    selectionStart: () => Promise.reject('Not supported'),
    selectionChanged: () => Promise.reject('Not supported'),
    selectionEnd: () => Promise.reject('Not supported'),
  });
  framework.impl(VirtualKeyboardProvider, {
    onChange: callback => {
      if (!visualViewport) {
        return () => {};
      }

      const KEYBOARD_VISIBLE_THRESHOLD = 80;

      const listener = () => {
        if (!visualViewport) return;
        const windowHeight = window.innerHeight;
        const keyboardHeight = Math.max(
          0,
          windowHeight - visualViewport.height - visualViewport.offsetTop
        );
        callback({
          visible: keyboardHeight > KEYBOARD_VISIBLE_THRESHOLD,
          height: keyboardHeight,
        });
      };

      listener();
      visualViewport.addEventListener('resize', listener);
      return () => {
        visualViewport?.removeEventListener('resize', listener);
      };
    },
    show: () => {},
    hide: () => {},
  });

  return framework.provider();
}

function startLifecycle(provider: FrameworkProvider) {
  if (lifecycleStarted) {
    return;
  }
  lifecycleStarted = true;
  window.addEventListener('focus', () => {
    provider.get(LifecycleService).applicationFocus();
  });
  window.addEventListener('beforeunload', () => {
    storeManagerClient?.dispose();
  });
  provider.get(LifecycleService).applicationStart();
}

const frameworkProvider = createFrameworkProvider();
startLifecycle(frameworkProvider);

export function App() {
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
