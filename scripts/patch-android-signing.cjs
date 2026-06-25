/**
 * Apply release signing to the Capacitor Android project (regenerated folder).
 * Run after `cap sync android`.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const androidDir = path.join(root, 'packages/frontend/apps/mobile/android');
const appGradle = path.join(androidDir, 'app/build.gradle');
const signingPropsSrc = path.join(root, 'scripts/android/keystore.properties');
const signingPropsDest = path.join(androidDir, 'keystore.properties');
const keystoreSrc = path.join(root, 'scripts/android/blank-release.keystore');
const keystoreDest = path.join(androidDir, 'app/blank-release.keystore');
const marker = '// BLANK_RELEASE_SIGNING';

const packageVersion = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
).version;
const versionCode = (() => {
  const [major = 0, minor = 0, patch = 0] = packageVersion
    .split('.')
    .map(n => Number(n) || 0);
  return major * 10000 + minor * 100 + patch;
})();

function copySigningAssets() {
  if (!fs.existsSync(signingPropsSrc) || !fs.existsSync(keystoreSrc)) {
    console.error('Missing signing files. Run: node scripts/android/ensure-keystore.cjs');
    process.exit(1);
  }
  fs.copyFileSync(signingPropsSrc, signingPropsDest);
  fs.copyFileSync(keystoreSrc, keystoreDest);
}

function patchAppBuildGradle() {
  if (!fs.existsSync(appGradle)) {
    console.error(`Missing ${appGradle}. Run cap sync first.`);
    process.exit(1);
  }

  let gradle = fs.readFileSync(appGradle, 'utf8');

  gradle = gradle.replace(
    /versionCode \d+/,
    `versionCode ${versionCode}`
  );
  gradle = gradle.replace(
    /versionName "[^"]*"/,
    `versionName "${packageVersion}"`
  );

  if (!gradle.includes(marker)) {
    gradle = gradle.replace(
      /buildTypes \{/,
      `${marker}
    signingConfigs {
        release {
            def keystorePropertiesFile = rootProject.file("keystore.properties")
            def keystoreProperties = new Properties()
            keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }

    buildTypes {`
    );

    gradle = gradle.replace(
      /release \{\s*\n\s*minifyEnabled false/,
      `release {
            signingConfig signingConfigs.release
            minifyEnabled false`
    );
  }

  fs.writeFileSync(appGradle, gradle, 'utf8');
}

copySigningAssets();
patchAppBuildGradle();
console.log(`Android release signing configured (v${packageVersion}).`);
