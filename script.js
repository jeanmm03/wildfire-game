import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import { relationshipBlocks } from "./relationship-questions.js";
import { createRelationshipEngine } from "./relationship-engine.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MODES = {
  relationship: { id:"relationship", icon:"🔥", name:"Nosso Relacionamento", totalQuestions:72, tip:"Respostas sinceras, limites voluntários e nenhum consenso forçado.", blocks:relationshipBlocks },
  connection: {
    id: "connection",
    icon: "❤️",
    name: "Conexão",
    totalQuestions: 36,
    tip: "Não existe resposta certa. O objetivo é responder de verdade.",
    blocks: [
      {
        title: "Aproximação",
        endTitle: "Primeiro bloco concluído.",
        endText: "Vocês quebraram o gelo. Agora a conversa entra em sonhos, lembranças e coisas que importam de verdade.",
        questions: [
          "Se você pudesse escolher qualquer pessoa do mundo, quem gostaria de ter como convidado para jantar?",
          "Você gostaria de ser famoso? De que maneira?",
          "Antes de fazer uma ligação telefônica, você costuma ensaiar o que vai dizer? Por quê?",
          "O que constituiria um “dia perfeito” para você?",
          "Quando foi a última vez que você cantou para si mesmo? E para outra pessoa?",
          "Se pudesse viver até os 90 anos e manter, durante os últimos 60 anos da vida, ou a mente ou o corpo de uma pessoa de 30 anos, qual escolheria?",
          "Você tem algum pressentimento secreto sobre como vai morrer?",
          "Diga três coisas que você e a outra pessoa parecem ter em comum.",
          "Pelo que, em sua vida, você se sente mais grato?",
          "Se pudesse mudar alguma coisa na maneira como foi criado, o que mudaria?",
          "Durante cerca de quatro minutos, conte à outra pessoa a história da sua vida com o máximo de detalhes possível.",
          "Se pudesse acordar amanhã tendo adquirido uma nova qualidade ou habilidade, qual seria?"
        ]
      },
      {
        title: "Vulnerabilidade",
        endTitle: "Segundo bloco concluído.",
        endText: "A superfície ficou para trás. O último bloco é o mais íntimo.",
        questions: [
          "Se uma bola de cristal pudesse lhe revelar a verdade sobre você, sua vida, o futuro ou qualquer outra coisa, o que você gostaria de saber?",
          "Existe algo que você sonha em fazer há muito tempo? Por que ainda não fez?",
          "Qual é a maior realização da sua vida?",
          "O que você mais valoriza em uma amizade?",
          "Qual é a sua lembrança mais preciosa?",
          "Qual é a sua lembrança mais terrível?",
          "Se soubesse que daqui a um ano morreria repentinamente, mudaria alguma coisa na maneira como está vivendo agora? Por quê?",
          "O que amizade significa para você?",
          "Que papéis o amor e o afeto desempenham na sua vida?",
          "Alternadamente, diga uma característica que você considera positiva na outra pessoa. Compartilhem um total de cinco características.",
          "Quão próxima e afetuosa é sua família? Você sente que sua infância foi mais feliz do que a da maioria das pessoas?",
          "Como você se sente em relação ao seu relacionamento com sua mãe?"
        ]
      },
      {
        title: "Intimidade",
        endTitle: "",
        endText: "",
        questions: [
          "Cada um faça três afirmações verdadeiras usando “nós”. Por exemplo: “Nós dois estamos nesta sala sentindo...”",
          "Complete a frase: “Eu gostaria de ter alguém com quem pudesse compartilhar...”",
          "Se vocês fossem se tornar amigos próximos, diga o que seria importante que a outra pessoa soubesse sobre você.",
          "Diga à outra pessoa o que você gosta nela. Seja muito sincero desta vez, dizendo coisas que talvez não dissesse a alguém que acabou de conhecer.",
          "Compartilhe com a outra pessoa um momento constrangedor da sua vida.",
          "Quando foi a última vez que você chorou na frente de outra pessoa? E quando chorou sozinho?",
          "Diga à outra pessoa algo de que você já gosta nela.",
          "O que, se é que existe algo, é sério demais para ser motivo de piada?",
          "Se você fosse morrer esta noite sem ter oportunidade de se comunicar com mais ninguém, o que mais lamentaria não ter dito a alguém? Por que ainda não disse?",
          "Sua casa, contendo tudo o que você possui, pega fogo. Depois de salvar as pessoas queridas e os animais de estimação, você ainda tem tempo para entrar com segurança uma última vez e salvar apenas um objeto. O que salvaria? Por quê?",
          "Entre todas as pessoas da sua família, a morte de quem seria mais perturbadora para você? Por quê?",
          "Compartilhe um problema pessoal e peça à outra pessoa um conselho sobre como ela lidaria com ele. Depois, peça que ela diga como acha que você está se sentindo em relação ao problema que escolheu."
        ]
      }
    ]
  },

  living: {
    id: "living",
    icon: "🏠",
    name: "Morar Juntos",
    totalQuestions: 48,
    tip: "A ideia não é concordar com tudo. É descobrir o que precisa ser combinado antes de dividir a mesma casa.",
    blocks: [
      {
        title: "A casa que imaginamos",
        endTitle: "A casa começou a ganhar forma.",
        endText: "Agora saímos da expectativa e entramos na parte pouco cinematográfica — e muito importante — da vida real.",
        questions: [
          "Quando você imagina nós dois morando juntos, qual é a primeira coisa boa que vem à sua cabeça?",
          "Qual é a coisa que mais te anima nessa possibilidade?",
          "Qual é a coisa que mais te assusta?",
          "Para você, o que faz um lugar realmente parecer “casa”?",
          "Quanto tempo sozinho você normalmente precisa para se sentir bem?",
          "Como você imagina nossa rotina durante a semana?",
          "O que você gostaria que continuasse exatamente igual entre nós depois de morarmos juntos?",
          "O que você acha que inevitavelmente mudaria?",
          "Quais hábitos seus você acha que poderiam me irritar?",
          "Quais hábitos meus você imagina que poderiam te irritar?",
          "O que faria você sentir que também pertence à casa, em vez de sentir que está apenas hospedado nela?",
          "Se nossa convivência estivesse funcionando maravilhosamente daqui a seis meses, como seria um dia comum nosso?"
        ]
      },
      {
        title: "Vida real",
        endTitle: "Agora já existe boleto nessa história.",
        endText: "Vocês falaram de tarefas, dinheiro e rotina. O próximo bloco entra no que cada um precisa emocionalmente para continuar sendo indivíduo e casal.",
        questions: [
          "O que significa, para você, dividir as responsabilidades de uma casa de forma justa?",
          "Quais tarefas domésticas você odeia e quais não se importa de fazer?",
          "Como deveríamos decidir quem limpa, cozinha, compra coisas e organiza a casa?",
          "Como você se sentiria se percebesse que está fazendo mais tarefas que o outro?",
          "Como devemos dividir despesas enquanto nossa situação financeira for diferente?",
          "Enquanto um de nós estiver procurando emprego, o que seria uma contribuição justa para a casa?",
          "Quando a situação profissional mudar, devemos rever os acordos financeiros? Como?",
          "Existem gastos que você considera individuais mesmo morando juntos?",
          "Quanto devemos saber sobre a situação financeira um do outro?",
          "Como devemos lidar com visitas, amigos ou familiares dentro de casa?",
          "Que hábitos relacionados a sono, comida, limpeza, barulho ou horários você considera difíceis de negociar?",
          "Qual acordo prático precisamos estabelecer antes de morar juntos para evitar ressentimento depois?"
        ]
      },
      {
        title: "Nós dois",
        endTitle: "Casa compartilhada, individualidade preservada.",
        endText: "O último bloco olha para conflitos, segurança e para a possibilidade de revisar a decisão sem transformar tudo em catástrofe.",
        questions: [
          "Você tem medo de perder alguma parte da sua independência morando comigo?",
          "O que faria você sentir que continua tendo liberdade mesmo dividindo a casa?",
          "Quando você precisa de espaço, como gostaria de me comunicar isso sem que eu interprete como rejeição?",
          "Quando você estiver inseguro, o que gostaria que eu fizesse — e o que definitivamente não gostaria?",
          "Qual insegurança sua você acha que essa mudança pode despertar?",
          "O que você acha que pode despertar insegurança em mim?",
          "Como devemos conversar quando um de nós estiver irritado e o outro não estiver pronto para resolver naquele momento?",
          "O que seria uma invasão de privacidade para você mesmo estando em um relacionamento?",
          "Celular, mensagens, objetos pessoais e conversas privadas: onde começa e termina a privacidade dentro da nossa casa?",
          "O que faria você começar a se sentir preso nessa relação?",
          "O que faria você começar a se sentir sozinho mesmo morando comigo?",
          "O que você precisaria continuar recebendo de mim para ainda se sentir meu parceiro, e não simplesmente meu colega de apartamento?"
        ]
      },
      {
        title: "Se der certo — e se não der",
        endTitle: "",
        endText: "",
        questions: [
          "O que faria você perceber: “morar juntos está fazendo bem para nós”?",
          "Que sinais indicariam que nossa convivência não está saudável?",
          "Se um de nós estiver infeliz com alguma coisa, quanto tempo acha aceitável guardar isso antes de conversar?",
          "Como você gostaria que eu trouxesse um problema sem fazer você se sentir atacado?",
          "Durante uma discussão, quais comportamentos deveriam ser limites absolutos para nós dois?",
          "O que significa pedir desculpas de verdade para você?",
          "Depois de uma briga, o que ajuda você a se reconectar?",
          "Se você ficar desempregado por mais tempo do que espera, como gostaria que conversássemos sobre isso?",
          "Se morar juntos começar a prejudicar nosso relacionamento, você conseguiria considerar voltar a morar separado sem interpretar isso automaticamente como término?",
          "Se um de nós decidir que a convivência não está funcionando, como poderíamos tornar essa transição respeitosa e segura para os dois?",
          "Quais três acordos você gostaria que fizéssemos antes de começar?",
          "Depois de tudo que conversamos hoje: você quer morar comigo? E o que precisa existir para que seu “sim” seja tranquilo e verdadeiro?"
        ]
      }
    ]
  }
};

