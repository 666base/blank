-- Atomic doc update push with monotonic seq per (workspace_id, doc_id).

create or replace function public.blank_push_doc_update(
  p_workspace_id uuid,
  p_doc_id text,
  p_update_data bytea
)
returns table (out_seq bigint, out_created_at timestamptz)
language plpgsql
security invoker
set search_path = public
as $$
declare
  next_seq bigint;
  ts timestamptz := now();
begin
  if not exists (
    select 1 from public.blank_workspace_members m
    where m.workspace_id = p_workspace_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'editor')
  ) then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select coalesce(max(u.seq), 0) + 1
  into next_seq
  from public.blank_doc_updates u
  where u.workspace_id = p_workspace_id and u.doc_id = p_doc_id;

  insert into public.blank_doc_updates (
    workspace_id, doc_id, seq, update_data, editor_id, created_at
  ) values (
    p_workspace_id, p_doc_id, next_seq, p_update_data, auth.uid(), ts
  );

  return query select next_seq, ts;
end;
$$;

grant execute on function public.blank_push_doc_update(uuid, text, bytea) to authenticated;
