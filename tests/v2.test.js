import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {BASELINE_V10_25 as B} from '../datasets/baseline_v10_25.js';
import {canonical} from '../lib/integrity.js';
import {verifiedQuote,holdingMetrics,authorization} from '../lib/calculations.js';
import {originalEngine} from '../lib/engine_v10_25.js';
import {UNIVERSE} from '../datasets/universe_v10_33.js';
import {RESEARCH_SHADOW} from '../datasets/research_shadow.js';
import {PROOF_LEDGER} from '../datasets/proof_ledger.js';
import {savePortfolio,portfolio,recordEvent,recordForecast,recordLearning,records} from '../lib/state.js';

const manifest=JSON.parse(fs.readFileSync(new URL('../integrity-manifest.json',import.meta.url)));
test('canonical V10.25 baseline is immutable and hash-pinned',()=>{
 const hash=crypto.createHash('sha256').update(canonical(B)).digest('hex');
 assert.equal(hash,'0c6c0ddd63284379e5da3f84ccfefe7b6a79850bd82ff6722586579104544415');
 assert.equal(hash,manifest.canonicalBaselineSha256);
 assert.ok(Object.isFrozen(B)&&Object.isFrozen(B.engine.INTU));
});
test('authoritative artifacts retain pinned raw hashes',()=>{
 for(const [name,expected] of Object.entries(manifest.sourceFiles)){
  const actual=crypto.createHash('sha256').update(fs.readFileSync(new URL('../'+name,import.meta.url))).digest('hex');
  assert.equal(actual,expected,name);
 }
});
test('no unverified or stale quote can produce market value or P/L',()=>{
 const h={ticker:'INTU',shares:5300,averageCost:357.21283,purchaseDate:'2026-08-31'};
 const empty={quotes:{},maxAgeHours:24};assert.equal(verifiedQuote('INTU',empty),null);const m=holdingMetrics(h,4_000_000,empty);
 assert.equal(m.value,null);assert.equal(m.pl,null);assert.equal(m.weight,null);assert.equal(m.capacity,0);assert.equal(m.decision,'DO NOT ADD');
});
test('original engine functions reproduce locked source logic without rewriting official locks',()=>{
 const x=originalEngine({asOf:'2026-09-01T13:30:00+03:00'});
 assert.equal(x.engineScore(B.engine.INTU),88); // formula replay and recorded score are intentionally distinct source facts
 assert.equal(x.expectedValue(B.engine.INTU),413.5);
 assert.equal(B.lockedBaselines.INTU.engineScore,82);assert.equal(B.lockedBaselines.INTU.expectedValue,425);
 assert.equal(B.lockedBaselines.INTU.decision,'BUY');
});
test('universe, AI chain and proof ledger imports are complete and fail closed',()=>{
 assert.equal(UNIVERSE['Company Universe'].length,100);assert.equal(RESEARCH_SHADOW.ai.records.length,8);
 assert.equal(RESEARCH_SHADOW.ai.scope.core_universe,3);assert.equal(RESEARCH_SHADOW.ai.scope.external_candidates,5);
 assert.equal(PROOF_LEDGER.cohorts.reduce((n,c)=>n+(c.cases?.length||0),0),60);
 const a=authorization([],true,PROOF_LEDGER.ledger.protocol.scoreWeights);assert.equal(a.state,'BLOCKED');assert.equal(a.resolved,0);
});
test('portfolio edits and appended research never mutate the historical baseline',()=>{
 const store=new Map();globalThis.localStorage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v)};
 const before=canonical(B);
 savePortfolio({total:4000000,holdings:[{ticker:'INTU',shares:100,averageCost:357.21283,purchaseDate:'2026-08-31'}]});
 assert.equal(portfolio().holdings[0].shares,100);
 recordEvent({ticker:'INTU',type:'earnings',source:'https://example.com/filing',occurredAt:'2026-09-03T12:00:00Z',evidence:'Test filing evidence',parent:'V10.25'});
 recordForecast({ticker:'INTU',thesis:'Test shadow thesis',horizon:'12M',source:'https://example.com/filing'});
 recordLearning({result:'Test result',failure:'Test failure',lesson:'Test lesson',rule:'Test proposed rule'});
 assert.equal(records('EVENT_LOG')[0].snapshot.decisionImpact,'NONE');
 assert.equal(records('FORECAST_LOG')[0].status,'SHADOW');
 assert.equal(records('LEARNING_LOG')[0].status,'PROPOSED_NOT_PROMOTED');
 assert.throws(()=>recordEvent({ticker:'INTU',type:'price',source:'https://example.com/quote',occurredAt:'2026-09-03',evidence:'Price fell'}),/PRICE_ALONE_BLOCKED/);
 assert.equal(canonical(B),before);
});
test('verified-price calculations are correct and stale quotes fail closed',()=>{
 const now=Date.parse('2026-09-03T12:00:00Z'),snapshot={maxAgeHours:24,quotes:{INTU:{verified:true,currency:'USD',price:400,source:'https://example.com/test-fixture',timestamp:'2026-09-03T11:00:00Z'}}};
 const m=holdingMetrics({ticker:'INTU',shares:100,averageCost:350},4000000,snapshot,now);
 assert.equal(m.value,40000);assert.equal(m.pl,5000);assert.equal(m.weight,1);assert.equal(m.capacity,0);
 assert.equal(verifiedQuote('INTU',snapshot,now+86400000),null);
});
