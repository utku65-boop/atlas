-- SQL Schema for Supabase Setup

-- 1. Users table
create table public.users (
  username text primary key,
  name text not null,
  xp integer default 0,
  level integer default 1,
  streak integer default 0,
  status text default 'offline',
  last_active timestamp with time zone default now(),
  pomodoro_status jsonb
);

-- 2. Friendships table
create table public.friendships (
  id uuid default gen_random_uuid() primary key,
  user1 text references public.users(username) on delete cascade,
  user2 text references public.users(username) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user1, user2)
);

-- 3. Friend Requests table
create table public.friend_requests (
  id uuid default gen_random_uuid() primary key,
  sender text references public.users(username) on delete cascade,
  receiver text references public.users(username) on delete cascade,
  status text default 'pending', -- 'pending'
  created_at timestamp with time zone default now(),
  unique(sender, receiver)
);

-- 4. Departments table
create table public.departments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text,
  description text,
  base_score decimal,
  city text,
  university text,
  type text, -- 'Devlet' or 'Vakıf'
  match_score integer default 0,
  riasec_scores jsonb, -- { "R": 80, "I": 90, ... }
  created_at timestamp with time zone default now()
);

-- 5. Mentors table
create table public.mentors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  university text,
  department text,
  role text,
  rating decimal default 5.0,
  reviews integer default 0,
  price integer,
  image text,
  tags text[],
  created_at timestamp with time zone default now()
);

-- RLS (Row Level Security) - Simplified for prototype
alter table public.users enable row level security;
alter table public.friendships enable row level security;
alter table public.friend_requests enable row level security;
alter table public.departments enable row level security;
alter table public.mentors enable row level security;

create policy "Enable public access for all" on public.users for all using (true);
create policy "Enable public access for all" on public.friendships for all using (true);
create policy "Enable public access for all" on public.friend_requests for all using (true);
create policy "Enable public access for all" on public.departments for all using (true);
create policy "Enable public access for all" on public.mentors for all using (true);
