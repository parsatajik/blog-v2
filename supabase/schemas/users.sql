-- Users table mirrors auth.users with additional profile fields

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_email_idx on public.users using btree (email);

-- updated_at trigger
drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

-- RLS: enable and policies (kept declaratively; alter is not used)
alter table public.users enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='users' and policyname='select_own_user'
  ) then
    create policy "select_own_user" on public.users
      for select using (id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='users' and policyname='update_own_user'
  ) then
    create policy "update_own_user" on public.users
      for update using (id = auth.uid());
  end if;
end $$;


