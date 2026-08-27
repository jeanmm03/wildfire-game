# Wildfire V6A — Conexão + Under the Same Roof

Esta versão mantém o modo original **Conexão** e adiciona o novo modo
**Morar Juntos / Under the Same Roof**.

## Modos disponíveis

### ❤️ Conexão
- 36 perguntas
- 3 blocos
- fluxo original preservado
- timer final de 4 minutos

### 🏠 Morar Juntos
- 48 perguntas
- 4 blocos:
  1. A casa que imaginamos
  2. Vida real
  3. Nós dois
  4. Se der certo — e se não der
- perguntas aleatórias sem repetição dentro do bloco
- duas pessoas obrigatórias na sala
- modo escolhido pelo anfitrião e sincronizado para o convidado
- opção "Quero conversar sobre isso depois"
- assuntos adiados aparecem no resumo final

### 🔥 Nosso Relacionamento
- aparece na home como "Em breve"
- ainda não implementado

## Arquitetura preservada

- GitHub
- Netlify
- Supabase Realtime (Broadcast + Presence)
- Netlify Function para telemetria
- Supabase para wildfire_access_log

## Estrutura de deploy

Os arquivos web continuam na RAIZ do repositório, para combinar com o
deploy atual:

index.html
style.css
script.js
config.js
netlify.toml
package.json
netlify/functions/log-access.mjs

O netlify.toml usa:

[build]
publish = "."
functions = "netlify/functions"

## Telemetria nova

Além dos eventos já existentes, esta versão registra:
- MODE_SELECTED
- TOPIC_DEFERRED

O modo da conversa é enviado em `event_data.conversation_mode`.

Nenhuma resposta íntima é gravada no log.

## Atualização no GitHub

Substitua:
- index.html
- style.css
- script.js
- config.js
- netlify.toml
- netlify/functions/log-access.mjs

Mantenha as Environment Variables do Netlify:
- SUPABASE_URL
- SUPABASE_SECRET_KEY

Depois do commit, aguarde o deploy automático.

## Teste recomendado

1. Abra o site em dois celulares.
2. No celular 1 selecione "Morar Juntos".
3. Crie a sala.
4. No celular 2 entre pelo código.
5. Confirme que aparece "🏠 Morar Juntos" nos dois.
6. Inicie.
7. Gire uma pergunta.
8. Confirme que a mesma pergunta aparece nos dois.
9. Use "Conversamos".
10. Em outra pergunta use "Quero conversar sobre isso depois".
11. Complete um bloco e confirme o avanço sincronizado.
12. Para homologação rápida do final, pode temporariamente reduzir a lista
    de perguntas no código; para uso real, deixe as 48.

## Observação

A versão ainda usa o anfitrião como autoridade da sala. Se o anfitrião
fechar completamente o navegador, a partida não possui persistência para
recuperação integral. Essa limitação já existia no modelo Realtime atual.