const el = id => document.getElementById(id);
const screens = {
  home: el("screenHome"),
  lobby: el("screenLobby"),
  game: el("screenGame"),
  blockEnd: el("screenBlockEnd"),
  final: el("screenFinal")
};

const PLAYER_ID = crypto.randomUUID();
const VISIT_ID = crypto.randomUUID();
const SESSION_KEY = "wildfire_session_id";
const SESSION_ID = localStorage.getItem(SESSION_KEY) || crypto.randomUUID();
localStorage.setItem(SESSION_KEY, SESSION_ID);

let selectedMode = "connection";
let channel = null;
let roomCode = null;
let playerSlot = null;
let playerName = null;
let hostId = null;
let localRotation = 0;

let state = {
  mode: "connection",
  status: "lobby",
  players: {},
  deferredTopics: [],
  relationship: { round:null, results:[], decisions:{} },
  game: {
    block: 0,
    remaining: [],
    answeredInBlock: 0,
    totalAnswered: 0,
    currentPlayer: 0,
    currentIndex: null,
    questionVisible: false,
    rotation: 0
  }
};

const relationshipEngine = createRelationshipEngine({
  el, getState:()=>state, getSlot:()=>playerSlot, getPlayerId:()=>PLAYER_ID,
  getPlayers:()=>state.players, isHost:amIHost, connected:bothConnected,
  send:sendBroadcast, sync:broadcastState, complete:completeCurrentQuestion,
  log:(event)=>logEvent(event,{conversation_mode:"relationship"}),
  getDefinition:()=>MODES.relationship
});
function relationshipQuestion() { return relationshipEngine.current(); }
function validRelationshipAction(payload) { return relationshipEngine.valid(payload); }
function renderRelationshipQuestion() { relationshipEngine.render(); }
function renderRelationshipFinal() {
  el("finalIcon").textContent="🔥";
  el("finalEyebrow").textContent="72 conversas depois";
  el("finalTitle").textContent="O relacionamento que vocês escolhem construir.";
  el("finalText").textContent="Vocês não precisam concordar com tudo. Nenhum entendimento exige que alguém abandone seus limites.";
  el("connectionRitual").classList.add("hidden");
  el("livingSummary").classList.add("hidden");
  const box=el("relationshipSummary");
  box.classList.remove("hidden");box.replaceChildren();
  const results=state.relationship?.results||[];
  const title=document.createElement("h3");title.textContent="🧭 Mapa das conversas";box.append(title);
  const summary=document.createElement("p");
  summary.textContent=`${results.filter(x=>x.aligned).length} entendimentos registrados • ${results.filter(x=>!x.aligned).length} assuntos que merecem mais conversa.`;
  box.append(summary);
  const note=document.createElement("p");
  note.textContent="Este resumo não é uma nota de compatibilidade nem um contrato. As respostas íntimas não são armazenadas no banco. O manifesto e os acordos compartilhados serão implementados na próxima etapa.";
  box.append(note);
  const pending=state.deferredTopics||[];
  if(pending.length) {
    const h=document.createElement("h3");h.textContent="💭 Para conversar depois";box.append(h);
    const ul=document.createElement("ul");
    pending.forEach(item=>{const li=document.createElement("li");li.textContent=item.question;ul.append(li);});
    box.append(ul);
  }
}

