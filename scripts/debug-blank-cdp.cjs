const http = require('node:http');

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
  const port = process.env.BLANK_CDP_PORT || '9222';
  const pages = await getJson(`http://127.0.0.1:${port}/json/list`);
  const page = pages.find(p => p.type === 'page');
  if (!page) {
    console.error('No page target');
    process.exit(1);
  }

  const WebSocket = require('ws');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  const consoleLogs = [];
  const exceptions = [];

  ws.on('message', data => {
    const msg = JSON.parse(data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(msg.params);
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      exceptions.push(msg.params);
    }
    if (msg.id === 1 && msg.result) {
      ws.send(
        JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: {
            expression: `(function(){
              const app = document.getElementById('app');
              return {
                href: location.href,
                pathname: location.pathname,
                title: document.title,
                scriptCount: document.scripts.length,
                splash: !!document.getElementById('blank-boot-splash'),
                hasEditor: !!document.querySelector('[data-testid="main-container"]'),
                bodyText: document.body?.innerText?.slice(0, 200),
                appHtml: app ? app.innerHTML.slice(0, 300) : null,
                hasApis: typeof globalThis.__apis !== 'undefined',
                hasStorage: typeof globalThis.__sharedStorage !== 'undefined',
                hasElectronShell: globalThis.__ELECTRON_SHELL__
              };
            })()`,
            returnByValue: true,
          },
        })
      );
    }
    if (msg.id === 2) {
      console.log('PAGE:', JSON.stringify(msg.result?.result?.value, null, 2));
      console.log('EXCEPTIONS:', JSON.stringify(exceptions, null, 2));
      console.log(
        'CONSOLE:',
        JSON.stringify(
          consoleLogs.map(l => ({
            type: l.type,
            args: l.args?.map(a => a.value ?? a.description),
          })),
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
    ws.send(JSON.stringify({ id: 99, method: 'Log.enable' }));
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
