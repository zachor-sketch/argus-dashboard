import {ASSESSMENTS, UNKNOWN, validateChallenge} from './challenger-model.js';
import {deepFreeze} from './integrity.js';

export function researchReadiness(input) {
  const packet = validateChallenge(input);
  const missing = [...ASSESSMENTS, 'coreViewSnapshotRef', 'disagreementLevel'].filter(key => packet[key] === UNKNOWN);
  for (const key of ['evidenceFor', 'evidenceAgainst']) if (!packet[key].length) missing.push(key);
  return deepFreeze({status: missing.length ? 'INSUFFICIENT_EVIDENCE' : 'RESEARCH_ONLY', missing,
    outputState: UNKNOWN, canAuthorizePortfolioAction: false});
}

export function authorizePortfolioAction() { throw Error('CHALLENGER_ACTION_DENIED'); }
