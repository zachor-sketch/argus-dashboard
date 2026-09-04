import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {createChallenge, ASSESSMENTS} from '../lib/challenger-model.js';
import {PILOT, REQUIRED, blankDraft, formIndependent, validateIndependent, validateBundle} from '../lib/challenger-pilot-model.js';
import {compareIndependent} from '../lib/challenger-pilot-debate.js';
import {projectSources, readObserverChain, verifyStoredSources} from '../scripts/challenger-evidence.mjs';
import {hash, appendJournal, validateJournal, verifyJournal} from '../scripts/challenger-store.mjs';
import {validatePilotLinks} from '../scripts/challenger-pilot-records.mjs';
import {freezePilot, debatePilot} from '../scripts/challenger-pilot.mjs';
import {authorizePortfolioAction} from '../lib/challenger-rules.js';
const cutoff = '2026-09-04T14:25:00Z', published = '2026-09-02T00:00:00.000Z', available = '2026-09-03T00:00:00.000Z';
const source = 'https://www.sec.gov/Archives/edgar/data/123/000123/fixture.htm';
function chain(rows) { let previousHash = null; return rows.map(r => { const body = {...r, previousHash}, row = {...body, hash: hash(body)}; previousHash = row.hash; return row; }); }
function inputs() {
  return {repositoryCommit: 'a'.repeat(40), universe: {'Company Universe': [{Ticker: 'AVGO', Company: 'Synthetic company', 'Primary Source URL': 'https://issuer.example/release', 'Core State': 'CORE_SECRET', 'Economic Engine': 'CORE_SECRET'}]},
    events: chain(['FOR fixture: reported adjustments require reconciliation.', 'AGAINST fixture: disclosed cash generation.'].map((rawFact, i) => ({id: 'e' + i, ticker: 'AVGO', source, timestamp: published, detectedAt: available, eventType: 'earnings', sourceAuthorityTier: 'T1_SEC_EXHIBIT', rawFact, interpretation: 'CORE_SECRET', decisionImpact: 'BUY'}))),
    documents: chain([{id: 'identity', kind: 'SEC_IDENTITY', ticker: 'AVGO', cik: '123', validated: true, observedAt: available}, {id: 'doc', ticker: 'AVGO', url: source, publishedAt: published, observedAt: available, contentHash: 'd'.repeat(64)}]), market: {quotes: {}}};
}
const bundle = () => projectSources(inputs(), 'AVGO', cutoff);
function draft(b = bundle(), stance = 'UNFAVORABLE') {
  return {...blankDraft(b), ...Object.fromEntries(ASSESSMENTS.map(k => [k, {value: 'Synthetic supported assessment', evidenceRefs: ['e0', 'e1']}])),
    evidenceFor: ['e0'], evidenceAgainst: ['e1'], independentStance: stance};
}
function packet(stance = 'UNFAVORABLE') { const b = bundle(); return formIndependent(b, draft(b, stance), {id: 'packet', timestamp: '2026-09-04T14:26:00Z', bundleHash: hash(b)}); }
const core = (direction = 'FAVORABLE') => ({ticker: 'AVGO', state: 'Synthetic research state', narrative: 'Synthetic thesis', economicDirection: direction, ref: 'fixture://core', contentHash: 'c'.repeat(64), asOf: published, availableAt: available, readAt: '2026-09-04T14:27:00Z'});
function temp(t) { const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'argus-pilot-')); t.after(() => fs.rmSync(dir, {recursive: true, force: true})); return dir; }
function repo(t) {
  const dir = temp(t), data = inputs(), git = args => execFileSync('git', args, {cwd: dir, stdio: 'pipe'});
  for (const folder of ['datasets', 'observer', 'challenger']) fs.mkdirSync(path.join(dir, folder));
  fs.writeFileSync(path.join(dir, 'package.json'), '{"type":"module"}');
  fs.writeFileSync(path.join(dir, 'datasets/universe_v10_33.js'), 'export const UNIVERSE = ' + JSON.stringify(data.universe));
  fs.writeFileSync(path.join(dir, 'datasets/market_snapshot.js'), 'export const MARKET_SNAPSHOT = ' + JSON.stringify(data.market));
  for (const name of ['events', 'documents']) fs.writeFileSync(path.join(dir, `observer/${name}.jsonl`), data[name].map(JSON.stringify).join('\n') + '\n');
  for (const name of ['challenges', 'runs']) fs.writeFileSync(path.join(dir, `challenger/${name}.jsonl`), '');
  git(['init', '--quiet']); git(['add', '.']); git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'Source fixtures']);
  return dir;
}
test('Pilot: exact pilot scope and absent authoritative tickers are skipped', () => {
  assert.equal(projectSources(inputs(), 'CLS', cutoff), null);
  assert.throws(() => projectSources(inputs(), 'NVDA', cutoff), /SCOPE/);
  const data = inputs(); data.universe['Company Universe'].push(data.universe['Company Universe'][0]);
  assert.throws(() => projectSources(data, 'AVGO', cutoff), /AMBIGUOUS/);
});
test('Pilot: source projection strips Core narratives, conclusions and Observer interpretations', () => {
  const b = bundle(); assert.equal(b.evidence.length, 2);
  assert.doesNotMatch(JSON.stringify(b), /CORE_SECRET|decisionImpact|interpretation/);
  assert.ok(Object.isFrozen(b.evidence[0]));
});
test('Pilot: source bundle rejects extra Core and action fields', () => {
  for (const key of ['coreState', 'narrative', 'action']) assert.throws(() => validateBundle({...bundle(), [key]: 'BUY'}), /SCHEMA/);
});
test('Pilot: independent model has no Core parameter, imports or mutable snapshot', () => {
  const b = bundle(), d = draft(b); assert.throws(() => formIndependent(b, {...d, core: core()}, {id: 'x', timestamp: cutoff, bundleHash: hash(b)}), /SCHEMA/);
  const p = packet(); assert.equal(p.coreViewSnapshotRef, 'UNKNOWN'); assert.equal(p.disagreementLevel, 'UNKNOWN'); assert.equal(p.outputState, 'UNKNOWN');
  assert.throws(() => validateIndependent({...p, coreViewSnapshotRef: core()}), /CORE_EXPOSURE/);
  const module = fs.readFileSync(new URL('../lib/challenger-pilot-model.js', import.meta.url), 'utf8');
  assert.doesNotMatch(module, /node:fs|from ['"].*datasets\/|challenger-core-read|fetch\(|localStorage/);
});
for (const key of ['timestamp', 'detectedAt']) test(`Pilot: ${key} after PIT is excluded`, () => {
  const data = inputs(); data.events[0][key] = '2026-09-05T00:00:00Z';
  const b = projectSources(data, 'AVGO', cutoff); assert.equal(b.evidence.length, 1); assert.equal(b.excluded[0].reason, 'PIT_PUBLICATION_OR_AVAILABILITY');
});
test('Pilot: document version, timestamp and observed time must link exactly', () => {
  for (const key of ['url', 'publishedAt', 'observedAt']) {
    const data = inputs(); data.documents[1][key] = 'mismatch';
    assert.equal(projectSources(data, 'AVGO', cutoff).evidence.length, 0);
  }
});
test('Pilot: SEC identity, issuer provenance and source authority fail closed', () => {
  const data = inputs(); data.documents[0].validated = false; assert.equal(projectSources(data, 'AVGO', cutoff).evidence.length, 0);
  for (const e of data.events) e.sourceAuthorityTier = 'T1_ISSUER'; assert.equal(projectSources(data, 'AVGO', cutoff).evidence.length, 0);
});
test('Pilot: irrelevant macro titles do not become company evidence', () => {
  const data = inputs(); data.events[0] = {...data.events[0], eventType: 'macro_transmission', source: 'https://www.federalregister.gov/fixture', sourceAuthorityTier: 'T2_OFFICIAL_REGULATOR', rawFact: 'Defense export paperwork'};
  const b = projectSources(data, 'AVGO', cutoff); assert.equal(b.excluded[0].reason, 'MACRO_RELEVANCE_UNVERIFIED');
});
test('Pilot: verified price is permitted but stale or unverified quotes are excluded', () => {
  const data = inputs(); data.market = {status: 'MANUALLY_VERIFIED', maxAgeHours: 24, verifiedAt: '2026-09-04T10:00:00Z', quotes: {AVGO: {price: 10, currency: 'USD', verified: true, session: 'REGULAR_CLOSE', source: 'https://prices.example', timestamp: '2026-09-04T09:00:00Z'}}};
  assert.equal(projectSources(data, 'AVGO', cutoff).evidence.length, 3);
  data.market.quotes.AVGO.verified = false; assert.equal(projectSources(data, 'AVGO', cutoff).evidence.length, 2);
  data.market.quotes.AVGO.verified = true; data.market.quotes.AVGO.timestamp = published; assert.equal(projectSources(data, 'AVGO', cutoff).evidence.length, 2);
});
test('Pilot: no source evidence yields UNKNOWN, not a forced conclusion', () => {
  const b = projectSources({...inputs(), events: []}, 'AVGO', cutoff);
  const p = formIndependent(b, blankDraft(b), {id: 'empty', timestamp: cutoff, bundleHash: hash(b)});
  assert.equal(compareIndependent(p, core()).outputState, 'UNKNOWN');
});
for (const key of REQUIRED) test(`Pilot: substantive stance requires ${key}`, () => {
  const b = bundle(), d = draft(b); d[key] = 'UNKNOWN';
  assert.throws(() => formIndependent(b, d, {id: 'x', timestamp: cutoff, bundleHash: hash(b)}), /INSUFFICIENT/);
});
test('Pilot: FOR and AGAINST are both mandatory, unique and source-bound', () => {
  for (const key of ['evidenceFor', 'evidenceAgainst']) {
    const b = bundle(), d = draft(b); d[key] = []; assert.throws(() => formIndependent(b, d, {id: 'x', timestamp: cutoff, bundleHash: hash(b)}));
  }
  const p = structuredClone(packet()); p.evidenceFor = p.evidenceFor.map(e => ({...e, fact: 'invented'})); assert.throws(() => validateIndependent(p), /NOT_IN_BUNDLE/);
});
for (const [stance, expected, level] of [['FAVORABLE', 'SUPPORT_CORE', 'LOW'], ['UNFAVORABLE', 'CHALLENGE_CORE', 'HIGH'], ['NEW_OPPORTUNITY', 'NEW_OPPORTUNITY', 'UNKNOWN'], ['CONTRARIAN_TRAP', 'CONTRARIAN_TRAP', 'UNKNOWN']]) test(`Pilot: evidence-complete ${expected} is enabled without trade authority`, () => {
  const result = compareIndependent(packet(stance), core()); assert.equal(result.outputState, expected); assert.equal(result.disagreementLevel, level); assert.equal(result.canAuthorizePortfolioAction, false);
  if (level === 'HIGH') assert.equal(result.researchPriority.kind, 'REUNDERWRITE'); else assert.equal(result.researchPriority, null);
});
test('Pilot: missing Core provenance or typed direction cannot manufacture relative agreement', () => {
  for (const key of ['asOf', 'availableAt', 'economicDirection']) assert.equal(compareIndependent(packet(), {...core(), [key]: 'UNKNOWN'}).outputState, 'UNKNOWN');
  assert.throws(() => compareIndependent(packet(), {...core(), asOf: '2026-09-05T00:00:00Z'}), /PIT/);
});
test('Pilot: trade verbs and action fields are rejected', () => {
  for (const action of ['BUY', 'SELL', 'TRIM', 'ADD']) {
    assert.throws(() => validateIndependent({...packet(), independentStance: action}), /SCHEMA/);
    assert.throws(() => authorizePortfolioAction(action), /ACTION_DENIED/);
  }
  assert.throws(() => validateIndependent({...packet(), action: 'BUY'}), /SCHEMA/);
});
test('Pilot: Core reads before freeze are invalid even if timestamps otherwise pass PIT', () => {
  assert.throws(() => compareIndependent(packet(), {...core(), readAt: cutoff}), /BEFORE_FREEZE/);
});
test('Pilot: source journal edits invalidate the read-only adapter', t => {
  const dir = repo(t); assert.equal(readObserverChain(dir, 'events').length, 2);
  const f = path.join(dir, 'observer/events.jsonl'); fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('FOR fixture', 'tamper'));
  assert.throws(() => readObserverChain(dir, 'events'), /SOURCE_CHAIN/);
});
test('Pilot: mismatched source bundle fingerprint cannot be journaled', t => {
  assert.throws(() => appendJournal(temp(t), 'challenges.jsonl', {...packet(), bundleHash: 'f'.repeat(64)}, ''), /BUNDLE_HASH/);
});
test('Pilot: comparison cannot load Core without a durably frozen independent batch', async t => {
  let called = false; await assert.rejects(debatePilot(repo(t), 'missing', () => { called = true; }), /BATCH_REQUIRED/); assert.equal(called, false);
});
test('Pilot: real freeze then separate debate persists sequence and leaves all source bytes unchanged', async t => {
  const dir = repo(t), protectedNames = ['datasets/universe_v10_33.js', 'datasets/market_snapshot.js', 'observer/events.jsonl', 'observer/documents.jsonl'];
  const before = protectedNames.map(f => fs.readFileSync(path.join(dir, f)));
  const batch = await freezePilot(dir, cutoff, [draft()], 'pilot-fixture');
  assert.equal(batch.payload.status, 'INDEPENDENT_FROZEN');
  let calls = 0;
  const result = await debatePilot(dir, 'pilot-fixture', async () => {
    calls++; const rows = verifyJournal(dir, 'challenges.jsonl', ''); assert.equal(rows.length, 1); assert.ok(rows[0].hash === batch.payload.packetRefs[0].hash);
    return {...core(), readAt: new Date().toISOString()};
  });
  assert.equal(calls, 1); assert.equal(result[0].payload.comparison.outputState, 'CHALLENGE_CORE');
  const runs = verifyJournal(dir, 'runs.jsonl', ''); assert.equal(runs[1].previousHash, batch.hash); assert.equal(runs[1].payload.batchHash, batch.hash);
  assert.equal(runs[1].payload.evidenceCutoff, cutoff);
  await debatePilot(dir, 'pilot-fixture', () => { throw Error('should reuse'); });
  protectedNames.forEach((f, i) => assert.ok(fs.readFileSync(path.join(dir, f)).equals(before[i])));
});
test('Pilot: orphan or forged debate outcomes cannot be appended', t => {
  const dir = temp(t), row = appendJournal(dir, 'challenges.jsonl', packet(), '');
  const batch = appendJournal(dir, 'runs.jsonl', {schemaVersion: 'argus.pilot-batch/1', id: 'batch', timestamp: '2026-09-04T14:26:30Z', evidenceCutoff: cutoff, packetRefs: [{id: 'packet', hash: row.hash, ticker: 'AVGO'}], skipped: PILOT.filter(t => t !== 'AVGO'), status: 'INDEPENDENT_FROZEN'}, '');
  const debate = {schemaVersion: 'argus.pilot-debate/1', id: 'debate', timestamp: '2026-09-04T14:28:00Z', evidenceCutoff: cutoff, batchHash: batch.hash, packetHash: row.hash, packetId: 'packet', ticker: 'AVGO', coreSnapshot: core(), comparison: compareIndependent(packet(), core())};
  assert.throws(() => appendJournal(dir, 'runs.jsonl', {...debate, batchHash: '0'.repeat(64)}, ''), /ANTI_ANCHOR/);
  assert.throws(() => appendJournal(dir, 'runs.jsonl', {...debate, comparison: {...debate.comparison, outputState: 'SUPPORT_CORE'}}, ''), /FORGED/);
  assert.throws(() => appendJournal(dir, 'runs.jsonl', {...debate, comparison: {...debate.comparison, canAuthorizePortfolioAction: true}}, ''), /ACTION_DENIED/);
});
test('Pilot: persisted provenance must replay against existing source records', async t => {
  const dir = repo(t); await verifyStoredSources(dir, [packet()]);
  const p = structuredClone(packet()); p.sourceBundle.provenance[0].recordHash = 'f'.repeat(64);
  await assert.rejects(verifyStoredSources(dir, [p]), /REPLAY_MISMATCH/);
});
test('Pilot: rehashed bundle still cannot carry a mismatched excerpt fingerprint', t => {
  const p = structuredClone(packet()); p.sourceBundle.evidence[0].fact = 'altered source';
  p.bundleHash = hash(p.sourceBundle);
  assert.throws(() => appendJournal(temp(t), 'challenges.jsonl', p, ''), /EXCERPT_HASH/);
});
test('Pilot: published v2 schema preserves v1 and names every packet field', () => {
  const schema = JSON.parse(fs.readFileSync(new URL('../challenger/challenge-packet-v2.schema.json', import.meta.url)));
  assert.deepEqual([...schema.required].sort(), Object.keys(packet()).sort());
  assert.equal(schema.properties.coreViewSnapshotRef.const, 'UNKNOWN');
  assert.equal(schema.additionalProperties, false);
});
test('Pilot: committed pilot source replay, PIT and freeze sequence remain auditable', async () => {
  const root = path.resolve(import.meta.dirname, '..');
  const rows = verifyJournal(root, 'challenges.jsonl', ''), runs = verifyJournal(root, 'runs.jsonl', '');
  validatePilotLinks(rows, runs); await verifyStoredSources(root, rows.map(r => r.payload));
  for (const row of rows.filter(r => r.payload.schemaVersion === 'argus.challenge/2')) {
    assert.equal(row.payload.coreViewSnapshotRef, 'UNKNOWN');
    assert.equal(hash(row.payload.sourceBundle), row.payload.bundleHash);
  }
});
