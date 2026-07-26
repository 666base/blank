-- Blank CRDT sync schema (single-user, two devices)
-- Product: Blank. Backend: Supabase Auth + RLS. No AFFiNE Cloud.
-- Applied to project "blank" (jzkswvswfvmsfoqfvszo). Leaves legacy notes tables untouched.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.doc_snapshots (
  doc_id text primary key,
  workspace_id text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  state bytea not null,
  updated_at timestamptz not null default now(),
  client_id text
);

create index if not exists doc_snapshots_owner_idx
  on public.doc_snapshots (owner_id);

create index if not exists doc_snapshots_workspace_idx
  on public.doc_snapshots (owner_id, workspace_id);

create table if not exists public.doc_updates (
  id bigint generated always as identity primary key,
  doc_id text not null,
  workspace_id text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  update bytea not null,
  created_at timestamptz not null default now(),
  client_id text
);

create index if not exists doc_updates_doc_created_idx
  on public.doc_updates (doc_id, created_at);

create index if not exists doc_updates_owner_workspace_idx
  on public.doc_updates (owner_id, workspace_id, created_at);

-- Optional workspace registry (one owner; no multi-tenant sharing)
create table if not exists public.workspaces (
  id text primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null default 'Blank',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workspaces_owner_idx
  on public.workspaces (owner_id);

-- ---------------------------------------------------------------------------
-- RLS (security boundary — not the anon key)
-- ---------------------------------------------------------------------------

alter table public.doc_snapshots enable row level security;
alter table public.doc_updates enable row level security;
alter table public.workspaces enable row level security;

-- doc_snapshots
drop policy if exists "doc_snapshots_select_own" on public.doc_snapshots;
create policy "doc_snapshots_select_own"
  on public.doc_snapshots
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "doc_snapshots_insert_own" on public.doc_snapshots;
create policy "doc_snapshots_insert_own"
  on public.doc_snapshots
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists "doc_snapshots_update_own" on public.doc_snapshots;
create policy "doc_snapshots_update_own"
  on public.doc_snapshots
  for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "doc_snapshots_delete_own" on public.doc_snapshots;
create policy "doc_snapshots_delete_own"
  on public.doc_snapshots
  for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

-- doc_updates
drop policy if exists "doc_updates_select_own" on public.doc_updates;
create policy "doc_updates_select_own"
  on public.doc_updates
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "doc_updates_insert_own" on public.doc_updates;
create policy "doc_updates_insert_own"
  on public.doc_updates
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists "doc_updates_update_own" on public.doc_updates;
create policy "doc_updates_update_own"
  on public.doc_updates
  for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "doc_updates_delete_own" on public.doc_updates;
create policy "doc_updates_delete_own"
  on public.doc_updates
  for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

-- workspaces
drop policy if exists "workspaces_select_own" on public.workspaces;
create policy "workspaces_select_own"
  on public.workspaces
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "workspaces_insert_own" on public.workspaces;
create policy "workspaces_insert_own"
  on public.workspaces
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists "workspaces_update_own" on public.workspaces;
create policy "workspaces_update_own"
  on public.workspaces
  for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "workspaces_delete_own" on public.workspaces;
create policy "workspaces_delete_own"
  on public.workspaces
  for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

-- Explicit Data API grants (RLS still applies)
grant select, insert, update, delete on public.doc_snapshots to authenticated;
grant select, insert, update, delete on public.doc_updates to authenticated;
grant select, insert, update, delete on public.workspaces to authenticated;
grant usage, select on sequence public.doc_updates_id_seq to authenticated;

-- anon: no row access (must sign in)
revoke all on public.doc_snapshots from anon;
revoke all on public.doc_updates from anon;
revoke all on public.workspaces from anon;

-- ---------------------------------------------------------------------------
-- Realtime (postgres changes for catch-up / live sync)
-- ---------------------------------------------------------------------------

do $$
begin
  alter publication supabase_realtime add table public.doc_updates;
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.doc_snapshots;
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Compaction: merge tip — client or scheduled job supplies merged snapshot
-- then this function prunes updates older than the snapshot.
-- (Full Yjs merge runs in the client/native; DB only stores + prunes.)
-- ---------------------------------------------------------------------------

create or replace function public.compact_doc_updates(
  p_doc_id text,
  p_before timestamptz default now()
)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  deleted_count integer;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  delete from public.doc_updates u
  where u.doc_id = p_doc_id
    and u.owner_id = auth.uid()
    and u.created_at <= p_before;

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.compact_doc_updates(text, timestamptz) from public;
grant execute on function public.compact_doc_updates(text, timestamptz) to authenticated;

-- ---------------------------------------------------------------------------
-- Storage bucket for blobs/attachments
-- Path convention: {auth.uid()}/{workspace_id}/{blob_key}
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blobs', 'blobs', false, 52428800, null)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

drop policy if exists "blobs_select_own" on storage.objects;
create policy "blobs_select_own"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'blobs'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists "blobs_insert_own" on storage.objects;
create policy "blobs_insert_own"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'blobs'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists "blobs_update_own" on storage.objects;
create policy "blobs_update_own"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'blobs'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  )
  with check (
    bucket_id = 'blobs'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

drop policy if exists "blobs_delete_own" on storage.objects;
create policy "blobs_delete_own"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'blobs'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );
