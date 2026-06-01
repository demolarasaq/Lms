-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text default 'user' check (role in ('admin', 'user')),
  full_name text,
  phone_number text,
  address text,
  date_of_birth text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- 2. Books Table
create table public.books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  author text not null,
  edition text,
  pages integer,
  quantity integer default 1,
  category text,
  status text default 'Available',
  cover_url text,
  pdf_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for books
alter table public.books enable row level security;
create policy "Books are viewable by everyone." on books for select using (true);
create policy "Admins can insert books." on books for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update books." on books for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete books." on books for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 3. Borrows Table (For Tracking Borrowed Books/Reservations)
create table public.borrows (
  id uuid default uuid_generate_v4() primary key,
  book_id uuid references public.books on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'approved', 'returned', 'rejected')),
  borrow_date timestamp with time zone default timezone('utc'::text, now()),
  return_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for borrows
alter table public.borrows enable row level security;
create policy "Users can view their own borrows." on borrows for select using (auth.uid() = user_id);
create policy "Admins can view all borrows." on borrows for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users can request to borrow." on borrows for insert with check (auth.uid() = user_id);
create policy "Admins can update borrow status." on borrows for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Triggers for User Signup to Auto-create Profile
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Inventory Management Triggers
-- Function to handle book quantity changes when a borrow status is updated
create or replace function public.handle_borrow_status_change()
returns trigger as $$
begin
  -- If status changes from pending to approved: decrement quantity
  if old.status = 'pending' and new.status = 'approved' then
    update public.books
    set quantity = quantity - 1,
        status = case when quantity - 1 <= 0 then 'Out of Stock' else status end
    where id = new.book_id;
  end if;

  -- If status changes from approved to returned: increment quantity
  if old.status = 'approved' and new.status = 'returned' then
    update public.books
    set quantity = quantity + 1,
        status = case when status = 'Out of Stock' then 'Available' else status end
    where id = new.book_id;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_borrow_status_updated
  after update on public.borrows
  for each row
  when (old.status is distinct from new.status)
  execute procedure public.handle_borrow_status_change();

-- 5. Storage Buckets & Policies
-- Create buckets and set file size limits (5MB for covers, 100MB for PDFs)
insert into storage.buckets (id, name, public, file_size_limit) 
values 
  ('book-covers', 'book-covers', true, 5242880), 
  ('book-pdfs', 'book-pdfs', false, 104857600)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit;

-- (RLS is already enabled by default on storage.objects in Supabase)

-- Storage policies for Book Covers (Public read, Admin write)
create policy "Covers are viewable by everyone" on storage.objects for select using (bucket_id = 'book-covers');
create policy "Admins can upload covers" on storage.objects for insert with check (
  bucket_id = 'book-covers' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update covers" on storage.objects for update using (
  bucket_id = 'book-covers' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete covers" on storage.objects for delete using (
  bucket_id = 'book-covers' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Storage policies for Book PDFs (Authenticated read, Admin write)
create policy "PDFs viewable by authenticated users" on storage.objects for select using (
  bucket_id = 'book-pdfs' and auth.role() = 'authenticated'
);
create policy "Admins can upload PDFs" on storage.objects for insert with check (
  bucket_id = 'book-pdfs' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update PDFs" on storage.objects for update using (
  bucket_id = 'book-pdfs' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete PDFs" on storage.objects for delete using (
  bucket_id = 'book-pdfs' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