function modeDef(mode = state.mode) {
  return MODES[mode] || MODES.connection;
}

function currentBlockDef() {
  return modeDef().blocks[state.game.block];
}

function createInitialGame(mode) {
  return {
    block: 0,
    remaining: MODES[mode].blocks[0].questions.map((_, i) => i),
    answeredInBlock: 0,
    totalAnswered: 0,
    currentPlayer: 0,
    currentIndex: null,
    questionVisible: false,
    rotation: 0
  };
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function publicState() {
  return {
    mode: state.mode,
    status: state.status,
    hostId,
    game: state.game,
    deferredTopics: state.deferredTopics,
    relationship: state.relationship
  };
}

async function logEvent(event, extras = {}, useBeacon = false) {
  const payload = {
    event,
    session_id: SESSION_ID,
    visit_id: VISIT_ID,
    player_name: playerName || null,
    player_slot: playerSlot || null,
    room_code: roomCode || null,
    block_number: Number.isInteger(state?.game?.block) ? state.game.block + 1 : null,
    question_number:
      Number.isInteger(state?.game?.currentIndex) && Number.isInteger(state?.game?.block)
        ? state.game.block * 12 + state.game.currentIndex + 1
        : null,
    page_url: window.location.href,
    referrer: document.referrer || null,
    language: navigator.language || null,
    languages: Array.isArray(navigator.languages) ? navigator.languages : null,
    platform: navigator.userAgentData?.platform || navigator.platform || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    screen_width: window.screen?.width || null,
    screen_height: window.screen?.height || null,
    viewport_width: window.innerWidth || null,
    viewport_height: window.innerHeight || null,
    hardware_concurrency: navigator.hardwareConcurrency || null,
    device_memory: navigator.deviceMemory || null,
    connection_type: navigator.connection?.effectiveType || null,
    conversation_mode: state.mode || selectedMode,
    ...extras
  };

  try {
    const url = "/.netlify/functions/log-access";

    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(
        url,
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) {
      console.warn("Wildfire telemetry:", response.status, await response.text());
    }
  } catch (error) {
    console.warn("Wildfire telemetry indisponível:", error);
  }
}

async function sendBroadcast(event, payload) {
  if (!channel) return;
  await channel.send({ type: "broadcast", event, payload });
}

async function broadcastState() {
  await sendBroadcast("state_sync", publicState());
}

function presencePlayers() {
  if (!channel) return [];

  const result = [];
  const presence = channel.presenceState();

  Object.entries(presence).forEach(([key, metas]) => {
    metas.forEach(meta => {
      result.push({
        key,
        id: meta.playerId,
        name: meta.name,
        slot: meta.slot
      });
    });
  });

  return result;
}

function rebuildPlayersFromPresence() {
  const players = {};

  presencePlayers().forEach(item => {
    if (item.slot === "p1") {
      players.p1 = { id: item.id, name: item.name, connected: true };
    }
    if (item.slot === "p2") {
      players.p2 = { id: item.id, name: item.name, connected: true };
    }
  });

  state.players = players;
  render();
}

function currentPlayerSlot() {
  return state.game.currentPlayer === 0 ? "p1" : "p2";
}

function amIHost() {
  return PLAYER_ID === hostId;
}

function isMyTurn() {
  return playerSlot === currentPlayerSlot();
}

function bothConnected() {
  return !!(state.players.p1?.connected && state.players.p2?.connected);
}

async function configureChannel(code, name, slot, isHost = false) {
  if (channel) {
    await supabase.removeChannel(channel);
  }

  roomCode = code;
  playerName = name;
  playerSlot = slot;

  if (isHost) {
    hostId = PLAYER_ID;
  }

  channel = supabase.channel(`wildfire:${roomCode}`, {
    config: {
      broadcast: { self: true, ack: true },
      presence: { key: PLAYER_ID }
    }
  });

  channel
    .on("presence", { event: "sync" }, () => {
      rebuildPlayersFromPresence();
      if (amIHost()) broadcastState();
    })
    .on("presence", { event: "join" }, () => {
      rebuildPlayersFromPresence();
      if (amIHost()) broadcastState();
    })
    .on("presence", { event: "leave" }, () => {
      rebuildPlayersFromPresence();
      if (amIHost()) broadcastState();
    })

    .on("broadcast", { event: "request_state" }, async () => {
      if (amIHost()) await broadcastState();
    })

    .on("broadcast", { event: "state_sync" }, ({ payload }) => {
      if (!payload) return;
      if (hostId && payload.hostId !== hostId) return;
      if (!hostId && payload.hostId !== state.players.p1?.id) return;

      if (payload.mode) state.mode = payload.mode;
      if (payload.hostId) hostId = payload.hostId;
      if (payload.status) state.status = payload.status;
      if (payload.game) state.game = payload.game;
      state.deferredTopics = payload.deferredTopics || [];
      if (payload.relationship) state.relationship = payload.relationship;
      relationshipEngine.decodeResults();

      render();
    })

    .on("broadcast", { event: "action_spin" }, async ({ payload }) => {
      if (!amIHost()) return;
      if (payload?.playerId !== state.players[currentPlayerSlot()]?.id) return;
      if (!bothConnected()) return;
      if (state.game.questionVisible || state.game.currentIndex !== null) return;
      if (state.mode === "relationship" && state.relationship?.round) return;

      const remaining = state.game.remaining || [];
      if (!remaining.length) return;

      const selected = remaining[Math.floor(Math.random() * remaining.length)];

      if (state.mode === "relationship") state.relationship.round = null;
      state.game.currentIndex = selected;
      state.game.questionVisible = false;
      state.game.rotation +=
        (5 + Math.floor(Math.random() * 3)) * 360 +
        Math.floor(Math.random() * 360);

      await broadcastState();

      setTimeout(async () => {
        if (state.game.currentIndex === selected) {
          state.game.questionVisible = true;
          await broadcastState();
        }
      }, 2500);
    })

    .on("broadcast", { event: "action_answered" }, async ({ payload }) => {
      if (!amIHost()) return;
      if (payload?.playerId !== state.players[currentPlayerSlot()]?.id) return;
      if (!state.game.questionVisible || state.game.currentIndex === null) return;

      if (state.mode === "relationship" && relationshipQuestion()?.type !== "conversation") return;
      await completeCurrentQuestion(false);
    })

    .on("broadcast", { event: "action_defer" }, async ({ payload }) => {
      if (!amIHost()) return;
      if (payload?.playerId !== state.players[currentPlayerSlot()]?.id) return;
      if (!state.game.questionVisible || state.game.currentIndex === null) return;
      if (state.mode === "connection") return;
      if (state.mode === "relationship" && state.relationship?.round) return;

      if (state.mode === "relationship") state.relationship.round = null;
      await completeCurrentQuestion(true);
    })

    .on("broadcast", { event: "relationship_commit" }, async ({ payload }) => {
      if (!amIHost() || !bothConnected() || !validRelationshipAction(payload)) return;
      const round = state.relationship.round;
      if (!round || round.token !== `${state.game.block}:${state.game.currentIndex}` || round.phase !== "collecting" || round.commits[payload.slot]) return;
      if (typeof payload.cipher !== "string" || payload.cipher.length > 12000 ||
          typeof payload.iv !== "string" || payload.iv.length > 100) return;
      round.commits[payload.slot] = { cipher:payload.cipher, iv:payload.iv };
      if (round.commits.p1 && round.commits.p2) round.phase = "revealing";
      await broadcastState();
    })
    .on("broadcast", { event: "relationship_reveal" }, async ({ payload }) => {
      if (!amIHost() || !bothConnected() || !validRelationshipAction(payload)) return;
      const round = state.relationship.round;
      if (!round || round.phase !== "revealing" || !round.commits[payload.slot] ||
          round.keys[payload.slot] || typeof payload.key !== "string" || payload.key.length > 100) return;
      round.keys[payload.slot] = payload.key;
      if (round.keys.p1 && round.keys.p2) round.phase = "discussing";
      await broadcastState();
    })
    .on("broadcast", { event: "relationship_decision" }, async ({ payload }) => {
      if (!amIHost() || !bothConnected() || !validRelationshipAction(payload)) return;
      const round = state.relationship.round;
      if (!round || round.phase !== "discussing" ||
          !["agreed","thinking","different"].includes(payload.decision)) return;
      if (round.decisions[payload.slot]) return;
      round.decisions[payload.slot] = payload.decision;
      if (round.decisions.p1 && round.decisions.p2) {
        state.relationship.results.push({
          id:relationshipQuestion().id,
          decisions:{...round.decisions},
          aligned:round.decisions.p1 === "agreed" && round.decisions.p2 === "agreed"
        });
        const last = state.game.remaining.length === 1;
        if (last) {
          await logEvent("BLOCK_COMPLETED",{conversation_mode:"relationship",completed_block:state.game.block+1});
          if (state.game.block === 5) await logEvent("GAME_COMPLETED",{conversation_mode:"relationship"});
        }
        state.relationship.round = null;
        await completeCurrentQuestion(false);
      } else await broadcastState();
    })
    .on("broadcast", { event: "action_next_block" }, async ({ payload }) => {
      if (!amIHost()) return;
      if (payload?.playerId !== state.players[currentPlayerSlot()]?.id) return;
      if (!bothConnected() || state.status !== "block_end") return;

      const definition = modeDef();
      const next = state.game.block + 1;
      if (next >= definition.blocks.length) return;

      state.status = "playing";
      state.game.block = next;
      state.game.remaining = definition.blocks[next].questions.map((_, i) => i);
      state.game.answeredInBlock = 0;
      state.game.currentIndex = null;
      state.game.questionVisible = false;
      state.game.currentPlayer = state.game.currentPlayer === 0 ? 1 : 0;
      if (state.mode === "relationship") state.relationship.round = null;

      await broadcastState();
    });

  await new Promise((resolve, reject) => {
    channel.subscribe(async status => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          playerId: PLAYER_ID,
          name: playerName,
          slot: playerSlot,
          joinedAt: new Date().toISOString()
        });
        resolve();
      }

      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        reject(new Error(`Falha ao conectar à sala: ${status}`));
      }
    });
  });

  if (!isHost) {
    await sendBroadcast("request_state", { playerId: PLAYER_ID });
  }
}

