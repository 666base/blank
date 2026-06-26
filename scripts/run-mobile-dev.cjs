const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const { applyToProcessEnv } = require('./load-blank-server-env.cjs');
const { ensureBlankServerDocker } = require('./ensure-blank-server-docker.cjs');

const loaded = applyToProcessEnv();
if (loaded.BLANK_SUPABASE_URL) {
  console.log(
    `[mobile:dev] Supabase from services/blank-server/.env → ${loaded.BLANK_SUPABASE_URL}`
  );
}

const runner = path.join(root, 'tools/cli/bin/runner.js');
const env = {
  ...process.env,
  PORT: process.env.PORT || '8081',
};

const children = new Set();

function stopAll(code = 0) {
  for (const child of children) {
    try {
      child.kill();
    } catch {
      // ignore
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

void (async () => {
  await ensureBlankServerDocker();

  const child = spawn(
    process.execPath,
    [runner, 'blank.ts', 'bundle', '-p', '@blank/mobile', '--dev'],
    {
      cwd: root,
      env,
      stdio: 'inherit',
      shell: false,
      windowsHide: true,
    }
  );

  children.add(child);
  child.on('exit', code => stopAll(code || 0));
})().catch(error => {
  console.error(error);
  stopAll(1);
});
