/**
 * Allow in-app APK install after download (Settings → About → Update).
 * Run after `cap sync android`.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const androidDir = path.join(root, 'packages/frontend/apps/mobile/android');
const manifestPath = path.join(androidDir, 'app/src/main/AndroidManifest.xml');

if (!fs.existsSync(manifestPath)) {
  console.log('patch-android-apk-install: AndroidManifest.xml not found, skipping');
  process.exit(0);
}

let manifest = fs.readFileSync(manifestPath, 'utf8');

if (!manifest.includes('android.permission.REQUEST_INSTALL_PACKAGES')) {
  manifest = manifest.replace(
    /<application/,
    '    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />\n\n    <application'
  );
}

fs.writeFileSync(manifestPath, manifest, 'utf8');
console.log('Patched Android manifest for in-app APK install.');
