const fs = require('node:fs');
const path = require('node:path');
const { Tray, Menu, nativeImage, app } = require('electron');

const DEFAULT_MENUBAR_STATE = {
  enabled: true,
  closeToTray: true,
  minimizeToTray: false,
  startMinimized: false,
  openOnLeftClick: true,
};

function getMenubarState(globalState) {
  const stored = globalState?.get?.('menubarState');
  return { ...DEFAULT_MENUBAR_STATE, ...(stored ?? {}) };
}

function getTrayIconPath() {
  const candidates = [
    path.join(__dirname, 'build', 'icon.ico'),
    path.join(__dirname, 'web', 'imgs', 'blank-app-icon.png'),
    path.join(__dirname, 'web', 'favicon-32.png'),
  ];

  if (app.isPackaged) {
    candidates.unshift(
      path.join(process.resourcesPath, 'web', 'imgs', 'blank-app-icon.png'),
      path.join(process.resourcesPath, 'build', 'icon.ico')
    );
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return candidates[0];
}

function createTrayImage() {
  const icon = nativeImage.createFromPath(getTrayIconPath());
  if (icon.isEmpty()) {
    return icon;
  }

  if (process.platform === 'win32' || process.platform === 'linux') {
    return icon.resize({ width: 16, height: 16 });
  }

  return icon;
}

function createTrayManager({ getMainWindow, globalState }) {
  /** @type {import('electron').Tray | null} */
  let tray = null;
  let isQuitting = false;

  const isTrayEnabled = () => getMenubarState(globalState).enabled;

  const shouldCloseToTray = () => {
    const state = getMenubarState(globalState);
    return state.enabled && state.closeToTray;
  };

  const shouldMinimizeToTray = () => {
    const state = getMenubarState(globalState);
    return state.enabled && state.minimizeToTray;
  };

  const shouldOpenOnLeftClick = () => getMenubarState(globalState).openOnLeftClick;

  const showMainWindow = () => {
    const win = getMainWindow();
    if (!win || win.isDestroyed()) {
      return;
    }
    if (win.isMinimized()) {
      win.restore();
    }
    win.show();
    win.focus();
  };

  const hideMainWindow = () => {
    const win = getMainWindow();
    if (!win || win.isDestroyed()) {
      return;
    }
    win.hide();
  };

  const destroyTray = () => {
    if (tray) {
      tray.destroy();
      tray = null;
    }
  };

  const buildContextMenu = () =>
    Menu.buildFromTemplate([
      {
        label: 'Open Blank',
        click: showMainWindow,
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          isQuitting = true;
          app.quit();
        },
      },
    ]);

  const ensureTray = () => {
    if (!isTrayEnabled()) {
      destroyTray();
      return;
    }

    if (tray) {
      tray.setContextMenu(buildContextMenu());
      return;
    }

    const image = createTrayImage();
    if (image.isEmpty()) {
      console.warn('[blank-tray] Tray icon not found, skipping tray creation');
      return;
    }

    tray = new Tray(image);
    tray.setToolTip('Blank');
    tray.setContextMenu(buildContextMenu());

    tray.on('click', () => {
      if (!shouldOpenOnLeftClick()) {
        return;
      }

      const win = getMainWindow();
      if (win && !win.isDestroyed() && win.isVisible()) {
        hideMainWindow();
        return;
      }

      showMainWindow();
    });

    tray.on('double-click', showMainWindow);
  };

  const handleWindowClose = (_win, event) => {
    if (isQuitting || !shouldCloseToTray()) {
      return;
    }

    event.preventDefault();
    hideMainWindow();
  };

  const handleWindowMinimize = () => {
    if (shouldMinimizeToTray()) {
      hideMainWindow();
    }
  };

  const attachWindow = win => {
    win.on('close', event => handleWindowClose(win, event));
    win.on('minimize', handleWindowMinimize);
  };

  const markQuitting = () => {
    isQuitting = true;
  };

  const shouldKeepRunningInBackground = () => {
    const state = getMenubarState(globalState);
    return state.enabled && (state.closeToTray || state.minimizeToTray);
  };

  const shouldStartMinimized = () => {
    const state = getMenubarState(globalState);
    return state.enabled && state.startMinimized;
  };

  const refreshFromSettings = () => {
    ensureTray();
  };

  app.on('before-quit', () => {
    isQuitting = true;
  });

  return {
    init: ensureTray,
    attachWindow,
    showMainWindow,
    hideMainWindow,
    markQuitting,
    shouldKeepRunningInBackground,
    shouldStartMinimized,
    refreshFromSettings,
    destroyTray,
  };
}

module.exports = { createTrayManager, getMenubarState, DEFAULT_MENUBAR_STATE };
