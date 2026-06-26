/**
 * One-shot monorepo rename: blank → blank everywhere (packages, paths, keys, symbols).
 * Run: node scripts/rename-blank-to-blank.cjs
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.yarn',
  'dist',
  'lib',
  'coverage',
  '.tap',
]);

const SKIP_PATH_PARTS = [
  path.join('scripts', 'local-electron', 'web'),
];

const TEXT_EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.css',
  '.html',
  '.yml',
  '.yaml',
  '.toml',
  '.mts',
  '.ps1',
  '.sh',
  '.sql',
  '.txt',
  '.mjs',
  '.lock',
  '.gen.ts',
  '.d.ts',
  '.svg',
  '.xml',
  '.gradle',
  '.properties',
  '.proto',
  '.nix',
  '.dockerfile',
  '.env',
  '.example',
  '.template.json',
  '.template.json',
  '.ico',
]);

const REPLACEMENTS = [
  ['@blank-tools/', '@blank-tools/'],
  ['@blocksuite/blank-', '@blocksuite/blank-'],
  ['@blocksuite/blank/', '@blocksuite/blank/'],
  ['@blank/', '@blank/'],
  ['blocksuite/blank/', 'blocksuite/blank/'],
  ['blocksuite/blank', 'blocksuite/blank'],
  ['com.blank.', 'com.blank.'],
  ['getBlankWorkspaceSchema', 'getBlankWorkspaceSchema'],
  ['BlankSchemas', 'BlankSchemas'],
  ['666base/blank', '666base/blank'],
  ['666base/blank', '666base/blank'],
  ['666base', '666base'],
  ['Blank AI', 'Blank AI'],
  ['Blank Cloud', 'Blank Cloud'],
  ['Blank', 'Blank'],
  ['Blank', 'Blank'],
  ['blank', 'blank'],
];

function shouldSkipDir(dirPath) {
  const rel = path.relative(ROOT, dirPath);
  if (rel === '' || rel === '.') return false;
  if (rel.startsWith('..')) return true;
  const parts = rel.split(path.sep);
  if (parts.some(p => SKIP_DIRS.has(p))) return true;
  return SKIP_PATH_PARTS.some(skip => rel.startsWith(skip));
}

function shouldProcessFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  if (SKIP_PATH_PARTS.some(skip => rel.startsWith(skip))) return false;
  if (rel.includes('node_modules')) return false;
  const ext = path.extname(filePath).toLowerCase();
  if (TEXT_EXT.has(ext)) return true;
  if (path.basename(filePath) === 'Dockerfile') return true;
  if (path.basename(filePath) === 'yarn.lock') return true;
  if (path.basename(filePath).endsWith('.gen.ts')) return true;
  return false;
}

function applyReplacements(content) {
  let out = content;
  for (const [from, to] of REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

function walkFiles(dir, files = []) {
  if (shouldSkipDir(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, files);
    } else if (shouldProcessFile(full)) {
      files.push(full);
    }
  }
  return files;
}

function collectRenameTargets(dir, dirs = [], files = []) {
  if (shouldSkipDir(dir)) return { dirs, files };
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (/blank/i.test(entry.name)) {
        dirs.push(full);
      }
      collectRenameTargets(full, dirs, files);
    } else if (/blank/i.test(entry.name)) {
      files.push(full);
    }
  }
  return { dirs, files };
}

function renamePath(oldPath) {
  const parent = path.dirname(oldPath);
  const base = path.basename(oldPath);
  const newBase = base
    .replace(/Blank/g, 'Blank')
    .replace(/Blank/g, 'Blank')
    .replace(/blank/g, 'blank');
  if (newBase === base) return null;
  const newPath = path.join(parent, newBase);
  if (fs.existsSync(newPath)) {
    console.warn('SKIP rename (exists):', path.relative(ROOT, oldPath));
    return null;
  }
  fs.renameSync(oldPath, newPath);
  console.log('RENAMED:', path.relative(ROOT, oldPath), '→', newBase);
  return newPath;
}

function main() {
  console.log('=== Phase 1: text replacements ===');
  const files = walkFiles(ROOT);
  let changed = 0;
  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = applyReplacements(before);
    if (after !== before) {
      fs.writeFileSync(file, after, 'utf8');
      changed++;
    }
  }
  console.log(`Updated ${changed} files`);

  console.log('=== Phase 2: rename files ===');
  const { dirs, files: renameFiles } = collectRenameTargets(ROOT);
  renameFiles
    .sort((a, b) => b.length - a.length)
    .forEach(renamePath);

  console.log('=== Phase 3: rename directories (deepest first) ===');
  dirs
    .sort((a, b) => b.length - a.length)
    .forEach(renamePath);

  console.log('=== Done. Run: yarn install && yarn blank init && yarn workspace @blank/i18n build ===');
}

main();
