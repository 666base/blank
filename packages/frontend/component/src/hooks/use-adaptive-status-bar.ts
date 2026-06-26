import { useLayoutEffect } from 'react';

import {
  applyStatusBarColor,
  getRootThemeBackground,
  sampleStatusBarColor,
} from '../utils/status-bar-color';
import { useThemeValueV2 } from './use-theme-value';

export function useAdaptiveStatusBar(options?: {
  enabled?: boolean;
  fallbackToken?: Parameters<typeof useThemeValueV2>[0];
}) {
  const themeFallback = useThemeValueV2(
    options?.fallbackToken ?? 'layer/background/mobile/primary'
  );

  useLayoutEffect(() => {
    const enabled =
      options?.enabled ??
      (BUILD_CONFIG.isMobileEdition ||
        BUILD_CONFIG.isAndroid ||
        BUILD_CONFIG.isIOS ||
        environment.isMobile);

    if (!enabled) {
      return;
    }

    let frame = 0;
    let lastColor = '';

    const sync = () => {
      frame = 0;
      const fallback = getRootThemeBackground() ?? themeFallback;
      const nextColor = sampleStatusBarColor(fallback);
      if (!nextColor || nextColor === lastColor) {
        return;
      }
      lastColor = nextColor;
      applyStatusBarColor(nextColor);
    };

    const schedule = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(sync);
    };

    schedule();

    window.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);

    const observer = new MutationObserver(schedule);
    const startObserver = () => {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme', 'data-visual-theme'],
      });
      observer.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'data-active', 'data-dense'],
      });
    };

    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(startObserver, { timeout: 1500 });
    } else {
      setTimeout(startObserver, 0);
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      observer.disconnect();
    };
  }, [themeFallback, options?.enabled]);
}
