/**
 * Create (once) the Blank sideload release keystore used for GitHub APKs.
 * Not for Play Store — same key on every build so updates install over the old app.
 */
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const androidScriptsDir = path.join(root, 'scripts/android');
const keystorePath = path.join(androidScriptsDir, 'blank-release.keystore');
const propsPath = path.join(androidScriptsDir, 'keystore.properties');

const STORE_PASS = 'blank-local-release';
const KEY_ALIAS = 'blank';

function resolveKeytool() {
  if (process.env.JAVA_HOME) {
    const candidate = path.join(
      process.env.JAVA_HOME,
      'bin',
      process.platform === 'win32' ? 'keytool.exe' : 'keytool'
    );
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return 'keytool';
}

if (fs.existsSync(keystorePath)) {
  process.exit(0);
}

fs.mkdirSync(androidScriptsDir, { recursive: true });

const keytoolArgs = [
  '-genkeypair',
  '-v',
  '-storetype',
  'PKCS12',
  '-keystore',
  keystorePath,
  '-alias',
  KEY_ALIAS,
  '-keyalg',
  'RSA',
  '-keysize',
  '2048',
  '-validity',
  '10000',
  '-storepass',
  STORE_PASS,
  '-keypass',
  STORE_PASS,
  '-dname',
  'CN=Blank, OU=Local, O=Blank Local, L=Sofia, ST=BG, C=BG',
];

const result = spawnSync(resolveKeytool(), keytoolArgs, { stdio: 'inherit' });
if (result.status !== 0) {
  console.error('Failed to create release keystore. Is JDK keytool on PATH?');
  process.exit(result.status || 1);
}

const props = `storePassword=${STORE_PASS}
keyPassword=${STORE_PASS}
keyAlias=${KEY_ALIAS}
storeFile=blank-release.keystore
`;

fs.writeFileSync(propsPath, props, 'utf8');
console.log(`Created ${keystorePath}`);
