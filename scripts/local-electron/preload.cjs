const { contextBridge, ipcRenderer } = require('electron');

const CHANNEL_PREFIX = 'blank:';

const invoke = (channel, ...args) => ipcRenderer.invoke(channel, ...args);

function createEventHub() {
  const listeners = new Map();

  ipcRenderer.on(`${CHANNEL_PREFIX}event`, (_event, name, payload) => {
    const set = listeners.get(name);
    if (!set) return;
    for (const cb of set) {
      try {
        cb(payload);
      } catch (error) {
        console.error(error);
      }
    }
  });

  return {
    on(name, cb) {
      if (!listeners.has(name)) {
        listeners.set(name, new Set());
      }
      listeners.get(name).add(cb);
      return () => listeners.get(name)?.delete(cb);
    },
  };
}

const hub = createEventHub();

function createStore(prefix) {
  /** In-memory mirror so GlobalState.get/watch behave synchronously like localStorage. */
  const cache = new Map();
  const watchers = new Map();

  const notify = (key, value) => {
    const set = watchers.get(key);
    if (!set) return;
    for (const cb of set) {
      cb(value);
    }
  };

  const hydration = invoke(`${CHANNEL_PREFIX}storage:${prefix}:ready`).then(
    async () => {
      const keys = await invoke(`${CHANNEL_PREFIX}storage:${prefix}:keys`);
      await Promise.all(
        keys.map(async key => {
          const value = await invoke(
            `${CHANNEL_PREFIX}storage:${prefix}:get`,
            key
          );
          cache.set(key, value);
        })
      );
    }
  );

  hub.on(`storage:${prefix}:changed`, ({ key, value }) => {
    cache.set(key, value);
    notify(key, value);
  });
  hub.on(`storage:${prefix}:cleared`, () => {
    cache.clear();
    for (const [, set] of watchers) {
      for (const cb of set) {
        cb(undefined);
      }
    }
  });

  return {
    ready: hydration,
    keys: () => Array.from(cache.keys()),
    get: key => cache.get(key),
    set: (key, value) => {
      cache.set(key, value);
      return invoke(`${CHANNEL_PREFIX}storage:${prefix}:set`, key, value).then(
        () => notify(key, value)
      );
    },
    del: key => {
      cache.delete(key);
      return invoke(`${CHANNEL_PREFIX}storage:${prefix}:del`, key).then(() =>
        notify(key, undefined)
      );
    },
    clear: () => {
      cache.clear();
      return invoke(`${CHANNEL_PREFIX}storage:${prefix}:clear`);
    },
    watch: (key, cb) => {
      if (!watchers.has(key)) {
        watchers.set(key, new Set());
      }
      watchers.get(key).add(cb);
      void hydration.then(() => {
        cb(cache.get(key));
      });
      return () => watchers.get(key)?.delete(cb);
    },
  };
}

function uiMethod(name) {
  return (...args) => invoke(`${CHANNEL_PREFIX}ui`, name, args);
}

/** Must stay in sync with uiHandlers in blank-desktop-api-main.cjs */
const UI_METHOD_NAMES = [
  'getTabsStatus',
  'getTabViewsMeta',
  'isMaximized',
  'isFullScreen',
  'isActiveTab',
  'handleMinimizeApp',
  'handleMaximizeApp',
  'handleCloseApp',
  'handleWindowResize',
  'pingAppLayoutReady',
  'handleOpenMainApp',
  'openThemeEditor',
  'restartApp',
  'showTab',
  'tabGoTo',
  'addTab',
  'closeTab',
  'moveTab',
  'activateView',
  'showTabContextMenu',
  'toggleRightSidebar',
  'handleHideApp',
  'updateActiveViewMeta',
];

const ui = Object.fromEntries(
  UI_METHOD_NAMES.map(name => [name, uiMethod(name)])
);

const events = {
  ui: {
    onMaximized(cb) {
      return hub.on('ui:maximized', cb);
    },
    onFullScreen(cb) {
      return hub.on('ui:fullscreen', cb);
    },
    onActiveTabChanged(cb) {
      cb('main');
      return () => {};
    },
    onTabsStatusChange(cb) {
      invoke(`${CHANNEL_PREFIX}ui`, 'getTabsStatus', [])
        .then(tabs => cb(tabs))
        .catch(console.error);
      return () => {};
    },
    onAuthenticationRequest() {
      return () => {};
    },
  },
  updater: {
    onUpdateReady(cb) {
      return hub.on('updater:onUpdateReady', cb);
    },
    onUpdateAvailable(cb) {
      return hub.on('updater:onUpdateAvailable', cb);
    },
    onDownloadProgress(cb) {
      return hub.on('updater:onDownloadProgress', cb);
    },
  },
};

const apis = {
  ui,
  updater: {
    currentVersion: () => invoke(`${CHANNEL_PREFIX}updater:currentVersion`),
    checkForUpdates: () => invoke(`${CHANNEL_PREFIX}updater:checkForUpdates`),
    downloadUpdate: () => invoke(`${CHANNEL_PREFIX}updater:downloadUpdate`),
    quitAndInstall: () => invoke(`${CHANNEL_PREFIX}updater:quitAndInstall`),
    setConfig: config =>
      invoke(`${CHANNEL_PREFIX}updater:setConfig`, config),
  },
  clipboard: {
    copyAsPNG: () => invoke(`${CHANNEL_PREFIX}clipboard:copyAsPNG`),
  },
  dialog: {
    saveDBFileAs: (...args) =>
      invoke(`${CHANNEL_PREFIX}dialog:saveDBFileAs`, ...args),
  },
  workspace: {
    listLocalWorkspaceIds: () =>
      invoke(`${CHANNEL_PREFIX}workspace:listLocalWorkspaceIds`),
    moveToTrash: id =>
      invoke(`${CHANNEL_PREFIX}workspace:moveToTrash`, id),
    getBackupWorkspaces: () =>
      invoke(`${CHANNEL_PREFIX}workspace:getBackupWorkspaces`),
    recoverBackupWorkspace: (...args) =>
      invoke(`${CHANNEL_PREFIX}workspace:recoverBackupWorkspace`, ...args),
    deleteBackupWorkspace: (...args) =>
      invoke(`${CHANNEL_PREFIX}workspace:deleteBackupWorkspace`, ...args),
  },
  fastBoot: {
    setRoute: data => invoke(`${CHANNEL_PREFIX}fastBoot:setRoute`, data),
  },
};

const sharedStorage = {
  globalState: createStore('globalState'),
  globalCache: createStore('globalCache'),
};

const appInfo = {
  windowName: 'main',
  viewId: 'main',
  platform: process.platform,
  version: process.versions.electron,
};

contextBridge.exposeInMainWorld('__ELECTRON_SHELL__', true);
contextBridge.exposeInMainWorld('__apis', apis);
contextBridge.exposeInMainWorld('__events', events);
contextBridge.exposeInMainWorld('__sharedStorage', sharedStorage);
contextBridge.exposeInMainWorld('__appInfo', appInfo);
