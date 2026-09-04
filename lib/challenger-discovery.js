import {createChallenge, validateChallenge, ASSESSMENTS, instant} from './challenger-model.js';
import {exact} from './challenger-pilot-model.js';
import {deepFreeze, canonical} from './integrity.js';

export const DIMENSIONS = Object.freeze(['REGULATORY', 'ISSUER', 'LIQUIDITY', 'FCF_PER_SHARE', 'DILUTION', 'CAPEX', 'WORKING_CAPITAL', 'VALUATION_INPUTS']);
export const EXTERNAL_STATES = Object.freeze(['UNKNOWN', 'NEW_OPPORTUNITY', 'CONTRARIAN_TRAP']);
export const validTicker = value => typeof value === 'string' && /^[A-Z][A-Z0-9.-]{0,11}$/.test(value);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
export function validateCandidate(input) {
  const c = structuredClone(input);
  exact(c, ['schemaVersion', 'id', 'timestamp', 'ticker', 'company', 'classification', 'cik', 'issuerHosts', 'identitySources']);
  if (c.schemaVersion !== 'argus.external-candidate/1' || c.classification !== 'EXTERNAL_CANDIDATE' || !validTicker(c.ticker) || !nonempty(c.company) || !nonempty(c.id) || !/^\d{10}$/.test(c.cik)) throw Error('DISCOVERY_CANDIDATE_SCHEMA');
  instant(c.timestamp);
  if (!Array.isArray(c.issuerHosts) || !c.issuerHosts.length || c.issuerHosts.some(host => typeof host !== 'string' || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host) || host.endsWith('sec.gov'))) throw Error('DISCOVERY_ISSUER_HOST');
  if (!Array.isArray(c.identitySources) || c.identitySources.length < 2) throw Error('DISCOVERY_IDENTITY_REQUIRED');
  let sec = false, issuer = false;
  for (const source of c.identitySources) {
    exact(source, ['url', 'locator', 'observedAt']); instant(source.observedAt);
    if (instant(source.observedAt) > instant(c.timestamp) || !nonempty(source.locator)) throw Error('DISCOVERY_IDENTITY_REQUIRED');
    const u = new URL(source.url);
    if (u.protocol !== 'https:' || u.username || u.password) throw Error('DISCOVERY_SOURCE_DENIED');
    if (u.hostname === 'www.sec.gov' && u.pathname.startsWith(`/Archives/edgar/data/${Number(c.cik)}/`)) sec = true;
    if (c.issuerHosts.includes(u.hostname)) issuer = true;
  }
  if (!sec || !issuer) throw Error('DISCOVERY_IDENTITY_REQUIRED');
  return deepFreeze(c);
}

export function validateCapture(input) {
  const s = structuredClone(input);
  exact(s, ['schemaVersion', 'id', 'ticker', 'candidateHash', 'sourceKind', 'url', 'publishedAt', 'publicationPrecision', 'retrievedAt', 'retrievalMethod', 'digestScope', 'contentHash', 'claims']);
  if (s.schemaVersion !== 'argus.discovery-source/1' || !nonempty(s.id) || !validTicker(s.ticker) || !/^[a-f0-9]{64}$/.test(s.candidateHash) ||
      !['REGULATORY', 'ISSUER'].includes(s.sourceKind) || !['DAY_END_BOUND', 'INSTANT'].includes(s.publicationPrecision) || s.retrievalMethod !== 'PUBLIC_SOURCE_REVIEW' || s.digestScope !== 'CURATED_FACTS' || !/^[a-f0-9]{64}$/.test(s.contentHash)) throw Error('DISCOVERY_SOURCE_SCHEMA');
  if (instant(s.publishedAt) > instant(s.retrievedAt)) throw Error('DISCOVERY_PIT');
  if (s.publicationPrecision === 'DAY_END_BOUND' && !s.publishedAt.endsWith('T23:59:59.999Z')) throw Error('DISCOVERY_DATE_PRECISION');
  const u = new URL(s.url); if (u.protocol !== 'https:' || u.username || u.password) throw Error('DISCOVERY_SOURCE_DENIED');
  const ids = new Set();
  if (!Array.isArray(s.claims) || !s.claims.length) throw Error('DISCOVERY_NO_FACTS');
  for (const c of s.claims) {
    exact(c, ['id', 'fact', 'locator', 'dimensions']);
    if (!nonempty(c.id) || ids.has(c.id) || !nonempty(c.fact) || !nonempty(c.locator) || !Array.isArray(c.dimensions) || c.dimensions.some(d => !DIMENSIONS.includes(d))) throw Error('DISCOVERY_CLAIM_SCHEMA');
    ids.add(c.id);
  }
  return deepFreeze(s);
}

