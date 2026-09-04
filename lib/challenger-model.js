import {deepFreeze} from './integrity.js';

export const VERSION = 'argus.challenge/1';
export const UNKNOWN = 'UNKNOWN';
export const OUTPUT_STATES = Object.freeze(['SUPPORT_CORE', 'CHALLENGE_CORE', 'NEW_OPPORTUNITY', 'CONTRARIAN_TRAP']);
export const ASSESSMENTS = Object.freeze([
  'marketConsensusBelief', 'contrarianHypothesis', 'falsificationConditions',
  'economicMechanism', 'valuationImplication', 'balanceSheetSurvivability',
  'ownerEconomics', 'catalystProofEvent', 'contrarianTrapAnalysis', 'evidenceQuality'
]);

function exact(object, keys) {
  if (!object || typeof object !== 'object' || Array.isArray(object) ||
      Object.keys(object).some(key => !keys.includes(key)) || keys.some(key => !Object.hasOwn(object, key))) throw Error('CHALLENGER_SCHEMA');
}
function text(value) { if (typeof value !== 'string' || !value.trim()) throw Error('CHALLENGER_SCHEMA'); }
export function instant(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) ||
      !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value.replace(/Z$/, value.includes('.') ? 'Z' : '.000Z')) throw Error('CHALLENGER_TIMESTAMP');
  return Date.parse(value);
}

// A detached, frozen packet; no reads, inference, scoring, or Core imports.
export function createChallenge({id, ticker, company, timestamp, evidenceCutoff}) {
  const packet = {
    schemaVersion: VERSION, id, ticker, company, timestamp, evidenceCutoff,
    coreViewSnapshotRef: UNKNOWN,
    ...Object.fromEntries(ASSESSMENTS.map(key => [key, UNKNOWN])),
    evidenceFor: [], evidenceAgainst: [], disagreementLevel: UNKNOWN,
    outputState: UNKNOWN, requiredNextResearch: []
  };
  return validateChallenge(packet);
}

export function validateChallenge(input) {
  const packet = structuredClone(input);
  exact(packet, ['schemaVersion', 'id', 'ticker', 'company', 'timestamp', 'evidenceCutoff',
    'coreViewSnapshotRef', ...ASSESSMENTS, 'evidenceFor', 'evidenceAgainst',
    'disagreementLevel', 'outputState', 'requiredNextResearch']);
  if (packet.schemaVersion !== VERSION) throw Error('CHALLENGER_VERSION');
  for (const key of ['id', 'ticker', 'company']) text(packet[key]);
  const cutoff = instant(packet.evidenceCutoff);
  if (cutoff > instant(packet.timestamp)) throw Error('CHALLENGER_PIT');
  const ids = new Set();
  for (const side of ['evidenceFor', 'evidenceAgainst']) {
    if (!Array.isArray(packet[side])) throw Error('CHALLENGER_SCHEMA');
    for (const evidence of packet[side]) {
      exact(evidence, ['id', 'sourceRef', 'contentHash', 'publishedAt', 'availableAt', 'fact']);
      for (const key of ['id', 'sourceRef', 'fact']) { text(evidence[key]); if (evidence[key] === UNKNOWN) throw Error('CHALLENGER_EVIDENCE'); }
      if (!/^[a-f0-9]{64}$/.test(evidence.contentHash)) throw Error('CHALLENGER_EVIDENCE');
      if (instant(evidence.publishedAt) > cutoff || instant(evidence.availableAt) > cutoff ||
          instant(evidence.publishedAt) > instant(evidence.availableAt)) throw Error('CHALLENGER_PIT');
      if (ids.has(evidence.id)) throw Error('CHALLENGER_DUPLICATE_EVIDENCE');
      ids.add(evidence.id);
    }
  }
  const supported = (value, levels) => {
    if (value === UNKNOWN) return;
    exact(value, ['value', 'evidenceRefs']); text(value.value);
    if (value.value === UNKNOWN || levels && !levels.includes(value.value) ||
        !Array.isArray(value.evidenceRefs) || !value.evidenceRefs.length ||
        value.evidenceRefs.some(ref => !ids.has(ref))) throw Error('CHALLENGER_UNSUPPORTED_CLAIM');
  };
  for (const key of ASSESSMENTS) supported(packet[key]);
  supported(packet.disagreementLevel, ['LOW', 'MEDIUM', 'HIGH']);
  if (packet.coreViewSnapshotRef !== UNKNOWN) {
    const ref = packet.coreViewSnapshotRef;
    exact(ref, ['ref', 'contentHash', 'asOf', 'availableAt']); text(ref.ref);
    if (ref.ref === UNKNOWN || !/^[a-f0-9]{64}$/.test(ref.contentHash)) throw Error('CHALLENGER_CORE_REF');
    if (instant(ref.asOf) > cutoff || instant(ref.availableAt) > cutoff || instant(ref.asOf) > instant(ref.availableAt)) throw Error('CHALLENGER_PIT');
  }
  // Reserved outcome vocabulary is defined above. Phase A cannot emit a conclusion.
  if (packet.outputState !== UNKNOWN) throw Error('CHALLENGER_PHASE_A_NO_CONCLUSIONS');
  if (!Array.isArray(packet.requiredNextResearch)) throw Error('CHALLENGER_SCHEMA');
  for (const request of packet.requiredNextResearch) {
    exact(request, ['kind', 'question']);
    if (!['RESEARCH', 'REUNDERWRITE'].includes(request.kind)) throw Error('CHALLENGER_ACTION_DENIED');
    text(request.question);
  }
  return deepFreeze(packet);
}
