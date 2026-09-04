import test from 'node:test';
import assert from 'node:assert/strict';
import {MARKET_SNAPSHOT as S} from '../datasets/market_snapshot.js';
import {verifiedQuote,holdingMetrics} from '../lib/calculations.js';
const now=Date.parse(S.verifiedAt);
test('manual regular-close snapshot is accepted while fresh',()=>{
 assert.equal(S.session,'REGULAR_CLOSE');assert.equal(S.maxAgeHours,24);
 for(const [ticker,price] of Object.entries({INTU:349.04,NVDA:228.45,FIS:42.28,CRM:264.43}))assert.equal(verifiedQuote(ticker,S,now).price,price);
});
test('24-hour expiry, missing source and missing timestamp fail closed',()=>{
 const expiry=Date.parse(S.quotes.INTU.timestamp)+86400000;
 assert.ok(verifiedQuote('INTU',S,expiry));assert.equal(verifiedQuote('INTU',S,expiry+1),null);
 for(const key of ['source','timestamp']){const copy=structuredClone(S);delete copy.quotes.INTU[key];assert.equal(verifiedQuote('INTU',copy,now),null)}
 assert.equal(verifiedQuote('UNKNOWN',S,now),null);
});
test('INTU verified close produces correct P/L, weight and zero add capacity',()=>{
 const m=holdingMetrics({ticker:'INTU',shares:5300,averageCost:357.21283},4000000,S,now);
 assert.equal(m.value,1849912);assert.equal(Math.round(m.pl),-43316);
 assert.ok(Math.abs(m.plPct-(-2.2879))<0.0001);assert.equal(m.weight,46.2478);
 assert.equal(m.capacity,0);assert.equal(m.decision,'DO NOT ADD');
});
