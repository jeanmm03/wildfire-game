-- WILDFIRE - LOG COMPLETO DE ACESSOS
-- Execute uma única vez no Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.wildfire_access_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  created_at_client timestamptz,

  event text not null,

  session_id text,
  visit_id text,

  player_name text,
  player_slot text,
  room_code text,

  block_number integer,
  question_number integer,

  ip_address inet,

  user_agent text,
  accept_language text,

  page_url text,
  referrer text,

  language_client text,
  languages_client jsonb,
  platform_client text,
  timezone_client text,

  screen_width integer,
  screen_height integer,
  viewport_width integer,
  viewport_height integer,

  hardware_concurrency integer,
  device_memory_gb numeric,
  connection_type text,

  geo_city text,
  geo_country_code text,
  geo_country_name text,
  geo_subdivision_code text,
  geo_subdivision_name text,
  geo_timezone text,
  geo_postal_code text,

  netlify_request_id text,
  netlify_site_name text,
  netlify_server_region text,

  event_data jsonb not null default '{}'::jsonb
);

-- O navegador NÃO acessa a tabela diretamente.
-- O insert é feito apenas pela Netlify Function usando SUPABASE_SECRET_KEY.
alter table public.wildfire_access_log enable row level security;

-- Sem policies para anon/authenticated.
-- Portanto, clientes públicos não conseguem ler/inserir diretamente.

create index if not exists idx_wildfire_log_created_at
  on public.wildfire_access_log (created_at desc);

create index if not exists idx_wildfire_log_room
  on public.wildfire_access_log (room_code, created_at desc);

create index if not exists idx_wildfire_log_session
  on public.wildfire_access_log (session_id, created_at desc);

create index if not exists idx_wildfire_log_event
  on public.wildfire_access_log (event, created_at desc);

comment on table public.wildfire_access_log is
  'Telemetria técnica do Wildfire registrada via Netlify Function.';