async function completeCurrentQuestion(deferred) {
  const block = currentBlockDef();
  const currentIndex = state.game.currentIndex;
  const questionText = typeof block.questions[currentIndex] === "string" ? block.questions[currentIndex] : block.questions[currentIndex].text;
  if (state.mode === "relationship") { state.relationship.round = null; relationshipEngine.reset(); }

  if (deferred) {
    const id = `${state.mode}_${state.game.block}_${currentIndex}`;

    if (!state.deferredTopics.some(item => item.id === id)) {
      state.deferredTopics.push({
        id,
        block: state.game.block + 1,
        question: questionText
      });
    }
  }

  const newRemaining = state.game.remaining.filter(i => i !== currentIndex);

  state.game.remaining = newRemaining;
  state.game.answeredInBlock += 1;
  state.game.totalAnswered += 1;
  state.game.currentIndex = null;
  state.game.questionVisible = false;

  if (newRemaining.length === 0) {
    const lastBlock = state.game.block === modeDef().blocks.length - 1;
    state.status = lastBlock ? "finished" : "block_end";
    await broadcastState();
    return;
  }

  state.game.currentPlayer = state.game.currentPlayer === 0 ? 1 : 0;
  await broadcastState();
}

function selectMode(mode) {
  selectedMode = mode;

  document.querySelectorAll(".mode-card[data-mode]").forEach(card => {
    card.classList.toggle("selected", card.dataset.mode === mode);
  });

  el("selectedModeIcon").textContent = MODES[mode].icon;
  el("selectedModeName").textContent = MODES[mode].name;

  logEvent("MODE_SELECTED", { conversation_mode: mode });
}

