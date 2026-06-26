const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const net = require('node:net');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..');
const devInfoFile = path.join(root, '.blank', 'electron-dev-server.json');
const children = new Set();
const isWindows = process.platform === 'win32';
const DEV_SERVER_HOST = '0.0.0.0';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanDevInfo() {
  try {
    fs.unlinkSync(devInfoFile);
  } catch {
    // ignore
  }
}

async function isPortFree(port) {
  return new Promise(resolve => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, DEV_SERVER_HOST);
  });
}

async function pickDevServerPort() {
  if (process.env.BLANK_DESKTOP_URL) {
    const url = new URL(process.env.BLANK_DESKTOP_URL);
    return {
      url: process.env.BLANK_DESKTOP_URL,
      port: url.port || (url.protocol === 'https:' ? '443' : '80'),
    };
  }

  const startPort = Number(process.env.PORT || 8080);
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortFree(port)) {
      if (port !== startPort) {
        console.warn(
          `Port ${startPort} is busy, using http://127.0.0.1:${port} for Electron dev.`
        );
      }
      return { url: `http://127.0.0.1:${port}`, port: String(port) };
    }
  }

  throw new Error(
    `No free port found near ${startPort}. Stop other dev servers or set PORT / BLANK_DESKTOP_URL.`
  );
}

function run(command, args, options = {}) {
  const useShell = options.shell ?? isWindows;
  const child = spawn(command, args, {
    cwd: root,
    env: options.env,
    stdio: 'inherit',
    shell: useShell,
    windowsHide: true,
    ...options,
  });

  children.add(child);
  child.on('exit', () => children.delete(child));
  return child;
}

function stopAll(code = 0) {
  cleanDevInfo();
  for (const child of children) {
    try {
      child.kill();
    } catch {
      // ignore
    }
  }
  process.exit(code);
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

async function waitForElectronDevServer(expectedPort, timeoutMs = 300000) {
  const startedAt = Date.now();
  const pokeUrl = `http://127.0.0.1:${expectedPort}/`;
  let lastPokeAt = 0;

  while (Date.now() - startedAt < timeoutMs) {
    const now = Date.now();
    if (now - lastPokeAt >= 2000) {
      // Trigger rspack's first compile if it is waiting for a request.
      void http.get(pokeUrl, res => res.resume()).on('error', () => {});
      lastPokeAt = now;
    }

    try {
      const info = JSON.parse(fs.readFileSync(devInfoFile, 'utf8'));
      if (
        Number(info.port) === Number(expectedPort) &&
        info.url &&
        (await canConnect(info.url))
      ) {
        return info;
      }
    } catch {
      // dev-info file not written yet
    }

    const fallbackUrl = `http://127.0.0.1:${expectedPort}`;
    if (await canConnect(fallbackUrl)) {
      return { port: Number(expectedPort), url: fallbackUrl };
    }

    await sleep(1000);
  }

  throw new Error(
    `Timed out waiting for Electron dev server on port ${expectedPort}. Check the terminal for compile errors.`
  );
}

function startWebDevServer(desktopPackage, env) {
  const runner = path.join(root, 'tools', 'cli', 'bin', 'runner.js');
  return run(
    process.execPath,
    [runner, 'blank.ts', 'bundle', '-p', desktopPackage, '--dev'],
    { env, shell: false }
  );
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

(async () => {
  cleanDevInfo();

  const { ensureBlankServerDocker } = require('../ensure-blank-server-docker.cjs');
  await ensureBlankServerDocker();

  const desktopPackage = process.env.BLANK_DESKTOP_PACKAGE || '@blank/web';
  const { url: devServerUrl, port: devServerPort } = await pickDevServerPort();

  const env = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: devServerPort,
    BLANK_ELECTRON_DEV: '1',
    BLANK_NO_AI: process.env.BLANK_NO_AI || '1',
    BLANK_ENABLE_BACKEND_PROXY:
      process.env.BLANK_ENABLE_BACKEND_PROXY || 'false',
    BLANK_DESKTOP_URL: devServerUrl,
  };

  console.log(`Starting ${desktopPackage} dev server for Electron...`);
  console.log(`Target URL: ${devServerUrl}`);

  const web = startWebDevServer(desktopPackage, env);
  web.on('exit', code => {
    if (code) {
      console.error(`Dev server exited with code ${code}`);
    }
    stopAll(code || 0);
  });

  console.log('Waiting for dev server to compile (this may take a minute)...');
  const running = await waitForElectronDevServer(devServerPort);
  env.BLANK_DESKTOP_URL = running.url;

  console.log(`Dev server ready at ${running.url}`);
  console.log('Launching Electron...');

  let electronPath;
  try {
    electronPath = require('electron');
  } catch {
    console.error(
      'Electron is not installed. Run `npm install` or `yarn install` first.'
    );
    stopAll(1);
    return;
  }

  const mainPath = path.join(__dirname, 'main.cjs');
  const desktop = run(electronPath, [mainPath], { env, shell: false });
  desktop.on('exit', code => stopAll(code || 0));
})().catch(error => {
  console.error(error);
  stopAll(1);
});
