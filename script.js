import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const CONFIGURED =
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes("COLE_AQUI") &&
  !SUPABASE_ANON_KEY.includes("COLE_AQUI");

if (!CONFIGURED) {
  console.warn("Supabase ainda não configurado. Preencha public/config.js.");
}

const supabase = CONFIGURED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const blocks = [
  {
    name: "Bloco 1",
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
    name: "Bloco 2",
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
    name: "Bloco 3",
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
];

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
const SESSION_ID_KEY = "wildfire_session_id";
const SESSION_ID =
  localStorage.getItem(SESSION_ID_KEY) || crypto.randomUUID();

localStorage.setItem(SESSION_ID_KEY, SESSION_ID);

async function logEvent(event, extras = {}, useBeacon = false) {
  const payload = {
    event,
    session_id: SESSION_ID,
    visit_id: VISIT_ID,
    player_name: playerName || null,
    player_slot: playerSlot || null,
    room_code: roomCode || null,

    block_number:
      Number.isInteger(state?.game?.block)
        ? state.game.block + 1
        : null,

    question_number:
      Number.isInteger(state?.game?.currentIndex) &&
      Number.isInteger(state?.game?.block)
        ? state.game.block * 12 + state.game.currentIndex + 1
        : null,

    page_url: window.location.href,
    referrer: document.referrer || null,

    language: navigator.language || null,
    languages: Array.isArray(navigator.languages)
      ? navigator.languages
      : null,

    platform:
      navigator.userAgentData?.platform ||
      navigator.platform ||
      null,

    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone || null,

    screen_width: window.screen?.width || null,
    screen_height: window.screen?.height || null,
    viewport_width: window.innerWidth || null,
    viewport_height: window.innerHeight || null,

    hardware_concurrency:
      navigator.hardwareConcurrency || null,

    device_memory:
      navigator.deviceMemory || null,

    connection_type:
      navigator.connection?.effectiveType || null,

    ...extras
  };

  try {
    const url = "/.netlify/functions/log-access";

    if (useBeacon && navigator.sendBeacon) {
      const blob = new Blob(
        [JSON.stringify(payload)],
        { type: "application/json" }
      );
      navigator.sendBeacon(url, blob);
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) {
      console.warn(
        "Wildfire telemetry:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.warn("Wildfire telemetry indisponível:", error);
  }
}


let channel = null;
let roomCode = null;
let playerSlot = null;
let playerName = null;
let hostId = null;
let localRotation = 0;

let state = {
  status: "lobby",
  players: {},
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

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function requireConfig() {
  if (CONFIGURED) return true;

  alert(
    "O Supabase ainda não foi configurado.\n\n" +
    "Abra public/config.js e preencha SUPABASE_URL e SUPABASE_ANON_KEY."
  );

  return false;
}

function createInitialGame() {
  return {
    block: 0,
    remaining: blocks[0].questions.map((_, i) => i),
    answeredInBlock: 0,
    totalAnswered: 0,
    currentPlayer: 0,
    currentIndex: null,
    questionVisible: false,
    rotation: 0
  };
}

function publicState() {
  return {
    status: state.status,
    hostId,
    game: state.game
  };
}

async function sendBroadcast(event, payload) {
  if (!channel) return;

  await channel.send({
    type: "broadcast",
    event,
    payload
  });
}

async function broadcastState() {
  await sendBroadcast("state_sync", publicState());
}

function presencePlayers() {
  if (!channel) return [];

  const presence = channel.presenceState();
  const result = [];

  Object.entries(presence).forEach(([key, metas]) => {
    metas.forEach(meta => {
      result.push({
        id: meta.playerId,
        name: meta.name,
        slot: meta.slot,
        key
      });
    });
  });

  return result;
}

function rebuildPlayersFromPresence() {
  const presence = presencePlayers();
  const players = {};

  presence.forEach(item => {
    if (item.slot === "p1") {
      players.p1 = {
        id: item.id,
        name: item.name,
        connected: true
      };
    }

    if (item.slot === "p2") {
      players.p2 = {
        id: item.id,
        name: item.name,
        connected: true
      };
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
  return !!(
    state.players.p1?.connected &&
    state.players.p2?.connected
  );
}

async function configureChannel(code, name, slot, isHost = false) {
  if (channel) {
    await supabase.removeChannel(channel);
  }

  roomCode = code;
  playerName = name;
  playerSlot = slot;

  if (isHost) hostId = PLAYER_ID;

  channel = supabase.channel(`wildfire:${roomCode}`, {
    config: {
      broadcast: {
        self: true,
        ack: true
      },
      presence: {
        key: PLAYER_ID
      }
    }
  });

  channel
    .on("presence", { event: "sync" }, () => {
      rebuildPlayersFromPresence();

      if (amIHost()) {
        broadcastState();
      }
    })

    .on("presence", { event: "join" }, () => {
      rebuildPlayersFromPresence();

      if (amIHost()) {
        broadcastState();
      }
    })

    .on("presence", { event: "leave" }, () => {
      rebuildPlayersFromPresence();

      if (amIHost()) {
        broadcastState();
      }
    })

    .on("broadcast", { event: "request_state" }, async ({ payload }) => {
      if (!amIHost()) return;

      await channel.send({
        type: "broadcast",
        event: "state_sync",
        payload: publicState()
      });
    })

    .on("broadcast", { event: "state_sync" }, ({ payload }) => {
      if (!payload) return;

      state.status = payload.status ?? state.status;
      state.game = payload.game ?? state.game;

      if (payload.hostId) hostId = payload.hostId;

      render();
    })

    .on("broadcast", { event: "action_spin" }, async ({ payload }) => {
      if (!amIHost()) return;
      if (payload?.playerId !== state.players[currentPlayerSlot()]?.id) return;
      if (!bothConnected()) return;
      if (state.game.questionVisible || state.game.currentIndex !== null) return;

      const remaining = state.game.remaining;
      if (!remaining.length) return;

      const selected =
        remaining[Math.floor(Math.random() * remaining.length)];

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

      const newRemaining = state.game.remaining.filter(
        i => i !== state.game.currentIndex
      );

      state.game.remaining = newRemaining;
      state.game.answeredInBlock += 1;
      state.game.totalAnswered += 1;
      state.game.currentIndex = null;
      state.game.questionVisible = false;

      if (newRemaining.length === 0) {
        if (state.game.block === 2) {
          state.status = "finished";
        } else {
          state.status = "block_end";
        }

        await broadcastState();
        return;
      }

      state.game.currentPlayer =
        state.game.currentPlayer === 0 ? 1 : 0;

      await broadcastState();
    })

    .on("broadcast", { event: "action_next_block" }, async ({ payload }) => {
      if (!amIHost()) return;
      if (payload?.playerId !== state.players[currentPlayerSlot()]?.id) return;
      if (!bothConnected()) return;

      const next = state.game.block + 1;
      if (next > 2) return;

      state.status = "playing";
      state.game.block = next;
      state.game.remaining = blocks[next].questions.map((_, i) => i);
      state.game.answeredInBlock = 0;
      state.game.currentIndex = null;
      state.game.questionVisible = false;
      state.game.currentPlayer =
        state.game.currentPlayer === 0 ? 1 : 0;

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
        reject(new Error("Falha ao conectar à sala."));
      }
    });
  });

  if (!isHost) {
    await sendBroadcast("request_state", {
      playerId: PLAYER_ID
    });
  }
}

async function createRoom() {
  if (!requireConfig()) return;

  const name = el("hostNameInput").value.trim();

  if (!name) {
    alert("Digite seu nome.");
    return;
  }

  const code = makeRoomCode();

  state = {
    status: "lobby",
    players: {},
    game: createInitialGame()
  };

  try {
    await configureChannel(code, name, "p1", true);

    el("roomCodeLabel").textContent = roomCode;
    showScreen("lobby");
    await logEvent("ROOM_JOINED");
    await logEvent("ROOM_CREATED");
  } catch (error) {
    console.error(error);
    alert("Não foi possível criar a sala.");
  }
}

async function joinRoom() {
  if (!requireConfig()) return;

  const name = el("joinNameInput").value.trim();
  const code = el("roomCodeInput").value.trim().toUpperCase();

  if (!name || !code) {
    alert("Preencha seu nome e o código da sala.");
    return;
  }

  try {
    await configureChannel(code, name, "p2", false);

    // Pequena janela para o Presence sincronizar.
    await new Promise(resolve => setTimeout(resolve, 700));

    const p1Exists = presencePlayers().some(p => p.slot === "p1");
    const p2Count = presencePlayers().filter(p => p.slot === "p2").length;

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

    await sendBroadcast("request_state", {
      playerId: PLAYER_ID
    });

  } catch (error) {
    console.error(error);
    alert("Não foi possível entrar na sala.");
  }
}

async function startGame() {
  if (!amIHost()) return;
  if (!bothConnected()) return;

  state.status = "playing";
  state.game = createInitialGame();

  await logEvent("GAME_STARTED");
  await broadcastState();
}

async function spinWheel() {
  if (!isMyTurn() || !bothConnected()) return;

  await logEvent("WHEEL_SPIN");

  await sendBroadcast("action_spin", {
    playerId: PLAYER_ID
  });
}

async function markAnswered() {
  if (!isMyTurn() || !bothConnected()) return;

  const isLastQuestionInBlock =
    Array.isArray(state.game.remaining) &&
    state.game.remaining.length === 1;

  const isFinalQuestion =
    isLastQuestionInBlock &&
    state.game.block === 2;

  await logEvent("QUESTION_ANSWERED");

  if (isLastQuestionInBlock) {
    await logEvent("BLOCK_COMPLETED", {
      completed_block: state.game.block + 1
    });
  }

  if (isFinalQuestion) {
    await logEvent("GAME_COMPLETED");
  }

  await sendBroadcast("action_answered", {
    playerId: PLAYER_ID
  });
}

async function nextBlock() {
  if (!isMyTurn() || !bothConnected()) return;

  await logEvent("NEXT_BLOCK_REQUESTED", {
    next_block: state.game.block + 2
  });

  await sendBroadcast("action_next_block", {
    playerId: PLAYER_ID
  });
}

function renderLobby() {
  const p1 = state.players.p1;
  const p2 = state.players.p2;

  el("lobbyPlayer1Name").textContent = p1?.name || "Pessoa 1";
  el("lobbyPlayer2Name").textContent = p2?.name || "Pessoa 2";

  el("lobbyPlayer1Status").textContent =
    p1?.connected ? "Conectado" : "Aguardando conexão";

  el("lobbyPlayer2Status").textContent =
    p2?.connected ? "Conectado" : "Aguardando conexão";

  el("lobbyPlayer1Dot").classList.toggle("online", !!p1?.connected);
  el("lobbyPlayer2Dot").classList.toggle("online", !!p2?.connected);

  const ready = bothConnected();

  el("startGameBtn").disabled = !(ready && amIHost());

  el("lobbyMessage").textContent = ready
    ? (
        amIHost()
          ? "As duas pessoas estão conectadas. Você pode começar."
          : "As duas pessoas estão conectadas. Aguardando o anfitrião começar."
      )
    : "A partida só começa quando duas pessoas estiverem conectadas.";
}

function renderGame() {
  const game = state.game;
  const block = blocks[game.block];

  const p1 = state.players.p1;
  const p2 = state.players.p2;

  el("blockLabel").textContent = block.name;
  el("blockTitle").textContent = block.title;

  el("player1Name").textContent = p1?.name || "Pessoa 1";
  el("player2Name").textContent = p2?.name || "Pessoa 2";

  const turnSlot = currentPlayerSlot();
  const turnName =
    turnSlot === "p1" ? p1?.name : p2?.name;

  el("turnName").textContent = turnName || "Aguardando";

  el("player1Row").classList.toggle(
    "active",
    game.currentPlayer === 0
  );

  el("player2Row").classList.toggle(
    "active",
    game.currentPlayer === 1
  );

  el("player1Status").textContent =
    !p1?.connected
      ? "Offline"
      : game.currentPlayer === 0
        ? "Sua vez"
        : "Aguardando";

  el("player2Status").textContent =
    !p2?.connected
      ? "Offline"
      : game.currentPlayer === 1
        ? "Sua vez"
        : "Aguardando";

  el("wheelCount").textContent = game.remaining.length;
  el("progressText").textContent =
    `${game.answeredInBlock} de 12`;

  el("totalProgressText").textContent =
    `${game.totalAnswered} de 36`;

  el("progressBar").style.width =
    `${(game.totalAnswered / 36) * 100}%`;

  if (game.rotation !== localRotation) {
    localRotation = game.rotation;

    el("wheel").style.transform =
      `rotate(${localRotation}deg)`;
  }

  const canAct =
    isMyTurn() &&
    bothConnected();

  el("spinBtn").disabled =
    !canAct ||
    game.questionVisible ||
    game.currentIndex !== null;

  el("spinBtn").classList.toggle(
    "hidden",
    game.questionVisible
  );

  if (!bothConnected()) {
    el("waitingTurnMessage").textContent =
      "Aguardando a outra pessoa reconectar...";
  } else {
    el("waitingTurnMessage").textContent =
      "Aguardando a outra pessoa jogar...";
  }

  el("waitingTurnMessage").classList.toggle(
    "hidden",
    canAct || game.questionVisible
  );

  if (
    game.questionVisible &&
    game.currentIndex !== null
  ) {
    const question =
      block.questions[game.currentIndex];

    const globalNumber =
      game.block * 12 +
      game.currentIndex +
      1;

    el("questionNumber").textContent =
      `${block.name} • pergunta ${globalNumber}`;

    el("questionText").textContent =
      question;

    el("questionCard").classList.remove("hidden");

    el("answeredBtn").disabled =
      !canAct;
  } else {
    el("questionCard").classList.add("hidden");
  }
}

function renderBlockEnd() {
  const game = state.game;
  const block = blocks[game.block];

  el("endBlockTitle").textContent =
    block.endTitle;

  el("endBlockText").textContent =
    block.endText;

  el("nextBlockBtn").disabled =
    !isMyTurn() ||
    !bothConnected();

  el("nextBlockBtn").textContent =
    isMyTurn()
      ? "Ir para o próximo bloco"
      : "Aguardando a outra pessoa";
}

function render() {
  if (state.status === "lobby") {
    renderLobby();

    if (roomCode) {
      showScreen("lobby");
    }

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
    showScreen("final");
  }
}

let timerInterval = null;
let secondsLeft = 240;

function renderTimer() {
  const min =
    String(Math.floor(secondsLeft / 60)).padStart(2, "0");

  const sec =
    String(secondsLeft % 60).padStart(2, "0");

  el("timer").textContent =
    `${min}:${sec}`;
}

function startTimer() {
  if (timerInterval) return;

  el("timerBtn").disabled = true;
  el("timerBtn").textContent = "Contando...";
  logEvent("EYE_CONTACT_TIMER_STARTED");

  timerInterval = setInterval(() => {
    secondsLeft -= 1;
    logEvent("PAGE_VIEW");

window.addEventListener("pagehide", () => {
  logEvent("PAGE_LEFT", {}, true);
});

renderTimer();

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      el("timerBtn").textContent = "Concluído";
    }
  }, 1000);
}

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

renderTimer();
