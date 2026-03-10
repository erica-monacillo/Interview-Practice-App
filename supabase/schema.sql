-- ─────────────────────────────────────────────────────────────────────────────
-- Interview Prep App — Supabase Schema
-- Run this in your Supabase project: SQL Editor → New Query → paste → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Create the answers table
create table if not exists public.answers (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  question    text        not null,
  category    text        not null,
  answer      text        not null,
  confidence  smallint    not null check (confidence between 1 and 5),
  elapsed     integer     not null default 0,   -- seconds spent on answer
  created_at  timestamptz not null default now()
);

-- 2. Indexes for common queries
create index if not exists answers_user_id_idx    on public.answers (user_id);
create index if not exists answers_category_idx   on public.answers (category);
create index if not exists answers_created_at_idx on public.answers (created_at desc);

-- 3. Enable Row Level Security (RLS)
--    Each user can only see and modify their own rows.
alter table public.answers enable row level security;

-- 4. RLS Policies

-- SELECT: users can only read their own answers
create policy "Users can read own answers"
  on public.answers
  for select
  using (auth.uid() = user_id);

-- INSERT: users can only insert rows with their own user_id
create policy "Users can insert own answers"
  on public.answers
  for insert
  with check (auth.uid() = user_id);

-- UPDATE: users can only update their own answers
create policy "Users can update own answers"
  on public.answers
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE: users can only delete their own answers
create policy "Users can delete own answers"
  on public.answers
  for delete
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- Optional: Example rows (comment out if not needed)
-- ─────────────────────────────────────────────────────────────────────────────
-- insert into public.answers (user_id, question, category, answer, confidence, elapsed)
-- values (
--   '00000000-0000-0000-0000-000000000000',  -- replace with a real user UUID
--   'What is the time complexity of binary search?',
--   'Algorithms',
--   'O(log n). Binary search halves the search space at each step...',
--   4,
--   90
-- );
