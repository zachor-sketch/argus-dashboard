import {BASELINE_V10_25 as B} from '../datasets/baseline_v10_25.js';
import {MARKET_SNAPSHOT} from '../datasets/market_snapshot.js';
import {UNIVERSE} from '../datasets/universe_v10_33.js';
import {DEFAULT_PORTFOLIO} from '../datasets/portfolio.js';
export function verifiedQuote(ticker,snapshot=MARKET_SNAPSHOT,now=Date.now()){
  const q=snapshot.quotes[ticker];if(!q||q.verified!==true||q.currency!=='USD'||!Number.isFinite(q.price)||q.price<=0||!q.source||!/^https?:\/\//.test(q.source)||!q.timestamp)return null;
  const age=now-Date.parse(q.timestamp);return Number.isFinite(age)&&age>=0&&age<=(snapshot.maxAgeHours||24)*3600000?q:null;
}
export function companyMeta(t){
  const u=UNIVERSE['Company Universe'].find(x=>x.Ticker===t);
  const sectors={INTU:'Software',CRM:'Software',NVDA:'AI & Semiconductors',AVGO:'AI & Semiconductors',CLS:'AI Infrastructure',CRDO:'AI & Semiconductors',FIS:'Financial technology'};
  const sector=sectors[t]||u?.['Sector Family']||null;
  const bucket=['INTU','CRM'].includes(t)?'software':['NVDA','AVGO','CLS','CRDO','MRVL','VRT','ARM','COHR','NBIS'].includes(t)?'ai':t==='FIS'?'financial':sector?.includes('Quantum')?'quantum':sector?.includes('Energy')?'energy':null;
  return {company:u?.Company||B.stocks.find(x=>x.ticker===t)?.company||t,sector,bucket};
}
export function holdingMetrics(h,total,snapshot=MARKET_SNAPSHOT,now=Date.now()){
  const q=verifiedQuote(h.ticker,snapshot,now),cost=h.shares*h.averageCost,policy=DEFAULT_PORTFOLIO.policies[h.ticker];
  const value=h.shares===0?0:q?h.shares*q.price:null,weight=value===null?null:value/total*100;
  const cap=policy?.hardMax===null||policy?.hardMax===undefined?null:total*policy.hardMax/100;
  const blocked=policy?.decision==='DO NOT ADD'||policy?.target?.[1]===0;
  return {cost,quote:q,value,weight,pl:value===null?null:value-cost,plPct:value===null||cost===0?null:(value-cost)/cost*100,target:policy?.target||null,hardMax:policy?.hardMax??null,capacity:blocked?0:value===null||cap===null?null:Math.max(0,cap-value),decision:blocked?(policy.decision||'NO ACTION'):weight!==null&&policy?.hardMax&&weight>policy.hardMax?'DO NOT ADD':'NO ACTION'};
}
export function estimate(h,total,basis='lock'){const price=basis==='cost'?h.averageCost:B.lockedBaselines[h.ticker]?.price;return price===undefined?null:{value:h.shares*price,weight:h.shares*price/total*100,price};}
export function exposures(p,snapshot=MARKET_SNAPSHOT,now=Date.now()){
  const sectors={},buckets={};let valued=0,missing=0;
  for(const h of p.holdings){const m=holdingMetrics(h,p.total,snapshot,now),meta=companyMeta(h.ticker);if(m.value===null){if(h.shares>0)missing++;continue;}valued+=m.value;for(const [o,k] of [[sectors,meta.sector],[buckets,meta.bucket]]){if(k)o[k]=(o[k]||0)+m.value/p.total*100;}}
  return {sectors,buckets,valued,missing,complete:missing===0&&p.complete===true};
}
export function reviewState(config,{now=Date.now(),materialEvent=false,missingPrice=false}={}){
  const last=Date.parse(config?.last),next=Date.parse(config?.next);
  if(materialEvent||missingPrice||Number.isFinite(next)&&now>next)return 'red';
  if(Number.isFinite(last)&&now>=last&&now-last<=86400000)return 'green';
  return 'orange';
}
export function sourceProofScore({fundamentalValueOutcome,hardGateAccuracy,priceAlpha},weights){
  const parts={fundamentalValueOutcome,hardGateAccuracy,priceAlpha};if(Object.values(parts).some(v=>!Number.isFinite(v)||v<0||v>100))return null;
  return Object.entries(weights).reduce((n,[k,w])=>n+parts[k]*w,0);
}
export function authorization(records,integrityOK,weights){
  const clean=records.filter(r=>r.cleanForward===true&&r.verified===true&&r.resolved===true&&r.integrityVerified===true);
  const unique=[...new Map(clean.map(r=>[r.parentId,r])).values()];
  const scored=unique.map(r=>({...r,score:sourceProofScore(r,weights)})).filter(r=>r.score!==null&&Number.isFinite(r.correlationWeight)&&r.correlationWeight>0&&r.correlationWeight<=1);
  const effectiveN=scored.reduce((n,r)=>n+r.correlationWeight,0),score=effectiveN?scored.reduce((n,r)=>n+r.score*r.correlationWeight,0)/effectiveN:null;
  return {state:integrityOK&&scored.length>=30&&score>=60?'CRITERIA_MET_REVIEW_REQUIRED':'BLOCKED',resolved:scored.length,effectiveN,score};
}
