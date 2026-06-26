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

const androidApk = path.join(root, 'releases/android', `Blank-${version}.apk`);

ensureExists(androidApk, 'Android APK');

// Local manifests only — GitHub release ships APK alone (mobile updater uses release API).
run('node', ['scripts/generate-release-manifest.cjs']);

const assets = [androidApk];

const notesPath = path.join(root, 'releases', `release-notes-${version}.md`);
fs.mkdirSync(path.dirname(notesPath), { recursive: true });
fs.writeFileSync(
  notesPath,
    [
    '## Blank release',
    '',
    `- Android: \`Blank-${version}.apk\` (Settings → About → Check for update)`,
  ].join('\n'),
  'utf8'
);

const UPDATE_REPO = '666base/blank-releases';

const existing = spawnSync(
  'gh',
  ['release', 'view', tag, '--repo', UPDATE_REPO],
  { encoding: 'utf8', shell: true }
);

const ghArgs = existing.status === 0
  ? ['release', 'upload', tag, '--repo', UPDATE_REPO, ...assets]
  : [
      'release',
      'create',
      tag,
      '--repo',
      UPDATE_REPO,
      '--title',
      `Blank ${version}`,
      '--notes-file',
      notesPath,
      ...assets,
    ];

console.log(`Publishing ${tag} to GitHub...`);
run('gh', ghArgs, { shell: false });

console.log(`\nPublished: https://github.com/${UPDATE_REPO}/releases/tag/${tag}`);
