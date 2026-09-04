import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {hash, verifyJournal} from './challenger-store.mjs';
import {appendLane, verifyLanes, coreIdentities} from './challenger-lane-store.mjs';
import {loadSources} from './challenger-evidence.mjs';
import {freezePilot, debatePilot, verifyPilot} from './challenger-pilot.mjs';
import {trustedPrefix, snapshotProtected, assertProtected} from './challenger-guard.mjs';
import {createDiscoveryPacket, blankDiscoveryDraft} from '../lib/challenger-discovery.js';
import {evidenceCompletion} from '../lib/challenger-evidence-completion.js';
import {instant} from '../lib/challenger-model.js';
import {deepFreeze} from '../lib/integrity.js';
import {routeDiscovery} from '../lib/challenger-discovery.js';

export function discoveryBundles(root, cutoff) {
  instant(cutoff);
  const [candidates, sources] = verifyLanes(root);
  return candidates.filter(r => instant(r.payload.timestamp) <= instant(cutoff)).map(row => {
    const c = row.payload, evidence = [], provenance = [];
    for (const record of sources.filter(r => r.payload.candidateHash === row.hash && instant(r.payload.publishedAt) <= instant(cutoff) && instant(r.payload.retrievedAt) <= instant(cutoff))) {
      const s = record.payload;
      for (const claim of s.claims) {
        const id = `${s.id}:${claim.id}`;
        evidence.push({id, sourceRef: s.url, publishedAt: s.publishedAt, availableAt: s.retrievedAt, contentHash: hash(claim.fact), fact: claim.fact});
        provenance.push({evidenceId: id, recordHash: record.hash, claimId: claim.id, dimensions: [...new Set([...claim.dimensions, s.sourceKind])]});
      }
    }
    return deepFreeze({ticker: c.ticker, company: c.company, candidateHash: row.hash, evidenceCutoff: cutoff, evidence, provenance});
  });
}
export function freezeDiscovery(root, cutoff, drafts, batchId) {
  const before = snapshotProtected(root), bundles = discoveryBundles(root, cutoff);
  if (!Array.isArray(drafts) || !drafts.length || new Set(drafts.map(d => d.ticker)).size !== drafts.length || drafts.some(d => !bundles.some(b => b.ticker === d.ticker))) throw Error('DISCOVERY_DRAFT_SCOPE');
  if (typeof batchId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(batchId)) throw Error('DISCOVERY_BATCH_ID');
  const packets = drafts.map(d => { const b = bundles.find(b => b.ticker === d.ticker); return createDiscoveryPacket(b, d, {id: `${batchId}:${d.ticker}`, timestamp: new Date().toISOString(), bundleHash: hash(b)}); });
  // All independent views validate before any packet is persisted. No Core reader exists here.
  const rows = packets.map(p => appendLane(root, 'discovery/packets.jsonl', p));
  const routes = rows.map(row => appendLane(root, 'discovery/runs.jsonl', {schemaVersion: 'argus.discovery-route/1', id: `${row.payload.id}:route`, timestamp: new Date().toISOString(), packetHash: row.hash, route: routeDiscovery(row.payload)}));
  assertProtected(root, before); return {rows, routes};
}
export async function prepareCore(root, cutoff) {
  const bundles = await loadSources(root, cutoff);
  return {bundles, completion: bundles.map(evidenceCompletion)};
}
export async function freezeCore(root, cutoff, drafts, batchId) {
  const before = snapshotProtected(root);
  const batch = await freezePilot(root, cutoff, drafts, batchId);
  const frozen = verifyJournal(root, 'challenges.jsonl', trustedPrefix(root, 'challenges.jsonl'));
  const companies = batch.payload.packetRefs.map(ref => { const packet = frozen.find(p => p.hash === ref.hash).payload; return {packetHash: ref.hash, sourceBundleHash: packet.bundleHash, ...evidenceCompletion(packet.sourceBundle)}; });
  appendLane(root, 'core/coverage.jsonl', {schemaVersion: 'argus.core-coverage/1', id: `${batchId}:coverage`, timestamp: new Date().toISOString(), evidenceCutoff: cutoff, lane: 'CORE_CHALLENGE', batchHash: batch.hash, companies});
  assertProtected(root, before); return batch;
}
export async function verifyB1(root) {
  await verifyPilot(root); const data = verifyLanes(root);
  return {status: 'VERIFIED', externalCandidates: data[0].length, externalSources: data[1].length, externalPackets: data[2].length, externalRoutes: data[3].length, coreCompletionRuns: data[4].length, canAuthorizePortfolioAction: false};
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [mode, a, b, c, ...rest] = process.argv.slice(2), root = process.cwd();
  if (rest.length) throw Error('B1_ARGUMENTS');
  let result;
  if (mode === 'register' && a && !b) {
    const before = snapshotProtected(root), entries = JSON.parse(fs.readFileSync(a));
    result = entries.map(e => appendLane(root, 'discovery/candidates.jsonl', e)); assertProtected(root, before);
  } else if (mode === 'capture' && a && !b) {
    const before = snapshotProtected(root), entries = JSON.parse(fs.readFileSync(a)), registry = verifyLanes(root)[0];
    result = entries.map(e => { const candidate = registry.find(r => r.payload.ticker === e.ticker); if (!candidate) throw Error('CANDIDATE_REQUIRED'); return appendLane(root, 'discovery/evidence.jsonl', {...e, candidateHash: candidate.hash, contentHash: hash(e.claims)}); }); assertProtected(root, before);
  } else if (mode === 'prepare-external' && a && !b) { const bundles = discoveryBundles(root, a); result = {bundles, drafts: bundles.map(blankDiscoveryDraft)}; }
  else if (mode === 'prepare-core' && a && !b) result = await prepareCore(root, a);
  else if (mode === 'freeze-external' && a && b && c) result = freezeDiscovery(root, a, JSON.parse(fs.readFileSync(b)), c);
  else if (mode === 'freeze-core' && a && b && c) result = await freezeCore(root, a, JSON.parse(fs.readFileSync(b)), c);
  else if (mode === 'debate-core' && a && !b) result = await debatePilot(root, a);
  else if (mode === 'verify' && !a) result = await verifyB1(root);
  else throw Error('B1_ARGUMENTS');
  console.log(JSON.stringify(result, null, 2));
}
