import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {MONITORS} from '../lib/observer-config.js';
import {extractEvidence,filingRows,sensorTerms,publicationDate} from '../lib/observer-rules.js';
import {observerHealth,openObserverReviews} from '../lib/observer-model.js';
import {appendJournal,readJournal,validateChain,journal,hash,assertBaseline} from '../scripts/observer-store.mjs';
import {runObserver,makeClient} from '../scripts/observer-run.mjs';
import {BASELINE_V10_25 as B} from '../datasets/baseline_v10_25.js';
const company=MONITORS.find(c=>c.ticker==='INTU');
const temp=()=>fs.mkdtempSync(path.join(os.tmpdir(),'argus-observer-test-'));
test('100 source-derived company profiles retain differentiated critical sensors',()=>{
 assert.equal(MONITORS.length,100);assert.equal(new Set(MONITORS.map(c=>c.ticker)).size,100);
 assert.ok(new Set(MONITORS.map(c=>c.sensors)).size>60);
 assert.notDeepEqual(sensorTerms(company),sensorTerms(MONITORS[0]));
 assert.ok(sensorTerms({sensors:'CET1, FCF and NRR',engine:'Bank capital'}).includes('cet1'));
 assert.ok(MONITORS.every(c=>c.sensors&&c.engine&&c.ir));
});
test('rules preserve source excerpts and do not infer decisions or directional valuation claims',()=>{
 const html='<p>Revenue increased 12%. Guidance was lowered for 2026. Customer concentration reached 30%. Free cash flow was $100 million. The CEO resigned on September 3.</p>';
 const e=extractEvidence(html,company);assert.ok(e.some(e=>e.eventType==='guidance'&&e.reviewRequired));assert.ok(e.some(e=>e.eventType==='cash_flow'));
 assert.ok(e.every(e=>e.likelyDirection==='ambiguous'&&!('decision' in e)));
 assert.equal(publicationDate('<script>{"datePublished":"2026-09-03"}</script>'),'2026-09-03T00:00:00.000Z');
 assert.equal(publicationDate('<p>Today</p>'),null);
 assert.throws(()=>filingRows({},0,Date.now()),/INVALID_SEC/);
});
test('observer write allowlist rejects baseline, traversal and proof paths; append chain detects edits',()=>{
 const dir=temp(),before=hash(B);
 try{
  for(const file of ['../datasets/baseline_v10_25.js','baseline_v10_25.js','../datasets/proof_ledger.js'])assert.throws(()=>journal(dir,file),/WRITE_DENIED/);
  appendJournal(dir,'events.jsonl',[{id:'a',rawFact:'fixture'}]);const original=fs.readFileSync(journal(dir,'events.jsonl'),'utf8');
  appendJournal(dir,'events.jsonl',[{id:'a',rawFact:'duplicate'},{id:'b',rawFact:'second'}]);assert.ok(fs.readFileSync(journal(dir,'events.jsonl'),'utf8').startsWith(original));
  const rows=readJournal(dir,'events.jsonl');assert.equal(rows.length,2);assert.ok(validateChain(rows));rows[0].rawFact='mutated';assert.throws(()=>validateChain(rows),/CHAIN_INVALID/);
  assertBaseline();assert.equal(hash(B),before);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('fresh scan does not override overdue review, material evidence or failed/unconfirmed workflow',()=>{
 const now=Date.parse('2026-09-04T10:00:00Z'),c={ticker:'INTU',reviewDue:'2026-09-10'},scan={companies:[{ticker:'INTU',ok:true,lastSuccessfulScan:'2026-09-04T06:00:00Z'}]};
 assert.equal(observerHealth(c,scan,[],now,'success'),'green');assert.equal(observerHealth(c,scan,[],now,'unknown'),'orange');assert.equal(observerHealth(c,scan,[],now,'failed'),'red');
 assert.equal(observerHealth(c,scan,[{ticker:'INTU',reviewRequired:true}],now,'success'),'red');assert.equal(observerHealth(c,scan,[],now+37*3600000,'success'),'red');
 assert.equal(observerHealth({...c,reviewDue:'2026-09-01'},scan,[],now,'success'),'red');
 assert.equal(openObserverReviews([{id:'a',reviewRequired:true}],[{eventId:'a'}]).length,0);
});
test('mock SEC scan creates complete OPEN evidence, reruns deduplicate and failures never become current',async()=>{
 const dir=temp(),now=new Date('2026-09-04T06:17:00Z'),before=hash(B);
 const client=async url=>url.includes('company_tickers')?JSON.stringify({0:{ticker:'INTU',cik_str:123}}):url.includes('submissions')?JSON.stringify({tickers:['INTU'],filings:{recent:{accessionNumber:['0000000123-26-000001'],form:['8-K'],filingDate:['2026-09-03'],acceptanceDateTime:['2026-09-03T15:00:00Z'],primaryDocument:['report.htm'],items:['2.02']}}}):'<html><p>Quarterly financial results: Revenue grew 12 percent to $100 million. Guidance was lowered to 5 percent. Free cash flow was $12 million during the second quarter of 2026.</p></html>';
 try{
  const first=await runObserver({directory:dir,companies:[company],client,now,runId:'fixture-1',macroSources:[]});assert.equal(first.status,'SUCCESS');assert.ok(first.newEvidence>0);
  const events=readJournal(dir,'events.jsonl');assert.ok(events.some(e=>e.status==='OPEN'));for(const key of ['ticker','timestamp','source','sourceAuthorityTier','eventType','rawFact','variable','likelyDirection','materiality','reviewRequired'])assert.ok(key in events[0],key);
  const second=await runObserver({directory:dir,companies:[company],client,now,runId:'fixture-2',macroSources:[]});assert.equal(second.newEvidence,0);
  const failed=await runObserver({directory:dir,companies:[company],client:async()=>{throw Error('HTTP_429')},now,runId:'fixture-3',macroSources:[]});assert.equal(failed.status,'PARTIAL_OR_FAILED');assert.equal(failed.companies[0].ok,false);assert.ok(failed.failedSources.length);
  assert.equal(hash(B),before);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('rate-limit responses block further requests to the host for the run',async()=>{
 let requests=0;const client=makeClient({interval:0,wait:async()=>{},fetcher:async()=>{requests++;return new Response('',{status:429})}});
 await assert.rejects(client('https://www.sec.gov/a'),/HTTP_429/);await assert.rejects(client('https://www.sec.gov/b'),/BLOCKED_FOR_RUN/);assert.equal(requests,1);
});
test('committed observer journals have valid hash chains',()=>{for(const f of ['events.jsonl','scans.jsonl','documents.jsonl'])assert.ok(validateChain(readJournal(process.cwd(),f)))});
test('official macro titles become scoped transmission reviews with original provenance',async()=>{
 const dir=temp(),url='https://www.federalreserve.gov/feeds/press_all.xml',client=async u=>u.includes('company_tickers')?JSON.stringify({0:{ticker:'INTU',cik_str:123}}):u.includes('submissions')?JSON.stringify({tickers:['INTU'],filings:{recent:{accessionNumber:[],form:[],filingDate:[],primaryDocument:[]}}}):'<rss><channel><item><title>Federal funds rate decision</title><link>https://www.federalreserve.gov/newsevents/fixture.htm</link><pubDate>Thu, 03 Sep 2026 14:00:00 GMT</pubDate></item></channel></rss>';
 try{await runObserver({directory:dir,companies:[company],client,now:new Date('2026-09-04T06:17:00Z'),runId:'macro-fixture',macroSources:[{url,tier:'T2_OFFICIAL_REGULATOR',terms:/federal funds/i,variable:'Funding costs',sectors:null}]});const events=readJournal(dir,'events.jsonl');assert.equal(events.length,1);assert.equal(events[0].eventType,'macro_transmission');assert.equal(events[0].status,'OPEN');assert.match(events[0].variable,/Funding costs/);assert.equal(events[0].sourceAuthorityTier,'T2_OFFICIAL_REGULATOR')}finally{fs.rmSync(dir,{recursive:true,force:true})}
});
