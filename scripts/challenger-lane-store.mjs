import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {hash, assertAppendOnly, validateJournal} from './challenger-store.mjs';
import {validateCandidate, validateCapture, validateDiscoveryPacket, routeDiscovery} from '../lib/challenger-discovery.js';
import {exact} from '../lib/challenger-pilot-model.js';
import {instant} from '../lib/challenger-model.js';
import {evidenceCompletion} from '../lib/challenger-evidence-completion.js';
import {C_JOURNALS} from '../lib/challenger-underwriting.js';
import {validateCRecord,validateCLinks} from './challenger-underwriting-records.mjs';
export const LANE_JOURNALS = Object.freeze(['discovery/candidates.jsonl', 'discovery/evidence.jsonl', 'discovery/packets.jsonl', 'discovery/runs.jsonl', 'core/coverage.jsonl', ...C_JOURNALS]);

// Parse only the repository's existing JSON export wrapper; never execute source code.
export function coreIdentities(root) {
  const text = fs.readFileSync(path.join(root, 'datasets/universe_v10_33.js'), 'utf8');
  const match = text.match(/export const UNIVERSE\s*=\s*deepFreeze\(([\s\S]*)\);?\s*$/);
  if (!match) throw Error('LANE_UNIVERSE_FORMAT');
  return JSON.parse(match[1])['Company Universe'].map(row => ({ticker: row.Ticker, company: row.Company}));
}
export function lanePath(root, name) {
  if (!LANE_JOURNALS.includes(name)) throw Error('LANE_WRITE_DENIED');
  const file = path.resolve(root, 'challenger', name);
  for (let p = file;; p = path.dirname(p)) {
    try { const stat = fs.lstatSync(p); if (stat.isSymbolicLink() || p === file && (!stat.isFile() || stat.nlink !== 1)) throw Error('LANE_LINK_DENIED'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    if (p === path.dirname(p)) break;
  }
  return file;
}
export function lanePrefix(root, name, ref = 'HEAD') {
  lanePath(root, name);
  if (!/^[a-zA-Z0-9_./^-]+$/.test(ref) || ref.startsWith('-')) throw Error('LANE_REFERENCE_DENIED');
  const file = 'challenger/' + name;
  const exists = execFileSync('git', ['ls-tree', '--name-only', ref, '--', file], {cwd: root, encoding: 'utf8'}).trim();
  return exists ? execFileSync('git', ['show', `${ref}:${file}`], {cwd: root}) : Buffer.alloc(0);
}
function payload(name, row) {
  if(C_JOURNALS.includes(name))return validateCRecord(name,row);
  if (name === 'discovery/candidates.jsonl') return validateCandidate(row);
  if (name === 'discovery/evidence.jsonl') { validateCapture(row); if (hash(row.claims) !== row.contentHash) throw Error('LANE_SOURCE_DIGEST'); return; }
  if (name === 'discovery/packets.jsonl') {
    validateDiscoveryPacket(row);
    if (hash(row.sourceBundle) !== row.bundleHash || row.sourceBundle.evidence.some(e => hash(e.fact) !== e.contentHash)) throw Error('LANE_PACKET_DIGEST'); return;
  }
  if (name === 'discovery/runs.jsonl') {
    exact(row, ['schemaVersion', 'id', 'timestamp', 'packetHash', 'route']);
    if (row.schemaVersion !== 'argus.discovery-route/1' || !/^[a-f0-9]{64}$/.test(row.packetHash)) throw Error('LANE_RUN_SCHEMA');
  } else {
    exact(row, ['schemaVersion', 'id', 'timestamp', 'evidenceCutoff', 'lane', 'batchHash', 'companies']);
    if (row.schemaVersion !== 'argus.core-coverage/1' || row.lane !== 'CORE_CHALLENGE' || !/^[a-f0-9]{64}$/.test(row.batchHash) || !Array.isArray(row.companies) || instant(row.evidenceCutoff) > instant(row.timestamp)) throw Error('LANE_COVERAGE_SCHEMA');
  }
  if (typeof row.id !== 'string' || !row.id) throw Error('LANE_ID'); instant(row.timestamp);
}
export function readLane(root, name, trustedPrefix) {
  if (trustedPrefix === undefined) throw Error('LANE_ANCHOR_REQUIRED');
  const file = lanePath(root, name), bytes = fs.existsSync(file) ? fs.readFileSync(file) : Buffer.alloc(0);
  assertAppendOnly(trustedPrefix, bytes);
  const text = bytes.toString('utf8').replace(/\r\n/g, '\n');
  if (text && !text.endsWith('\n')) throw Error('LANE_PARTIAL_RECORD');
  let previous = null; const ids = new Set();
  return (text ? text.slice(0, -1).split('\n') : []).map((line, i) => {
    const row = JSON.parse(line), {hash: stored, ...body} = row;
    exact(row, ['sequence', 'previousHash', 'payload', 'hash']);
    if (body.sequence !== i + 1 || body.previousHash !== previous || hash(body) !== stored || ids.has(row.payload.id)) throw Error('LANE_CHAIN_INVALID');
    payload(name, row.payload); previous = stored; ids.add(row.payload.id); return row;
  });
}
function linked(root, data) {
  validateCLinks(data.slice(5),coreIdentities(root),data[0]);
  for(const row of data[5])for(const s of row.payload.sources.filter(s=>s.kind==='VERIFIED_PRICE')){
    const raw=fs.readFileSync(path.join(root,'datasets/market_snapshot.js')),source=raw.toString('utf8'),ticker=row.payload.ticker;
    const match=source.match(new RegExp(ticker+":quote\\((\\d+(?:\\.\\d+)?),'([^']+)'"));
    const published=source.match(/const timestamp='([^']+)'/)?.[1],observed=source.match(/verifiedAt:'([^']+)'/)?.[1];
    if(!match||s.locator!==`sha256:${createHash('sha256').update(raw).digest('hex')}`||s.url!==match[2]||s.publishedAt!==published||s.observedAt!==observed||row.payload.facts.filter(f=>f.sourceId===s.id).some(f=>f.metric!=='PRICE'||f.value!==Number(match[1])) )throw Error('UNDERWRITING_VERIFIED_QUOTE_REPLAY');
  }
  const core = new Set(coreIdentities(root).map(c => c.ticker)), candidates = data[0], sources = data[1], packets = data[2], runs = data[3];
  const seen = new Set();
  for (const row of candidates) {
    if (core.has(row.payload.ticker) || seen.has(row.payload.ticker)) throw Error('LANE_CORE_OR_DUPLICATE_CANDIDATE'); seen.add(row.payload.ticker);
  }
  for (const row of sources) {
    const s = row.payload, c = candidates.find(r => r.hash === s.candidateHash)?.payload;
    if (!c || c.ticker !== s.ticker) throw Error('LANE_CANDIDATE_REFERENCE');
    const u = new URL(s.url);
    if (s.sourceKind === 'REGULATORY' ? u.hostname !== 'www.sec.gov' || !u.pathname.startsWith(`/Archives/edgar/data/${Number(c.cik)}/`) : !c.issuerHosts.includes(u.hostname)) throw Error('LANE_SOURCE_AUTHORITY');
  }
  for (const row of packets) {
    const p = row.payload, c = candidates.find(r => r.hash === p.candidateHash)?.payload;
    if (!c || c.ticker !== p.ticker || c.company !== p.company || instant(c.timestamp) > instant(p.evidenceCutoff) || core.has(p.ticker)) throw Error('LANE_CANDIDATE_REFERENCE');
    for (const e of p.sourceBundle.evidence) {
      const ref = p.sourceBundle.provenance.find(r => r.evidenceId === e.id), record = sources.find(r => r.hash === ref.recordHash)?.payload;
      const claim = record?.claims.find(c => c.id === ref.claimId);
      if (!record || record.candidateHash !== p.candidateHash || record.ticker !== p.ticker || !claim || claim.fact !== e.fact || e.sourceRef !== record.url || e.publishedAt !== record.publishedAt || e.availableAt !== record.retrievedAt ||
          hash(ref.dimensions) !== hash([...new Set([...claim.dimensions, record.sourceKind])])) throw Error('LANE_EVIDENCE_REFERENCE');
    }
  }
  const routed = new Set();
  for (const row of runs) {
    const r = row.payload, p = packets.find(p => p.hash === r.packetHash)?.payload;
    if (!p || instant(r.timestamp) < instant(p.timestamp) || hash(routeDiscovery(p)) !== hash(r.route) || routed.has(r.packetHash)) throw Error('LANE_ROUTE_OR_ACTION_DENIED'); routed.add(r.packetHash);
  }
  if (data[4].length) {
    const oldRuns = validateJournal('runs.jsonl', fs.readFileSync(path.join(root, 'challenger/runs.jsonl')));
    const oldPackets = validateJournal('challenges.jsonl', fs.readFileSync(path.join(root, 'challenger/challenges.jsonl')));
    for (const row of data[4]) {
      const r = row.payload, batch = oldRuns.find(b => b.hash === r.batchHash)?.payload;
      if (r.companies.some(c => !core.has(c.ticker))) throw Error('LANE_EXTERNAL_IN_CORE_COVERAGE');
      if (batch?.schemaVersion !== 'argus.pilot-batch/1' || batch.evidenceCutoff !== r.evidenceCutoff || instant(batch.timestamp) > instant(r.timestamp)) throw Error('LANE_CORE_BATCH_REFERENCE');
      const expected = batch.packetRefs.map(ref => { const p = oldPackets.find(p => p.hash === ref.hash)?.payload; if (!p) throw Error('LANE_CORE_PACKET_REFERENCE'); return {packetHash: ref.hash, sourceBundleHash: p.bundleHash, ...evidenceCompletion(p.sourceBundle)}; });
      if (hash(expected) !== hash(r.companies)) throw Error('LANE_CORE_COVERAGE_FORGED');
    }
  }
}
export function verifyLanes(root, ref = 'HEAD') {
  const data = LANE_JOURNALS.map(name => readLane(root, name, lanePrefix(root, name, ref))); linked(root, data); return data;
}
export function appendLane(root, name, row) {
  payload(name, row); lanePath(root, name);
  const data = verifyLanes(root), index = LANE_JOURNALS.indexOf(name), rows = data[index];
  if (rows.some(r => r.payload.id === row.id)) throw Error('LANE_DUPLICATE_ID');
  const body = {sequence: rows.length + 1, previousHash: rows.at(-1)?.hash ?? null, payload: structuredClone(row)}, envelope = {...body, hash: hash(body)};
  data[index] = [...rows, envelope]; linked(root, data);
  const file = lanePath(root, name); fs.mkdirSync(path.dirname(file), {recursive: true});
  const fd = fs.openSync(lanePath(root, name), fs.constants.O_APPEND | fs.constants.O_CREAT | fs.constants.O_WRONLY | (fs.constants.O_NOFOLLOW || 0));
  try { if (fs.fstatSync(fd).nlink !== 1) throw Error('LANE_LINK_DENIED'); fs.writeFileSync(fd, JSON.stringify(envelope) + '\n'); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  verifyLanes(root); return envelope;
}
