const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const version = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
).version;
const tag = `v${version}`;

const manifest = {
  version,
  tag,
  desktopExe: `Blank-Setup-${version}.exe`,
  androidApk: `Blank-${version}.apk`,
  publishedAt: new Date().toISOString(),
  releaseUrl: `https://github.com/666base/blank-releases/releases/tag/${tag}`,
};

const desktopDir = path.join(root, 'releases/desktop');
const androidDir = path.join(root, 'releases/android');
fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(androidDir, { recursive: true });

const desktopManifest = path.join(desktopDir, 'version.json');
const androidManifest = path.join(androidDir, 'version.json');
const payload = `${JSON.stringify(manifest, null, 2)}\n`;

fs.writeFileSync(desktopManifest, payload, 'utf8');
fs.writeFileSync(androidManifest, payload, 'utf8');

console.log(`Release manifest written for ${tag}`);
console.log(`  ${path.relative(root, desktopManifest)}`);
console.log(`  ${path.relative(root, androidManifest)}`);
