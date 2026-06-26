import { isBlankSyncEnabled } from './sync-config';
import { isBlankBuild } from './blank-links';

declare global {
  // eslint-disable-next-line no-var
  var __ELECTRON_SHELL__: boolean | undefined;
  // eslint-disable-next-line no-var
  var __CAPACITOR_NATIVE__: boolean | undefined;
}

export function isElectronShell() {
  return globalThis.__ELECTRON_SHELL__ === true;
}

export function isCapacitorNative() {
  return globalThis.__CAPACITOR_NATIVE__ === true;
}

export function isDesktopApp() {
  return BUILD_CONFIG.isElectron || isElectronShell();
}

export function isLocalOnlyMode() {
  // Blank: local notes only — no Blank cloud, no Blank-compatible self-host sync.
  if (isBlankBuild()) {
    return true;
  }

  const explicitSetting = globalThis.localStorage?.getItem('blank:local-only');

  if (explicitSetting === 'false') {
    return false;
  }

  if (explicitSetting === 'true') {
    return true;
  }

  if (isBlankSyncEnabled()) {
    return false;
  }

  return (
    (BUILD_CONFIG.debug && !environment.isSelfHosted) ||
    (BUILD_CONFIG.isElectron && !environment.isSelfHosted) ||
    isElectronShell() ||
    isCapacitorNative() ||
    BUILD_CONFIG.isMobileEdition
  );
}

/** Blank builds ship without Blank Copilot / inline AI. */
export function isAiDisabled() {
  return true;
}
