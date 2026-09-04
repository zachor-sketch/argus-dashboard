import {deepFreeze} from './integrity.js';
// These are search indexes into admitted primary facts, not inferred economic conclusions.
const TOPICS = Object.freeze({liquidity: /cash|liquidity|debt|covenant/i, ownerEconomics: /cash flow|compensation|dilut|per.share|capital expenditure/i,
  workingCapital: /receivable|inventor|working capital|payable/i, valuation: /valuation|enterprise value|discount rate/i});
export function evidenceCompletion(bundle) {
  const primaryIds = new Set(bundle.provenance.filter(p => p.kind === 'OBSERVER_EXCERPT').map(p => p.evidenceId));
  const primary = bundle.evidence.filter(e => primaryIds.has(e.id));
  return deepFreeze({ticker: bundle.ticker, company: bundle.company, lane: 'CORE_CHALLENGE',
    evidenceCutoff: bundle.evidenceCutoff, primaryEvidenceCount: primary.length,
    priceEvidenceCount: bundle.provenance.filter(p => p.kind === 'VERIFIED_PRICE').length,
    topics: Object.fromEntries(Object.entries(TOPICS).map(([key, pattern]) => {
      const evidenceRefs = primary.filter(e => pattern.test(e.fact)).map(e => e.id);
      return [key, {status: evidenceRefs.length ? 'EXCERPTS_REQUIRE_UNDERWRITING' : 'UNKNOWN', evidenceRefs}];
    })),
    conclusionReadiness: 'UNKNOWN', note: 'Source search results cannot establish complete economics or valuation. Core research narratives are excluded.'});
}
