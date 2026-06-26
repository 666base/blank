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

function assertNoAiInBundle(distDir, label) {
  if (!fs.existsSync(distDir)) return;
  const suspicious = [
    'edgeless-copilot',
    'AIChatContent',
    'copilot-client',
    'registerAIAppEffects',
  ];
  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.js$/i.test(entry.name)) {
        const text = fs.readFileSync(full, 'utf8');
        for (const needle of suspicious) {
          if (text.includes(needle)) {
            console.error(
              `${label}: AI artifact "${needle}" found in ${path.relative(root, full)}`
            );
            process.exit(1);
          }
        }
      }
    }
  };
  walk(distDir);
  console.log(`  Verified ${label} bundle has no obvious AI modules.`);
}

function bundleWeb() {
  const bundleEnv = {
    ...process.env,
    PUBLIC_PATH: '/',
    BLANK_NO_AI: '1',
  };
  if (bundleEnv.BLANK_SYNC_SERVER_URL) {
    console.log(`Sync server URL baked in: ${bundleEnv.BLANK_SYNC_SERVER_URL}`);
  }

  if (process.env.npm_execpath) {
    run(process.execPath, [
      process.env.npm_execpath,
      'run',
      'blank',
      '--',
      'bundle',
      '-p',
      '@blank/web',
    ], { env: bundleEnv });
    return;
  }

  run('yarn', ['blank', 'bundle', '-p', '@blank/web'], {
    shell: isWindows,
    env: bundleEnv,
  });
}

function assertDesktopBundleUsesLocalAssets() {
  const indexHtml = path.join(webDist, 'index.html');
  const html = fs.readFileSync(indexHtml, 'utf8');
  if (/blankassets\.com/i.test(html)) {
    console.error(
      'Desktop bundle must not load JS/CSS from blankassets CDN.\n' +
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
    if (
      !/\.exe$/i.test(entry) &&
      !/\.blockmap$/i.test(entry) &&
      !/^latest.*\.yml$/i.test(entry)
    ) {
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

function assertElectronPackageIncludesShell(stagingDir) {
  const candidates = [
    path.join(stagingDir, 'win-unpacked/resources/app.asar'),
    path.join(stagingDir, 'resources/app.asar'),
  ];
  const asarPath = candidates.find(p => fs.existsSync(p));
  if (!asarPath) {
    console.error('Could not find app.asar in electron-builder output to verify shell files.');
    process.exit(1);
  }

  const result = spawnSync(
    'npx',
    ['--yes', '@electron/asar', 'list', asarPath],
    { encoding: 'utf8', shell: true }
  );
  if (result.status !== 0) {
    console.error('Failed to read app.asar for verification.');
    process.exit(result.status || 1);
  }

  const listing = result.stdout || '';
  const required = [
    'scripts/local-electron/main.cjs',
    'scripts/local-electron/preload.cjs',
    'scripts/local-electron/blank-desktop-api-main.cjs',
    'scripts/local-electron/kv-store.cjs',
    'scripts/local-electron/updater-main.cjs',
  ];
  const missing = required.filter(
    file => !listing.includes(file) && !listing.includes(file.replace(/\//g, '\\'))
  );
  if (missing.length) {
    console.error('Electron package is missing required shell files:');
    for (const file of missing) {
      console.error(`  ${file}`);
    }
    process.exit(1);
  }
  console.log('  Verified electron shell modules inside app.asar');
}

function cleanStaleDesktopReleaseArtifacts() {
  const staleRoots = [
    path.join(root, 'releases/desktop-build'),
    path.join(desktopReleaseDir, 'win-unpacked'),
    path.join(desktopReleaseDir, 'win-unpacked.tmp'),
  ];
  for (const dir of staleRoots) {
    cleanDir(dir);
  }
  const stalePortable = path.join(desktopReleaseDir, 'Blank-Portable-0.27.0.exe');
  if (fs.existsSync(stalePortable)) {
    try {
      fs.unlinkSync(stalePortable);
      console.log('  removed stale Blank-Portable (portable builds disabled)');
    } catch (error) {
      console.warn(
        `Could not remove stale portable EXE (close Blank if running): ${error?.message || error}`
      );
    }
  }
}

console.log('Step 1/5: Generating Blank icons...');
run('node', ['scripts/generate-blank-icons.cjs']);

console.log('Step 2/5: Building desktop web bundle (@blank/web)...');
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
assertNoAiInBundle(path.join(webDist, 'js'), 'desktop web');

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

assertElectronPackageIncludesShell(stagingDir);

console.log('Step 4/5: Copying installer into releases/desktop...');
const artifacts = copyArtifacts(stagingDir, desktopReleaseDir);
cleanStaleDesktopReleaseArtifacts();

console.log('Step 5/5: Cleaning temporary build folder...');
cleanDir(stagingDir);

console.log('\nDesktop build finished.');
if (artifacts.length) {
  for (const file of artifacts) {
    console.log(`  ${path.relative(root, file)}`);
  }
} else {
  console.log('  Check releases/desktop/ for Blank-Setup-*.exe.');
}

console.log('\nInstall on PC: run Blank-Setup-*.exe (normal Windows installer).');

run('node', ['scripts/generate-release-manifest.cjs']);
