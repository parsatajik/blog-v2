-- Goals tracked by each user

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  category text,
  color text,
  icon text,
  start_date date not null default now(),
  target_date date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists goals_user_id_idx on public.goals using btree (user_id);
create index if not exists goals_is_active_idx on public.goals using btree (is_active);

-- updated_at trigger
drop trigger if exists goals_set_updated_at on public.goals;
create trigger goals_set_updated_at
before update on public.goals
for each row execute function public.set_updated_at();

-- RLS: enable and policies
alter table public.goals enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='goals' and policyname='select_own_goals'
  ) then
    create policy "select_own_goals" on public.goals
      for select using (user_id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='goals' and policyname='insert_own_goals'
  ) then
    create policy "insert_own_goals" on public.goals
      for insert with check (user_id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='goals' and policyname='update_own_goals'
  ) then
    create policy "update_own_goals" on public.goals
      for update using (user_id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='goals' and policyname='delete_own_goals'
  ) then
    create policy "delete_own_goals" on public.goals
      for delete using (user_id = auth.uid());
  end if;
end $$;


