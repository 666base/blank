const { app } = require('electron');

const GITHUB_OWNER = '666base';
const GITHUB_REPO = 'blank';

/** @type {{ autoCheckUpdate: boolean; autoDownloadUpdate: boolean }} */
let config = {
  autoCheckUpdate: true,
  autoDownloadUpdate: true,
};

/** @type {((name: string, payload: unknown) => void) | null} */
let emitToRenderer = null;

let autoCheckTimer = null;
let initialized = false;
/** @type {import('electron-updater').AppUpdater | null} */
let autoUpdater = null;

function getAutoUpdater() {
  if (!autoUpdater) {
    ({ autoUpdater } = require('electron-updater'));
  }
  return autoUpdater;
}

function getAppVersion() {
  return app.getVersion();
}

function toUpdateMeta(info) {
  return {
    version: info?.version ?? getAppVersion(),
    allowAutoUpdate: true,
  };
}

function emit(name, payload) {
  emitToRenderer?.(name, payload);
}

function scheduleAutoCheck() {
  if (!app.isPackaged || !config.autoCheckUpdate) {
    return;
  }
  if (autoCheckTimer) {
    clearTimeout(autoCheckTimer);
  }
  autoCheckTimer = setTimeout(() => {
    void getAutoUpdater()
      .checkForUpdates()
      .catch(error => {
        console.warn('[blank-updater] auto check failed:', error?.message || error);
      });
  }, 10_000);
}

function bindAutoUpdaterEvents() {
  const updater = getAutoUpdater();
  updater.autoInstallOnAppQuit = true;
  updater.autoDownload = false;
  updater.allowDowngrade = false;
  updater.disableWebInstaller = false;

  updater.on('update-available', info => {
    emit('updater:onUpdateAvailable', toUpdateMeta(info));
    if (config.autoDownloadUpdate) {
      void updater.downloadUpdate().catch(error => {
        console.warn('[blank-updater] auto download failed:', error?.message || error);
      });
    }
  });

  updater.on('update-not-available', () => {
    // no-op — manual check resolves from promise
  });

  updater.on('download-progress', progress => {
    emit('updater:onDownloadProgress', progress.percent ?? 0);
  });

  updater.on('update-downloaded', info => {
    emit('updater:onUpdateReady', toUpdateMeta(info));
    emit('updater:onDownloadProgress', null);
  });

  updater.on('error', error => {
    console.warn('[blank-updater]', error?.message || error);
    emit('updater:onDownloadProgress', null);
  });
}

function initBlankUpdater(emit) {
  if (initialized) {
    return;
  }
  initialized = true;
  emitToRenderer = emit;
  bindAutoUpdaterEvents();

  if (!app.isPackaged) {
    return;
  }

  getAutoUpdater().setFeedURL({
    provider: 'github',
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
  });

  scheduleAutoCheck();
}

function setUpdaterConfig(next) {
  config = {
    autoCheckUpdate:
      typeof next.autoCheckUpdate === 'boolean'
        ? next.autoCheckUpdate
        : config.autoCheckUpdate,
    autoDownloadUpdate:
      typeof next.autoDownloadUpdate === 'boolean'
        ? next.autoDownloadUpdate
        : config.autoDownloadUpdate,
  };

  if (app.isPackaged) {
    scheduleAutoCheck();
  }
}

async function currentVersion() {
  return getAppVersion();
}

async function checkForUpdates() {
  if (!app.isPackaged) {
    return { version: false };
  }

  const result = await getAutoUpdater().checkForUpdates();
  const remoteVersion = result?.updateInfo?.version;
  if (remoteVersion && remoteVersion !== getAppVersion()) {
    return { version: remoteVersion, allowAutoUpdate: true };
  }
  return { version: false };
}

async function downloadUpdate() {
  if (!app.isPackaged) {
    return;
  }
  await getAutoUpdater().downloadUpdate();
}

async function quitAndInstall() {
  if (!app.isPackaged) {
    return;
  }
  getAutoUpdater().quitAndInstall(false, true);
}

const updaterHandlers = {
  currentVersion,
  checkForUpdates,
  downloadUpdate,
  quitAndInstall,
  setConfig: async next => setUpdaterConfig(next),
};

module.exports = {
  initBlankUpdater,
  updaterHandlers,
};
