// V7A: encrypted commitments. Keys remain on the originating device until both commit.
// This is not authenticated end-to-end messaging; the room host and delivery channel
// remain trusted for availability and protocol integrity.
export function createRelationshipEngine(ctx) {
  const {el, getState, getSlot, getPlayerId, getPlayers, isHost, send, sync, complete, log, getDefinition} = ctx;
  let draft = null, key = null, questionId = null, revealed = {}, choice = "", note = "";
  const encoder = new TextEncoder(), decoder = new TextDecoder();
  const b64 = bytes => btoa(String.fromCharCode(...bytes));
  const un64 = str => Uint8Array.from(atob(str), c => c.charCodeAt(0));
  const current = () => {
    const s=getState(), g=s.game;
    return s.mode==="relationship" && g.currentIndex!==null
      ? getDefinition().blocks[g.block].questions[g.currentIndex] : null;
  };
  const round = () => getState().relationship?.round;
  const token = () => `${getState().game.block}:${getState().game.currentIndex}`;
  const valid = p => p && p.token===token() && p.playerId===getPlayers()[p.slot]?.id && ["p1","p2"].includes(p.slot);
  const reset = () => { draft=null; key=null; questionId=null; revealed={}; choice=""; note=""; };
  function node(tag, text, className) {
    const n=document.createElement(tag);
    if(text!==undefined) n.textContent=text;
    if(className) n.className=className;
    return n;
  }
  function button(label, fn, disabled=false) {
    const b=node("button",label,"primary-btn");
    b.type="button"; b.disabled=disabled; b.addEventListener("click",fn); return b;
  }
  function panel(title, description) {
    const p=node("div",undefined,"private-panel");
    p.append(node("h3",title),node("p",description)); return p;
  }
  function choices(p, values, selected, onChange) {
    values.forEach(([value,label])=>{
      const l=node("label",undefined,"choice");
      const i=document.createElement("input");
      i.type="radio"; i.name="relationship-choice"; i.value=value; i.checked=selected===value;
      i.addEventListener("change",()=>onChange(value));
      l.append(i,node("span",label)); p.append(l);
    });
  }
  const boundaryOptions=[["green","🟢 Tudo bem"],["yellow","🟡 Depende / precisamos conversar"],["red","🔴 É um limite para mim"]];
  async function commit() {
    if(!choice || !ctx.connected()) return;
    const q=current(); if(!q || round()?.phase!=="collecting" || round().commits[getSlot()]) return;
    const answer={choice,note:note.slice(0,2000)};
    key=crypto.getRandomValues(new Uint8Array(32));
    const iv=crypto.getRandomValues(new Uint8Array(12));
    const cryptoKey=await crypto.subtle.importKey("raw",key,"AES-GCM",false,["encrypt"]);
    const cipher=await crypto.subtle.encrypt({name:"AES-GCM",iv},cryptoKey,encoder.encode(JSON.stringify(answer)));
    draft={cipher:b64(new Uint8Array(cipher)),iv:b64(iv)};
    await send("relationship_commit",{playerId:getPlayerId(),slot:getSlot(),token:token(),...draft});
    log("RELATIONSHIP_RESPONSE_COMMITTED");
    render();
  }
  async function decrypt(commitment, rawKey) {
    const k=await crypto.subtle.importKey("raw",un64(rawKey),"AES-GCM",false,["decrypt"]);
    const bytes=await crypto.subtle.decrypt({name:"AES-GCM",iv:un64(commitment.iv)},k,un64(commitment.cipher));
    return JSON.parse(decoder.decode(bytes));
  }
  async function reveal() {
    const rd=round();
    if(!rd || rd.phase!=="revealing" || !key || rd.keys[getSlot()]) return;
    await send("relationship_reveal",{playerId:getPlayerId(),slot:getSlot(),token:token(),key:b64(key)});
    log("RELATIONSHIP_RESPONSE_REVEALED");
  }
  async function decodeResults() {
    const rd=round();
    if(!rd || rd.phase!=="discussing") return;
    let changed=false;
    for(const slot of ["p1","p2"]) {
      if(!revealed[slot] && rd.keys[slot] && rd.commits[slot]) {
        try { revealed[slot]=await decrypt(rd.commits[slot],rd.keys[slot]); changed=true; }
        catch { revealed[slot]={choice:"Não foi possível abrir a resposta.",note:""}; changed=true; }
      }
    }
    if(changed) render();
  }
  async function decision(value) {
    if(!round() || round().phase!=="discussing" || round().decisions[getSlot()]) return;
    await send("relationship_decision",{playerId:getPlayerId(),slot:getSlot(),token:token(),decision:value});
    log("RELATIONSHIP_DECISION_RECORDED");
  }
  function render() {
    const target=el("relationshipInteraction"), q=current(), rd=round();
    target.replaceChildren();
    if(!q || q.type==="conversation") {target.classList.add("hidden");return;}
    target.classList.remove("hidden");
    if(questionId!==token()) {reset();questionId=token();}
    if(!rd) {
      target.append(panel("Resposta individual","Cada pessoa responde no próprio celular. A resposta só será revelada depois que ambas confirmarem."));
      if(isHost()) target.append(button("Iniciar respostas",async()=>{
        getState().relationship.round={token:token(),phase:"collecting",commits:{},keys:{},decisions:{}};
        await sync();
      },!ctx.connected()));
      else target.append(node("p","Aguardando o anfitrião iniciar esta rodada."));
      return;
    }
    if(rd.phase==="collecting") {
      const own=!!rd.commits[getSlot()];
      const p=panel("🔒 Resposta individual",own?"Sua resposta está protegida. Aguardando a outra pessoa.":"Escolha sua posição antes de conversar. Você pode explicar sua resposta ou optar por não responder.");
      if(!own) {
        if(q.type==="boundary") choices(p,boundaryOptions.concat([["defer","Prefiro não responder agora"]]),choice,v=>{choice=v;});
        else {
          const t=node("textarea");t.maxLength=2000;t.placeholder="Escreva sua resposta, ou escolha uma das opções abaixo.";t.value=note;
          t.addEventListener("input",()=>{note=t.value;choice=t.value.trim()?"text":choice;});
          p.append(t);
          choices(p,[["text","Usar minha resposta escrita"],["unsure","Ainda não tenho certeza"],["defer","Prefiro não responder agora"]],choice,v=>{choice=v;});
        }
        if(q.type==="boundary") {
          const t=node("textarea");t.maxLength=2000;t.placeholder="Se quiser, explique o que esse limite significa para você.";t.value=note;
          t.addEventListener("input",()=>note=t.value);p.append(t);
        }
        p.append(button("Confirmar minha resposta",commit));
      }
      const counts=Object.keys(rd.commits);
      p.append(node("p",`${counts.length} de 2 pessoas responderam.`));
      target.append(p);return;
    }
    if(rd.phase==="revealing") {
      const p=panel("🔐 As duas respostas foram confirmadas","Agora cada pessoa libera sua própria resposta. Nenhuma resposta é exibida antes de ambas serem liberadas.");
      p.append(button(rd.keys[getSlot()]?"Aguardando a outra pessoa":"Revelar minha resposta",reveal,!!rd.keys[getSlot()]));
      target.append(p);return;
    }
    if(rd.phase==="discussing") {
      const p=panel("🔥 Respostas reveladas","Conversem sobre o significado de cada resposta. Diferença não significa incompatibilidade.");
      const grid=node("div",undefined,"reveal-grid");
      ["p1","p2"].forEach(slot=>{
        const a=revealed[slot], box=node("div",undefined,"reveal-item");
        box.append(node("strong",getPlayers()[slot]?.name||slot));
        if(!a) box.append(node("p","Abrindo resposta…"));
        else {
          const label=a.choice==="defer"?"Prefiro não responder":a.choice==="unsure"?"Ainda não tenho certeza":q.type==="boundary"?(boundaryOptions.find(x=>x[0]===a.choice)?.[1]||a.choice):"Resposta individual";
          box.append(node("p",label));
          if(a.note) box.append(node("p",a.note));
        }
        grid.append(box);
      });
      p.append(grid);
      if(!rd.decisions[getSlot()]) {
        p.append(node("p","Depois de conversar, como você deseja registrar este assunto?"));
        const actions=node("div",undefined,"private-actions");
        [["agreed","🟢 Chegamos a um entendimento"],["thinking","🟡 Precisamos de mais tempo"],["different","🔴 Continuamos discordando"]].forEach(([v,l])=>actions.append(button(l,()=>decision(v))));
        p.append(actions);
      } else p.append(node("p","Sua posição foi registrada. Aguardando a outra pessoa para avançar."));
      target.append(p);
    }
  }
  return {current,round,valid,render,decodeResults,reset};
}
