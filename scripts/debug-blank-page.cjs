const http = require('node:http');

const port = process.env.BLANK_CDP_PORT || '9223';

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const pages = await getJson(`http://127.0.0.1:${port}/json/list`);
  const page = pages.find(
    p => p.type === 'page' && p.url?.startsWith('blank://app')
  );
  if (!page) {
    console.error('No blank:// app page. Pages:', pages.map(p => p.url));
    process.exit(1);
  }

  const WebSocket = require('ws');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  const exceptions = [];
  const consoleLogs = [];

  ws.on('message', data => {
    const msg = JSON.parse(data);
    if (msg.method === 'Runtime.exceptionThrown') {
      exceptions.push(msg.params);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(msg.params);
    }
    if (msg.id === 2 && msg.result) {
      console.log('PAGE:', JSON.stringify(msg.result?.result?.value, null, 2));
      console.log(
        'EXCEPTIONS:',
        JSON.stringify(
          exceptions.map(e => e.exceptionDetails?.text || e),
          null,
          2
        )
      );
      console.log(
        'CONSOLE ERRORS:',
        JSON.stringify(
          consoleLogs
            .filter(l => l.type === 'error')
            .map(l => l.args?.map(a => a.value ?? a.description)),
          null,
          2
        )
      );
      ws.close();
      process.exit(0);
    }
  });

  ws.on('open', () => {
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(
      JSON.stringify({
        id: 2,
        method: 'Runtime.evaluate',
        params: {
          expression: `(function(){
            return {
              href: location.href,
              splash: !!document.getElementById('blank-boot-shell'),
              appChildren: document.getElementById('app')?.childElementCount,
              bodyText: document.body?.innerText?.slice(0, 400),
              main: !!document.querySelector('[data-testid="main-container"]'),
              scripts: [...document.scripts].map(s => s.src),
              hasElectronShell: globalThis.__ELECTRON_SHELL__ === true,
              hasApis: typeof globalThis.__apis !== 'undefined'
            };
          })()`,
          returnByValue: true,
        },
      })
    );
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
