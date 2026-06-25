const fs = require('node:fs');
const path = require('node:path');
const { ipcMain, BrowserWindow, app } = require('electron');
const { KeyValueStore } = require('./kv-store.cjs');

const CHANNEL_PREFIX = 'blank:';

function registerBlankDesktopApi(getMainWindow) {
  const globalState = new KeyValueStore(
    path.join(app.getPath('userData'), 'blank-global-state.json')
  );
  const globalCache = new KeyValueStore(
    path.join(app.getPath('userData'), 'blank-global-cache.json')
  );

  const emitToRenderer = (event, payload) => {
    const win = getMainWindow();
    if (win && !win.isDestroyed()) {
      win.webContents.send(`${CHANNEL_PREFIX}event`, event, payload);
    }
  };

  const broadcastWindowState = win => {
    if (!win || win.isDestroyed()) {
      return;
    }
    emitToRenderer('ui:maximized', win.isMaximized());
    emitToRenderer('ui:fullscreen', win.isFullScreen());
  };

  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalState:ready`, async () => {
    await globalState.ready;
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalState:keys`, async () => {
    await globalState.ready;
    return globalState.keys();
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalState:get`, async (_e, key) => {
    await globalState.ready;
    return globalState.get(key);
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalState:set`, async (_e, key, value) => {
    await globalState.ready;
    globalState.set(key, value);
    emitToRenderer('storage:globalState:changed', { key, value });
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalState:del`, async (_e, key) => {
    await globalState.ready;
    globalState.del(key);
    emitToRenderer('storage:globalState:changed', { key, value: undefined });
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalState:clear`, async () => {
    await globalState.ready;
    globalState.clear();
    emitToRenderer('storage:globalState:cleared', null);
  });

  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalCache:ready`, async () => {
    await globalCache.ready;
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalCache:keys`, async () => {
    await globalCache.ready;
    return globalCache.keys();
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalCache:get`, async (_e, key) => {
    await globalCache.ready;
    return globalCache.get(key);
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalCache:set`, async (_e, key, value) => {
    await globalCache.ready;
    globalCache.set(key, value);
    emitToRenderer('storage:globalCache:changed', { key, value });
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalCache:del`, async (_e, key) => {
    await globalCache.ready;
    globalCache.del(key);
    emitToRenderer('storage:globalCache:changed', { key, value: undefined });
  });
  ipcMain.handle(`${CHANNEL_PREFIX}storage:globalCache:clear`, async () => {
    await globalCache.ready;
    globalCache.clear();
    emitToRenderer('storage:globalCache:cleared', null);
  });

  const uiHandlers = {
    getTabsStatus: async () => [],
    getTabViewsMeta: async () => ({
      workbenches: [
        {
          id: 'main',
          basename: '',
          pinned: false,
          active: true,
          views: [{ id: 'main', title: 'Blank', iconName: 'home' }],
        },
      ],
    }),
    isMaximized: async () => {
      const win = getMainWindow();
      return win ? win.isMaximized() : false;
    },
    isFullScreen: async () => {
      const win = getMainWindow();
      return win ? win.isFullScreen() : false;
    },
    isActiveTab: async () => true,
    handleMinimizeApp: async () => getMainWindow()?.minimize(),
    handleMaximizeApp: async () => {
      const win = getMainWindow();
      if (!win) return;
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
      broadcastWindowState(win);
    },
    handleCloseApp: async () => getMainWindow()?.close(),
    handleWindowResize: async () => {},
    pingAppLayoutReady: async () => {},
    handleOpenMainApp: async () => {},
    openThemeEditor: async () => {},
    restartApp: async () => {
      app.relaunch();
      app.exit(0);
    },
    showTab: async () => {},
    tabGoTo: async () => {},
    addTab: async () => {},
    closeTab: async () => {},
    moveTab: async () => {},
    activateView: async () => {},
    showTabContextMenu: async () => {},
    toggleRightSidebar: async () => {},
    handleHideApp: async () => {},
    updateActiveViewMeta: async () => {},
  };

  ipcMain.handle(`${CHANNEL_PREFIX}ui`, async (_e, method, args = []) => {
    const handler = uiHandlers[method];
    if (!handler) {
      throw new Error(`Unknown ui handler: ${method}`);
    }
    return handler(...args);
  });

  ipcMain.handle(`${CHANNEL_PREFIX}clipboard:copyAsPNG`, async () => false);

  ipcMain.handle(`${CHANNEL_PREFIX}dialog:saveDBFileAs`, async () => null);

  ipcMain.handle(`${CHANNEL_PREFIX}workspace:listLocalWorkspaceIds`, async () => {
    const root = app.getPath('userData');
    try {
      return fs
        .readdirSync(root, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
    } catch {
      return [];
    }
  });
  ipcMain.handle(`${CHANNEL_PREFIX}workspace:moveToTrash`, async () => {});
  ipcMain.handle(`${CHANNEL_PREFIX}workspace:getBackupWorkspaces`, async () => []);
  ipcMain.handle(`${CHANNEL_PREFIX}workspace:recoverBackupWorkspace`, async () => {});
  ipcMain.handle(`${CHANNEL_PREFIX}workspace:deleteBackupWorkspace`, async () => {});

  return {
    attachWindow(win) {
      win.on('maximize', () => broadcastWindowState(win));
      win.on('unmaximize', () => broadcastWindowState(win));
      win.on('enter-full-screen', () => broadcastWindowState(win));
      win.on('leave-full-screen', () => broadcastWindowState(win));
      win.webContents.on('did-finish-load', () => broadcastWindowState(win));
    },
  };
}

module.exports = { registerBlankDesktopApi, CHANNEL_PREFIX };
