import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { createRelationshipEngine } from "../relationship-engine.js";
import { relationshipBlocks } from "../relationship-questions.js";
if (!globalThis.crypto) Object.defineProperty(globalThis,"crypto",{value:webcrypto});
class Element {
  constructor(tag="div"){this.tagName=tag;this.children=[];this.classList={add(){},remove(){}};this.value="";this.textContent="";}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=[...nodes];}
  addEventListener(name,fn){(this.listeners??={})[name]=fn;}
}
globalThis.document={createElement:tag=>new Element(tag)};
const state={mode:"relationship",game:{block:0,currentIndex:3},relationship:{round:{token:"0:3",phase:"collecting",commits:{},keys:{},decisions:{}}}};
const players={p1:{id:"a",name:"A"},p2:{id:"b",name:"B"}};
const events=[];
function client(slot) {
 const target=new Element();
 const engine=createRelationshipEngine({
  el:()=>target,getState:()=>state,getSlot:()=>slot,getPlayerId:()=>players[slot].id,
  getPlayers:()=>players,isHost:()=>slot==="p1",connected:()=>true,
  send:async(event,payload)=>events.push({event,payload}),sync:async()=>{},complete:async()=>{},
  log:()=>{},getDefinition:()=>({blocks:relationshipBlocks})
 });
 return {engine,target};
}
const a=client("p1"),b=client("p2");
function walk(n){return [n,...(n.children||[]).flatMap(walk)];}
function click(target,label){const n=walk(target).find(x=>x.tagName==="button"&&x.textContent===label);assert.ok(n,label);return n.listeners.click();}
function input(target,text){const n=walk(target).find(x=>x.tagName==="textarea");assert.ok(n);n.value=text;n.listeners.input();}
function radio(target,value){const n=walk(target).find(x=>x.tagName==="input"&&x.value===value);assert.ok(n);n.listeners.change();}
a.engine.render();input(a.target,"Resposta A");radio(a.target,"text");await click(a.target,"Confirmar minha resposta");
b.engine.render();input(b.target,"Resposta B");radio(b.target,"text");await click(b.target,"Confirmar minha resposta");
assert.equal(events.length,2);
for(const e of events){assert.equal(e.event,"relationship_commit");assert.ok(!JSON.stringify(e.payload).includes("Resposta"));}
for(const e of events)state.relationship.round.commits[e.payload.slot]={cipher:e.payload.cipher,iv:e.payload.iv};
state.relationship.round.phase="revealing";
a.engine.render();await click(a.target,"Revelar minha resposta");
b.engine.render();await click(b.target,"Revelar minha resposta");
for(const e of events.filter(x=>x.event==="relationship_reveal"))state.relationship.round.keys[e.payload.slot]=e.payload.key;
state.relationship.round.phase="discussing";
await a.engine.decodeResults();await b.engine.decodeResults();
assert.ok(walk(a.target).some(x=>x.textContent==="Resposta B"));
assert.ok(walk(b.target).some(x=>x.textContent==="Resposta A"));
assert.equal(state.relationship.round.commits.p1.cipher.includes("Resposta A"),false);
assert.equal(a.engine.valid({token:"0:3",slot:"p1",playerId:"b"}),false);
console.log("PASS: two independent encrypted commitments, mutual reveal, decryption and sender validation.");
