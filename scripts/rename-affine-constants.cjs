/**
 * Second pass: BLANK_ constants, BLANK- tags, AfFiNe mixed case.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.yarn', 'dist', 'lib', 'coverage']);
const SKIP_PATH_PARTS = [path.join('scripts', 'local-electron', 'web')];

const REPLACEMENTS = [
  ['BlankAppIcon', 'BlankAppIcon'],
  ['BLANK_', 'BLANK_'],
  ['BLANK-', 'BLANK-'],
  ['BLANK', 'BLANK'],
];

function shouldSkip(rel) {
  if (SKIP_PATH_PARTS.some(s => rel.startsWith(s))) return true;
  return rel.split(path.sep).some(p => SKIP_DIRS.has(p));
}

function walk(dir, files = []) {
  if (shouldSkip(path.relative(ROOT, dir))) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|js|mjs|cjs|json|md|css|yml|yaml|toml|ps1|sh|sql|txt)$/i.test(e.name)) {
      if (!shouldSkip(path.relative(ROOT, full))) files.push(full);
    }
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [from, to] of REPLACEMENTS) {
    after = after.split(from).join(to);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
  }
}
console.log(`Second pass: updated ${changed} files`);
