/**
 * Blank native sync API (v0.1 dev stub).
 * Protocol: REST /v1/* — NOT Blank GraphQL.
 *
 * Env:
 *   BLANK_SERVER_PORT=3020
 *   BLANK_SERVER_HOST=localhost
 */
import http from 'node:http';
import { URL } from 'node:url';

const PORT = Number(process.env.BLANK_SERVER_PORT || 3020);
const HOST = process.env.BLANK_SERVER_HOST || '0.0.0.0';
const SUPABASE_URL = process.env.SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY?.trim();

const config = {
  name: 'Blank Sync',
  version: '0.2.0',
  protocol: 'blank-sync-v1',
  backend: SUPABASE_URL ? 'supabase' : 'local-stub',
  features: SUPABASE_URL
    ? ['supabase-auth', 'supabase-db', 'doc-sync-planned', 'realtime-planned']
    : ['local-dev', 'supabase-not-configured'],
  auth: {
    type: 'supabase-jwt',
    supabaseUrl: SUPABASE_URL ?? null,
    // anon key is public — safe to expose in /v1/config for client init
    supabaseAnonKey: SUPABASE_ANON_KEY ?? null,
  },
  data: SUPABASE_URL
    ? {
        workspaces: 'supabase:blank_workspaces',
        docUpdates: 'supabase:blank_doc_updates',
        blobs: 'supabase:storage/blank-blobs',
      }
    : null,
  endpoints: {
    health: '/health',
    config: '/v1/config',
  },
};

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  });
  res.end(payload);
}

function notFound(res) {
  sendJson(res, 404, { error: 'not_found' });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    });
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') {
    sendJson(res, 200, { ok: true, service: 'blank-server', version: config.version });
    return;
  }

  if (url.pathname === '/v1/config') {
    sendJson(res, 200, {
      serverName: config.name,
      version: config.version,
      protocol: config.protocol,
      backend: config.backend,
      features: config.features,
      auth: config.auth,
      data: config.data,
      endpoints: config.endpoints,
    });
    return;
  }

  if (url.pathname === '/v1/workspaces' && req.method === 'GET') {
    sendJson(res, 501, {
      error: 'use_supabase',
      message:
        'Workspaces are read via Supabase client (blank_workspaces + JWT). Wire client in phase 5d.',
    });
    return;
  }

  notFound(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Blank server listening on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  console.log(`  health  -> http://localhost:${PORT}/health`);
  console.log(`  config  -> http://localhost:${PORT}/v1/config`);
});
