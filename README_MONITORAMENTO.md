# Wildfire V5 — Multiplayer + Log completo

## O que esta versão registra

A Netlify Function registra o evento no Supabase com timestamp do servidor,
IP visto pela infraestrutura da Netlify, nome (quando já informado),
sala, player, bloco/pergunta, user-agent, idioma, plataforma, timezone,
resolução, viewport, CPU lógica, memória aproximada (quando o navegador
disponibilizar), tipo de conexão, cidade/UF/país aproximados fornecidos pela
Netlify, request ID e região do servidor.

Eventos:
- PAGE_VIEW
- PAGE_LEFT
- ROOM_CREATED
- ROOM_JOINED
- GAME_STARTED
- WHEEL_SPIN
- QUESTION_ANSWERED
- BLOCK_COMPLETED
- GAME_COMPLETED
- NEXT_BLOCK_REQUESTED
- EYE_CONTACT_TIMER_STARTED

## Estrutura

public/
  index.html
  style.css
  script.js
  config.js

netlify/functions/
  log-access.mjs

package.json
netlify.toml
supabase_access_log.sql
queries_monitoramento.sql
AVISO_PRIVACIDADE.md

## 1. Supabase — criar a tabela

Abra:
Supabase > SQL Editor > New query

Cole todo o conteúdo de:
supabase_access_log.sql

Clique em Run.

A tabela criada será:
public.wildfire_access_log

A tabela tem RLS habilitado e não possui policies para visitantes.
O navegador não grava nela diretamente.

## 2. Supabase — criar uma SECRET KEY para o servidor

Abra:
Project Settings > API Keys

Use uma chave da seção Secret keys (sb_secret_...).

NÃO coloque essa chave em:
- config.js
- GitHub
- HTML
- JavaScript do navegador

O config.js continua usando apenas a Publishable key.

## 3. Netlify — criar variáveis de ambiente

No site do Wildfire:
Project configuration > Environment variables

Crie:

SUPABASE_URL
valor: https://SEU-PROJETO.supabase.co

SUPABASE_SECRET_KEY
valor: sb_secret_SUA_CHAVE_SECRETA

Depois faça um novo deploy.

## 4. GitHub

Suba/atualize:
- public/script.js
- netlify/functions/log-access.mjs
- package.json
- netlify.toml
- supabase_access_log.sql
- queries_monitoramento.sql

Mantenha config.js com a Publishable key atual.

IMPORTANTE:
a pasta netlify/functions precisa existir exatamente nesse caminho.

## 5. Netlify

O netlify.toml desta versão usa:

[build]
publish = "public"
functions = "netlify/functions"

Se no seu GitHub atual os arquivos web estão na RAIZ, você tem duas opções:

A) recomendada:
crie a pasta public e coloque index.html/style.css/script.js/config.js nela.

B) manter raiz:
altere apenas:
publish = "."

As Functions continuam em:
netlify/functions/

## 6. Testar

Após o deploy:
1. Abra o site.
2. Crie uma sala.
3. Entre com outro celular.
4. Responda algumas perguntas.

No Supabase:
Table Editor > wildfire_access_log

Você deverá ver PAGE_VIEW, ROOM_CREATED, ROOM_JOINED etc.

## 7. Consultas

Abra queries_monitoramento.sql no SQL Editor.
Ele contém consultas prontas para:
- últimos acessos
- quem acessou
- IP
- timeline de uma sala
- visitantes únicos
- jogos concluídos
- sessões que nunca informaram nome

## Observação sobre "quem acessou"

Antes de a pessoa digitar o nome, o site não conhece a identidade dela.
Esse primeiro PAGE_VIEW terá session_id + visit_id + IP + dados técnicos.
Quando a pessoa cria/entra numa sala, os eventos seguintes carregam o nome
e usam o mesmo session_id, permitindo relacionar a sessão.

## Privacidade

IP associado a nome/timestamp é dado pessoal. Para uso público, exiba um
aviso de privacidade e defina por quanto tempo os logs serão mantidos.
