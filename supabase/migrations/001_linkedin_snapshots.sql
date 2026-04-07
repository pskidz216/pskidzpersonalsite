-- LinkedIn Snapshots table
-- Stores periodic snapshots of LinkedIn profile data for change detection

create type snapshot_status as enum ('pending_review', 'applied', 'dismissed');

create table linkedin_snapshots (
  id uuid primary key default gen_random_uuid(),
  profile_url text not null,
  snapshot_data jsonb not null default '{}'::jsonb,
  captured_at timestamptz not null default now(),
  changes_detected jsonb not null default '[]'::jsonb,
  status snapshot_status not null default 'pending_review',
  created_at timestamptz not null default now()
);

-- RLS: only service role can read/write snapshots
alter table linkedin_snapshots enable row level security;

create policy "Service role full access"
  on linkedin_snapshots
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Index for querying latest snapshot per profile
create index idx_linkedin_snapshots_profile_captured
  on linkedin_snapshots (profile_url, captured_at desc);
