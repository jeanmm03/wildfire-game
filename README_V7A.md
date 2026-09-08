# Wildfire V7A — Nosso Relacionamento

Base: repositório enviado pelo usuário em 08/09/2026.

## O que foi implementado
- Conexão: 36 perguntas e fluxo anterior preservados.
- Morar Juntos: 48 perguntas e fluxo anterior preservados.
- Nosso Relacionamento: 72 perguntas autorais, 6 blocos e 3 mecânicas.
- Conversa aberta, resposta individual protegida e mapa de limites.
- Revelação somente depois de duas confirmações e liberação das duas chaves.
- Cada pessoa registra seu próprio entendimento após a conversa.
- Avanço somente depois das duas decisões.
- Opção de adiar perguntas antes de iniciar a rodada privada.
- Resumo final de entendimentos e assuntos pendentes.
- Não há pontuação de compatibilidade nem manifesto persistente nesta etapa.

## Instalação
Faça backup ou crie uma branch antes de substituir os arquivos.
Extraia o ZIP e envie os arquivos mantendo seus caminhos relativos.
O netlify.toml original foi preservado. O deploy continua conectado ao GitHub.
Não é necessário executar SQL nem alterar variáveis do Supabase.
Não substitua a chave secreta do Netlify por uma publishable key.

## Privacidade e limitações
As respostas são cifradas no navegador com AES-GCM e uma chave aleatória por
resposta. O estado compartilhado recebe somente o texto cifrado até que ambos
confirmem. Depois, cada navegador libera sua chave e as respostas são abertas.
Isso protege a revelação contra leitura casual antecipada, mas NÃO constitui
mensageria ponta a ponta autenticada: a sala usa canais públicos, identidade
de cliente não autenticada e anfitrião como autoridade. Um participante
malicioso ou cliente modificado pode interferir no protocolo. Não use como
cofre de informações sensíveis ou como garantia de sigilo contra o outro jogador.

Respostas e chaves não são enviadas à Function de telemetria nem persistidas
no banco. O estado Realtime é efêmero. Fechar ou atualizar a página durante
uma resposta privada pode impedir sua recuperação; a partida não tem
recuperação persistente. Evite compartilhar respostas que não deseja revelar.

O resumo final registra apenas identificadores de perguntas e decisões
agregado/pendente. O manifesto e a persistência opcional de acordos ficam
para a V7B, após definição de autenticação, consentimento e armazenamento.

## Testes
node --check script.js
node --check relationship-engine.js
node --check relationship-questions.js
node --check netlify/functions/log-access.mjs
node tests/relationship-engine.test.mjs

O teste automatizado verifica dois compromissos cifrados independentes,
ausência de texto claro no compromisso, revelação mútua, decifragem e
validação de remetente. Não substitui homologação real em dois dispositivos.

## Homologação recomendada
1. Teste Conexão e Morar Juntos antes de iniciar o terceiro modo.
2. Crie uma sala de relacionamento em um celular e entre no outro.
3. Teste uma pergunta aberta, uma secreta e uma de limites.
4. Confirme que uma resposta não aparece antes das duas liberações.
5. Registre decisões diferentes e confirme que o jogo não força acordo.
6. Teste a opção de adiar antes de iniciar a resposta privada.
7. Teste perda de conexão e atualização de página em uma sala descartável.
8. Confira no Supabase somente os metadados de eventos, nunca respostas.
