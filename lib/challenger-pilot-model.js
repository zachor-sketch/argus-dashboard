import {createChallenge, validateChallenge, ASSESSMENTS, instant, UNKNOWN} from './challenger-model.js';
import {canonical, deepFreeze} from './integrity.js';

export const PILOT = Object.freeze(['CLS', 'FIS', 'TNK', 'IFF', 'AVGO', 'CRDO', 'ARM', 'INTU']);
export const REQUIRED = Object.freeze(ASSESSMENTS.filter(key => key !== 'marketConsensusBelief'));
export function exact(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      Object.keys(value).sort().join('|') !== [...keys].sort().join('|')) throw Error('PILOT_SCHEMA');
}
export function validateBundle(input) {
  const b = structuredClone(input);
  exact(b, ['schemaVersion', 'ticker', 'company', 'evidenceCutoff', 'repositoryCommit', 'evidence', 'provenance', 'excluded', 'missingInputs']);
  if (b.schemaVersion !== 'argus.source-bundle/1' || !PILOT.includes(b.ticker) || !/^[a-f0-9]{40}$/.test(b.repositoryCommit)) throw Error('PILOT_BUNDLE');
  const shell = {...createChallenge({id: 'source-validation', ticker: b.ticker, company: b.company, timestamp: b.evidenceCutoff, evidenceCutoff: b.evidenceCutoff}), evidenceFor: b.evidence};
  validateChallenge(shell);
  if (!Array.isArray(b.provenance) || b.provenance.length !== b.evidence.length || !Array.isArray(b.excluded) || !Array.isArray(b.missingInputs)) throw Error('PILOT_PROVENANCE');
  const ids = new Set();
  for (const p of b.provenance) {
    exact(p, ['evidenceId', 'kind', 'sourceFile', 'recordId', 'recordHash', 'documentId', 'documentRecordHash', 'documentContentHash', 'dateMethod']);
    if (ids.has(p.evidenceId) || !b.evidence.some(e => e.id === p.evidenceId) ||
        !['OBSERVER_EXCERPT', 'OFFICIAL_TITLE_ONLY', 'VERIFIED_PRICE'].includes(p.kind) ||
        !['observer/events.jsonl', 'datasets/market_snapshot.js'].includes(p.sourceFile) ||
        !/^[a-f0-9]{64}$/.test(p.recordHash) || !p.recordId || !p.dateMethod) throw Error('PILOT_PROVENANCE');
    if (p.kind === 'OBSERVER_EXCERPT' && (!p.documentId || !/^[a-f0-9]{64}$/.test(p.documentRecordHash) || !/^[a-f0-9]{64}$/.test(p.documentContentHash))) throw Error('PILOT_PROVENANCE');
    ids.add(p.evidenceId);
  }
  for (const row of b.excluded) { exact(row, ['id', 'reason']); if (!row.id || !row.reason) throw Error('PILOT_SCHEMA'); }
  if (b.missingInputs.some(x => typeof x !== 'string' || !x)) throw Error('PILOT_SCHEMA');
  return deepFreeze(b);
}

export function validateIndependent(input) {
  const p = structuredClone(input);
  const extra = ['stage', 'sourceBundle', 'bundleHash', 'independentStance'];
  const base = Object.fromEntries(Object.entries(p).filter(([key]) => !extra.includes(key)));
  if (p.schemaVersion !== 'argus.challenge/2' || p.stage !== 'INDEPENDENT' || !/^[a-f0-9]{64}$/.test(p.bundleHash) ||
      !['UNKNOWN', 'FAVORABLE', 'UNFAVORABLE', 'NEW_OPPORTUNITY', 'CONTRARIAN_TRAP'].includes(p.independentStance)) throw Error('PILOT_SCHEMA');
  if (p.coreViewSnapshotRef !== UNKNOWN || p.disagreementLevel !== UNKNOWN) throw Error('PILOT_CORE_EXPOSURE_DENIED');
  const b = validateBundle(p.sourceBundle);
  if (p.ticker !== b.ticker || p.company !== b.company || p.evidenceCutoff !== b.evidenceCutoff) throw Error('PILOT_IDENTITY_OR_CUTOFF');
  validateChallenge({...base, schemaVersion: 'argus.challenge/1', outputState: UNKNOWN});
  for (const e of [...p.evidenceFor, ...p.evidenceAgainst]) {
    if (!b.evidence.some(source => canonical(source) === canonical(e))) throw Error('PILOT_EVIDENCE_NOT_IN_BUNDLE');
  }
  if (p.independentStance !== UNKNOWN) {
    if (!p.evidenceFor.length || !p.evidenceAgainst.length || REQUIRED.some(key => p[key] === UNKNOWN)) throw Error('PILOT_INSUFFICIENT_EVIDENCE');
    // A price, title or duplicated excerpt is not two-sided economic underwriting.
    for (const side of ['evidenceFor', 'evidenceAgainst']) if (!p[side].some(e => b.provenance.some(r => r.evidenceId === e.id && r.kind === 'OBSERVER_EXCERPT'))) throw Error('PILOT_INSUFFICIENT_EVIDENCE');
    if (p.evidenceFor.some(e => p.evidenceAgainst.some(a => a.fact.trim() === e.fact.trim()))) throw Error('PILOT_DUPLICATED_SIDES');
  }
  const expected = ['NEW_OPPORTUNITY', 'CONTRARIAN_TRAP'].includes(p.independentStance) ? p.independentStance : UNKNOWN;
  if (p.outputState !== expected) throw Error('PILOT_PREMATURE_RELATIVE_CONCLUSION');
  return deepFreeze(p);
}

// The analyst receives only this source-only bundle. No Core parameter exists.
export function formIndependent(bundle, draft, {id, timestamp, bundleHash}) {
  const b = validateBundle(bundle);
  exact(draft, ['ticker', ...ASSESSMENTS, 'evidenceFor', 'evidenceAgainst', 'independentStance', 'requiredNextResearch']);
  if (draft.ticker !== b.ticker) throw Error('PILOT_IDENTITY_OR_CUTOFF');
  const select = refs => {
    if (!Array.isArray(refs)) throw Error('PILOT_SCHEMA');
    return refs.map(id => { const e = b.evidence.find(e => e.id === id); if (!e) throw Error('PILOT_EVIDENCE_NOT_IN_BUNDLE'); return e; });
  };
  const p = {...createChallenge({id, ticker: b.ticker, company: b.company, timestamp, evidenceCutoff: b.evidenceCutoff}),
    ...Object.fromEntries(ASSESSMENTS.map(key => [key, draft[key]])),
    schemaVersion: 'argus.challenge/2', stage: 'INDEPENDENT', sourceBundle: b, bundleHash,
    evidenceFor: select(draft.evidenceFor), evidenceAgainst: select(draft.evidenceAgainst),
    independentStance: draft.independentStance,
    outputState: ['NEW_OPPORTUNITY', 'CONTRARIAN_TRAP'].includes(draft.independentStance) ? draft.independentStance : UNKNOWN,
    requiredNextResearch: draft.requiredNextResearch};
  return validateIndependent(p);
}

export function blankDraft(bundle) {
  return {ticker: bundle.ticker, ...Object.fromEntries(ASSESSMENTS.map(key => [key, UNKNOWN])),
    evidenceFor: [], evidenceAgainst: [], independentStance: UNKNOWN,
    requiredNextResearch: [{kind: 'RESEARCH', question: 'Obtain PIT-valid operating, owner-earnings, debt, valuation and counterevidence inputs before concluding.'}]};
}
