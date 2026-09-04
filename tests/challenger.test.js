import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createChallenge, validateChallenge, ASSESSMENTS, OUTPUT_STATES} from '../lib/challenger-model.js';
import {researchReadiness, authorizePortfolioAction} from '../lib/challenger-rules.js';
import {debate} from '../lib/challenger-debate.js';
import {appendJournal, verifyJournal, validateJournal, journalPath, assertAppendOnly, hash} from '../scripts/challenger-store.mjs';
import {trustedPrefix, verifyHistory, snapshotProtected, assertProtected} from '../scripts/challenger-guard.mjs';
import {runArchitectureCheck} from '../scripts/challenger-run.mjs';

const root = path.resolve(import.meta.dirname, '..');
const blank = () => createChallenge({id: 'fixture', ticker: 'TEST', company: 'Synthetic fixture only', timestamp: '2026-09-04T12:00:00Z', evidenceCutoff: '2026-09-01T00:00:00Z'});
const clone = () => structuredClone(blank());
const evidence = () => ({id: 'e1', sourceRef: 'fixture://source', contentHash: 'a'.repeat(64), publishedAt: '2026-08-30T00:00:00Z', availableAt: '2026-08-31T00:00:00Z', fact: 'Synthetic test evidence; not company research'});
const supported = () => {
  const packet = clone(); packet.evidenceFor = [evidence()];
  packet.evidenceAgainst = [{...evidence(), id: 'e2'}];
  for (const key of ASSESSMENTS) packet[key] = {value: 'Synthetic assessment', evidenceRefs: ['e1']};
  packet.coreViewSnapshotRef = {ref: 'fixture://core', contentHash: 'b'.repeat(64), asOf: '2026-08-30T00:00:00Z', availableAt: '2026-08-31T00:00:00Z'};
  packet.disagreementLevel = {value: 'HIGH', evidenceRefs: ['e1', 'e2']};
  return packet;
};
function temp(t) { const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'argus-challenger-')); t.after(() => fs.rmSync(dir, {recursive: true, force: true})); return dir; }

