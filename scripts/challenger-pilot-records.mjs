import {validateIndependent, exact, PILOT} from '../lib/challenger-pilot-model.js';
import {validateCoreRead, compareIndependent} from '../lib/challenger-pilot-debate.js';
import {instant} from '../lib/challenger-model.js';
import {canonical} from '../lib/integrity.js';

export function validatePilotRecord(r) {
  if (r.schemaVersion === 'argus.pilot-batch/1') {
    exact(r, ['schemaVersion', 'id', 'timestamp', 'evidenceCutoff', 'packetRefs', 'skipped', 'status']);
    if (r.status !== 'INDEPENDENT_FROZEN' || !Array.isArray(r.packetRefs) || !Array.isArray(r.skipped)) throw Error('PILOT_BATCH_SCHEMA');
    const tickers = [...r.skipped];
    for (const p of r.packetRefs) {
      exact(p, ['id', 'hash', 'ticker']);
      if (!p.id || !/^[a-f0-9]{64}$/.test(p.hash)) throw Error('PILOT_BATCH_SCHEMA'); tickers.push(p.ticker);
    }
    if (tickers.length !== PILOT.length || new Set(tickers).size !== tickers.length || tickers.some(t => !PILOT.includes(t))) throw Error('PILOT_BATCH_SCOPE');
  } else if (r.schemaVersion === 'argus.pilot-debate/1') {
    exact(r, ['schemaVersion', 'id', 'timestamp', 'evidenceCutoff', 'batchHash', 'packetHash', 'packetId', 'ticker', 'coreSnapshot', 'comparison']);
    if (![r.batchHash, r.packetHash].every(h => /^[a-f0-9]{64}$/.test(h)) || !r.packetId || !PILOT.includes(r.ticker)) throw Error('PILOT_DEBATE_SCHEMA');
    validateCoreRead(r.coreSnapshot, r.evidenceCutoff);
    if (instant(r.coreSnapshot.readAt) > instant(r.timestamp)) throw Error('PILOT_DEBATE_TIME');
    exact(r.comparison, ['outputState', 'disagreementLevel', 'challengedAssumption', 'strongestEvidenceFor', 'strongestEvidenceAgainst', 'falsificationTest', 'requiredNextResearch', 'researchPriority', 'canAuthorizePortfolioAction']);
    if (!['UNKNOWN', 'SUPPORT_CORE', 'CHALLENGE_CORE', 'NEW_OPPORTUNITY', 'CONTRARIAN_TRAP'].includes(r.comparison.outputState) || r.comparison.canAuthorizePortfolioAction !== false) throw Error('PILOT_ACTION_DENIED');
  } else throw Error('PILOT_RECORD_VERSION');
  if (typeof r.id !== 'string' || !r.id || instant(r.evidenceCutoff) > instant(r.timestamp)) throw Error('PILOT_RECORD_TIME');
}

// Recompute relational outcomes from immutable independent packets; reject forged debates.
export function validatePilotLinks(challenges, runs) {
  const byHash = new Map(challenges.map(row => [row.hash, row]));
  const batches = new Map(), compared = new Set();
  for (const row of runs) {
    const r = row.payload;
    if (r.schemaVersion === 'argus.pilot-batch/1') {
      for (const ref of r.packetRefs) {
        const p = byHash.get(ref.hash)?.payload;
        if (!p || p.schemaVersion !== 'argus.challenge/2' || p.id !== ref.id || p.ticker !== ref.ticker || p.evidenceCutoff !== r.evidenceCutoff || instant(p.timestamp) > instant(r.timestamp)) throw Error('PILOT_FREEZE_REFERENCE');
        validateIndependent(p);
      }
      batches.set(row.hash, r);
    } else if (r.schemaVersion === 'argus.pilot-debate/1') {
      const batch = batches.get(r.batchHash), p = byHash.get(r.packetHash)?.payload;
      if (!batch || !p || !batch.packetRefs.some(ref => ref.hash === r.packetHash && ref.id === r.packetId && ref.ticker === r.ticker) ||
          p.evidenceCutoff !== r.evidenceCutoff || instant(r.coreSnapshot.readAt) < instant(batch.timestamp)) throw Error('PILOT_ANTI_ANCHOR_SEQUENCE');
      const key = r.batchHash + ':' + r.packetHash;
      if (compared.has(key)) throw Error('PILOT_DUPLICATE_DEBATE'); compared.add(key);
      if (canonical(compareIndependent(p, r.coreSnapshot)) !== canonical(r.comparison)) throw Error('PILOT_FORGED_COMPARISON');
    }
  }
}
