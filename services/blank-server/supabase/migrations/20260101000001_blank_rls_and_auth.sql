-- RLS policies, signup hooks, storage bucket (Supabase)

-- Profiles: own row only
create policy blank_profiles_select_own on public.blank_profiles
  for select using (id = auth.uid());

create policy blank_profiles_update_own on public.blank_profiles
  for update using (id = auth.uid());

create policy blank_profiles_insert_own on public.blank_profiles
  for insert with check (id = auth.uid());

-- Workspaces: owners create; members read
create policy blank_workspaces_insert_owner on public.blank_workspaces
  for insert with check (owner_id = auth.uid());

create policy blank_workspaces_update_owner on public.blank_workspaces
  for update using (
    exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = id and m.user_id = auth.uid() and m.role = 'owner'
    )
  );

-- Members
create policy blank_members_select on public.blank_workspace_members
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = blank_workspace_members.workspace_id
        and m.user_id = auth.uid()
    )
  );

create policy blank_members_insert_owner on public.blank_workspace_members
  for insert with check (
    exists (
      select 1 from public.blank_workspaces w
      where w.id = workspace_id and w.owner_id = auth.uid()
    )
  );

-- Blobs metadata
create policy blank_blobs_member_select on public.blank_blobs
  for select using (
    exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = blank_blobs.workspace_id and m.user_id = auth.uid()
    )
  );

create policy blank_blobs_member_insert on public.blank_blobs
  for insert with check (
    exists (
      select 1 from public.blank_workspace_members m
      where m.workspace_id = blank_blobs.workspace_id
        and m.user_id = auth.uid()
        and m.role in ('owner', 'editor')
    )
  );

-- Auto profile + default workspace on signup
create or replace function public.blank_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ws_id uuid;
begin
  insert into public.blank_profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));

  insert into public.blank_workspaces (owner_id, name)
  values (new.id, 'My Notes')
  returning id into ws_id;

  insert into public.blank_workspace_members (workspace_id, user_id, role)
  values (ws_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_blank on auth.users;
create trigger on_auth_user_created_blank
  after insert on auth.users
  for each row execute function public.blank_handle_new_user();

-- Storage bucket for attachments (private)
insert into storage.buckets (id, name, public, file_size_limit)
values ('blank-blobs', 'blank-blobs', false, 52428800)
on conflict (id) do nothing;

create policy blank_storage_select on storage.objects
  for select using (
    bucket_id = 'blank-blobs'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy blank_storage_insert on storage.objects
  for insert with check (
    bucket_id = 'blank-blobs'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy blank_storage_update on storage.objects
  for update using (
    bucket_id = 'blank-blobs'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy blank_storage_delete on storage.objects
  for delete using (
    bucket_id = 'blank-blobs'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