test('Challenger: blank schema preserves UNKNOWN and makes no conclusion', () => {
  const packet = blank();
  for (const key of ASSESSMENTS) assert.equal(packet[key], 'UNKNOWN');
  assert.equal(packet.outputState, 'UNKNOWN'); assert.equal(packet.coreViewSnapshotRef, 'UNKNOWN');
  assert.deepEqual(packet.evidenceFor, []); assert.deepEqual(packet.evidenceAgainst, []);
  assert.equal(researchReadiness(packet).status, 'INSUFFICIENT_EVIDENCE');
  assert.equal(debate('UNKNOWN', packet).researchPriority, null);
});
test('Challenger: packets and nested evidence are detached and frozen', () => {
  const source = supported(), packet = validateChallenge(source);
  source.evidenceFor[0].fact = 'changed'; assert.notEqual(packet.evidenceFor[0].fact, 'changed');
  assert.throws(() => { packet.evidenceFor[0].fact = 'changed'; }, TypeError);
});
test('Challenger: unknown versions, omitted fields and forged fields fail closed', () => {
  for (const mutate of [p => {p.schemaVersion = '2';}, p => {delete p.valuationImplication;}, p => {p.portfolioAction = 'BUY';}]) {
    const packet = clone(); mutate(packet); assert.throws(() => validateChallenge(packet));
  }
});
test('Challenger: every Phase A conclusion including trading verbs is prohibited', () => {
  for (const state of [...OUTPUT_STATES, 'BUY', 'SELL', 'TRIM', 'ADD', null]) {
    const packet = supported(); packet.outputState = state;
    assert.throws(() => validateChallenge(packet), /NO_CONCLUSIONS/);
  }
});
test('Challenger: cannot authorize any portfolio action', () => {
  for (const action of ['BUY', 'SELL', 'TRIM', 'ADD', 'HOLD']) assert.throws(() => authorizePortfolioAction(action), /ACTION_DENIED/);
  const packet = clone(); packet.requiredNextResearch = [{kind: 'BUY', question: 'fixture'}];
  assert.throws(() => validateChallenge(packet), /ACTION_DENIED/);
  assert.equal(researchReadiness(supported()).canAuthorizePortfolioAction, false);
});
test('Challenger: invented or unreferenced assessments fail closed', () => {
  for (const key of [...ASSESSMENTS, 'disagreementLevel']) {
    const packet = clone(); packet[key] = {value: key === 'disagreementLevel' ? 'HIGH' : 'claim', evidenceRefs: ['missing']};
    assert.throws(() => validateChallenge(packet), /UNSUPPORTED_CLAIM/);
  }
});
test('Challenger: even fully populated evidence produces research only', () => {
  assert.equal(researchReadiness(supported()).status, 'RESEARCH_ONLY');
  assert.equal(researchReadiness(supported()).outputState, 'UNKNOWN');
});
test('Challenger: high disagreement creates only a research-priority record', () => {
  const packet = supported(), core = structuredClone(packet.coreViewSnapshotRef);
  const before = JSON.stringify({core, packet}), result = debate(core, packet);
  assert.equal(result.researchPriority.kind, 'REUNDERWRITE'); assert.equal(result.researchPriority.priority, 'HIGH');
  assert.equal(result.canAuthorizePortfolioAction, false); assert.equal(result.challengerOutputState, 'UNKNOWN');
  assert.equal(JSON.stringify({core, packet}), before);
  assert.equal(result.evidenceCutoff, packet.evidenceCutoff);
  assert.ok(Object.isFrozen(result.coreViewSnapshotRef));
});
test('Challenger: mismatched Core snapshot cannot enter a debate', () => {
  assert.throws(() => debate('UNKNOWN', supported()), /REF_MISMATCH/);
});
test('Challenger: publication and availability after PIT are rejected independently', () => {
  for (const key of ['publishedAt', 'availableAt']) {
    const packet = supported(); packet.evidenceFor[0][key] = '2026-09-02T00:00:00Z';
    assert.throws(() => validateChallenge(packet), /PIT/);
  }
});
test('Challenger: Core snapshot and availability must respect PIT', () => {
  for (const key of ['asOf', 'availableAt']) {
    const packet = supported(); packet.coreViewSnapshotRef[key] = '2026-09-02T00:00:00Z';
    assert.throws(() => validateChallenge(packet), /PIT/);
  }
});
test('Challenger: invalid times and cutoff after packet time are rejected', () => {
  for (const value of ['yesterday', '2026-02-30T00:00:00Z', '2026-09-01', '2027-09-01T00:00:00Z']) {
    const packet = clone(); packet.evidenceCutoff = value; assert.throws(() => validateChallenge(packet));
  }
});
test('Challenger: ambiguous duplicate evidence and missing fingerprints fail closed', () => {
  const packet = supported(); packet.evidenceAgainst[0].id = 'e1'; assert.throws(() => validateChallenge(packet), /DUPLICATE/);
  packet.evidenceAgainst[0].id = 'e2'; packet.evidenceFor[0].contentHash = 'UNKNOWN'; assert.throws(() => validateChallenge(packet), /EVIDENCE/);
});
test('Challenger: writer rejects every tracked Core, baseline, proof and Observer destination', t => {
  const dir = temp(t);
  const files = execFileSync('git', ['ls-files'], {cwd: root, encoding: 'utf8'}).trim().split('\n');
  for (const file of files.filter(f => !f.startsWith('challenger/'))) {
    assert.throws(() => journalPath(dir, file), /WRITE_DENIED/);
  }
  for (const target of ['../lib/engine_v10_25.js', '../observer/events.jsonl', '../datasets/proof_ledger.js', 'C:\\Core\\state', 'challenges.jsonl/../../data.js'])
    assert.throws(() => appendJournal(dir, target, blank(), ''), /WRITE_DENIED|SCHEMA/);
  assert.deepEqual(fs.readdirSync(dir), []);
});
test('Challenger: protected Core and Observer bytes remain identical across writes', t => {
  const dir = temp(t);
  for (const folder of ['lib', 'datasets', 'observer']) fs.mkdirSync(path.join(dir, folder));
  const protectedFiles = ['lib/engine_v10_25.js', 'datasets/baseline_v10_25.js', 'datasets/proof_ledger.js', 'observer/events.jsonl', 'observer/scans.jsonl', 'observer/documents.jsonl'];
  for (const file of protectedFiles) fs.writeFileSync(path.join(dir, file), 'protected fixture');
  appendJournal(dir, 'challenges.jsonl', supported(), '');
  for (const file of protectedFiles) assert.equal(fs.readFileSync(path.join(dir, file), 'utf8'), 'protected fixture');
});
test('Challenger: append preserves exact prefix, chain and historical cutoff', t => {
  const dir = temp(t), first = appendJournal(dir, 'challenges.jsonl', supported(), '');
  const file = journalPath(dir, 'challenges.jsonl'), before = fs.readFileSync(file);
  appendJournal(dir, 'challenges.jsonl', {...clone(), id: 'second'}, before);
  assert.ok(fs.readFileSync(file).subarray(0, before.length).equals(before));
  const rows = verifyJournal(dir, 'challenges.jsonl', before);
  assert.equal(rows[1].previousHash, first.hash); assert.equal(rows[0].payload.evidenceCutoff, '2026-09-01T00:00:00Z');
});
test('Challenger: payload edits, reordering and broken chain are detected', t => {
  const dir = temp(t); appendJournal(dir, 'challenges.jsonl', blank(), '');
  appendJournal(dir, 'challenges.jsonl', {...clone(), id: 'second'}, '');
  const rows = fs.readFileSync(journalPath(dir, 'challenges.jsonl'), 'utf8').trim().split('\n');
  assert.throws(() => validateJournal('challenges.jsonl', rows.join('\n').replace('Synthetic fixture only', 'altered') + '\n'), /CHAIN_INVALID/);
  assert.throws(() => validateJournal('challenges.jsonl', rows.reverse().join('\n') + '\n'), /CHAIN_INVALID/);
});
test('Challenger: complete tail deletion and empty-journal rollback are detected against anchor', t => {
  const dir = temp(t); appendJournal(dir, 'challenges.jsonl', blank(), '');
  const file = journalPath(dir, 'challenges.jsonl'), first = fs.readFileSync(file);
  appendJournal(dir, 'challenges.jsonl', {...clone(), id: 'second'}, first);
  const anchor = fs.readFileSync(file);
  for (const bytes of [first, Buffer.alloc(0)]) {
    fs.writeFileSync(file, bytes); assert.throws(() => verifyJournal(dir, 'challenges.jsonl', anchor), /APPEND_ONLY/);
  }
});
test('Challenger: rehashed history is detected by trusted prefix', t => {
  const dir = temp(t); appendJournal(dir, 'challenges.jsonl', blank(), '');
  const file = journalPath(dir, 'challenges.jsonl'), anchor = fs.readFileSync(file), row = JSON.parse(anchor);
  row.payload.company = 'tampered'; const {hash: ignored, ...body} = row; row.hash = hash(body);
  fs.writeFileSync(file, JSON.stringify(row) + '\n');
  assert.throws(() => verifyJournal(dir, 'challenges.jsonl', anchor), /APPEND_ONLY/);
});
test('Challenger: missing anchor, partial append and duplicate IDs are rejected before writing', t => {
  const dir = temp(t); assert.throws(() => appendJournal(dir, 'challenges.jsonl', blank()), /TRUSTED_PREFIX/);
  appendJournal(dir, 'challenges.jsonl', blank(), '');
  assert.throws(() => appendJournal(dir, 'challenges.jsonl', blank(), ''), /DUPLICATE_ID/);
  const file = journalPath(dir, 'challenges.jsonl'); fs.appendFileSync(file, '{'); const before = fs.readFileSync(file);
  assert.throws(() => appendJournal(dir, 'challenges.jsonl', {...clone(), id: 'next'}, ''), /PARTIAL_RECORD/);
  assert.ok(fs.readFileSync(file).equals(before));
});
test('Challenger: hardlinked journal cannot mutate a protected file', t => {
  const dir = temp(t), core = path.join(dir, 'core.js'); fs.writeFileSync(core, 'immutable');
  fs.mkdirSync(path.join(dir, 'challenger')); fs.linkSync(core, path.join(dir, 'challenger', 'challenges.jsonl'));
  assert.throws(() => appendJournal(dir, 'challenges.jsonl', blank(), ''), /LINK_DENIED/);
  assert.equal(fs.readFileSync(core, 'utf8'), 'immutable');
});
test('Challenger: redirected namespace cannot write to Observer', t => {
  const dir = temp(t), observer = path.join(dir, 'observer'); fs.mkdirSync(observer);
  fs.symlinkSync(observer, path.join(dir, 'challenger'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => appendJournal(dir, 'challenges.jsonl', blank(), ''), /LINK_DENIED/);
  assert.deepEqual(fs.readdirSync(observer), []);
});
test('Challenger: runs cannot smuggle actions, debate or scoring results', t => {
  const dir = temp(t);
  for (const row of [{action: 'BUY'}, {id: 'run', mode: 'LIVE_SCORING'}, debate('UNKNOWN', blank())])
    assert.throws(() => appendJournal(dir, 'runs.jsonl', row, ''), /RUN_SCHEMA/);
});
test('Challenger: repository check is read only and resolves actual committed history', () => {
  const before = snapshotProtected(root), result = runArchitectureCheck(root);
  assert.equal(result.scoring, false); assertProtected(root, before); verifyHistory(root);
  assert.throws(() => trustedPrefix(root, 'runs.jsonl', 'nonexistent-challenger-ref'), /./);
});
test('Challenger: Core and dashboard have no imports or references to Challenger', () => {
  for (const file of ['lib/engine_v10_25.js', 'lib/state.js', 'lib/calculations.js', 'app.js', 'app-v2.js', 'data.js', 'index.html'])
    assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /challenger/i);
  for (const file of ['lib/challenger-model.js', 'lib/challenger-rules.js', 'lib/challenger-debate.js'])
    assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /(?:node:fs|engine_v10_25|observer-|fetch\(|localStorage)/);
});
test('Challenger: separate workflow is read only and never runs scoring or journal persistence', () => {
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/challenger.yml'), 'utf8');
  assert.match(workflow, /contents: read/); assert.match(workflow, /persist-credentials: false/);
  assert.doesNotMatch(workflow, /contents: write|--record-run|git push|schedule:|observer-run/);
});
test('Challenger: append-only guard tolerates Git line endings without permitting edits', () => {
  assertAppendOnly('a\r\n', 'a\nb\n'); assert.throws(() => assertAppendOnly('a\n', 'b\n'), /APPEND_ONLY/);
});
test('Challenger: published schema contains all runtime fields and Phase A gate', () => {
  const schema = JSON.parse(fs.readFileSync(path.join(root, 'challenger/challenge-packet.schema.json')));
  assert.deepEqual([...schema.required].sort(), Object.keys(blank()).sort());
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.outputState.const, 'UNKNOWN');
  for (const state of OUTPUT_STATES) assert.ok(schema.description.includes(state));
});
test('Challenger: real Git anchor detects truncation and protected-file mutation', t => {
  const dir = temp(t), git = args => execFileSync('git', args, {cwd: dir, stdio: 'pipe'});
  git(['init', '--quiet']); fs.writeFileSync(path.join(dir, 'core.js'), 'protected fixture');
  appendJournal(dir, 'challenges.jsonl', blank(), '');
  fs.writeFileSync(path.join(dir, 'challenger/runs.jsonl'), '');
  git(['add', '.']); git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'Fixture anchor']);
  const before = snapshotProtected(dir);
  const result = runArchitectureCheck(dir, {recordRun: true}); assert.equal(result.scoring, false);
  const rows = verifyJournal(dir, 'runs.jsonl', trustedPrefix(dir, 'runs.jsonl'));
  assert.equal(rows.length, 1); assert.equal(rows[0].payload.mode, 'ARCHITECTURE_ONLY');
  assertProtected(dir, before);
  fs.writeFileSync(path.join(dir, 'challenger/challenges.jsonl'), '');
  assert.throws(() => verifyHistory(dir), /APPEND_ONLY/);
  fs.writeFileSync(path.join(dir, 'core.js'), 'tampered fixture');
  assert.throws(() => assertProtected(dir, before), /PROTECTED_FILE_CHANGED/);
});
