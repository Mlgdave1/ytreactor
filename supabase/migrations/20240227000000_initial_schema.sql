-- Enable RLS
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    username text unique,
    full_name text,
    avatar_url text,
    subscription_tier text default 'free' check (subscription_tier in ('free', 'basic', 'pro')) not null,
    monthly_video_count integer default 0 not null,
    constraint username_length check (char_length(username) >= 3)
);

-- Create videos table
create table public.videos (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamptz default now() not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    description text,
    storage_path text not null,
    thumbnail_url text,
    duration integer,
    status text default 'processing' check (status in ('processing', 'ready', 'error')) not null,
    youtube_url text
);

-- Create assets table
create table public.assets (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamptz default now() not null,
    type text check (type in ('lower_third', 'sticker', 'overlay', 'text')) not null,
    name text not null,
    url text not null,
    thumbnail_url text not null,
    tier text default 'free' check (tier in ('free', 'basic', 'pro')) not null,
    metadata jsonb default '{}'::jsonb
);

-- Create collaboration_sessions table
create table public.collaboration_sessions (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamptz default now() not null,
    host_id uuid references public.profiles(id) on delete cascade not null,
    status text default 'active' check (status in ('active', 'ended')) not null,
    recording_path text,
    youtube_url text not null
);

-- Create session_participants table
create table public.session_participants (
    session_id uuid references public.collaboration_sessions(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    joined_at timestamptz default now() not null,
    role text default 'guest' check (role in ('host', 'guest')) not null,
    primary key (session_id, user_id)
);

-- Set up Row Level Security (RLS) policies
create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id);

create policy "Users can view their own videos"
    on public.videos for select
    using (auth.uid() = user_id);

create policy "Users can insert their own videos"
    on public.videos for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own videos"
    on public.videos for update
    using (auth.uid() = user_id);

create policy "Users can delete their own videos"
    on public.videos for delete
    using (auth.uid() = user_id);

create policy "Everyone can view assets"
    on public.assets for select
    to authenticated
    using (true);

create policy "Users can view their collaboration sessions"
    on public.collaboration_sessions for select
    using (auth.uid() = host_id);

create policy "Users can create collaboration sessions"
    on public.collaboration_sessions for insert
    with check (auth.uid() = host_id);

create policy "Users can update their collaboration sessions"
    on public.collaboration_sessions for update
    using (auth.uid() = host_id);

-- Create storage buckets
insert into storage.buckets (id, name, public) values ('videos', 'videos', false);
insert into storage.buckets (id, name, public) values ('thumbnails', 'thumbnails', true);
insert into storage.buckets (id, name, public) values ('assets', 'assets', true);

-- Set up storage policies
create policy "Users can upload their own videos"
    on storage.objects for insert
    with check (bucket_id = 'videos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view their own videos"
    on storage.objects for select
    using (bucket_id = 'videos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Everyone can view public thumbnails"
    on storage.objects for select
    using (bucket_id = 'thumbnails');

create policy "Everyone can view public assets"
    on storage.objects for select
    using (bucket_id = 'assets');

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, username, avatar_url)
    values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
    return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();