async function createRoom() {
  const name = el("hostNameInput").value.trim();
  if (!name) return alert("Digite seu nome.");

  const code = makeRoomCode();

  state = {
    mode: selectedMode,
    status: "lobby",
    players: {},
    deferredTopics: [],
    relationship: { round:null, results:[], decisions:{} },
    game: createInitialGame(selectedMode)
  };

  try {
    await configureChannel(code, name, "p1", true);
    el("roomCodeLabel").textContent = roomCode;
    showScreen("lobby");
    await logEvent("ROOM_CREATED", { conversation_mode: state.mode });
  } catch (error) {
    console.error(error);
    alert("Não foi possível criar a sala.");
  }
}

async function joinRoom() {
  const name = el("joinNameInput").value.trim();
  const code = el("roomCodeInput").value.trim().toUpperCase();

  if (!name || !code) {
    return alert("Preencha seu nome e o código da sala.");
  }

  try {
    await configureChannel(code, name, "p2", false);
    await new Promise(resolve => setTimeout(resolve, 800));

    const players = presencePlayers();
    const p1Exists = players.some(p => p.slot === "p1");
    const p2Count = players.filter(p => p.slot === "p2").length;

    if (!p1Exists) {
      await supabase.removeChannel(channel);
      channel = null;
      alert("Sala não encontrada ou anfitrião desconectado.");
      return;
    }

    if (p2Count > 1) {
      await supabase.removeChannel(channel);
      channel = null;
      alert("Esta sala já possui duas pessoas.");
      return;
    }

    el("roomCodeLabel").textContent = roomCode;
    showScreen("lobby");

    await sendBroadcast("request_state", { playerId: PLAYER_ID });
    await new Promise(resolve => setTimeout(resolve, 250));

    await logEvent("ROOM_JOINED", { conversation_mode: state.mode });
  } catch (error) {
    console.error(error);
    alert("Não foi possível entrar na sala.");
  }
}

