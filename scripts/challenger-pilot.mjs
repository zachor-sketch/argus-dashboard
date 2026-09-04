import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSources, verifyStoredSources} from './challenger-evidence.mjs';
import {hash, appendJournal, verifyJournal} from './challenger-store.mjs';
import {trustedPrefix, verifyHistory, snapshotProtected, assertProtected} from './challenger-guard.mjs';
import {formIndependent, blankDraft, PILOT} from '../lib/challenger-pilot-model.js';
import {compareIndependent} from '../lib/challenger-pilot-debate.js';

export async function freezePilot(root, evidenceCutoff, drafts, batchId) {
  verifyHistory(root);
  const before = snapshotProtected(root), bundles = await loadSources(root, evidenceCutoff);
  if (!Array.isArray(drafts) || drafts.length !== bundles.length || new Set(drafts.map(d => d.ticker)).size !== bundles.length || drafts.some(d => !bundles.some(b => b.ticker === d.ticker))) throw Error('PILOT_DRAFT_SCOPE');
  const existing = verifyJournal(root, 'runs.jsonl', trustedPrefix(root, 'runs.jsonl'));
  if (!batchId || existing.some(r => r.payload.id === batchId)) throw Error('PILOT_DUPLICATE_BATCH');
  // Validate the whole independent batch before any write. No Core module is loaded.
  const packets = bundles.map(b => formIndependent(b, drafts.find(d => d.ticker === b.ticker),
    {id: `${batchId}:${b.ticker}`, timestamp: new Date().toISOString(), bundleHash: hash(b)}));
  const refs = packets.map(p => {
    const row = appendJournal(root, 'challenges.jsonl', p, trustedPrefix(root, 'challenges.jsonl'));
    return {id: p.id, hash: row.hash, ticker: p.ticker};
  });
  const batch = appendJournal(root, 'runs.jsonl', {schemaVersion: 'argus.pilot-batch/1', id: batchId, timestamp: new Date().toISOString(), evidenceCutoff,
    packetRefs: refs, skipped: PILOT.filter(t => !bundles.some(b => b.ticker === t)), status: 'INDEPENDENT_FROZEN'}, trustedPrefix(root, 'runs.jsonl'));
  assertProtected(root, before); return batch;
}

export async function debatePilot(root, batchId, coreLoader) {
  verifyHistory(root);
  const runs = verifyJournal(root, 'runs.jsonl', trustedPrefix(root, 'runs.jsonl'));
  const batch = runs.find(r => r.payload.schemaVersion === 'argus.pilot-batch/1' && r.payload.id === batchId);
  if (!batch) throw Error('PILOT_INDEPENDENT_BATCH_REQUIRED');
  const packets = verifyJournal(root, 'challenges.jsonl', trustedPrefix(root, 'challenges.jsonl'));
  await verifyStoredSources(root, packets.map(r => r.payload));
  const before = snapshotProtected(root), results = [];
  // Core code is imported only after the entire independent batch is durably verified.
  const readCore = coreLoader ?? (await import('./challenger-core-read.mjs')).readCore;
  for (const ref of batch.payload.packetRefs) {
    const prior = runs.find(r => r.payload.schemaVersion === 'argus.pilot-debate/1' && r.payload.batchHash === batch.hash && r.payload.packetHash === ref.hash);
    if (prior) { results.push(prior); continue; }
    const packet = packets.find(r => r.hash === ref.hash).payload;
    const coreSnapshot = await readCore(root, packet.ticker, packet.evidenceCutoff);
    const comparison = compareIndependent(packet, coreSnapshot);
    results.push(appendJournal(root, 'runs.jsonl', {schemaVersion: 'argus.pilot-debate/1', id: `${batchId}:debate:${packet.ticker}`, timestamp: new Date().toISOString(), evidenceCutoff: packet.evidenceCutoff,
      batchHash: batch.hash, packetHash: ref.hash, packetId: packet.id, ticker: packet.ticker, coreSnapshot, comparison}, trustedPrefix(root, 'runs.jsonl')));
  }
  assertProtected(root, before); verifyHistory(root); return results;
}

export async function verifyPilot(root) {
  verifyHistory(root);
  const packets = verifyJournal(root, 'challenges.jsonl', trustedPrefix(root, 'challenges.jsonl'));
  await verifyStoredSources(root, packets.map(r => r.payload));
  const runs = verifyJournal(root, 'runs.jsonl', trustedPrefix(root, 'runs.jsonl'));
  for (const row of runs.filter(r => r.payload.schemaVersion === 'argus.pilot-debate/1')) {
    const r = row.payload, {readCore} = await import('./challenger-core-read.mjs');
    const core = await readCore(root, r.ticker, r.evidenceCutoff);
    const {readAt: currentRead, ...current} = core, {readAt: historicalRead, ...stored} = r.coreSnapshot;
    if (hash(current) !== hash(stored)) throw Error('PILOT_CORE_SOURCE_REPLAY_MISMATCH');
  }
  return {status: 'VERIFIED', independentPackets: packets.filter(r => r.payload.schemaVersion === 'argus.challenge/2').length,
    debateRecords: runs.filter(r => r.payload.schemaVersion === 'argus.pilot-debate/1').length, canAuthorizePortfolioAction: false};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [mode, cutoffOrId, draftPath, batchId, ...extra] = process.argv.slice(2);
  if (extra.length) throw Error('PILOT_ARGUMENTS');
  if (mode === 'verify' && !cutoffOrId) {
    console.log(JSON.stringify(await verifyPilot(process.cwd())));
  } else if (mode === 'prepare' && cutoffOrId && !draftPath) {
    const bundles = await loadSources(process.cwd(), cutoffOrId);
    console.log(JSON.stringify({bundles, drafts: bundles.map(blankDraft), skipped: PILOT.filter(t => !bundles.some(b => b.ticker === t))}, null, 2));
  } else if (mode === 'freeze' && cutoffOrId && draftPath && batchId) {
    console.log(JSON.stringify(await freezePilot(process.cwd(), cutoffOrId, JSON.parse(fs.readFileSync(draftPath, 'utf8')), batchId), null, 2));
  } else if (mode === 'debate' && cutoffOrId && !draftPath) {
    console.log(JSON.stringify(await debatePilot(process.cwd(), cutoffOrId), null, 2));
  } else throw Error('PILOT_ARGUMENTS: prepare <cutoff> | freeze <cutoff> <drafts.json> <batch-id> | debate <batch-id> | verify');
}
