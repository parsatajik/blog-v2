-- Enable RLS and add owner-scoped policies for users, goals, and activities
-- NOTE: This migration is separate from declarative schemas because migra
-- does not reliably diff RLS policies.

-- Users
alter table if exists public.users enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'users' and policyname = 'select_own_user'
  ) then
    create policy "select_own_user" on public.users
      for select using (id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'users' and policyname = 'update_own_user'
  ) then
    create policy "update_own_user" on public.users
      for update using (id = auth.uid());
  end if;
end $$;

-- Goals
alter table if exists public.goals enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'goals' and policyname = 'select_own_goals'
  ) then
    create policy "select_own_goals" on public.goals
      for select using (user_id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'goals' and policyname = 'insert_own_goals'
  ) then
    create policy "insert_own_goals" on public.goals
      for insert with check (user_id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'goals' and policyname = 'update_own_goals'
  ) then
    create policy "update_own_goals" on public.goals
      for update using (user_id = auth.uid());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'goals' and policyname = 'delete_own_goals'
  ) then
    create policy "delete_own_goals" on public.goals
      for delete using (user_id = auth.uid());
  end if;
end $$;

-- Activities
alter table if exists public.activities enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'activities' and policyname = 'select_own_activities'
  ) then
    create policy "select_own_activities" on public.activities
      for select using (
        exists (
          select 1 from public.goals g
          where g.id = public.activities.goal_id and g.user_id = auth.uid()
        )
      );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'activities' and policyname = 'insert_own_activities'
  ) then
    create policy "insert_own_activities" on public.activities
      for insert with check (
        exists (
          select 1 from public.goals g
          where g.id = public.activities.goal_id and g.user_id = auth.uid()
        )
      );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'activities' and policyname = 'update_own_activities'
  ) then
    create policy "update_own_activities" on public.activities
      for update using (
        exists (
          select 1 from public.goals g
          where g.id = public.activities.goal_id and g.user_id = auth.uid()
        )
      );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'activities' and policyname = 'delete_own_activities'
  ) then
    create policy "delete_own_activities" on public.activities
      for delete using (
        exists (
          select 1 from public.goals g
          where g.id = public.activities.goal_id and g.user_id = auth.uid()
        )
      );
  end if;
end $$;