async function startGame() {
  if (!amIHost() || !bothConnected()) return;

  state.status = "playing";
  state.game = createInitialGame(state.mode);
  state.deferredTopics = [];
  relationshipEngine.reset();
  state.relationship = { round:null, results:[], decisions:{} };

  await logEvent("GAME_STARTED", { conversation_mode: state.mode });
  await broadcastState();
}

async function spinWheel() {
  if (!isMyTurn() || !bothConnected()) return;

  await logEvent("WHEEL_SPIN", { conversation_mode: state.mode });

  await sendBroadcast("action_spin", {
    playerId: PLAYER_ID
  });
}

async function markAnswered() {
  if (!isMyTurn() || !bothConnected()) return;

  if (state.mode === "relationship" && relationshipQuestion()?.type !== "conversation") return;
  const isLastInBlock = state.game.remaining?.length === 1;
  const isFinal =
    isLastInBlock &&
    state.game.block === modeDef().blocks.length - 1;

  await logEvent("QUESTION_ANSWERED", { conversation_mode: state.mode });

  if (isLastInBlock) {
    await logEvent("BLOCK_COMPLETED", {
      conversation_mode: state.mode,
      completed_block: state.game.block + 1
    });
  }

  if (isFinal) {
    await logEvent("GAME_COMPLETED", { conversation_mode: state.mode });
  }

  await sendBroadcast("action_answered", {
    playerId: PLAYER_ID
  });
}

