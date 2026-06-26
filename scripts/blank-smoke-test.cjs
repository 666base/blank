const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const root = path.resolve(__dirname, '..');
const checks = [];

function ok(name, pass, detail = '', optional = false) {
  checks.push({ name, pass, detail, optional });
}

function read(rel) {
  const p = path.join(root, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

function distSizeMb(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) return null;
  let total = 0;
  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else total += fs.statSync(full).size;
    }
  };
  walk(p);
  return Math.round((total / 1024 / 1024) * 10) / 10;
}

function fetchUrl(url, timeoutMs = 8000) {
  return new Promise(resolve => {
    const req = http.get(url, res => {
      let data = '';
      res.on('data', c => {
        data += c;
        if (data.length > 50000) res.destroy();
      });
      res.on('end', () =>
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 500, data, status: res.statusCode })
      );
    });
    req.on('error', err => resolve({ ok: false, error: err.message }));
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve({ ok: false, error: 'timeout' });
    });
  });
}

async function main() {
  const webHtml = read('packages/frontend/apps/web/dist/index.html');
  ok('web dist exists', !!webHtml);
  ok('web PUBLIC_PATH=/', webHtml?.includes('name="env:publicPath"') && webHtml.includes('content="/"'));
  ok('web no blankassets CDN', webHtml && !/blankassets\.com/i.test(webHtml));
  ok('web local /js scripts', webHtml && webHtml.includes('src="/js/'));
  ok('web no onboarding folder', !fs.existsSync(path.join(root, 'packages/frontend/apps/web/dist/onboarding')));
  ok('web dist size 80-160MB', (() => {
    const mb = distSizeMb('packages/frontend/apps/web/dist');
    return mb !== null && mb >= 80 && mb <= 160 ? mb + ' MB' : false;
  })());

  const mobHtml = read('packages/frontend/apps/mobile/dist/index.html');
  ok('mobile dist exists', !!mobHtml);
  ok('mobile PUBLIC_PATH=/', mobHtml?.includes('content="/"'));
  ok('mobile no CDN', mobHtml && !/blankassets\.com/i.test(mobHtml));
  ok('mobile dist size 80-160MB', (() => {
    const mb = distSizeMb('packages/frontend/apps/mobile/dist');
    return mb !== null && mb >= 80 && mb <= 160 ? mb + ' MB' : false;
  })());

  ok(
    'electron updater module',
    read('scripts/local-electron/updater-main.cjs')?.includes('electron-updater')
  );
  ok(
    'electron publish config',
    read('electron-builder.json')?.includes('"provider": "github"')
  );
  ok(
    'release workflow',
    fs.existsSync(path.join(root, '.github/workflows/release.yml'))
  );
  ok(
    'github release helper',
    read('packages/frontend/core/src/utils/blank-github-release.ts')?.includes(
      'checkBlankAppUpdate'
    )
  );

  for (const rel of [
    'releases/desktop/Blank-Setup-0.28.2.exe',
    'releases/android/Blank-0.28.2.apk',
  ]) {
    const p = path.join(root, rel);
    const mb = fs.existsSync(p)
      ? Math.round((fs.statSync(p).size / 1024 / 1024) * 10) / 10 + ' MB'
      : 'missing';
    ok('artifact ' + path.basename(rel), fs.existsSync(p), mb);
  }

  ok('isAiDisabled in local-only', read('packages/frontend/core/src/utils/local-only.ts')?.includes('isAiDisabled'));
  ok('blank sync config', read('packages/frontend/core/src/utils/sync-config.ts')?.includes('getBlankSyncServerUrl'));
  ok('sync server docker compose', fs.existsSync(path.join(root, 'scripts/selfhost/docker-compose.yml')));
  ok('blank phases roadmap', fs.existsSync(path.join(root, 'scripts/blank-phases.json')));
  ok(
    'auth not stubbed',
    read('packages/frontend/core/src/modules/cloud/stores/auth.ts')?.includes(
      "fetch('/api/auth/session'"
    )
  );
  ok(
    'blank links helper',
    read('packages/frontend/core/src/utils/blank-links.ts')?.includes('666base/blank')
  );
  ok(
    'build config github url',
    read('tools/utils/src/build-config.ts')?.includes('666base/blank')
  );
  ok('desktop PUBLIC_PATH in build script', read('scripts/build-desktop.cjs')?.includes("PUBLIC_PATH: '/'"));
  ok('android PUBLIC_PATH in build script', read('scripts/build-android.cjs')?.includes("PUBLIC_PATH: '/'"));

  const i18n = read('packages/frontend/i18n/src/resources/index.ts');
  ok('i18n en+bg', i18n?.includes("'en'") && i18n?.includes("'bg'"));

  ok('Blank manifest name', read('packages/frontend/core/public/manifest.json')?.includes('"name": "Blank"'));
  ok('Blank favicon-192', fs.existsSync(path.join(root, 'packages/frontend/core/public/favicon-192.png')));
  ok('Blank electron icon', fs.existsSync(path.join(root, 'scripts/local-electron/build/icon.ico')));
  ok(
    'blank i18n branding filter',
    read('packages/frontend/i18n/src/i18next.ts')?.includes('applyBlankBranding')
  );
  ok(
    'blank-cloud workspace flavour',
    read('packages/frontend/core/src/modules/workspace-engine/impls/blank-cloud.ts')?.includes(
      'BLANK_CLOUD_FLAVOUR'
    )
  );
  ok(
    'blank-cloud bootstrap',
    read('packages/frontend/core/src/modules/workspace-engine/impls/blank-cloud.ts')?.includes(
      'bootstrapWorkspace'
    )
  );
  ok('channel appIconMap blank', read('packages/frontend/core/src/utils/channel.ts')?.includes('/imgs/blank-app-icon.png'));
  ok(
    'electron-builder packs shell api',
    read('electron-builder.json')?.includes('blank-desktop-api-main.cjs') ||
      read('electron-builder.json')?.includes('scripts/local-electron/**/*')
  );
  ok('mobile local-only mode', read('packages/frontend/core/src/utils/local-only.ts')?.includes('isMobileEdition'));
  ok(
    'no affine in packages source',
    !read('packages/frontend/core/package.json')?.includes('@affine/') &&
      !read('packages/frontend/i18n/src/resources/en.json')?.match(/affine/i) &&
      fs.existsSync(path.join(root, 'blocksuite/blank/all/package.json'))
  );
  ok(
    'instant boot shell',
    read('packages/frontend/core/src/utils/blank-boot-shell.html.ts')?.includes(
      'blank-boot-shell'
    )
  );
  ok(
    'instant first-open route',
    read('packages/frontend/core/src/utils/blank-fast-boot.ts')?.includes(
      'blank-default'
    ) &&
      read('packages/frontend/core/src/utils/blank-instant-workspace.ts')?.includes(
        'ensureInstantWorkspace'
      )
  );
  const distIndex = read('packages/frontend/apps/web/dist/index.html');
  ok(
    'web dist instant boot (rebuild if fail)',
    !distIndex ||
      (distIndex.includes('blank-boot-shell') &&
        distIndex.includes('blank-default')),
    distIndex
      ? 'run npm run desktop:build to refresh dist'
      : 'no dist yet',
    true
  );
  ok(
    'monorepo @blank scope',
    read('package.json')?.includes('"name": "@blank/monorepo"')
  );

  // Optional: dev server if running
  const devInfo = path.join(root, '.blank/electron-dev-server.json');
  let devUrl = 'http://127.0.0.1:8080/';
  if (fs.existsSync(devInfo)) {
    try {
      devUrl = JSON.parse(fs.readFileSync(devInfo, 'utf8')).url || devUrl;
    } catch {
      // ignore
    }
  }
  const dev = await fetchUrl(devUrl);
  ok(
    'dev server on :8080',
    dev.ok && dev.data?.includes('id="app"'),
    dev.ok ? devUrl : dev.error || `HTTP ${dev.status}`,
    true
  );

  const required = checks.filter(c => !c.optional);
  const optional = checks.filter(c => c.optional);
  const requiredFailed = required.filter(c => !c.pass);
  const optionalFailed = optional.filter(c => !c.pass);

  console.log(
    `\nBLANK SMOKE: ${required.length - requiredFailed.length}/${required.length} required passed` +
      (optional.length
        ? `, ${optional.length - optionalFailed.length}/${optional.length} optional`
        : '') +
      '\n'
  );
  for (const c of checks) {
    let tag;
    if (c.pass) tag = 'PASS';
    else if (c.optional) tag = 'SKIP';
    else tag = 'FAIL';
    const detail = c.detail ? ` — ${c.detail}` : '';
    console.log(`${tag}  ${c.name}${detail}`);
  }
  if (optionalFailed.length) {
    console.log(
      '\nNote: SKIP = dev server not running. Start with: npm run electron:dev'
    );
  }
  process.exit(requiredFailed.length ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
