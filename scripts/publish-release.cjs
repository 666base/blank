const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const version = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
).version;
const tag = `v${version}`;

function ensureExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${label}: ${filePath}`);
    process.exit(1);
  }
}

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

const desktopExe = path.join(root, 'releases/desktop', `Blank-Setup-${version}.exe`);
const androidApk = path.join(root, 'releases/android', `Blank-${version}.apk`);
const latestYml = path.join(root, 'releases/desktop', 'latest.yml');
const versionJson = path.join(root, 'releases/desktop', 'version.json');

ensureExists(desktopExe, 'Windows installer');
ensureExists(androidApk, 'Android APK');

run('node', ['scripts/generate-release-manifest.cjs']);
ensureExists(versionJson, 'version.json');

const assets = [desktopExe, androidApk, versionJson];
if (fs.existsSync(latestYml)) {
  assets.push(latestYml);
}

const blockmap = `${desktopExe}.blockmap`;
if (fs.existsSync(blockmap)) {
  assets.push(blockmap);
}

const notesPath = path.join(root, 'releases', `release-notes-${version}.md`);
fs.mkdirSync(path.dirname(notesPath), { recursive: true });
fs.writeFileSync(
  notesPath,
  [
    '## Blank release',
    '',
    `- Windows: \`Blank-Setup-${version}.exe\` (in-app auto-update supported)`,
    `- Android: \`Blank-${version}.apk\` (Settings → About → Check for update)`,
    '',
    'Desktop installs can update from inside the app (Settings → About).',
  ].join('\n'),
  'utf8'
);

const existing = spawnSync(
  'gh',
  ['release', 'view', tag, '--repo', '666base/blank'],
  { encoding: 'utf8', shell: true }
);

const ghArgs = existing.status === 0
  ? ['release', 'upload', tag, '--repo', '666base/blank', ...assets]
  : [
      'release',
      'create',
      tag,
      '--repo',
      '666base/blank',
      '--title',
      `Blank ${version}`,
      '--notes-file',
      notesPath,
      ...assets,
    ];

console.log(`Publishing ${tag} to GitHub...`);
run('gh', ghArgs, { shell: false });

console.log(`\nPublished: https://github.com/666base/blank/releases/tag/${tag}`);
