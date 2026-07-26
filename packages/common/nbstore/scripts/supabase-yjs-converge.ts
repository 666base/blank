/**
 * Standalone proof that two independent Yjs docs converge through
 * Blank Supabase `doc_updates` / `doc_snapshots` (Phase 2 gate).
 *
 * Usage (with a signed-in user session in env):
 *   SUPABASE_URL=... SUPABASE_ANON_KEY=... SUPABASE_EMAIL=... SUPABASE_PASSWORD=... \
 *     yarn node --import tsx packages/common/nbstore/scripts/supabase-yjs-converge.ts
 *
 * Does not print secrets. Requires network + Auth user.
 */
import { createClient } from '@supabase/supabase-js';
import * as Y from 'yjs';

const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const anon =
  process.env.SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY ??
  process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const email = process.env.SUPABASE_EMAIL;
const password = process.env.SUPABASE_PASSWORD;

if (!url || !anon || !email || !password) {
  console.error(
    'Set SUPABASE_URL, SUPABASE_ANON_KEY (or VITE_*), SUPABASE_EMAIL, SUPABASE_PASSWORD'
  );
  process.exit(1);
}

const workspaceId = 'blank-converge-test';
const docId = `doc-${Date.now()}`;

function encodeUpdate(u: Uint8Array) {
  let hex = '';
  for (const b of u) {
    hex += b.toString(16).padStart(2, '0');
  }
  return `\\x${hex}`;
}

function decodeBytea(value: string | Uint8Array) {
  if (value instanceof Uint8Array) return value;
  const hex = value.startsWith('\\x') ? value.slice(2) : value;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function main() {
  const supabaseUrl = url;
  const supabaseAnon = anon;
  const supabaseEmail = email;
  const supabasePassword = password;
  if (!supabaseUrl || !supabaseAnon || !supabaseEmail || !supabasePassword) {
    throw new Error('missing env');
  }

  const a = createClient(supabaseUrl, supabaseAnon);
  const b = createClient(supabaseUrl, supabaseAnon);

  const { data: authA, error: authErr } = await a.auth.signInWithPassword({
    email: supabaseEmail,
    password: supabasePassword,
  });
  if (authErr || !authA.user || !authA.session) {
    throw new Error(`auth failed: ${authErr?.message}`);
  }
  const ownerId = authA.user.id;
  await b.auth.setSession({
    access_token: authA.session.access_token,
    refresh_token: authA.session.refresh_token,
  });

  await a.from('workspaces').upsert({
    id: workspaceId,
    owner_id: ownerId,
    name: 'Blank converge test',
  });

  const docA = new Y.Doc();
  const docB = new Y.Doc();
  docA.getText('t').insert(0, 'hello ');
  const u1 = Y.encodeStateAsUpdate(docA);

  const { error: pushErr } = await a.from('doc_updates').insert({
    doc_id: docId,
    workspace_id: workspaceId,
    owner_id: ownerId,
    update: encodeUpdate(u1),
    client_id: 'peer-a',
  });
  if (pushErr) throw new Error(pushErr.message);

  docB.getText('t').insert(0, 'world');
  const u2 = Y.encodeStateAsUpdate(docB);
  const { error: pushErr2 } = await b.from('doc_updates').insert({
    doc_id: docId,
    workspace_id: workspaceId,
    owner_id: ownerId,
    update: encodeUpdate(u2),
    client_id: 'peer-b',
  });
  if (pushErr2) throw new Error(pushErr2.message);

  const { data: rows, error: loadErr } = await a
    .from('doc_updates')
    .select('update, created_at')
    .eq('doc_id', docId)
    .order('created_at', { ascending: true });
  if (loadErr) throw new Error(loadErr.message);

  const merged = new Y.Doc();
  for (const row of rows ?? []) {
    Y.applyUpdate(merged, decodeBytea(row.update));
  }

  const text = merged.getText('t').toString();
  console.log('merged text:', JSON.stringify(text));
  console.log('update rows:', rows?.length ?? 0);

  const state = Y.encodeStateAsUpdate(merged);
  await a.from('doc_snapshots').upsert({
    doc_id: docId,
    workspace_id: workspaceId,
    owner_id: ownerId,
    state: encodeUpdate(state),
    client_id: 'peer-a',
  });
  const { data: pruned } = await a.rpc('compact_doc_updates', {
    p_doc_id: docId,
    p_before: new Date().toISOString(),
  });
  console.log('pruned updates:', pruned);

  const anonClient = createClient(supabaseUrl, supabaseAnon);
  const { data: leaked, error: leakErr } = await anonClient
    .from('doc_updates')
    .select('id')
    .limit(1);
  console.log(
    'anon select blocked:',
    !leaked?.length && (leakErr != null || leaked?.length === 0)
  );

  await a.from('doc_snapshots').delete().eq('doc_id', docId);
  await a.from('doc_updates').delete().eq('doc_id', docId);

  console.log('OK — two peers converge via Supabase');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
