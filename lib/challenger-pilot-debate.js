import {validateIndependent, exact} from './challenger-pilot-model.js';
import {instant, UNKNOWN} from './challenger-model.js';
import {deepFreeze} from './integrity.js';

export function validateCoreRead(input, cutoff) {
  const c = structuredClone(input);
  exact(c, ['ticker', 'state', 'narrative', 'economicDirection', 'ref', 'contentHash', 'asOf', 'availableAt', 'readAt']);
  for (const k of ['ticker', 'state', 'narrative', 'ref']) if (typeof c[k] !== 'string' || !c[k]) throw Error('PILOT_CORE_SCHEMA');
  if (!/^[a-f0-9]{64}$/.test(c.contentHash) || !['UNKNOWN', 'FAVORABLE', 'UNFAVORABLE'].includes(c.economicDirection)) throw Error('PILOT_CORE_SCHEMA');
  instant(c.readAt);
  for (const k of ['asOf', 'availableAt']) if (c[k] !== UNKNOWN && instant(c[k]) > instant(cutoff)) throw Error('PILOT_CORE_PIT');
  if (c.asOf !== UNKNOWN && c.availableAt !== UNKNOWN && instant(c.asOf) > instant(c.availableAt)) throw Error('PILOT_CORE_PIT');
  return deepFreeze(c);
}

export function compareIndependent(packet, coreInput) {
  const p = validateIndependent(packet), c = validateCoreRead(coreInput, p.evidenceCutoff);
  if (c.ticker !== p.ticker || instant(c.readAt) < instant(p.timestamp)) throw Error('PILOT_CORE_BEFORE_FREEZE');
  let outputState = p.outputState, disagreementLevel = UNKNOWN;
  if (['FAVORABLE', 'UNFAVORABLE'].includes(p.independentStance) && c.economicDirection !== UNKNOWN && c.asOf !== UNKNOWN && c.availableAt !== UNKNOWN) {
    const same = p.independentStance === c.economicDirection;
    outputState = same ? 'SUPPORT_CORE' : 'CHALLENGE_CORE'; disagreementLevel = same ? 'LOW' : 'HIGH';
  }
  return deepFreeze({outputState, disagreementLevel,
    challengedAssumption: p.contrarianHypothesis === UNKNOWN ? UNKNOWN : p.contrarianHypothesis.value,
    strongestEvidenceFor: p.evidenceFor[0] ?? UNKNOWN, strongestEvidenceAgainst: p.evidenceAgainst[0] ?? UNKNOWN,
    falsificationTest: p.falsificationConditions,
    requiredNextResearch: p.requiredNextResearch,
    researchPriority: disagreementLevel === 'HIGH' ? {kind: 'REUNDERWRITE', priority: 'HIGH', challengeId: p.id} : null,
    canAuthorizePortfolioAction: false});
}
