-- CONSULTAS ÚTEIS - WILDFIRE

-- 1) Últimos 100 eventos
select
  created_at,
  event,
  player_name,
  room_code,
  player_slot,
  ip_address,
  geo_city,
  geo_subdivision_name,
  geo_country_code,
  platform_client,
  timezone_client
from public.wildfire_access_log
order by created_at desc
limit 100;


-- 2) Quem acessou / identificou-se no jogo
select
  player_name,
  ip_address,
  min(created_at) as primeiro_evento,
  max(created_at) as ultimo_evento,
  count(*) as eventos,
  array_agg(distinct room_code) filter (where room_code is not null) as salas
from public.wildfire_access_log
where player_name is not null
group by player_name, ip_address
order by ultimo_evento desc;


-- 3) Timeline completa de uma sala
-- Troque ABC123 pelo código desejado.
select *
from public.wildfire_access_log
where room_code = 'ABC123'
order by created_at;


-- 4) Visitantes únicos por dia (por session_id)
select
  created_at::date as dia,
  count(distinct session_id) as sessoes_unicas,
  count(*) filter (where event = 'PAGE_VIEW') as page_views
from public.wildfire_access_log
group by created_at::date
order by dia desc;


-- 5) IPs com mais atividade
select
  ip_address,
  count(*) as eventos,
  count(distinct session_id) as sessoes,
  min(created_at) as primeiro_acesso,
  max(created_at) as ultimo_acesso
from public.wildfire_access_log
where ip_address is not null
group by ip_address
order by eventos desc;


-- 6) Jogos iniciados e concluídos
select
  room_code,
  min(created_at) filter (where event = 'GAME_STARTED') as inicio,
  max(created_at) filter (where event = 'GAME_COMPLETED') as conclusao,
  count(*) filter (where event = 'QUESTION_ANSWERED') as respostas_confirmadas
from public.wildfire_access_log
where room_code is not null
group by room_code
order by inicio desc nulls last;


-- 7) Acessos que nunca informaram nome
select
  session_id,
  ip_address,
  min(created_at) as primeiro_acesso,
  max(created_at) as ultimo_acesso,
  count(*) as eventos
from public.wildfire_access_log
group by session_id, ip_address
having max(player_name) is null
order by ultimo_acesso desc;
