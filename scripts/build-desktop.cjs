const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const webDist = path.join(root, 'packages/frontend/apps/web/dist');
const desktopReleaseDir = path.join(root, 'releases/desktop');
const isWindows = process.platform === 'win32';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    stdio: 'inherit',
    shell: options.shell ?? false,
    env: { ...process.env, ...options.env },
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function bundleWeb() {
  const bundleEnv = {
    ...process.env,
    // Packaged Electron loads from blank:// — assets must be relative, not CDN.
    PUBLIC_PATH: '/',
  };

  if (process.env.npm_execpath) {
    run(process.execPath, [
      process.env.npm_execpath,
      'run',
      'blank',
      '--',
      'bundle',
      '-p',
      '@affine/web',
    ], { env: bundleEnv });
    return;
  }

  run('yarn', ['blank', 'bundle', '-p', '@affine/web'], {
    shell: isWindows,
    env: bundleEnv,
  });
}

function assertDesktopBundleUsesLocalAssets() {
  const indexHtml = path.join(webDist, 'index.html');
  const html = fs.readFileSync(indexHtml, 'utf8');
  if (/affineassets\.com/i.test(html)) {
    console.error(
      'Desktop bundle must not load JS/CSS from affineassets CDN.\n' +
        'Rebuild with npm run desktop:build (uses PUBLIC_PATH=/).'
    );
    process.exit(1);
  }
  if (!/src="\/js\//.test(html) && !/src='\/js\//.test(html)) {
    console.error(
      'Desktop bundle index.html has no local /js/ script tags.\n' +
        'Expected PUBLIC_PATH=/ for Electron packaging.'
    );
    process.exit(1);
  }
}

function ensureExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    console.error(`Missing ${label}: ${targetPath}`);
    process.exit(1);
  }
}

function cleanDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  try {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
  } catch (error) {
    console.warn(`Could not fully clean ${dir}: ${error?.message || error}`);
  }
}

function copyArtifacts(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  const copied = [];

  for (const entry of fs.readdirSync(sourceDir)) {
    if (!/\.exe$/i.test(entry) && !/\.blockmap$/i.test(entry)) {
      continue;
    }
    const from = path.join(sourceDir, entry);
    const to = path.join(targetDir, entry);
    try {
      if (fs.existsSync(to)) {
        fs.unlinkSync(to);
      }
      fs.copyFileSync(from, to);
      copied.push(to);
    } catch (error) {
      console.error(
        `Failed to copy ${entry} to releases/desktop.\n` +
          `Close Blank if it is running, then retry.\n` +
          `Detail: ${error?.message || error}`
      );
      process.exit(1);
    }
  }

  return copied;
}

console.log('Step 1/5: Generating Blank icons...');
run('node', ['scripts/generate-blank-icons.cjs']);

console.log('Step 2/5: Building desktop web bundle (@affine/web)...');
if (
  process.env.BLANK_SKIP_WEB_BUNDLE === '1' &&
  fs.existsSync(path.join(webDist, 'index.html'))
) {
  console.log('  Skipping web bundle (BLANK_SKIP_WEB_BUNDLE=1, dist exists).');
} else {
  bundleWeb();
}
ensureExists(path.join(webDist, 'index.html'), 'web index.html');
assertDesktopBundleUsesLocalAssets();

const stagingDir = path.join(
  os.tmpdir(),
  `blank-desktop-build-${process.pid}`
);
cleanDir(stagingDir);
// Do not rm releases/desktop — Windows locks open EXEs (EPERM). Overwrite in copy step.
fs.mkdirSync(desktopReleaseDir, { recursive: true });

console.log('Step 3/5: Packaging Windows desktop app with electron-builder...');
console.log(`  Staging output: ${stagingDir}`);

run(
  'npx',
  [
    'electron-builder',
    '--config',
    'electron-builder.json',
    '--win',
    `--config.directories.output=${stagingDir}`,
  ],
  { shell: true }
);

console.log('Step 4/5: Copying installers into releases/desktop...');
const artifacts = copyArtifacts(stagingDir, desktopReleaseDir);

console.log('Step 5/5: Cleaning temporary build folder...');
cleanDir(stagingDir);

console.log('\nDesktop build finished.');
if (artifacts.length) {
  for (const file of artifacts) {
    console.log(`  ${path.relative(root, file)}`);
  }
} else {
  console.log('  Check releases/desktop/ for Blank-Setup and Blank-Portable EXE files.');
}

console.log(
  '\nInstall on PC: run Blank-Setup-*.exe, or use Blank-Portable-*.exe without install.'
);
