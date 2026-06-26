/**
 * Ensure Blank server Docker stack is running (Supabase config proxy on :3020).
 * Skipped when BLANK_SKIP_DOCKER=1 or BLANK_NO_DOCKER=1.
 */
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const composeFile = path.join(root, 'services/blank-server/docker-compose.yml');
const serverDir = path.join(root, 'services/blank-server');
const envFile = path.join(serverDir, '.env');
const envExample = path.join(serverDir, '.env.example');
const healthUrl =
  process.env.BLANK_CONFIG_PROXY_URL?.trim() || 'http://127.0.0.1:3020/health';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function dockerAvailable() {
  const r = spawnSync('docker', ['info'], {
    encoding: 'utf8',
    stdio: 'pipe',
    windowsHide: true,
  });
  return r.status === 0;
}

function runDockerCompose(args) {
  const r = spawnSync(
    'docker',
    ['compose', '-f', composeFile, ...args],
    { cwd: root, encoding: 'utf8', stdio: 'inherit', windowsHide: true }
  );
  if (r.status !== 0) {
    throw new Error(`docker compose ${args.join(' ')} failed (code ${r.status})`);
  }
}

function ensureEnvFile() {
  if (fs.existsSync(envFile)) {
    return;
  }
  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envFile);
    console.warn(
      '[blank-docker] Created services/blank-server/.env from .env.example — add SUPABASE_URL and SUPABASE_ANON_KEY.'
    );
    return;
  }
  console.warn('[blank-docker] No .env found in services/blank-server/');
}

function checkHealth() {
  return new Promise(resolve => {
    const req = http.get(healthUrl, res => {
      let body = '';
      res.on('data', c => {
        body += c;
      });
      res.on('end', () => {
        resolve(
          res.statusCode === 200 &&
            body.includes('"ok":true') &&
            body.includes('blank-server')
        );
      });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForHealthy(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await checkHealth()) {
      return true;
    }
    await sleep(1500);
  }
  return false;
}

async function ensureBlankServerDocker() {
  if (
    process.env.BLANK_SKIP_DOCKER === '1' ||
    process.env.BLANK_NO_DOCKER === '1'
  ) {
    console.log('[blank-docker] Skipped (BLANK_SKIP_DOCKER or BLANK_NO_DOCKER).');
    return false;
  }

  if (await checkHealth()) {
    console.log(`[blank-docker] Already running at ${healthUrl}`);
    return true;
  }

  if (!dockerAvailable()) {
    console.warn(
      '[blank-docker] Docker is not running. Start Docker Desktop, then run: npm run blank:server:up'
    );
    return false;
  }

  ensureEnvFile();
  console.log('[blank-docker] Starting Blank server (Docker)...');
  runDockerCompose(['up', '-d', '--build']);

  console.log('[blank-docker] Waiting for API health...');
  const ok = await waitForHealthy();
  if (ok) {
    console.log(`[blank-docker] Ready — ${healthUrl.replace(/\/health$/, '/v1/config')}`);
    return true;
  }

  console.warn(
    '[blank-docker] API did not become healthy in time. Check: npm run blank:server:logs'
  );
  return false;
}

if (require.main === module) {
  ensureBlankServerDocker()
    .then(ok => process.exit(ok ? 0 : 1))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { ensureBlankServerDocker, checkHealth };
