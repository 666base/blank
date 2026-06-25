declare global {
  // eslint-disable-next-line no-var
  var __ELECTRON_SHELL__: boolean | undefined;
}

export function isElectronShell() {
  return globalThis.__ELECTRON_SHELL__ === true;
}

export function isDesktopApp() {
  return BUILD_CONFIG.isElectron || isElectronShell();
}

export function isLocalOnlyMode() {
  const explicitSetting = globalThis.localStorage?.getItem('affine:local-only');

  if (explicitSetting === 'false') {
    return false;
  }

  return (
    explicitSetting === 'true' ||
    (BUILD_CONFIG.debug && !environment.isSelfHosted) ||
    (BUILD_CONFIG.isElectron && !environment.isSelfHosted) ||
    isElectronShell()
  );
}