export function validateDiscoveryPacket(input) {
  const p = structuredClone(input), extras = ['lane', 'classification', 'candidateHash', 'sourceBundle', 'bundleHash', 'coverage'];
  const base = Object.fromEntries(Object.entries(p).filter(([k]) => !extras.includes(k)));
  if (p.schemaVersion !== 'argus.discovery-packet/1' || p.lane !== 'EXTERNAL_DISCOVERY' || p.classification !== 'EXTERNAL_CANDIDATE' ||
      !EXTERNAL_STATES.includes(p.outputState) || p.coreViewSnapshotRef !== 'UNKNOWN' || p.disagreementLevel !== 'UNKNOWN' || !/^[a-f0-9]{64}$/.test(p.candidateHash) || !/^[a-f0-9]{64}$/.test(p.bundleHash)) throw Error('DISCOVERY_STATE_OR_CORE_DENIED');
  validateChallenge({...base, schemaVersion: 'argus.challenge/1', outputState: 'UNKNOWN'});
  exact(p.sourceBundle, ['ticker', 'company', 'candidateHash', 'evidenceCutoff', 'evidence', 'provenance']);
  const b = p.sourceBundle;
  if (b.ticker !== p.ticker || b.company !== p.company || b.candidateHash !== p.candidateHash || b.evidenceCutoff !== p.evidenceCutoff) throw Error('DISCOVERY_BUNDLE_IDENTITY');
  validateChallenge({...createChallenge({id: 'bundle', ticker: b.ticker, company: b.company, timestamp: p.timestamp, evidenceCutoff: b.evidenceCutoff}), evidenceFor: b.evidence});
  if (!Array.isArray(b.provenance) || b.provenance.length !== b.evidence.length || new Set(b.provenance.map(r => r.evidenceId)).size !== b.evidence.length) throw Error('DISCOVERY_PROVENANCE');
  for (const r of b.provenance) {
    exact(r, ['evidenceId', 'recordHash', 'claimId', 'dimensions']);
    if (!b.evidence.some(e => e.id === r.evidenceId) || !/^[a-f0-9]{64}$/.test(r.recordHash) || !nonempty(r.claimId) || !Array.isArray(r.dimensions) || r.dimensions.some(d => !DIMENSIONS.includes(d))) throw Error('DISCOVERY_PROVENANCE');
  }
  for (const e of [...p.evidenceFor, ...p.evidenceAgainst]) if (!b.evidence.some(x => canonical(x) === canonical(e))) throw Error('DISCOVERY_UNADMITTED_FACT');
  exact(p.coverage, DIMENSIONS);
  for (const d of DIMENSIONS) {
    if (!Array.isArray(p.coverage[d]) || p.coverage[d].some(id => !b.provenance.some(r => r.evidenceId === id && r.dimensions.includes(d)))) throw Error('DISCOVERY_COVERAGE');
  }
  if (p.outputState !== 'UNKNOWN') {
    if (!p.evidenceFor.length || !p.evidenceAgainst.length || ASSESSMENTS.filter(k => k !== 'marketConsensusBelief').some(k => p[k] === 'UNKNOWN') || DIMENSIONS.some(d => !p.coverage[d].length)) throw Error('DISCOVERY_INSUFFICIENT_EVIDENCE');
    if (p.evidenceFor.some(e => p.evidenceAgainst.some(a => a.fact.trim() === e.fact.trim()))) throw Error('DISCOVERY_DUPLICATE_SIDES');
  }
  return deepFreeze(p);
}

export function createDiscoveryPacket(bundle, draft, {id, timestamp, bundleHash}) {
  exact(draft, ['ticker', ...ASSESSMENTS, 'evidenceFor', 'evidenceAgainst', 'outputState', 'requiredNextResearch']);
  if (draft.ticker !== bundle.ticker) throw Error('DISCOVERY_DRAFT_IDENTITY');
  const select = refs => { if (!Array.isArray(refs)) throw Error('DISCOVERY_DRAFT_SCHEMA'); return refs.map(id => { const e = bundle.evidence.find(e => e.id === id); if (!e) throw Error('DISCOVERY_UNADMITTED_FACT'); return e; }); };
  return validateDiscoveryPacket({...createChallenge({id, ticker: bundle.ticker, company: bundle.company, timestamp, evidenceCutoff: bundle.evidenceCutoff}),
    ...Object.fromEntries(ASSESSMENTS.map(k => [k, draft[k]])), schemaVersion: 'argus.discovery-packet/1',
    lane: 'EXTERNAL_DISCOVERY', classification: 'EXTERNAL_CANDIDATE', candidateHash: bundle.candidateHash,
    sourceBundle: bundle, bundleHash, coverage: Object.fromEntries(DIMENSIONS.map(d => [d, bundle.provenance.filter(r => r.dimensions.includes(d)).map(r => r.evidenceId)])),
    evidenceFor: select(draft.evidenceFor), evidenceAgainst: select(draft.evidenceAgainst), outputState: draft.outputState, requiredNextResearch: draft.requiredNextResearch});
}
export function blankDiscoveryDraft(b) { return {ticker: b.ticker, ...Object.fromEntries(ASSESSMENTS.map(k => [k, 'UNKNOWN'])), evidenceFor: [], evidenceAgainst: [], outputState: 'UNKNOWN', requiredNextResearch: [{kind: 'RESEARCH', question: 'Complete primary evidence, per-share owner economics, liquidity and independent valuation before concluding.'}]}; }
export function routeDiscovery(packet) {
  const p = validateDiscoveryPacket(packet);
  return deepFreeze({kind: 'RESEARCH', queue: p.outputState === 'NEW_OPPORTUNITY' ? 'ZERO_BASED_UNDERWRITING' : 'EVIDENCE_COMPLETION', ticker: p.ticker,
    classification: 'EXTERNAL_CANDIDATE', requiresReviewedOnboarding: true, canAuthorizePortfolioAction: false});
}
export function promoteCandidateToCore() { throw Error('EXPLICIT_REVIEWED_ONBOARDING_REQUIRED'); }
