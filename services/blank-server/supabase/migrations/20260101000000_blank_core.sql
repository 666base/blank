-- Blank native sync schema (Supabase Postgres or plain Postgres)
-- No Blank tables. Client speaks /v1/* REST + optional Realtime later.

create extension if not exists "pgcrypto";

create table if not exists public.blank_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.blank_workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null default 'My Notes',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blank_workspace_members (
  workspace_id uuid not null references public.blank_workspaces (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'editor', 'viewer')),
  primary key (workspace_id, user_id)
);

-- Yjs / CRDT update log (append-only per doc)
create table if not exists public.blank_doc_updates (
  id bigserial primary key,
  workspace_id uuid not null references public.blank_workspaces (id) on delete cascade,
  doc_id text not null,
  seq bigint not null,
  update_data bytea not null,
  editor_id uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (workspace_id, doc_id, seq)
);

create index if not exists blank_doc_updates_pull_idx
  on public.blank_doc_updates (workspace_id, doc_id, seq);

create table if not exists public.blank_blobs (
  workspace_id uuid not null references public.blank_workspaces (id) on delete cascade,
  blob_id text not null,
  mime_type text,
  size_bytes bigint not null,
  storage_path text not null,
  created_at timestamptz not null default now(),
  primary key (workspace_id, blob_id)
);

alter table public.blank_profiles enable row level security;
alter table public.blank_workspaces enable row level security;
alter table public.blank_workspace_members enable row level security;
alter table public.blank_doc_updates enable row level security;
alter table public.blank_blobs enable row level security;

-- Members can read workspace metadata
create policy blank_workspaces_member_select on public.blank_workspaces
  for select using (
    exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = id and m.user_id = auth.uid()
    )
  );

create policy blank_doc_updates_member_select on public.blank_doc_updates
  for select using (
    exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = blank_doc_updates.workspace_id
        and m.user_id = auth.uid()
    )
  );

create policy blank_doc_updates_member_insert on public.blank_doc_updates
  for insert with check (
    exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = blank_doc_updates.workspace_id
        and m.user_id = auth.uid()
        and m.role in ('owner', 'editor')
    )
  );
