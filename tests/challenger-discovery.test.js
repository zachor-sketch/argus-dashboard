import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {DIMENSIONS, validateCandidate, validateCapture, createDiscoveryPacket, blankDiscoveryDraft, validateDiscoveryPacket, routeDiscovery, promoteCandidateToCore} from '../lib/challenger-discovery.js';
import {ASSESSMENTS} from '../lib/challenger-model.js';
import {appendLane, verifyLanes, readLane, lanePrefix, lanePath, coreIdentities, LANE_JOURNALS} from '../scripts/challenger-lane-store.mjs';
import {discoveryBundles, freezeDiscovery} from '../scripts/challenger-b1.mjs';
import {hash, appendJournal} from '../scripts/challenger-store.mjs';
import {evidenceCompletion} from '../lib/challenger-evidence-completion.js';
const at='2026-09-03T12:00:00Z', cutoff='2026-09-04T12:00:00Z';
const candidate=(ticker='CLS')=>({schemaVersion:'argus.external-candidate/1',id:'candidate-'+ticker,timestamp:at,ticker,company:'Synthetic '+ticker,classification:'EXTERNAL_CANDIDATE',cik:'0000000123',issuerHosts:['issuer.example'],identitySources:[{url:'https://www.sec.gov/Archives/edgar/data/123/fixture.htm',locator:'Synthetic identity',observedAt:at},{url:'https://issuer.example/release',locator:'Synthetic ticker',observedAt:at}]});
function temp(t) {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'argus-discovery-')); t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 fs.mkdirSync(path.join(root,'datasets'));fs.mkdirSync(path.join(root,'observer'));fs.mkdirSync(path.join(root,'challenger'));
 fs.writeFileSync(path.join(root,'datasets/universe_v10_33.js'),'export const UNIVERSE = deepFreeze('+JSON.stringify({'Company Universe':[{Ticker:'INTU',Company:'Core fixture'}]})+');');
 for(const f of ['datasets/baseline_v10_25.js','datasets/proof_ledger.js','observer/events.jsonl','observer/documents.jsonl','observer/scans.jsonl'])fs.writeFileSync(path.join(root,f),'protected fixture');
 const git=args=>execFileSync('git',args,{cwd:root,stdio:'pipe'});
 git(['init','--quiet']);git(['add','.']);git(['-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','--quiet','-m','Anchor']);return root;
}
function capture(c,kind='REGULATORY') {
 const claims=DIMENSIONS.filter(d=>!['REGULATORY','ISSUER'].includes(d)).map((d,i)=>({id:kind+'-'+i,fact:`Synthetic ${kind} evidence ${d}`,locator:'Fixture table '+i,dimensions:[d]}));
 return {schemaVersion:'argus.discovery-source/1',id:kind,ticker:c.payload.ticker,candidateHash:c.hash,sourceKind:kind,url:kind==='REGULATORY'?'https://www.sec.gov/Archives/edgar/data/123/fixture.htm':'https://issuer.example/results',publishedAt:at,publicationPrecision:'INSTANT',retrievedAt:at,retrievalMethod:'PUBLIC_SOURCE_REVIEW',digestScope:'CURATED_FACTS',contentHash:hash(claims),claims};
}
function ready(t) {const root=temp(t),c=appendLane(root,'discovery/candidates.jsonl',candidate());appendLane(root,'discovery/evidence.jsonl',capture(c));appendLane(root,'discovery/evidence.jsonl',capture(c,'ISSUER'));return {root,c,b:discoveryBundles(root,cutoff)[0]};}
function draft(b,state='NEW_OPPORTUNITY') {const refs=b.evidence.map(e=>e.id);return {...blankDiscoveryDraft(b),...Object.fromEntries(ASSESSMENTS.map(k=>[k,{value:'Synthetic supported assessment',evidenceRefs:refs}])),evidenceFor:refs.slice(0,6),evidenceAgainst:refs.slice(6),outputState:state};}
const make=(b,d=draft(b))=>createDiscoveryPacket(b,d,{id:'packet',timestamp:cutoff,bundleHash:hash(b)});
test('Discovery: outside-Core candidates register without modifying universe, baseline, proof or Observer',t=>{
 const root=temp(t),files=['datasets/universe_v10_33.js','datasets/baseline_v10_25.js','datasets/proof_ledger.js','observer/events.jsonl','observer/scans.jsonl','observer/documents.jsonl'];const before=files.map(f=>fs.readFileSync(path.join(root,f)));
 for(const ticker of ['CLS','TNK','CRDO','ARM'])appendLane(root,'discovery/candidates.jsonl',candidate(ticker));
 assert.equal(verifyLanes(root)[0].length,4);assert.deepEqual(coreIdentities(root).map(c=>c.ticker),['INTU']);files.forEach((f,i)=>assert.ok(fs.readFileSync(path.join(root,f)).equals(before[i])));
});
test('Discovery: registry accepts another verified external ticker without editing canonical universe',t=>{
 const root=temp(t);appendLane(root,'discovery/candidates.jsonl',candidate('NEWCO'));assert.equal(verifyLanes(root)[0][0].payload.ticker,'NEWCO');
});
test('Discovery: in-universe candidates and duplicate identities are denied',t=>{
 const root=temp(t);assert.throws(()=>appendLane(root,'discovery/candidates.jsonl',candidate('INTU')),/CORE/);
 appendLane(root,'discovery/candidates.jsonl',candidate());assert.throws(()=>appendLane(root,'discovery/candidates.jsonl',{...candidate(),id:'duplicate'}),/DUPLICATE/);
});
test('Discovery: missing issuer or regulatory identity verification fails closed',()=>{
 const c=candidate();c.identitySources.pop();assert.throws(()=>validateCandidate(c),/IDENTITY_REQUIRED/);
});
test('Discovery: external label is mandatory and cannot carry canonical action fields',()=>{
 for(const change of [{classification:'CORE'},{action:'BUY'},{portfolioWeight:0.1}])assert.throws(()=>validateCandidate({...candidate(),...change}));
});
test('Discovery: source CIK, candidate and issuer host must match',t=>{
 const {root,c}=ready(t);
 for(const url of ['https://www.sec.gov/Archives/edgar/data/999/evil.htm','https://evil.example/source'])assert.throws(()=>appendLane(root,'discovery/evidence.jsonl',{...capture(c),id:url,url}),/AUTHORITY/);
 assert.throws(()=>appendLane(root,'discovery/evidence.jsonl',{...capture(c),id:'wrong',candidateHash:'0'.repeat(64)}),/REFERENCE/);
});
test('Discovery: source fingerprints bind curated facts rather than claiming original HTML hashes',t=>{
 const {root,c}=ready(t);assert.throws(()=>appendLane(root,'discovery/evidence.jsonl',{...capture(c),id:'tampered',contentHash:'f'.repeat(64)}),/DIGEST/);
 assert.equal(capture(c).digestScope,'CURATED_FACTS');
});
test('Discovery: future publication and falsely precise day dates fail closed',()=>{
 const c={payload:candidate(),hash:'a'.repeat(64)};
 assert.throws(()=>validateCapture({...capture(c),publishedAt:'2027-01-01T00:00:00Z'}),/PIT/);
 assert.throws(()=>validateCapture({...capture(c),publicationPrecision:'DAY_END_BOUND'}),/PRECISION/);
});
test('Discovery: retrieved-after-cutoff evidence cannot leak into historical packet',t=>{
 const {root}=ready(t);assert.equal(discoveryBundles(root,'2026-09-03T11:00:00Z').length,0);
 assert.equal(discoveryBundles(root,cutoff)[0].evidence.length,12);
});
test('Discovery: UNKNOWN with no economic evidence is a valid honest result',t=>{
 const root=temp(t);appendLane(root,'discovery/candidates.jsonl',candidate());const b=discoveryBundles(root,cutoff)[0];const p=make(b,blankDiscoveryDraft(b));assert.equal(p.outputState,'UNKNOWN');assert.equal(routeDiscovery(p).queue,'EVIDENCE_COMPLETION');
});
for(const state of ['SUPPORT_CORE','CHALLENGE_CORE','BUY','SELL','TRIM','ADD'])test(`Discovery: external state ${state} is forbidden`,t=>{
 const {b}=ready(t);assert.throws(()=>make(b,draft(b,state)),/CORE_DENIED/);
});
for(const state of ['NEW_OPPORTUNITY','CONTRARIAN_TRAP'])test(`Discovery: evidence-complete ${state} never authorizes trades or onboarding`,t=>{
 const {b}=ready(t),p=make(b,draft(b,state)),r=routeDiscovery(p);assert.equal(r.canAuthorizePortfolioAction,false);assert.equal(r.requiresReviewedOnboarding,true);assert.equal(r.classification,'EXTERNAL_CANDIDATE');assert.equal(r.queue,state==='NEW_OPPORTUNITY'?'ZERO_BASED_UNDERWRITING':'EVIDENCE_COMPLETION');
});
for(const dimension of DIMENSIONS)test(`Discovery: missing ${dimension} blocks substantive states`,t=>{
 const {b}=ready(t),p=structuredClone(make(b));p.coverage[dimension]=[];assert.throws(()=>validateDiscoveryPacket(p),/INSUFFICIENT/);
});
test('Discovery: two-sided claims and falsification are required',t=>{
 const {b}=ready(t);
 for(const key of ['evidenceFor','evidenceAgainst','falsificationConditions','ownerEconomics','valuationImplication']){const p=structuredClone(make(b));p[key]=key.startsWith('evidence')?[]:'UNKNOWN';assert.throws(()=>validateDiscoveryPacket(p));}
});
test('Discovery: fabricated source claims cannot be referenced by an independent packet',t=>{
 const {root,b}=ready(t),p=structuredClone(make(b));p.sourceBundle.provenance[0].recordHash='f'.repeat(64);p.bundleHash=hash(p.sourceBundle);assert.throws(()=>appendLane(root,'discovery/packets.jsonl',p),/REFERENCE/);
});
test('Discovery: direct or silent promotion into Core is unavailable',()=>{
 for(const ticker of ['CLS','TNK','CRDO','ARM'])assert.throws(()=>promoteCandidateToCore(ticker),/REVIEWED_ONBOARDING/);
});
test('Discovery: external packets cannot be written to legacy Core-challenge journals',t=>{
 const {root,b}=ready(t);assert.throws(()=>appendJournal(root,'challenges.jsonl',make(b),''),/SCHEMA|VERSION/);
});
test('Discovery: allowlist rejects all protected and traversal destinations',t=>{
 const root=temp(t);for(const name of ['../data.js','../datasets/universe_v10_33.js','../observer/events.jsonl','discovery/../../lib/engine_v10_25.js','C:\\core.js'])assert.throws(()=>lanePath(root,name),/WRITE_DENIED/);
});
test('Discovery: hardlinks cannot redirect journal writes into protected files',t=>{
 const root=temp(t),dir=path.join(root,'challenger/discovery'),target=path.join(root,'datasets/proof_ledger.js');fs.mkdirSync(dir);fs.linkSync(target,path.join(dir,'candidates.jsonl'));assert.throws(()=>appendLane(root,'discovery/candidates.jsonl',candidate()),/LINK_DENIED/);assert.equal(fs.readFileSync(target,'utf8'),'protected fixture');
});
test('Discovery: junction/symlink namespaces cannot target Observer',t=>{
 const root=temp(t);fs.symlinkSync(path.join(root,'observer'),path.join(root,'challenger/discovery'),process.platform==='win32'?'junction':'dir');assert.throws(()=>appendLane(root,'discovery/candidates.jsonl',candidate()),/LINK_DENIED/);
});
test('Discovery: journal edits and whole-tail truncation are detected against anchor',t=>{
 const {root}=ready(t),f=lanePath(root,'discovery/evidence.jsonl'),anchor=fs.readFileSync(f);fs.writeFileSync(f,'');assert.throws(()=>readLane(root,'discovery/evidence.jsonl',anchor),/APPEND_ONLY/);fs.writeFileSync(f,anchor.toString().replace('Synthetic','Tampered'));assert.throws(()=>readLane(root,'discovery/evidence.jsonl',''),/CHAIN|DIGEST/);
});
test('Discovery: queue record cannot precede packet or authorize portfolio actions',t=>{
 const {root,b}=ready(t),p=make(b);const rec={schemaVersion:'argus.discovery-route/1',id:'route',timestamp:cutoff,packetHash:'0'.repeat(64),route:routeDiscovery(p)};assert.throws(()=>appendLane(root,'discovery/runs.jsonl',rec),/DENIED/);const row=appendLane(root,'discovery/packets.jsonl',p);assert.throws(()=>appendLane(root,'discovery/runs.jsonl',{...rec,packetHash:row.hash,route:{...rec.route,canAuthorizePortfolioAction:true}}),/DENIED/);
});
test('Discovery: freezing persists immutable independent packets before research routes without a Core reader',t=>{
 const {root,b}=ready(t),out=freezeDiscovery(root,cutoff,[draft(b)],'fixture');assert.equal(out.rows.length,1);assert.equal(out.routes[0].payload.packetHash,out.rows[0].hash);assert.equal(out.rows[0].payload.coreViewSnapshotRef,'UNKNOWN');assert.equal(coreIdentities(root).length,1);
});
test('Evidence completion: price-only coverage cannot be upgraded to primary owner economics',()=>{
 const report=evidenceCompletion({ticker:'INTU',company:'Intuit',evidenceCutoff:cutoff,evidence:[{id:'price',fact:'price cash flow value'}],provenance:[{evidenceId:'price',kind:'VERIFIED_PRICE'}]});assert.equal(report.primaryEvidenceCount,0);assert.equal(report.topics.ownerEconomics.status,'UNKNOWN');assert.equal(report.conclusionReadiness,'UNKNOWN');
});
test('Discovery: no autonomous network collection or Core narrative import in independent model',()=>{
 const code=fs.readFileSync(new URL('../lib/challenger-discovery.js',import.meta.url),'utf8');assert.doesNotMatch(code,/node:fs|fetch\(|datasets\/|challenger-core-read|localStorage/);
});
