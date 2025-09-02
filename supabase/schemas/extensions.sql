-- Extensions and utility functions

create extension if not exists "pgcrypto";

-- Utility: maintain updated_at timestamps
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


