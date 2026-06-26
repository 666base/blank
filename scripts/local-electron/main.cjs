const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { app, BrowserWindow, Menu, net, protocol, shell } = require('electron');
const { registerBlankDesktopApi } = require('./blank-desktop-api-main.cjs');

const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';
const preloadPath = path.join(__dirname, 'preload.cjs');
const APP_SCHEME = 'blank';

protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_SCHEME,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

app.setName('Blank');

function shouldUsePackagedWeb() {
  return app.isPackaged || process.env.BLANK_USE_PACKAGED_PROTOCOL === '1';
}

function getWebRoot() {
  if (shouldUsePackagedWeb()) {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, 'web');
    }
    return path.join(__dirname, 'web');
  }
  return path.join(__dirname, 'web');
}

const LAST_ROUTE_FILE = 'blank-last-route.json';
const DEFAULT_INSTANT_ROUTE = {
  workspaceId: 'blank-default',
  pageId: null,
  flavour: 'local',
};

function ensureDefaultRouteFile() {
  try {
    const file = path.join(app.getPath('userData'), LAST_ROUTE_FILE);
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(DEFAULT_INSTANT_ROUTE));
    }
  } catch {
    // ignore
  }
}

function readLastRoutePath() {
  try {
    const file = path.join(app.getPath('userData'), LAST_ROUTE_FILE);
    if (!fs.existsSync(file)) {
      return null;
    }
    const { workspaceId, pageId } = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!workspaceId) {
      return null;
    }
    if (pageId) {
      return `/workspace/${workspaceId}/${pageId}`;
    }
    return `/workspace/${workspaceId}/all`;
  } catch {
    return null;
  }
}

function getStartUrl() {
  ensureDefaultRouteFile();
  const route =
    readLastRoutePath() ??
    `/workspace/${DEFAULT_INSTANT_ROUTE.workspaceId}/all`;
  if (process.env.BLANK_DESKTOP_URL) {
    const base = process.env.BLANK_DESKTOP_URL.replace(/\/$/, '');
    return route ? `${base}${route}` : process.env.BLANK_DESKTOP_URL;
  }
  if (shouldUsePackagedWeb()) {
    const base = `${APP_SCHEME}://app`;
    return route ? `${base}${route}` : `${base}/`;
  }
  const base = 'http://127.0.0.1:8080';
  return route ? `${base}${route}` : base;
}

function registerPackagedProtocol() {
  const webRoot = path.resolve(getWebRoot());

  protocol.handle(APP_SCHEME, request => {
    const url = new URL(request.url);
    let relativePath = decodeURIComponent(url.pathname);
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.slice(1);
    }
    // blank://app/index.html — hostname is not part of the filesystem path
    if (!relativePath && url.hostname && url.hostname !== 'localhost') {
      relativePath = 'index.html';
    }
    if (!relativePath || relativePath.endsWith('/')) {
      relativePath = 'index.html';
    }

    let filePath = path.normalize(path.join(webRoot, relativePath));
    if (!filePath.startsWith(webRoot)) {
      return new Response('Not found', { status: 404 });
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(webRoot, 'index.html');
    }

    return net.fetch(pathToFileURL(filePath).toString());
  });
}

function buildErrorPage(url, detail) {
  const safeUrl = String(url).replace(/</g, '&lt;');
  const safeDetail = String(detail).replace(/</g, '&lt;');
  const hint = isDev
    ? '<p>Run <code>npm run electron:dev</code> in the project folder and wait until the terminal shows <code>compiled successfully</code>.</p>'
    : '<p>Reinstall the application or rebuild with <code>npm run desktop:build</code>.</p>';

  return `data:text/html;charset=utf-8,${encodeURIComponent(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Blank — cannot load</title>
    <style>
      body { font-family: system-ui, sans-serif; background: #111; color: #eee; padding: 32px; line-height: 1.5; }
      h1 { margin: 0 0 12px; font-size: 20px; }
      code { background: #222; padding: 2px 6px; border-radius: 4px; }
      p { color: #bbb; }
    </style>
  </head>
  <body>
    <h1>Cannot load Blank</h1>
    <p>URL: <code>${safeUrl}</code></p>
    <p>${safeDetail}</p>
    ${hint}
  </body>
</html>`)}`;
}

function isInternalUrl(targetUrl, appUrl) {
  try {
    const target = new URL(targetUrl);
    const app = new URL(appUrl);

    if (target.protocol === `${APP_SCHEME}:` && app.protocol === `${APP_SCHEME}:`) {
      return true;
    }

    return target.origin === app.origin;
  } catch {
    return false;
  }
}

let mainWindow = null;
let blankApi = null;

function syncFastBootToLocalStorage(win) {
  if (!win || win.isDestroyed()) {
    return;
  }
  try {
    const file = path.join(app.getPath('userData'), LAST_ROUTE_FILE);
    const { workspaceId, pageId, flavour } = JSON.parse(
      fs.readFileSync(file, 'utf8')
    );
    if (!workspaceId) {
      return;
    }
    const script = `(function(){try{
      localStorage.setItem("last_workspace_id",${JSON.stringify(workspaceId)});
      ${pageId ? `localStorage.setItem("last_page_id",${JSON.stringify(pageId)});` : ''}
      ${flavour ? `localStorage.setItem("last_workspace_flavour",${JSON.stringify(flavour)});` : ''}
    }catch(e){}})();`;
    void win.webContents.executeJavaScript(script);
  } catch {
    // ignore
  }
}

function createWindow() {
  const startUrl = getStartUrl();
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 620,
    title: 'Blank',
    backgroundColor: '#121212',
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: preloadPath,
    },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isInternalUrl(url, startUrl)) {
      return { action: 'allow' };
    }

    void shell.openExternal(url);
    return { action: 'deny' };
  });

  const loadApp = (attempt = 0) => {
    void win.loadURL(startUrl).catch(error => {
      const message = error?.message || String(error);
      if (attempt < 30 && isDev) {
        setTimeout(() => loadApp(attempt + 1), 1000);
        return;
      }
      void win.loadURL(
        buildErrorPage(startUrl, message || 'Application bundle is not reachable.')
      );
    });
  };

  win.webContents.on(
    'did-fail-load',
    (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      if (!isMainFrame) {
        return;
      }
      console.error(
        `Failed to load ${validatedURL}: [${errorCode}] ${errorDescription}`
      );
      if (isDev && errorCode === -102) {
        setTimeout(() => loadApp(), 1000);
        return;
      }
      void win.loadURL(
        buildErrorPage(validatedURL, `[${errorCode}] ${errorDescription}`)
      );
    }
  );

  loadApp();

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  win.webContents.on('did-finish-load', () => {
    syncFastBootToLocalStorage(win);
    if (isDev) {
      console.log(`Loaded ${win.webContents.getURL()}`);
    }
  });

  blankApi?.attachWindow(win);
  mainWindow = win;

  return win;
}

app.whenReady().then(() => {
  ensureDefaultRouteFile();
  blankApi = registerBlankDesktopApi(() => mainWindow);

  if (shouldUsePackagedWeb()) {
    registerPackagedProtocol();
  }

  Menu.setApplicationMenu(null);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
