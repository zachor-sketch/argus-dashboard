import {validateChallenge, UNKNOWN} from './challenger-model.js';
import {researchReadiness} from './challenger-rules.js';
import {canonical, deepFreeze} from './integrity.js';

// Caller supplies only a PIT snapshot reference, never mutable Core state or callbacks.
// High disagreement is an explicit evidence-backed input, never an inferred score.
export function debate(coreSnapshotRef, input) {
  const packet = validateChallenge(input);
  const core = structuredClone(coreSnapshotRef);
  if (canonical(core) !== canonical(packet.coreViewSnapshotRef)) throw Error('CHALLENGER_CORE_REF_MISMATCH');
  const readiness = researchReadiness(packet);
  const high = packet.disagreementLevel !== UNKNOWN && packet.disagreementLevel.value === 'HIGH';
  return deepFreeze({schemaVersion: 'argus.debate/1', challengeId: packet.id,
    timestamp: packet.timestamp, evidenceCutoff: packet.evidenceCutoff,
    coreViewSnapshotRef: core, challengerOutputState: UNKNOWN, readiness,
    researchPriority: high ? {kind: 'REUNDERWRITE', priority: 'HIGH', challengeId: packet.id,
      reason: 'EVIDENCE_BACKED_HIGH_DISAGREEMENT', evidenceRefs: [...packet.disagreementLevel.evidenceRefs]} : null,
    canAuthorizePortfolioAction: false});
}
