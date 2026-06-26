# blank-sync-v1 — doc update protocol

## Storage

Table `blank_doc_updates` (Supabase Postgres):

| Column | Type |
|--------|------|
| workspace_id | uuid |
| doc_id | text |
| seq | bigint (per doc, monotonic) |
| update_data | bytea (Yjs update) |
| editor_id | uuid |
| created_at | timestamptz |

## Push

RPC `blank_push_doc_update(workspace_id, doc_id, update_data)` — assigns `seq`, returns timestamp.

Client: `BlankDocStorage.pushDocUpdate` via PostgREST.

## Pull

- Full doc: `GET blank_doc_updates?workspace_id=&doc_id=&order=seq.asc` → merge Yjs updates.
- Incremental poll: `created_at > last_poll` (5s interval in MVP).
- Sync engine: local SQLite/IDB ↔ `BlankDocStorage` remote peer `blank:blank-cloud`.

## Auth

Supabase JWT (`Authorization: Bearer`) + RLS on all tables.

## Not in v1

- Blob storage sync
- Realtime (use polling)
- Delete tombstones
