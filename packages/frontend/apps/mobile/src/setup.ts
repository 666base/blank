(globalThis as any).__BLANK_FORCE_MOBILE__ = true;

import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  (globalThis as any).__CAPACITOR_NATIVE__ = true;
}

import '@blank/core/bootstrap/browser';
import '@blank/core/bootstrap/blank-main';
import '@blank/core/bootstrap/cleanup';
import '@blank/component/theme';
import { colorToHex, getRelativeLuminance } from '@blank/component';
import { globalVars } from '@blank/core/mobile/styles/variables.css';
import '@blank/core/mobile/styles/mobile.css';

async function configureNativeStatusBar() {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.show();

    const rootStyle = getComputedStyle(document.documentElement);
    const bg =
      rootStyle.getPropertyValue('--bg-root').trim() ||
      rootStyle.backgroundColor ||
      '#0c0c0c';
    const hex = colorToHex(bg);

    await StatusBar.setBackgroundColor({ color: hex });
    await StatusBar.setStyle({
      style:
        getRelativeLuminance(hex) > 0.55 ? Style.Dark : Style.Light,
    });
  } catch {
    // Status bar plugin unavailable in this build.
  }
}

void configureNativeStatusBar();

function isIosMobileDevice() {
  if (BUILD_CONFIG.isIOS) {
    return true;
  }
  if (!BUILD_CONFIG.isMobileEdition) {
    return false;
  }
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function configureMobileRuntimeLayout() {
  if (!BUILD_CONFIG.isMobileEdition) {
    return;
  }

  const tabHeight = isIosMobileDevice() ? '49px' : '62px';
  const tabSafeArea = `calc(${tabHeight} + env(safe-area-inset-bottom))`;
  const root = document.documentElement;

  root.style.setProperty(globalVars.appTabHeight, tabHeight);
  root.style.setProperty(globalVars.appTabSafeArea, tabSafeArea);
  root.style.setProperty(
    '--blank-edgeless-zoom-toolbar-bottom',
    `calc(10px + ${tabSafeArea})`
  );
}

configureMobileRuntimeLayout();