async function deferQuestion() {
  if (!isMyTurn() || !bothConnected() || state.mode === "connection") return;
  if (state.mode === "relationship" && state.relationship?.round) return;

  const isLastInBlock = state.game.remaining?.length === 1;
  const isFinal =
    isLastInBlock &&
    state.game.block === modeDef().blocks.length - 1;

  await logEvent("TOPIC_DEFERRED", { conversation_mode: state.mode });

  if (isLastInBlock) {
    await logEvent("BLOCK_COMPLETED", {
      conversation_mode: state.mode,
      completed_block: state.game.block + 1
    });
  }

  if (isFinal) {
    await logEvent("GAME_COMPLETED", { conversation_mode: state.mode });
  }

  await sendBroadcast("action_defer", {
    playerId: PLAYER_ID
  });
}

async function nextBlock() {
  if (!isMyTurn() || !bothConnected()) return;

  await logEvent("NEXT_BLOCK_REQUESTED", {
    conversation_mode: state.mode,
    next_block: state.game.block + 2
  });

  await sendBroadcast("action_next_block", {
    playerId: PLAYER_ID
  });
}

function renderLobby() {
  const def = modeDef();
  const p1 = state.players.p1;
  const p2 = state.players.p2;

  el("lobbyModeBadge").textContent = `${def.icon} ${def.name}`;
  el("lobbyPlayer1Name").textContent = p1?.name || "Pessoa 1";
  el("lobbyPlayer2Name").textContent = p2?.name || "Pessoa 2";
  el("lobbyPlayer1Status").textContent = p1?.connected ? "Conectado" : "Aguardando conexão";
  el("lobbyPlayer2Status").textContent = p2?.connected ? "Conectado" : "Aguardando conexão";
  el("lobbyPlayer1Dot").classList.toggle("online", !!p1?.connected);
  el("lobbyPlayer2Dot").classList.toggle("online", !!p2?.connected);

  const ready = bothConnected();
  el("startGameBtn").disabled = !(ready && amIHost());

  el("lobbyMessage").textContent = ready
    ? (amIHost()
        ? `Os dois estão conectados. ${def.icon} ${def.name} pode começar.`
        : `Os dois estão conectados. Aguardando o anfitrião iniciar ${def.name}.`)
    : "A partida só começa quando duas pessoas estiverem conectadas.";
}

function renderGame() {
  const def = modeDef();
  const block = currentBlockDef();
  const game = state.game;
  const p1 = state.players.p1;
  const p2 = state.players.p2;

  el("gameModeLabel").textContent = `${def.icon} ${def.name}`;
  el("blockLabel").textContent = `Bloco ${game.block + 1} de ${def.blocks.length}`;
  el("blockTitle").textContent = block.title;
  el("gameTip").textContent = def.tip;

  el("player1Name").textContent = p1?.name || "Pessoa 1";
  el("player2Name").textContent = p2?.name || "Pessoa 2";

  const turnSlot = currentPlayerSlot();
  const turnName = turnSlot === "p1" ? p1?.name : p2?.name;
  el("turnName").textContent = turnName || "Aguardando";

  el("player1Row").classList.toggle("active", game.currentPlayer === 0);
  el("player2Row").classList.toggle("active", game.currentPlayer === 1);

  el("player1Status").textContent =
    !p1?.connected ? "Offline" : game.currentPlayer === 0 ? "Sua vez" : "Aguardando";
  el("player2Status").textContent =
    !p2?.connected ? "Offline" : game.currentPlayer === 1 ? "Sua vez" : "Aguardando";

  el("wheelCount").textContent = game.remaining.length;
  el("progressText").textContent = `${game.answeredInBlock} de ${block.questions.length}`;
  el("totalProgressText").textContent = `${game.totalAnswered} de ${def.totalQuestions}`;
  el("progressBar").style.width = `${(game.totalAnswered / def.totalQuestions) * 100}%`;

  if (game.rotation !== localRotation) {
    localRotation = game.rotation;
    el("wheel").style.transform = `rotate(${localRotation}deg)`;
  }

  const canAct = isMyTurn() && bothConnected();

  el("spinBtn").disabled =
    !canAct ||
    game.questionVisible ||
    game.currentIndex !== null || (state.mode==="relationship" && !!state.relationship?.round);

  el("spinBtn").classList.toggle("hidden", game.questionVisible);

  el("waitingTurnMessage").textContent = bothConnected()
    ? "Aguardando a outra pessoa jogar..."
    : "Aguardando a outra pessoa reconectar...";

  el("waitingTurnMessage").classList.toggle(
    "hidden",
    canAct || game.questionVisible
  );

  if (game.questionVisible && game.currentIndex !== null) {
    const question = block.questions[game.currentIndex];
    const globalNumber = game.block * 12 + game.currentIndex + 1;

    el("questionNumber").textContent =
      `${def.name} • Bloco ${game.block + 1} • pergunta ${globalNumber}`;

    el("questionText").textContent = typeof question === "string" ? question : question.text;
    el("questionCard").classList.remove("hidden");

    el("answeredBtn").textContent =
      state.mode !== "connection" ? "Conversamos" : "Respondemos";

    el("answeredBtn").disabled = !canAct;
    el("answeredBtn").classList.toggle("hidden",state.mode==="relationship" && question.type!=="conversation");

    el("laterBtn").classList.toggle("hidden", state.mode === "connection");
    el("laterBtn").disabled = !canAct || (state.mode==="relationship" && !!state.relationship?.round);
    renderRelationshipQuestion();
  } else {
    el("questionCard").classList.add("hidden");
  }
}

