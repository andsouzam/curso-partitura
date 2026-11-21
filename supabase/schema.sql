-- ClaveViva — Schema Supabase (Execute no SQL Editor do seu projeto Supabase)

-- 1. Tabela de resumo de progresso por usuário
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0,
  best_streak integer not null default 0,
  stars jsonb not null default '{}'::jsonb,
  last_lesson_id text not null default '1.2',
  updated_at timestamptz not null default now()
);

-- 2. Histórico detalhado de exercícios/aulas realizados
create table if not exists public.lesson_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  exercise_id text not null,
  accuracy integer not null,
  stars integer not null,
  xp_earned integer not null,
  mode text not null default 'step',
  bpm integer not null default 70,
  created_at timestamptz not null default now()
);

-- Ativar Row Level Security (RLS)
alter table public.user_progress enable row level security;
alter table public.lesson_attempts enable row level security;

-- Políticas: cada usuário só acessa e altera os próprios registros
create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "Users can view own attempts"
  on public.lesson_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own attempts"
  on public.lesson_attempts for insert
  with check (auth.uid() = user_id);
