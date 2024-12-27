# My Finance App

A React application for tracking personal finances with authentication and monthly summaries.

## Features

- User authentication with Supabase
- Track income and expenditures
- Monthly summary of finances
- Responsive design

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project at https://supabase.com

4. Create the following table in your Supabase database:
   ```sql
   create table transactions (
     id uuid default uuid_generate_v4() primary key,
     user_id uuid references auth.users not null,
     type text check (type in ('income', 'expenditure')) not null,
     amount decimal not null,
     description text not null,
     date date not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable RLS
   alter table transactions enable row level security;

   -- Create policy for authenticated users
   create policy "Users can create their own transactions"
     on transactions for insert
     to authenticated
     with check (auth.uid() = user_id);

   create policy "Users can view their own transactions"
     on transactions for select
     to authenticated
     using (auth.uid() = user_id);
   ```

5. Copy your Supabase project URL and anon key and update the `.env` file:
   ```
   REACT_APP_SUPABASE_URL=your-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

6. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Sign up for an account or login
2. Add transactions (income or expenditure) using the form
3. View your transactions in the list
4. See monthly summaries of your finances

## Technologies Used

- React
- Supabase (Authentication & Database)
- React Router
- CSS Grid & Flexbox