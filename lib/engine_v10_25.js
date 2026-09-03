// Original arithmetic and gate logic, extracted verbatim from ARGUS_Master_V10_25.html.
// Adaptation: inputs and clock are isolated; this factory never writes to baseline data.
import { BASELINE_V10_25 as B } from '../datasets/baseline_v10_25.js';
export function originalEngine({asOf='2026-09-01T13:30:00+03:00',prices={},holdings={},calibration=[]}={}) {
 const NativeDate=globalThis.Date;
 const Date=class extends NativeDate {constructor(...args){super(...(args.length?args:[asOf]));}static now(){return new NativeDate(asOf).getTime();}};
 const DATA=B.stocks.map(s=>({...s,market:prices[s.ticker]===undefined?s.market:String(prices[s.ticker]??'')}));
 const DECISION_ENGINE=B.engine;
 const localStorage={getItem:()=>JSON.stringify(calibration)};
 const getHolding=t=>holdings[t]||{};
 function marketNumber(s){ return Number(String(s.market).replace(/[^0-9.]/g,'')) || 0; }
const ENGINE_WEIGHTS={businessQuality:.20,valuation:.25,management:.15,evidence:.10,moat:.10,lossProtection:.15,portfolioFit:.05};
function engineScore(e){return Math.round(Object.entries(ENGINE_WEIGHTS).reduce((a,[k,w])=>a+(Number(e.factors[k])||0)*w,0));}
function evidenceAgeDays(e){const d=new Date(e.evidenceMeta?.asOf||0); if(Number.isNaN(d.getTime()))return 999; return Math.max(0,(Date.now()-d.getTime())/86400000);}
function evidenceFreshness(e){const age=evidenceAgeDays(e),max=Number(e.evidenceMeta?.maxAgeDays)||14; if(age<=max)return {state:'FRESH',penalty:0,age}; if(age<=max*2)return {state:'AGING',penalty:4,age}; return {state:'STALE',penalty:10,age};}
function newLayerPenalty(e){
 const balance=(Number(e.balanceStress?.resilience)||100)<50?3:0;
 const unknownSevere=(e.unknowns||[]).filter(x=>String(x[1]).includes('VERY HIGH')).length;
 const model=Math.max(0,Math.round((Number(e.modelRisk?.score)||0)/25)-1);
 return balance+unknownSevere+model;
}
function ensembleSummary(e){const m=e.valuationEnsemble?.methods||[];if(!m.length)return {value:expectedValue(e),spread:0,penalty:0};const vals=m.map(x=>Number(x[1])||0).filter(Boolean),w=m.reduce((a,x)=>a+(Number(x[2])||0),0)||1,value=m.reduce((a,x)=>a+(Number(x[1])||0)*(Number(x[2])||0),0)/w,min=Math.min(...vals),max=Math.max(...vals),spread=value?((max-min)/value*100):0;return {value,spread,penalty:spread>35?6:spread>25?4:spread>15?2:0};}
function lineagePenalty(e){const s=Number(e.dataLineage?.score)||0;return s>=85?0:s>=75?2:s>=65?5:10;}
function forensicState(e){const rows=e.forensic?.checks||[];const fail=rows.some(x=>String(x[1]).toUpperCase()==='FAIL'),watch=rows.filter(x=>String(x[1]).toUpperCase().includes('WATCH')).length,q=Number(e.forensic?.score)||0;return {fail,watch,penalty:fail?12:q<65?4:q<75?2:0};}
function engineAdjustedScore(e){const fresh=evidenceFreshness(e),ens=ensembleSummary(e),forn=forensicState(e),reg=Number(e.regime?.penalty)||0;return Math.max(0,Math.round(engineScore(e)-(Number(e.redTeam?.penalty)||0)-(Number(e.uncertaintyPenalty)||0)-fresh.penalty-lineagePenalty(e)-ens.penalty-forn.penalty-reg));}
function thesisClockState(e){
 const c=e.thesisClock||{}; const now=new Date(),next=new Date(c.nextReview||0),deadline=new Date(c.deadline||0);
 if(!Number.isNaN(deadline.getTime())&&now>deadline)return 'EXPIRED';
 if(!Number.isNaN(next.getTime())&&now>next)return 'CHECKPOINT DUE';
 return c.status||'ON CLOCK';
}
function engineDecision(e){
 const f=e.factors,score=engineAdjustedScore(e),fresh=evidenceFreshness(e),clock=thesisClockState(e),forn=forensicState(e),lineage=Number(e.dataLineage?.score)||0;
 if(f.evidence<50 || e.permanentLoss==='HIGH' || forn.fail || lineage<60) return 'AVOID';
 if(fresh.state==='STALE' || clock==='EXPIRED' || lineage<70) return 'WAIT';
 if(f.management<55) return 'PROVE IT';
 if(f.valuation<60) return 'WAIT';
 if(score>=82 && f.valuation>=70 && f.management>=60 && f.lossProtection>=65) return 'BUY';
 if(score>=68) return 'WATCH';
 return 'PROVE IT';
}
function expectedValue(e){return e.scenarios.reduce((a,x)=>a+(Number(x[1])||0)*(Number(x[2])||0),0);}
function modelRiskMOS(e){return Math.min(.28,.09+(Number(e.modelRisk?.score)||0)/800);}
function actionPriceBands(e){const ev=expectedValue(e),ens=ensembleSummary(e),anchor=.6*ev+.4*ens.value,mos=Math.min(.35,modelRiskMOS(e)+ens.penalty/100);return {strongBuy:anchor*(1-Math.min(.45,mos+.13)),buy:anchor*(1-mos),fairLow:anchor*.95,fairHigh:anchor*1.08,trim:anchor*(1.16+(100-(Number(e.modelRisk?.score)||50))/1000)};}
function variantEdgeOK(e){return (Number(e.consensus?.edgeStrength)||0)>=60;}
function actionNow(s,e){const dec=engineDecision(e),m=marketNumber(s),b=actionPriceBands(e),clock=thesisClockState(e),reg=String(e.regime?.state||'');if(clock==='EXPIRED'||clock==='CHECKPOINT DUE')return 'NO ACTION — REVIEW DUE';if(reg.includes('SEVERE ADVERSE'))return 'NO ACTION — REGIME BLOCK';if(dec==='BUY'&&variantEdgeOK(e)&&m<=b.buy)return 'BUY / ADD';if(dec==='AVOID')return 'AVOID';return 'NO ACTION — INSUFFICIENT EDGE';}
function calibrationSummary(e){const raw=localStorage.getItem('ARGUS_CALIBRATION_LOG');let arr=[];try{arr=JSON.parse(raw)||[]}catch(_){arr=[]}const mine=arr.filter(x=>x&&x.bin===e.calibration?.confidenceBin);const resolved=mine.filter(x=>typeof x.correct==='boolean');const hits=resolved.filter(x=>x.correct).length;return {n:resolved.length,rate:resolved.length?hits/resolved.length*100:null,target:Number(e.calibration?.confidenceBin)||0};}
function portfolioFactorTotals(){const totals={};let gross=0;DATA.forEach(s=>{const h=getHolding(s.ticker),v=(Number(h.qty)||0)*marketNumber(s);if(v<=0)return;gross+=v;(DECISION_ENGINE[s.ticker]?.factorExposure?.factors||[]).forEach(x=>{totals[x[0]]=(totals[x[0]]||0)+v*(Number(x[1])||0)/100;});});return {gross,totals};}
function factorConcentrationPenalty(s){const p=portfolioFactorTotals();if(!p.gross)return 0;let worst=0;(DECISION_ENGINE[s.ticker]?.factorExposure?.factors||[]).forEach(x=>{const existing=(p.totals[x[0]]||0)/p.gross*100,own=Number(x[1])||0;worst=Math.max(worst,existing*own/100);});return worst>55?8:worst>40?5:worst>25?2:0;}
function allocatorMetric(s){const e=DECISION_ENGINE[s.ticker],base=opportunityMetric(s),action=actionNow(s,e),edge=Number(e.consensus?.edgeStrength)||0,risk=Number(e.modelRisk?.score)||50,unknown=(e.unknowns||[]).filter(x=>String(x[1]).includes('HIGH')).length,fc=factorConcentrationPenalty(s);let score=base.score+.18*edge-.12*risk-2*unknown-fc;if(!String(action).startsWith('BUY'))score-=18;return {...base,score,action,factorPenalty:fc};}
function allocatorRank(ticker){const arr=DATA.filter(s=>DECISION_ENGINE[s.ticker]).map(allocatorMetric).sort((a,b)=>b.score-a.score);const item=arr.find(x=>x.ticker===ticker);return {rank:arr.findIndex(x=>x.ticker===ticker)+1,total:arr.length,item,ordered:arr};}

function opportunityMetric(s){const e=DECISION_ENGINE[s.ticker],ev=expectedValue(e),m=marketNumber(s),up=m?((ev/m)-1)*100:0,dec=engineDecision(e);const gatePenalty={BUY:0,WATCH:8,WAIT:15,'PROVE IT':25,AVOID:40}[dec]??10;const riskPenalty={'LOW':0,'LOW–MEDIUM':3,'MEDIUM':8,'MEDIUM–HIGH':15,'HIGH':30}[e.permanentLoss]??10;return {ticker:s.ticker,score:.7*up+.3*engineAdjustedScore(e)-gatePenalty-riskPenalty,up,ev,dec};}
function opportunityRank(ticker){const arr=DATA.filter(s=>DECISION_ENGINE[s.ticker]).map(opportunityMetric).sort((a,b)=>b.score-a.score);return {rank:arr.findIndex(x=>x.ticker===ticker)+1,total:arr.length,ordered:arr};}
return {engineScore,evidenceFreshness,engineAdjustedScore,engineDecision,expectedValue,ensembleSummary,actionPriceBands,thesisClockState,forensicState,lineagePenalty,modelRiskMOS,newLayerPenalty,actionNow,portfolioFactorTotals,factorConcentrationPenalty,allocatorMetric,allocatorRank,opportunityMetric,opportunityRank,calibrationSummary};
}
