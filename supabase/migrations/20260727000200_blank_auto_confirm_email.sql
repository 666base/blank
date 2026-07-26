-- Auto-confirm Blank Auth emails (single-user product; no SMTP required).
-- Without this, signUp returns no session and the client shows confusing errors.

create or replace function public.blank_auto_confirm_user()
returns trigger
language plpgsql
security definer
set search_path = auth, public
as $$
begin
  new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  return new;
end;
$$;

drop trigger if exists blank_auto_confirm_user on auth.users;
create trigger blank_auto_confirm_user
  before insert on auth.users
  for each row
  execute function public.blank_auto_confirm_user();