function renderBlockEnd() {
  const block = currentBlockDef();

  el("endBlockTitle").textContent = block.endTitle;
  el("endBlockText").textContent = block.endText;
  el("nextBlockBtn").disabled = !isMyTurn() || !bothConnected();
  el("nextBlockBtn").textContent =
    isMyTurn() ? "Ir para o próximo bloco" : "Aguardando a outra pessoa";
}

function renderFinal() {
  const def = modeDef();

  if (state.mode === "relationship") { renderRelationshipFinal(); return; }

  if (state.mode === "connection") {
    el("finalIcon").textContent = "❤️‍🔥";
    el("finalEyebrow").textContent = "36 de 36";
    el("finalTitle").textContent = "Vocês chegaram ao fim.";
    el("finalText").textContent =
      "Trinta e seis perguntas depois, agora vem o ritual final.";
    el("connectionRitual").classList.remove("hidden");
    el("livingSummary").classList.add("hidden");
    return;
  }

  el("finalIcon").textContent = "🏠";
  el("finalEyebrow").textContent = "48 conversas depois";
  el("finalTitle").textContent = "Agora a casa imaginada tem mais realidade.";
  el("finalText").textContent =
    "Vocês não precisam sair daqui com todas as respostas. O importante é saber o que já está claro e o que ainda merece uma conversa antes da mudança.";

  el("connectionRitual").classList.add("hidden");
  el("livingSummary").classList.remove("hidden");

  const topics = state.deferredTopics || [];
  el("deferredCount").textContent = topics.length;

  const list = el("deferredTopicsList");
  list.innerHTML = "";

  topics.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `Bloco ${item.block}: ${item.question}`;
    list.appendChild(li);
  });

  el("deferredTopicsBox").classList.toggle("hidden", topics.length === 0);
}

function render() {
  if (state.status === "lobby") {
    renderLobby();
    if (roomCode) showScreen("lobby");
    return;
  }

  if (state.status === "playing") {
    renderGame();
    showScreen("game");
    return;
  }

  if (state.status === "block_end") {
    renderBlockEnd();
    showScreen("blockEnd");
    return;
  }

  if (state.status === "finished") {
    renderFinal();
    showScreen("final");
  }
}

let timerInterval = null;
let secondsLeft = 240;

function renderTimer() {
  const min = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const sec = String(secondsLeft % 60).padStart(2, "0");
  el("timer").textContent = `${min}:${sec}`;
}

function startTimer() {
  if (timerInterval) return;

  el("timerBtn").disabled = true;
  el("timerBtn").textContent = "Contando...";

  logEvent("EYE_CONTACT_TIMER_STARTED", {
    conversation_mode: state.mode
  });

  timerInterval = setInterval(() => {
    secondsLeft -= 1;
    renderTimer();

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      el("timerBtn").textContent = "Concluído";
    }
  }, 1000);
}

document.querySelectorAll(".mode-card[data-mode]").forEach(card => {
  card.addEventListener("click", () => selectMode(card.dataset.mode));
});

el("createRoomBtn").addEventListener("click", () => {
  el("createBox").classList.toggle("hidden");
  el("joinBox").classList.add("hidden");
});

el("showJoinBtn").addEventListener("click", () => {
  el("joinBox").classList.toggle("hidden");
  el("createBox").classList.add("hidden");
});

el("confirmCreateBtn").addEventListener("click", createRoom);
el("joinRoomBtn").addEventListener("click", joinRoom);
el("startGameBtn").addEventListener("click", startGame);
el("spinBtn").addEventListener("click", spinWheel);
el("answeredBtn").addEventListener("click", markAnswered);
el("laterBtn").addEventListener("click", deferQuestion);
el("nextBlockBtn").addEventListener("click", nextBlock);
el("timerBtn").addEventListener("click", startTimer);

el("copyRoomBtn").addEventListener("click", async () => {
  if (!roomCode) return;

  try {
    await navigator.clipboard.writeText(roomCode);
    el("copyRoomBtn").textContent = "Copiado!";
    setTimeout(() => {
      el("copyRoomBtn").textContent = "Copiar código";
    }, 1200);
  } catch {
    alert(`Código da sala: ${roomCode}`);
  }
});

window.addEventListener("online", () => {
  el("connectionBanner").classList.add("hidden");
});

window.addEventListener("offline", () => {
  el("connectionBanner").classList.remove("hidden");
});

window.addEventListener("pagehide", () => {
  logEvent("PAGE_LEFT", { conversation_mode: state.mode }, true);
});

selectMode("connection");
logEvent("PAGE_VIEW", { conversation_mode: selectedMode });
renderTimer();
