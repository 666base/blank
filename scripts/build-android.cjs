const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const mobileRoot = path.join(root, 'packages/frontend/apps/mobile');
const mobileDist = path.join(mobileRoot, 'dist');
const androidDir = path.join(mobileRoot, 'android');
const isWindows = process.platform === 'win32';
const gradlew = path.join(
  androidDir,
  isWindows ? 'gradlew.bat' : 'gradlew'
);

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

function commandExists(command, args = ['-version']) {
  const result = spawnSync(command, args, {
    stdio: 'ignore',
    shell: isWindows,
  });
  return result.status === 0;
}

function detectJavaHome() {
  if (process.env.JAVA_HOME && fs.existsSync(process.env.JAVA_HOME)) {
    return process.env.JAVA_HOME;
  }

  const adoptiumDir = 'C:\\Program Files\\Eclipse Adoptium';
  if (fs.existsSync(adoptiumDir)) {
    const jdk21 = fs
      .readdirSync(adoptiumDir)
      .filter(name => name.startsWith('jdk-21'))
      .sort()
      .reverse();
    for (const name of jdk21) {
      const candidate = path.join(adoptiumDir, name);
      if (fs.existsSync(path.join(candidate, 'bin', 'java.exe'))) {
        return candidate;
      }
    }
  }

  const candidates = [
    'C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.11.10-hotspot',
    'C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.19.10-hotspot',
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, 'bin', 'java.exe'))) {
      return candidate;
    }
  }

  return '';
}

function detectAndroidHome() {
  const fromEnv = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || '';
  if (fromEnv && fs.existsSync(fromEnv)) {
    return fromEnv;
  }

  const localSdk = path.join(
    process.env.LOCALAPPDATA || '',
    'Android',
    'Sdk'
  );
  if (localSdk && fs.existsSync(localSdk)) {
    return localSdk;
  }

  return '';
}

function requireAndroidToolchain() {
  const javaHome = detectJavaHome();
  if (!javaHome && !commandExists('java')) {
    console.error(
      'Java JDK is not installed or not on PATH.\n' +
        'Run: powershell -ExecutionPolicy Bypass -File scripts/setup-android-sdk.ps1\n' +
        'Or install JDK 17+ and set JAVA_HOME, then retry:\n' +
        '  npm run android:build'
    );
    process.exit(1);
  }

  const androidHome = detectAndroidHome();
  if (!androidHome) {
    console.error(
      'Android SDK not found.\n' +
        'Run: powershell -ExecutionPolicy Bypass -File scripts/setup-android-sdk.ps1\n' +
        'Then retry:\n' +
        '  npm run android:build'
    );
    process.exit(1);
  }

  if (javaHome) {
    process.env.JAVA_HOME = javaHome;
    const javaBin = path.join(javaHome, 'bin');
    process.env.Path = `${javaBin};${process.env.Path || ''}`;
  }

  process.env.ANDROID_HOME = androidHome;
  process.env.ANDROID_SDK_ROOT = androidHome;
  const platformTools = path.join(androidHome, 'platform-tools');
  if (fs.existsSync(platformTools)) {
    process.env.Path = `${platformTools};${process.env.Path || ''}`;
  }

  console.log(`Using JAVA_HOME=${process.env.JAVA_HOME || '(PATH)'}`);
  console.log(`Using ANDROID_HOME=${androidHome}`);
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

function bundleMobile() {
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
      '@affine/mobile',
    ], { env: bundleEnv });
    return;
  }

  run('yarn', ['blank', 'bundle', '-p', '@affine/mobile'], {
    shell: isWindows,
    env: bundleEnv,
  });
}

function assertMobileBundleUsesLocalAssets() {
  const indexHtml = path.join(mobileDist, 'index.html');
  const html = fs.readFileSync(indexHtml, 'utf8');
  if (/affineassets\.com/i.test(html)) {
    console.error(
      'Mobile bundle must not load JS/CSS from affineassets CDN.\n' +
        'Rebuild with npm run android:build (uses PUBLIC_PATH=/).'
    );
    process.exit(1);
  }
  if (!/src="\/js\//.test(html) && !/src='\/js\//.test(html)) {
    console.error(
      'Mobile bundle index.html has no local /js/ script tags.\n' +
        'Expected PUBLIC_PATH=/ for Capacitor packaging.'
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

requireAndroidToolchain();

console.log('Step 1/5: Generating Blank icons...');
run('node', ['scripts/generate-blank-icons.cjs']);

console.log('Step 2/5: Building mobile web bundle (@affine/mobile)...');
if (
  process.env.BLANK_SKIP_MOBILE_BUNDLE === '1' &&
  fs.existsSync(path.join(mobileDist, 'index.html'))
) {
  console.log('  Skipping mobile bundle (BLANK_SKIP_MOBILE_BUNDLE=1, dist exists).');
} else {
  bundleMobile();
}
ensureExists(path.join(mobileDist, 'index.html'), 'mobile index.html');
assertMobileBundleUsesLocalAssets();
assertNoAiInBundle(path.join(mobileDist, 'js'), 'mobile');

if (!fs.existsSync(androidDir)) {
  console.log('Step 3/5: Creating Android project (first run)...');
  run('npx', ['cap', 'add', 'android'], { cwd: mobileRoot, shell: true });
} else {
  console.log('Step 3/5: Android project already exists.');
}

console.log('Step 4/5: Syncing web assets to Android...');
run('npx', ['cap', 'sync', 'android'], { cwd: mobileRoot, shell: true });

run('node', ['scripts/android/ensure-keystore.cjs']);
run('node', ['scripts/patch-android-signing.cjs']);

ensureExists(gradlew, 'Gradle wrapper');

const packageVersion = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
).version;

console.log('Step 5/5: Building release APK (signed for sideload)...');
run(gradlew, ['assembleRelease', '--no-daemon'], {
  cwd: androidDir,
  shell: isWindows,
});

const apkPath = path.join(
  androidDir,
  'app/build/outputs/apk/release/app-release.apk'
);
ensureExists(apkPath, 'APK');

const releasesDir = path.join(root, 'releases/android');
fs.mkdirSync(releasesDir, { recursive: true });
const releaseApk = path.join(releasesDir, `Blank-${packageVersion}.apk`);
const releaseApkLatest = path.join(releasesDir, 'Blank.apk');
fs.copyFileSync(apkPath, releaseApk);
fs.copyFileSync(apkPath, releaseApkLatest);

// Remove legacy debug artifact name if present
const legacyDebug = path.join(releasesDir, 'Blank-debug.apk');
if (fs.existsSync(legacyDebug)) {
  try {
    fs.unlinkSync(legacyDebug);
  } catch {
    // ignore
  }
}

console.log('\nAndroid build finished.');
console.log(`APK: ${releaseApk}`);
console.log(`Also: ${releaseApkLatest}`);
console.log(
  '\nInstall from GitHub: signed release APK (not debug). Play Protect may still ask once — choose Install anyway.'
);
