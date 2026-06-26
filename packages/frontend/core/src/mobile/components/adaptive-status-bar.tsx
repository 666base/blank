import {
  registerNativeStatusBarSync,
  useAdaptiveStatusBar,
  getRelativeLuminance,
  colorToHex,
} from '@blank/component';
import { useEffect } from 'react';

async function syncNativeStatusBar(color: string) {
  if (!globalThis.__CAPACITOR_NATIVE__) {
    return;
  }

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    const hex = colorToHex(color);
    const info = await StatusBar.getInfo();

    if (!info.overlays) {
      await StatusBar.setBackgroundColor({ color: hex });
    }

    await StatusBar.setStyle({
      style:
        getRelativeLuminance(hex) > 0.55 ? Style.Dark : Style.Light,
    });
  } catch {
    // Plugin unavailable outside native builds.
  }
}

/**
 * Keeps the OS status bar in sync with the visible background (header vs page).
 */
export const AdaptiveStatusBar = () => {
  useAdaptiveStatusBar();

  useEffect(() => {
    if (!globalThis.__CAPACITOR_NATIVE__) {
      return;
    }

    registerNativeStatusBarSync(syncNativeStatusBar);

    const initial = document
      .querySelector('meta[name="theme-color"]')
      ?.getAttribute('content');
    if (initial) {
      void syncNativeStatusBar(initial);
    }

    return () => registerNativeStatusBarSync(null);
  }, []);

  return null;
};
