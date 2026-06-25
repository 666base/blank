/**
 * Quick check that local-electron shell modules load (same paths as packaged app).
 */
const path = require('node:path');

const shellDir = path.join(__dirname, 'local-electron');

require(path.join(shellDir, 'kv-store.cjs'));
const { registerBlankDesktopApi } = require(path.join(
  shellDir,
  'blank-desktop-api-main.cjs'
));
if (typeof registerBlankDesktopApi !== 'function') {
  throw new Error('registerBlankDesktopApi missing');
}

console.log('electron shell modules OK');
