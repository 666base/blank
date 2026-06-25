const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '..', '..');
const devInfoFile = path.join(root, '.blank', 'electron-dev-server.json');
const isWindows = process.platform === 'win32';

function resolveDevServerUrl() {
  if (process.env.AFFINE_DESKTOP_URL) {
    return process.env.AFFINE_DESKTOP_URL;
  }

  try {
    const info = JSON.parse(fs.readFileSync(devInfoFile, 'utf8'));
    if (info.url) {
      return info.url;
    }
  } catch {
    // no active electron:dev session
  }

  return 'http://127.0.0.1:8080';
}

function canConnect(targetUrl) {
  return new Promise(resolve => {
    const req = http.get(targetUrl, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 16384) {
          res.destroy();
        }
      });
      res.on('end', () => {
        resolve(
          res.statusCode >= 200 &&
            res.statusCode < 500 &&
            data.includes('id="app"')
        );
      });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

let electronPath;
try {
  electronPath = require('electron');
} catch {
  console.error('Electron is not installed. Run `npm install` or `yarn install` first.');
  process.exit(1);
}

const mainPath = path.join(__dirname, 'main.cjs');

(async () => {
  const url = resolveDevServerUrl();
  const reachable = await canConnect(url);
  if (!reachable) {
    console.error(
      `Dev server is not running at ${url}.\n` +
        'Start it first with: npm run electron:dev\n' +
        'Do NOT use electron:open without a running dev server.'
    );
    process.exit(1);
  }

  const child = spawn(electronPath, [mainPath], {
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || 'development',
      AFFINE_DESKTOP_URL: url,
      AFFINE_ENABLE_BACKEND_PROXY:
        process.env.AFFINE_ENABLE_BACKEND_PROXY || 'false',
    },
    windowsHide: isWindows,
  });

  child.on('exit', code => process.exit(code || 0));
})();
