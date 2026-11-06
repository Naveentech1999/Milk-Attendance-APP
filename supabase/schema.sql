-- Milk Attendance App: Supabase database setup
-- Run this entire file once in Supabase Dashboard -> SQL Editor -> New query.
-- The browser uses only the project's publishable key. RLS restricts each row to its owner.

create table if not exists public.milk_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.milk_app_state enable row level security;

drop policy if exists "Users can read their own milk app state" on public.milk_app_state;
create policy "Users can read their own milk app state"
  on public.milk_app_state for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own milk app state" on public.milk_app_state;
create policy "Users can insert their own milk app state"
  on public.milk_app_state for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own milk app state" on public.milk_app_state;
create policy "Users can update their own milk app state"
  on public.milk_app_state for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.milk_app_state to authenticated;

-- Private bucket for future generated monthly customer bill images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('customer-bills', 'customer-bills', false, 10485760, array['image/png'])
on conflict (id) do update set public = false, file_size_limit = 10485760, allowed_mime_types = array['image/png'];

drop policy if exists "Users can read their own bill images" on storage.objects;
create policy "Users can read their own bill images"
  on storage.objects for select to authenticated
  using (bucket_id = 'customer-bills' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can upload their own bill images" on storage.objects;
create policy "Users can upload their own bill images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'customer-bills' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can update their own bill images" on storage.objects;
create policy "Users can update their own bill images"
  on storage.objects for update to authenticated
  using (bucket_id = 'customer-bills' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'customer-bills' and (storage.foldername(name))[1] = auth.uid()::text);


-- Enable row UPDATE events for the Android app's optional Supabase Realtime
-- listener. This is idempotent and keeps the existing owner-only RLS policies.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'milk_app_state'
  ) then
    alter publication supabase_realtime add table public.milk_app_state;
  end if;
end
$$;
