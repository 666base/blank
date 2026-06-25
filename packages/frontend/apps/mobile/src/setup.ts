globalThis.__AFFINE_FORCE_MOBILE__ = true;

import '@affine/core/bootstrap/browser';
import '@affine/core/bootstrap/cleanup';
import '@affine/component/theme';
import { globalVars } from '@affine/core/mobile/styles/variables.css';
import '@affine/core/mobile/styles/mobile.css';

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
    '--affine-edgeless-zoom-toolbar-bottom',
    `calc(10px + ${tabSafeArea})`
  );
}

configureMobileRuntimeLayout();
