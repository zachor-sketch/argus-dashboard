import {deepFreeze} from './integrity.js';
import {DEFAULT_PORTFOLIO} from '../datasets/portfolio.js';
const PREFIX='ARGUS_V2_';
export function read(key,fallback){const raw=localStorage.getItem(PREFIX+key);if(raw===null)return structuredClone(fallback);try{return JSON.parse(raw);}catch{throw new Error('STORAGE_CORRUPT');}}
export function save(key,value){localStorage.setItem(PREFIX+key,JSON.stringify(value));}
export function portfolio(){const p=read('PORTFOLIO',DEFAULT_PORTFOLIO);validatePortfolio(p);return p;}
export function validatePortfolio(p){
  if(!Number.isFinite(p.total)||p.total<=0||!Array.isArray(p.holdings))throw new Error('INVALID_PORTFOLIO');
  const seen=new Set();
  for(const h of p.holdings){
    if(!/^[A-Z0-9][A-Z0-9.\-]{0,14}$/.test(h.ticker)||seen.has(h.ticker)||!Number.isFinite(h.shares)||h.shares<0||!Number.isFinite(h.averageCost)||h.averageCost<0||!/^\d{4}-\d{2}-\d{2}$/.test(h.purchaseDate)||!Number.isFinite(Date.parse(h.purchaseDate)))throw new Error('INVALID_HOLDING');
    seen.add(h.ticker);
  }
  return true;
}
export function savePortfolio(p){validatePortfolio(p);save('PORTFOLIO',{...structuredClone(DEFAULT_PORTFOLIO),total:p.total,holdings:p.holdings});}
export function records(key){const rows=read(key,[]);if(!Array.isArray(rows)||rows.some((r,i)=>r.sequence!==i+1||!r.id||!r.recordedAt))throw new Error('STORAGE_CORRUPT');return deepFreeze(rows);}
export function append(key,payload){const rows=records(key);const item={...structuredClone(payload),id:crypto.randomUUID(),sequence:rows.length+1,recordedAt:new Date().toISOString()};save(key,[...rows,item]);return deepFreeze(item);}
export function recordEvent(input){
  if(!input.ticker||!input.type||!input.evidence?.trim()||!/^https?:\/\//.test(input.source)||!Number.isFinite(Date.parse(input.occurredAt)))throw new Error('EVENT_EVIDENCE_REQUIRED');
  if(input.type==='price'&&(!input.fundamentalEvidence||input.fundamentalEvidence.trim().length<12))throw new Error('PRICE_ALONE_BLOCKED');
  const snapshot={parent:input.parent,asOf:new Date().toISOString(),evidence:input.evidence,source:input.source,status:'REVIEW_REQUIRED',decisionImpact:'NONE',fundamentalEvidence:input.fundamentalEvidence||null};
  // One atomic localStorage write keeps the event and its dated research snapshot together.
  return append('EVENT_LOG',{...input,snapshot,status:'OPEN'});
}
export function recordForecast(input){
  if(!input.ticker||!input.thesis?.trim()||!input.horizon||!input.source||!/^https?:\/\//.test(input.source))throw new Error('FORECAST_EVIDENCE_REQUIRED');
  return append('FORECAST_LOG',{...input,status:'SHADOW',decisionImpact:'NONE'});
}
export function recordLearning(input){if(!input.result?.trim()||!input.failure?.trim()||!input.lesson?.trim()||!input.rule?.trim())throw new Error('LEARNING_FIELDS_REQUIRED');return append('LEARNING_LOG',{...input,status:'PROPOSED_NOT_PROMOTED'});}
