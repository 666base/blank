/**
 * Generate Blank favicons, PWA icons, Electron .ico, and Android mipmaps.
 * Source: public/brand/blank-icon-512.png (or blank-document.svg alias).
 */
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const brandDir = path.join(root, 'packages/frontend/core/public/brand');
const publicDir = path.join(root, 'packages/frontend/core/public');
const electronBuildDir = path.join(root, 'scripts/local-electron/build');
const mobileResDir = path.join(
  root,
  'packages/frontend/apps/mobile/android/app/src/main/res'
);

const sourcePng = path.join(brandDir, 'blank-icon-512.png');
const sourceSvg = path.join(brandDir, 'blank-document.svg');

const publicSizes = {
  'favicon-32.png': 32,
  'favicon-36.png': 36,
  'favicon-48.png': 48,
  'favicon-72.png': 72,
  'favicon-96.png': 96,
  'favicon-144.png': 144,
  'favicon-192.png': 192,
  'apple-touch-icon.png': 180,
  'imgs/blank-app-icon.png': 192,
};

const androidMipmaps = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

function resizePng(src, dest, size) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const ps = `
Add-Type -AssemblyName System.Drawing
$src = @'
${src.replace(/\\/g, '\\\\')}
'@
$dest = @'
${dest.replace(/\\/g, '\\\\')}
'@
$size = ${size}
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::FromArgb(255, 18, 18, 18))
$g.DrawImage($img, 0, 0, $size, $size)
$bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
`;
  const result = spawnSync(
    'powershell',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', ps],
    { stdio: 'inherit' }
  );
  if (result.status !== 0) {
    throw new Error(`Failed to resize ${dest}`);
  }
}

function writeIco(pngPath, icoPath) {
  const png = fs.readFileSync(pngPath);
  const width = png[16] === 0 ? 256 : png[16];
  const height = png[20] === 0 ? 256 : png[20];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);
  fs.writeFileSync(icoPath, Buffer.concat([header, entry, png]));
}

function resolveSourcePng() {
  if (fs.existsSync(sourcePng)) {
    return sourcePng;
  }
  if (fs.existsSync(sourceSvg)) {
    console.warn(
      `Using ${path.relative(root, sourceSvg)} — export blank-icon-512.png for best results.`
    );
    return sourceSvg;
  }
  console.error(`Missing source icon: ${sourcePng} or ${sourceSvg}`);
  process.exit(1);
}

const iconSource = resolveSourcePng();

fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(electronBuildDir, { recursive: true });
fs.mkdirSync(path.join(publicDir, 'imgs'), { recursive: true });

console.log('Generating Blank icons...');

for (const [rel, size] of Object.entries(publicSizes)) {
  const dest = path.join(publicDir, rel);
  resizePng(iconSource, dest, size);
  console.log(`  ${rel} (${size}px)`);
}

const favicon192 = path.join(publicDir, 'favicon-192.png');
writeIco(favicon192, path.join(publicDir, 'favicon.ico'));
writeIco(favicon192, path.join(electronBuildDir, 'icon.ico'));
console.log('  favicon.ico + scripts/local-electron/build/icon.ico');

if (fs.existsSync(mobileResDir)) {
  for (const [folder, size] of Object.entries(androidMipmaps)) {
    const dest = path.join(mobileResDir, folder, 'ic_launcher.png');
    const destRound = path.join(mobileResDir, folder, 'ic_launcher_round.png');
    resizePng(iconSource, dest, size);
    fs.copyFileSync(dest, destRound);
    console.log(`  android ${folder} (${size}px)`);
  }
} else {
  console.log('  (skip Android mipmaps — run android:build once to generate android/)');
}

function syncPublicIconsToDist() {
  const distRoots = [
    path.join(root, 'packages/frontend/apps/web/dist'),
    path.join(root, 'packages/frontend/apps/mobile/dist'),
  ];
  const toCopy = [
    ...Object.keys(publicSizes),
    'favicon.ico',
    'manifest.json',
  ];
  for (const distRoot of distRoots) {
    if (!fs.existsSync(distRoot)) {
      continue;
    }
    for (const rel of toCopy) {
      const from = path.join(publicDir, rel);
      const to = path.join(distRoot, rel);
      if (fs.existsSync(from)) {
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(from, to);
      }
    }
    console.log(`  synced icons → ${path.relative(root, distRoot)}`);
  }
}

syncPublicIconsToDist();

console.log('Done.');
