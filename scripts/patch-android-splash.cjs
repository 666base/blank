/**
 * Dark launch window for Capacitor Android — no white flash before WebView paints.
 * Run after `cap sync android`.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const androidDir = path.join(root, 'packages/frontend/apps/mobile/android');
const resDir = path.join(androidDir, 'app/src/main/res');
const valuesDir = path.join(resDir, 'values');
const stylesPath = path.join(valuesDir, 'styles.xml');
const colorsPath = path.join(valuesDir, 'colors.xml');
const manifestPath = path.join(androidDir, 'app/src/main/AndroidManifest.xml');

if (!fs.existsSync(androidDir)) {
  console.log('patch-android-splash: android/ not found, skipping');
  process.exit(0);
}

fs.mkdirSync(valuesDir, { recursive: true });

const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#141414</color>
    <color name="colorPrimaryDark">#141414</color>
    <color name="colorAccent">#141414</color>
    <color name="blank_launch_background">#141414</color>
</resources>
`;

const stylesXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:windowBackground">@color/blank_launch_background</item>
        <item name="android:statusBarColor">@android:color/transparent</item>
        <item name="android:navigationBarColor">@color/blank_launch_background</item>
    </style>

    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme">
        <item name="android:windowBackground">@color/blank_launch_background</item>
    </style>
</resources>
`;

fs.writeFileSync(colorsPath, colorsXml, 'utf8');
fs.writeFileSync(stylesPath, stylesXml, 'utf8');

if (fs.existsSync(manifestPath)) {
  let manifest = fs.readFileSync(manifestPath, 'utf8');
  if (!manifest.includes('android:hardwareAccelerated')) {
    manifest = manifest.replace(
      '<application',
      '<application android:hardwareAccelerated="true"'
    );
  }
  if (!manifest.includes('windowSoftInputMode')) {
    manifest = manifest.replace(
      /<activity([^>]*android:name="[^"]*MainActivity"[^>]*)>/,
      '<activity$1 android:windowSoftInputMode="adjustResize">'
    );
  }
  if (!manifest.includes('AppTheme.NoActionBarLaunch')) {
    manifest = manifest.replace(
      /android:theme="@style\/AppTheme"/,
      'android:theme="@style/AppTheme.NoActionBarLaunch"'
    );
  }
  fs.writeFileSync(manifestPath, manifest, 'utf8');
}

console.log('Patched Android launch theme (solid #141414, no white splash).');
